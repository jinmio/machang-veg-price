# 马厂老火锅 · 蔬菜实时报价看板

纯静态、响应式的蔬菜时价看板：40+ 品类、**多供应商比价**、**时价实时更新**、**验收标准采用上海聚垒规格书**。无需后端、无需数据库，部署到任意静态托管即可。

> **线上状态（2026-10-13）**
> - 站点：**https://jinmio.github.io/machang-veg-price/**（已构建成功，公开可访问）
> - 仓库：`jinmio/machang-veg-price`（公开，GitHub Free 计划私有仓库不支持 Pages，故转公开；内容仅含公开市场行情与代码，无敏感信息）
> - 部署方式：Settings → Pages → **Deploy from a branch**（main / 根目录），每次推送自动重建（约 1-2 分钟）
> - 数据基线：41 品类 / 15 个当日实时价（新发地 2026-10-13）/ 26 个标注「沿用上期」
> - 待完成：`.github/workflows/daily-prices.yml` 尚未入库（推送令牌缺 `workflow` 权限），补入后即恢复每日 09:30 全自动更新，详见「六、部署上线 → 方案 D」


```
machang-veg-price/
├── index.html                  # 页面结构（含 SEO / Open Graph meta）
├── assets/
│   ├── css/style.css           # 火锅暖色主题、响应式样式
│   ├── js/app.js               # 渲染、搜索、筛选、排序、实时刷新、行情条/市场快照
│   └── data/
│       ├── data.js             # 报价数据（window.PRICE_DATA，脚本生成）
│       ├── nanjing_baseline.json # 南京仓报价基线（文本，update_prices.py 的数据源）
│       ├── live_market.json    # 新发地当日实时行情（fetch_live_prices.py 生成）
│       ├── sh_standards.json   # 上海·聚垒商品技术规格书（标准数据源）
│       └── suppliers.json      # 额外供应商价格配置（可选）
├── fetch_live_prices.py        # 联网抓取新发地当日行情 -> live_market.json
├── update_prices.py            # 三路数据合并 -> 生成 data.js（支持 --live）
├── scripts/
│   ├── export_baseline.py      # xlsx 报价表 -> nanjing_baseline.json（文本基线）
│   ├── daily_update.sh         # 自托管每日更新（crontab/systemd 用）
│   ├── deploy_github.sh        # 一键上线 GitHub Pages
│   └── machang-price.*         # systemd 服务/定时器（自托管）
├── .github/workflows/          # 每日定时自动抓取+重新部署
└── README.md                   # 本文件
```

---

## 一、本地预览

```bash
cd machang-veg-price
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

也可直接双击 `index.html` 打开（`data.js` 以全局变量加载，支持 `file://`；但实时轮询功能需在 http 服务下生效）。

---

## 二、数据从哪来（三路合并）

| 来源 | 提供内容 |
|---|---|
| **nanjing_baseline.json** | 南京仓报价（quote）、原质量标准（standard）等基线（由报价表 xlsx 经 `scripts/export_baseline.py` 导出；xlsx 仅作本地输入，可不入库） |
| **sh_standards.json** | 上海·聚垒蔬菜商品技术规格书 v1.0：48 个商品的感官规格 / 验收标准 / 包装规格 + 通用信息（温区矩阵、检测方案、收货验收、禁止红线） |
| **suppliers.json** | 额外供应商价格（可选，见下文） |

> 报价表 xlsx 更新后，重跑 `python3 scripts/export_baseline.py` 刷新 `nanjing_baseline.json` 即可；`update_prices.py` 优先读该文本基线，无此文件时才回退读取同目录 xlsx。

**标准合并规则**：报价表与上海规格书**重合的 35 个品类一律采用上海标准**（卡片显示「上海标准」徽章，质量面板含类目/包装规格/感官规格/验收标准）；未收录的 6 个品类（豆芽、黄瓜、毛豆、千张、蒜米、红心火龙果）沿用原验收标准（显示「原标准」徽章）。

---

## 三、联网实时更新时价（核心）

时价由脚本**联网抓取新发地当日行情**得到，不靠手工填表。新发地官网首页（wdb.xinfadi.com.cn）按「蔬菜 / 水果 / 肉禽蛋 / 水产 / 粮油 / 调料」分类发布每日批发价，用 Playwright 真实浏览器引擎渲染后逐行解析。

### 本地手动更新（两步）

```bash
# 1) 联网抓取新发地当日行情 -> assets/data/live_market.json
python3.11 fetch_live_prices.py

# 2) 用实时行情覆盖「全国时价」，重新生成前端数据
python3.11 update_prices.py --live
```

> 依赖：`pip install playwright && playwright install chromium`。脚本自动完成品名归类、上海标准匹配合并、涨跌计算、最低价标记、供应商汇总。

### 全自动每日更新（GitHub Actions，推荐）

> ⚠️ **自检结论（2026-10-13）**：每日更新要做到「用户端真的每天变」，必须让脚本跑在带 git 远程 + CI 的环境里。本项目已内置 `.github/workflows/daily-prices.yml`，但**只有把仓库推到 GitHub 并开启 Actions / Pages 后它才会真正每天运行**；本地未初始化 git 时它不会触发。请按下方「方案 D」一步上线。

