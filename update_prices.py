#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
马厂老火锅 · 蔬菜报价  ->  生成前端数据文件 assets/data/data.js

数据来源（三路合并）：
  1) 报价表 xlsx          ：南京仓报价（E列）+ 全国时价（G列）+ 原质量标准（F列）
  2) sh_standards.json    ：上海·聚垒蔬菜商品技术规格书（感官规格/验收标准/包装规格）
                            —— 与报价表重合的品类，标准一律采用上海标准
  3) suppliers.json       ：额外供应商价格（可选，文件不存在则自动跳过）
                            —— 用于“多供应商实时比价”，新增供应商只需维护该 JSON

用法：
    python3.11 update_prices.py [报价表.xlsx路径]

输出：assets/data/data.js（window.PRICE_DATA 全局变量，无需 fetch 即可静态托管；
      前端同时会带缓存参数轮询本文件实现“实时更新”。）

实时更新用法：
    # 1) 先抓取新发地当日行情 -> 写入 live_market.json
    python3.11 fetch_live_prices.py
    # 2) 用实时行情覆盖“全国时价”，重新生成 data.js
    python3.11 update_prices.py [报价表.xlsx] --live assets/data/live_market.json

若不传 --live，则沿用 xlsx 的「全国时价」列（手动维护）。
"""

import json
import re
import sys
import datetime
import os
import urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_XLSX = os.path.join(HERE, "马厂老火锅10月份上半月蔬菜报价.xlsx")
OUT_JS = os.path.join(HERE, "assets", "data", "data.js")
SH_STD_JSON = os.path.join(HERE, "assets", "data", "sh_standards.json")
SUPPLIERS_JSON = os.path.join(HERE, "assets", "data", "suppliers.json")
LIVE_JSON = os.path.join(HERE, "assets", "data", "live_market.json")
BASELINE_JSON = os.path.join(HERE, "assets", "data", "nanjing_baseline.json")

# ---------- 取价来源链接（前端「查源」按钮直达，可点开核对） ----------
XINFADI_PAGE_URL = "http://wdb.xinfadi.com.cn/index.html"  # 实时行情抓取源页（新发地）
QUOTE_XLSX_NAME = "马厂老火锅10月份上半月蔬菜报价.xlsx"
QUOTE_SHEET_URL = ("https://github.com/jinmio/machang-veg-price/blob/main/"
                   + urllib.parse.quote(QUOTE_XLSX_NAME))  # 南京仓报价原始出处

# ---------- 品类分组（按“客户名称/品名”匹配） ----------
CATEGORY_MAP = {
    "叶菜类": ["大白菜", "油麦菜", "苘蒿", "娃娃菜", "生菜"],
    "根茎类": ["荷兰土豆", "莴笋", "莲藕", "白萝卜", "山药", "胡萝卜", "净莴笋"],
    "菌菇类": ["平菇", "金针菇", "香菇", "海鲜菇", "虫草菇", "杏鲍菇"],
    "瓜茄类": ["冬瓜", "小南瓜", "小黄瓜", "黄瓜", "薄皮青椒", "西红柿", "圣女果"],
    "葱姜调味": ["小葱", "云南香菜", "小米辣", "干生姜", "蒜米"],
    "香草香料": ["鱼腥草", "薄荷叶", "清香草"],
    "豆蛋制品": ["豆芽", "甜玉米", "鸡蛋", "生鹌鹑蛋", "毛豆", "千张"],
    "水果类": ["柠檬", "红心火龙果"],
}

# ---------- 马厂报价表品名 -> 上海聚垒规格书品名 ----------
SH_NAME_MAP = {
    "平菇": "平菇",
    "大白菜": "大白菜",
    "小葱": "小葱(无蓝矾)",
    "云南香菜": "昆明精品香菜",
    "小米辣(小米椒)": "小米辣",
    "冬瓜": "冬瓜",
    "干生姜": "生姜",
    "小南瓜(板栗南瓜)": "小南瓜(贝贝)",
    "金针菇": "金针菇",
    "香菇": "香菇",
    "甜玉米": "甜玉米",
    "鸡蛋": "鸡蛋",
    "海鲜菇": "海鲜菇",
    "荷兰土豆": "土豆",
    "莴笋": "宁夏莴笋",
    "藕(莲藕)": "莲藕",
    "薄皮青椒": "青椒",
    "油麦菜": "油麦菜",
    "虫草菇": "虫草菇",
    "西红柿": "西红柿",
    "柠檬": "黄柠檬",
    "小黄瓜(水果黄瓜)": "小黄瓜",
    "杏鲍菇": "杏鲍菇",
    "白萝卜": "白萝卜",
    "山药": "山药",
    "苘蒿": "茼蒿",
    "娃娃菜": "娃娃菜",
    "鱼腥草": "鱼腥草",
    "生鹌鹑蛋": "生鹌鹑蛋",
    "生菜": "云南大利生菜",
    "薄荷叶": "薄荷叶",
    "清香草": "清香草",
    "胡萝卜": "胡萝卜",
    "圣女果": "圣女果",
    "净莴笋": "三清去皮莴笋",
}

# 默认两个内置供应商
BASE_SUPPLIERS = [
    {"id": "nanjing", "name": "南京仓·马厂报价", "short": "南京仓",
     "type": "门店到货价", "color": "#c8321f",
     "desc": "含分拣、配送、损耗与利润的到货价"},
    {"id": "market", "name": "全国批发时价", "short": "全国时价",
     "type": "市场行情", "color": "#ef6c1a",
     "desc": "产地/批发市场裸价，每日更新"},
]


def match_category(name: str) -> str:
    for cat, items in CATEGORY_MAP.items():
        for it in items:
            if name.startswith(it) or it in name:
                return cat
    return "其他"


def extract_price_date(source: str) -> str:
    if not source:
        return ""
    m = re.search(r"(\d{4})-(\d{1,2})-(\d{1,2})", source)
    if m:
        return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    return ""


def load_json(path, default=None):
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return default


def to_float(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def main():
    # 解析参数：第一个非 -- 开头视为 xlsx 路径，--live 指定实时行情文件
    xlsx_path = DEFAULT_XLSX
    live_path = None
    for a in sys.argv[1:]:
        if a.startswith("--live"):
            live_path = a.split("=", 1)[1] if "=" in a else LIVE_JSON
        elif not a.startswith("-"):
            xlsx_path = a
    # 报价基线：优先纯文本 JSON（可文本推送、CI 无需 openpyxl），其次回退 xlsx
    rows = []
    if os.path.exists(BASELINE_JSON):
        bdata = load_json(BASELINE_JSON, {}) or {}
        for rec in bdata.get("rows", []):
            rows.append((
                rec.get("id"), rec.get("name"), rec.get("sysName"), rec.get("unit"),
                rec.get("quote"), rec.get("standard"), rec.get("curPrice"), rec.get("source"),
            ))
        print(f"📄 已载入文本报价基线：{len(rows)} 行（assets/data/nanjing_baseline.json）")
    elif os.path.exists(xlsx_path):
        import openpyxl
        wb = openpyxl.load_workbook(xlsx_path, data_only=True)
        ws = wb["蔬菜"]
        for r in range(2, ws.max_row + 1):
            row = [ws.cell(r, c).value for c in range(1, ws.max_column + 1)]
            rows.append(tuple((row + [None] * 8)[:8]))
        print(f"📄 已从 xlsx 读取报价基线：{len(rows)} 行")
    else:
        print(f"❌ 找不到报价基线（既无 assets/data/nanjing_baseline.json 也无 {xlsx_path}）")
        sys.exit(1)

    # ---------- 读取实时行情（新发地当日） ----------
    live_map = {}
    live_date = ""
    if live_path and os.path.exists(live_path):
        live_data = load_json(live_path, {}) or {}
        live_date = live_data.get("date", "")
        for name, rec in (live_data.get("items", {}) or {}).items():
            p = to_float(rec.get("price"))
            if p is not None:
                live_map[name] = {
                    "price": p,
                    "unit": rec.get("unit", "斤"),
                    "date": rec.get("date", live_date),
                    "source": rec.get("source", "新发地"),
                    "low": to_float(rec.get("low")),
                    "high": to_float(rec.get("high")),
                }
        print(f"🔗 已载入实时行情：{len(live_map)} 个品类（日期 {live_date}）")
    else:
        print("⚠️  未指定/未找到实时行情文件，全国时价将沿用 xlsx「全国时价」列。")

    # ---------- 读取上海标准 ----------
    sh = load_json(SH_STD_JSON, {}) or {}
    sh_products = sh.get("products", {})
    sh_general = sh.get("general", {})
    sh_source = sh.get("source", "上海·聚垒蔬菜商品技术规格书")
    sh_version = sh.get("version", "")

    # ---------- 额外供应商 ----------
    extra = load_json(SUPPLIERS_JSON, {}) or {}
    extra_suppliers = extra.get("suppliers", []) or []
    extra_prices = extra.get("prices", {}) or {}
    suppliers = list(BASE_SUPPLIERS) + [s for s in extra_suppliers
                                        if s.get("id") not in {b["id"] for b in BASE_SUPPLIERS}]

    items = []
    price_dates = set()
    std_covered = 0

    for row in rows:
        if not row or not row[1]:
            continue
        _id, name, sys_name, unit, quote, standard, cur_price, source = row[:8]
        name = str(name).strip()
        if not name:
            continue
        unit = str(unit or "斤").strip()
        quote_v = to_float(quote)
        cur_v = to_float(cur_price)
        source = (source or "").strip()
        pdate = extract_price_date(source)
        if pdate:
            price_dates.add(pdate)

        # ---- 实时行情覆盖：命中 live_map 则用新发地当日价 ----
        is_live = False
        if name in live_map:
            lv = live_map[name]
            cur_v = lv["price"]
            pdate = lv["date"]
            source = lv["source"]
            is_live = True
            if pdate:
                price_dates.add(pdate)

        # ---- 标准合并：重合项用上海标准，否则保留原标准 ----
        sh_name = SH_NAME_MAP.get(name)
        sp = sh_products.get(sh_name) if sh_name else None
        if sp:
            std_covered += 1
            std = {
                "source": "上海标准",
                "ref": sh_source + (" " + sh_version if sh_version else ""),
                "category3": sp.get("category3", ""),
                "packing": sp.get("packing", ""),
                "appearance": sp.get("appearance", ""),
                "acceptance": sp.get("acceptance", ""),
            }
        else:
            std = {
                "source": "原标准",
                "ref": "马厂老火锅报价表",
                "note": (standard or "").strip(),
            }

        # ---- 多供应商价格 ----
        prices = []
        if quote_v is not None:
            prices.append({
                "supplier": "nanjing", "label": "南京仓报价",
                "price": quote_v, "unit": unit,
                "date": "10月上半月", "note": "", "isRef": False,
                "url": QUOTE_SHEET_URL,          # 点开可核对报价表原件
            })
        if cur_v is not None:
            prices.append({
                "supplier": "market", "label": "全国批发时价",
                "price": cur_v, "unit": "斤",
                "date": pdate or "", "note": source,
                "isRef": "参考" in source,
                "isLive": is_live,
                # 当日实时抓取的价 -> 链到新发地行情页；沿用/参考价 -> 链回报价表
                "url": XINFADI_PAGE_URL if is_live else QUOTE_SHEET_URL,
            })
        # 额外供应商（按马厂品名匹配；url 由 suppliers.json 逐条提供）
        for ep in extra_prices.get(name, []) or []:
            if ep.get("price") is None:
                continue
            prices.append({
                "supplier": ep.get("supplier", "extra"),
                "label": ep.get("label", ""),
                "price": to_float(ep["price"]),
                "unit": ep.get("unit", unit),
                "date": ep.get("date", pdate or ""),
                "note": ep.get("note", ""),
                "isRef": bool(ep.get("isRef", False)),
                "url": ep.get("url", ""),
            })

        # ---- 涨跌（南京仓 vs 全国时价，单位一致才计算） ----
        delta = None
        nan = next((p for p in prices if p["supplier"] == "nanjing"), None)
        mkt = next((p for p in prices if p["supplier"] == "market"), None)
        if nan and mkt and nan["unit"] == mkt["unit"] and nan["price"]:
            delta = round((mkt["price"] - nan["price"]) / nan["price"] * 100, 1)

        # ---- 多方比价：同单位内最低价（≥2个报价才标记，避免单一包装价误判） ----
        same_unit = [p for p in prices if p["unit"] == unit]
        best = min(same_unit, key=lambda p: p["price"]) if len(same_unit) >= 2 else None

        # ---- 卡片主展示价：主单位内的最低价，即“多方比价取时价最低” ----
        # 自带单位，避免把 元/斤 的价挂到 元/包 的品类上
        featured = min(same_unit, key=lambda p: p["price"]) if same_unit else (prices[0] if prices else None)

        items.append({
            "id": int(_id) if isinstance(_id, (int, float)) else len(items) + 1,
            "name": name,
            "sysName": (sys_name or "").strip(),
            "unit": unit,
            "category": match_category(name),
            "standard": std,
            "prices": prices,
            "delta": delta,
            "marketLive": is_live,
            "marketNote": (("新发地 " + pdate) if is_live else "新发地今日未收录 · 沿用上期"),
            "best": {"supplier": best["supplier"], "price": best["price"], "unit": best["unit"]} if best else None,
            "featured": ({"supplier": featured["supplier"], "label": featured["label"],
                          "price": featured["price"], "unit": featured["unit"],
                          "date": featured["date"], "url": featured.get("url", "")} if featured else None),
        })

    price_date = sorted(price_dates)[-1] if price_dates else ""
    live_count = sum(1 for it in items if it.get("marketLive"))

    meta = {
        "brand": "马厂老火锅",
        "title": "马厂老火锅 · 蔬菜实时报价",
        "subtitle": "南京仓蔬菜供应商 · 上海验收标准 · 多供应商比价",
        "quotePeriod": "2026年10月上半月",
        "priceDate": price_date,
        "liveDate": live_date or price_date,
        "liveCount": live_count,
        "generatedAt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "standardSource": sh_source,
        "standardVersion": sh_version,
        "unitNote": "时价与报价单位均为「元/斤」；个别按包/袋/盒计价的品类（如菌菇、娃娃菜、鹌鹑蛋）其南京仓报价为包装价，与按斤时价不可直接比较，涨跌栏显示为「—」。",
        "disclaimer": "全国时价为产地/批发市场裸价（新发地等批发市场公开行情，每日联网抓取），南京仓报价含分拣、配送、损耗与利润，二者不可等同，建议作为议价与比价基准；验收标准采用上海·聚垒蔬菜商品技术规格书。",
        "refreshInterval": 300,
        "suppliers": suppliers,
        "stats": {
            "total": len(items),
            "standardCovered": std_covered,
            "supplierCount": len({p["supplier"] for it in items for p in it["prices"]}),
            "liveCount": live_count,
        },
    }

    payload = {"meta": meta, "general": sh_general, "items": items}
    js = "// 本文件由 update_prices.py 自动生成，请勿手动编辑。\n"
    js += "// 实时更新：运行 fetch_live_prices.py 抓取新发地当日行情 -> update_prices.py --live 重新生成并部署。\n"
    js += "window.PRICE_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"

    os.makedirs(os.path.dirname(OUT_JS), exist_ok=True)
    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write(js)

    print(f"✅ 已生成 {OUT_JS}")
    print(f"   品类数: {len(items)}  时价日期: {price_date}")
    print(f"   实时更新（新发地当日）: {live_count}/{len(items)}")
    print(f"   上海标准覆盖: {std_covered}/{len(items)}")
    print(f"   供应商数: {meta['stats']['supplierCount']} -> {[s['short'] for s in suppliers]}")


if __name__ == "__main__":
    main()
