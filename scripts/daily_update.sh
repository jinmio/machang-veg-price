#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 马厂蔬菜报价 · 每日更新脚本（自托管方案）
# 适用于：自有 Linux 服务器 / VPS，用 crontab 或 systemd timer 定时跑。
# 作用：联网抓取新发地当日行情 → 合并生成 data.js → 站点即最新。
# 纯静态站点由 nginx / caddy / python -m http.server 直接 serve 目录，
# 更新 data.js 后用户下次访问即拿到新价，无需重启服务。
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# 定位到仓库根目录（脚本在 scripts/ 下）
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始每日菜价更新…"

# 1) 依赖（建议放虚拟环境，此处用系统 pip 示例）
python3 -m pip install -q -r requirements.txt

# 2) 抓取新发地当日行情（输出 live_market.json）
python3 fetch_live_prices.py

# 3) 三路合并重生成 data.js（--live 用当日实时价覆盖命中品类）
python3 update_prices.py --live

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 更新完成。站点目录已为最新，静态服务会自动 serve 新数据。"

# 可选：若用 systemd 托管 python http.server，可在此重新加载（按需取消注释）
# sudo systemctl reload machang-price.service || true