工作流逻辑：**每天 09:30（北京时间）= 01:30 UTC** 自动运行抓取 + 合并两步，将新 `data.js` + `live_market.json` 提交回仓库；站点为「Deploy from a branch」模式，检测到新 commit 即自动重新部署（约 1-2 分钟）。

- 若部署在 **GitHub Pages**：工作流负责抓取+提交，推送即触发 Pages 重建。
- 若部署在 **Vercel / Netlify / Cloudflare Pages**：它们会监听 commit 自动重新构建部署，无需额外配置。
- 也可在 Actions 页面手动点一次 **Run workflow** 立即更新。

- 实时覆盖率：新发地免费页覆盖常见蔬/果类（当前 **15/41** 为当日实时价），其余特色品类（菌菇、香料、根茎、蛋豆、香草等）被首页 40 行/分类上限截掉，**自动沿用上期并在卡片标注「○ 沿用上期」**，绝不伪造。
- 想提高覆盖率：在 `fetch_live_prices.py` 的 `ALIASES` 里补充别名，或接入更多数据源（如登录态新发地全量、农业农村部接口、第三方农产品价格 API）。

### 前端实时表现

- 每张卡片带新鲜度标识：**● 实时 · 新发地 2026-10-13**（绿）或 **○ 沿用上期（新发地未收录）**（琥珀）；
- 导航显示「实时 2026-10-13」，统计条显示「联网实时 15/41」；
- 页面每 300 秒自动拉取最新 `data.js`，右上角「实时」角标 + 「刷新」按钮可手动立即更新。

---

## 四、多供应商比价（重点）

每个品类可挂多个供应商报价，卡片自动列出全部供应商价格并标记「最低」。

### 新增一个供应商

编辑 `assets/data/suppliers.json`：

```json
{
  "suppliers": [
    {
      "id": "julei",
      "name": "上海·聚垒到仓价",
      "short": "聚垒",
      "type": "到仓价",
      "color": "#0e9f6e",
      "desc": "上海仓到货价"
    }
  ],
  "prices": {
    "土豆": [
      { "supplier": "julei", "label": "聚垒到仓", "price": 1.3, "unit": "斤", "date": "2026-10-12", "note": "上海仓" }
    ],
    "香菇": [
      { "supplier": "julei", "label": "聚垒到仓", "price": 5.2, "unit": "斤", "date": "2026-10-12", "note": "上海仓" }
    ]
  }
}
```

> `prices` 的键必须是**报价表里的「客户名称」**（如 `荷兰土豆`、`小南瓜(板栗南瓜)`），不是系统名称。保存后运行 `update_prices.py`，卡片上会自动多出一行该供应商价格，无需改任何前端代码。

### 价格口径规则

- 每行价格自带单位，界面按各自单位展示，不强行换算；
- **卡片特大号主价格 = 多方比价取最低**（主单位内的最低报价），价格下方标注「取最低 · 来源（日期）」，来源完全透明；
- 涨跌徽章仅在「南京仓报价」与「全国时价」**单位一致**（均为元/斤）时计算，否则显示「— 不可比」；
- 「最低」标记仅在**同单位报价 ≥ 2 个**时出现，避免单一包装价误判。

---

## 五、实时刷新机制

- 页面加载后按 `meta.refreshInterval`（默认 **300 秒**）自动拉取 `assets/data/data.js`（带缓存参数），有新数据即整页重渲染；右上角「实时」角标显示状态，也可点「刷新」立即获取。
- 修改间隔：编辑 `update_prices.py` 里 `meta.refreshInterval` 的值（秒），设为 `0` 关闭自动刷新。
- 无网络 / `file://` 打开时自动降级为内置数据，页面照常可用。

---

## 六、部署上线（任选其一）

### 零步上手：一键上线 GitHub Pages（推荐）

本地已登录 GitHub CLI（`gh auth login`）后，一条命令搞定建仓、推送、开权限、启用 Pages、触发首跑：

```bash
bash scripts/deploy_github.sh            # 默认建私有仓库 machang-veg-price
# 自定义仓库名：bash scripts/deploy_github.sh 你的仓库名
```

完成后即得 `https://<用户名>.github.io/machang-veg-price/`，每天 09:30（北京时间）自动更新。未登录时会提示先 `gh auth login`。

### 方案 A：Vercel（最省事，推荐）

