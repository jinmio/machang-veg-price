#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
fetch_live_prices.py — 联网抓取新发地当日蔬菜批发行情，生成 live_market.json

数据来源：北京新发地农产品批发市场官网（wdb.xinfadi.com.cn）
  - 用真实浏览器引擎（Playwright）渲染首页各分类（蔬菜/水果/肉禽蛋/水产/粮油/调料）
  - 逐行解析「品名 | 最低 | 平均 | 最高 | 规格 | 产地 | 单位 | 日期」
  - 按别名映射表把马厂 41 个品类匹配到新发地当日均价
  - 命中即写入 live_market.json（date + 各品 price/low/high/unit/source）
  - 未命中的品类不写入（update_prices.py 会沿用上期并标注「沿用」）

依赖：pip install playwright && playwright install chromium
用法：python3.11 fetch_live_prices.py
"""

import json
import os
import re
import sys
import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
LIVE_JSON = os.path.join(HERE, "assets", "data", "live_market.json")
XF_URL = "http://wdb.xinfadi.com.cn/index.html"
TABS = ["蔬菜", "水果", "肉禽蛋", "水产", "粮油", "调料"]

# 马厂品名 -> 新发地品名候选（取均价）。None 表示该品类新发地免费页未收录，沿用上期。
# 注意：新发地「香菇/花菇」为干品价，不匹配鲜香菇；菌菇/香料/根茎/蛋豆/香草多被 40 行上限截掉，故多为 None。
ALIASES = {
    "平菇": None,
    "大白菜": ["大白菜"],
    "小葱": None,
    "云南香菜": ["香菜"],
    "小米辣(小米椒)": None,
    "冬瓜": ["冬瓜"],
    "干生姜": None,
    "小南瓜(板栗南瓜)": None,
    "金针菇": None,
    "香菇": None,                       # 新发地“香菇”为干品，不匹配
    "甜玉米": None,
    "鸡蛋": None,
    "海鲜菇": None,
    "荷兰土豆": None,
    "莴笋": ["莴笋"],
    "豆芽": ["黄豆芽"],
    "藕(莲藕)": None,
    "薄皮青椒": None,
    "油麦菜": ["油麦菜"],
    "虫草菇": None,
    "西红柿": ["番茄"],
    "柠檬": ["柠檬"],
    "小黄瓜(水果黄瓜)": ["小黄瓜"],
    "杏鲍菇": None,
    "白萝卜": None,
    "山药": None,
    "苘蒿": None,
    "娃娃菜": ["娃娃菜"],
    "鱼腥草": None,
    "生鹌鹑蛋": None,
    "生菜": ["团生菜", "散叶生菜", "罗马生菜"],   # 取多个生菜变种的均价
    "黄瓜": ["黄瓜"],
    "薄荷叶": None,
    "清香草": None,
    "毛豆": None,
    "千张": None,
    "蒜米": None,
    "胡萝卜": None,
    "圣女果": ["圣女果"],
    "净莴笋": ["莴笋"],
    "红心火龙果": ["火龙果"],
}


def fetch_xinfadi():
    """用 Playwright 抓取新发地各分类当日价格，返回 {品名: {avg,low,high,unit,date}}"""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("❌ 未安装 playwright，请先：pip install playwright && playwright install chromium")
        sys.exit(1)

    result = {}
    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=["--no-sandbox"])
        page = browser.new_page()
        print("⏳ 打开新发地行情页 ...")
        try:
            page.goto(XF_URL, wait_until="networkidle", timeout=35000)
        except Exception as e:
            print("⚠️  页面加载异常：", e)
        page.wait_for_timeout(2500)

        for tab in TABS:
            # 点击分类 tab
            clicked = False
            for el in page.query_selector_all("li, a, div"):
                if el.inner_text().strip() == tab:
                    try:
                        el.click()
                        clicked = True
                        break
                    except Exception:
                        continue
            if not clicked:
                continue
            page.wait_for_timeout(2000)

            for tr in page.query_selector_all("table tr"):
                tds = [t.inner_text().strip() for t in tr.query_selector_all("td")]
                if len(tds) < 4:
                    continue
                name = tds[0]
                if not name or not tds[1].replace(".", "").isdigit():
                    continue
                try:
                    avg = float(tds[2])
                    low = float(tds[1])
                    high = float(tds[3])
                except ValueError:
                    continue
                unit = tds[6] if len(tds) > 6 else "斤"
                date = tds[7] if len(tds) > 7 else ""
                result[name] = {
                    "avg": avg, "low": low, "high": high,
                    "unit": unit, "date": date,
                }
        browser.close()

    print(f"✅ 新发地共抓取 {len(result)} 个品类价格")
    return result


def main():
    xf = fetch_xinfadi()
    if not xf:
        print("❌ 未抓到任何价格，请检查网络或新发地可用性")
        sys.exit(1)

    # 统计各品类日期，取最新作为本次行情日期
    dates = sorted({v["date"] for v in xf.values() if v["date"]})
    live_date = dates[-1] if dates else datetime.date.today().strftime("%Y-%m-%d")

    items = {}
    covered, gap = [], []
    for name, candidates in ALIASES.items():
        if not candidates:
            gap.append(name)
            continue
        matched = [xf[c] for c in candidates if c in xf]
        if not matched:
            gap.append(name)
            continue
        # 取候选变种均价
        avg = round(sum(m["avg"] for m in matched) / len(matched), 2)
        low = min(m["low"] for m in matched)
        high = max(m["high"] for m in matched)
        items[name] = {
            "price": avg, "low": low, "high": high,
            "unit": "斤", "date": live_date, "source": "新发地",
        }
        covered.append(name)

    out = {"date": live_date, "source": "北京新发地农产品批发市场", "items": items}
    os.makedirs(os.path.dirname(LIVE_JSON), exist_ok=True)
    with open(LIVE_JSON, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"\n📅 行情日期：{live_date}")
    print(f"✅ 实时命中 {len(covered)} 个品类：{ '、'.join(covered) }")
    print(f"⚠️  新发地未收录（沿用上期）：{len(gap)} 个：{ '、'.join(gap) }")
    print(f"💾 已写入 {LIVE_JSON}")


if __name__ == "__main__":
    main()