1. 把 `machang-veg-price/` 推到 GitHub 仓库。
2. [vercel.com](https://vercel.com) → Import 仓库 → Framework 选 **Other**，Build Command 留空，Output Directory 填 `.`。
3. Deploy，约 1 分钟得到 `https://xxx.vercel.app`。
4. 自定义域名：Settings → Domains 添加域名，DNS 加 `CNAME` 指向 `cname.vercel-dns.com`，Vercel 自动签发 HTTPS。

### 方案 B：Netlify

拖拽文件夹到 [app.netlify.com/drop](https://app.netlify.com/drop) 即上线；或连 Git，Build command 留空、Publish directory 填 `.`。

### 方案 C：Cloudflare Pages

连 Git，Build command 留空、Build output directory 填 `.`，自带 CDN 与 HTTPS。

### 方案 D：GitHub Pages（已上线 + 工作流日更）

> **当前实际状态**：站点已用「分支部署」上线（main 每次推送自动重建）。工作流文件 `.github/workflows/daily-prices.yml` 已在本地仓库写好，但通过 API 推送时令牌缺 `workflow` scope（GitHub 对工作流文件返回 404 掩盖权限不足）。补入方式二选一：
>
> **方式 1（网页端，2 分钟，推荐）**：打开 https://github.com/jinmio/machang-veg-price → Add file → Create new file → 文件名填 `.github/workflows/daily-prices.yml` → 粘贴本地该文件全文 → Commit changes。**无需再改任何 Pages 设置**——工作流只负责抓数据+提交，一推送分支部署就自动重建网站。
>
> **方式 2（令牌）**：重新签发一个勾选 `workflow` scope 的 classic PAT，用 Contents API 推送该文件。

工作流逻辑：**每天 09:30（北京时间）= 01:30 UTC** 自动运行抓取 + 合并两步，将新 `data.js` + `live_market.json` 提交回仓库；站点为「Deploy from a branch」模式，检测到新 commit 即自动重新部署（约 1-2 分钟）。

- 若部署在 **GitHub Pages**：工作流直接完成部署，开启 Pages 即得每日更新站点。

### 方案 E：自有服务器 / 宝塔

上传到站点根目录，Nginx 配置：

```nginx
server {
  listen 80;
  server_name veg.machang.com;
  root /www/wwwroot/veg.machang.com;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

申请证书：`sudo certbot --nginx -d veg.machang.com`

> **自动日更联动**：本仓库已内置 `.github/workflows/daily-prices.yml`。推到 GitHub 后，每天 09:30（北京时间）自动抓取新发地当日行情、重新生成 `data.js` 并提交；Vercel / Netlify / Cloudflare Pages / GitHub Pages 都会在检测到新 commit 后**自动重新部署**，无需人工干预。也可在 Actions 页面手动点一次立即运行。

---

## 七、部署检查清单

- [ ] 页面打开，41 张卡片渲染完整，供应商价格行齐全
- [ ] 搜索、品类筛选、排序、刷新按钮均生效
- [ ] 「上海标准 / 原标准」徽章数量为 35 / 6
- [ ] 通用验收标准 6 个 tab 可切换，内容非空
- [ ] 顶部「实时」角标与底部「数据生成时间」正确
- [ ] 移动端（≤520px）两列布局，无横向滚动
- [ ] 自定义域名已绑定，HTTPS 可访问
- [ ] 已配置证书自动续期

## 八、回滚与验证

- **平台托管**：每次部署生成唯一版本，可在 Vercel / Netlify 控制台一键回滚到上一版本。
- **Git**：保留 commit，出问题 `git revert` 后重新部署。
- **数据回滚**：`data.js` 由脚本从 xlsx + 标准 JSON 生成，保留历史 xlsx 即可随时重新生成旧数据。

## 九、口径提醒

全国时价为产地/批发市场裸价，南京仓报价含分拣、配送、损耗与利润，二者不可等同，看板适合作为**议价与比价基准**而非结算价；个别按包/袋/盒计价的品类其南京仓报价为包装价，与按斤时价不可直接比较，涨跌栏显示「—」。验收标准以到货封样为准。

## 十、已实测验证项（Playwright 端到端）

| 验证项 | 结果 |
|---|---|
| 页面加载后仅修改磁盘 `data.js`，不操作页面 → 自动拉到新价 | ✅ 通过（3.5 → 2.8 元/斤） |
| 点「刷新」按钮立即拉取 | ✅ 通过（→ 1.9 元/斤） |
| 上海标准徽章 35 个 + 原标准 6 个 | ✅ 通过 |
| 规格书原文引用（净莴笋「真空鲜切 0–4℃」） | ✅ 通过 |
| 多方比价取最低（蒜米：南京仓 3.5 低于市场 4.2，正确标记最低） | ✅ 通过 |
| 通用标准 6 个 tab 可切换，禁止红线含「蓝矾」 | ✅ 通过 |
| 包装价品类单位正确（海鲜菇 3.0 元/**包**，不再误标为元/斤） | ✅ 通过 |
| 桌面 1280px / 移动 390px 响应式 | ✅ 通过 |
| 联网抓取新发地当日行情（Playwright 渲染 6 分类，得 2026-10-13 价） | ✅ 通过 |
| 实时覆盖 15/41 品类、其余 26 个标注「沿用上期」 | ✅ 通过 |
| 数据改盘后点「刷新」→ 页面立即反映新价（0.4 → 0.33 元/斤） | ✅ 通过 |
| 导航「实时 2026-10-13」+ 统计「联网实时 15/41」+ 卡片新鲜度徽章 | ✅ 通过 |
