/* 马厂老火锅 · 蔬菜实时报价 前端逻辑 */
(function () {
  "use strict";

  // ---------- 数据 ----------
  var DATA = window.PRICE_DATA || { meta: {}, general: {}, items: [] };
  var meta = DATA.meta || {};
  var general = DATA.general || {};
  var items = DATA.items || [];

  var CAT_COLORS = {
    "叶菜类": "#2e9e5b", "根茎类": "#d97a1a", "菌菇类": "#a9764b", "瓜茄类": "#e0563b",
    "葱姜调味": "#c8941f", "香草香料": "#5aa86e", "豆蛋制品": "#6a8d3a", "水果类": "#d6447a",
    "其他": "#888"
  };
  var SUPPLIER_MAP = {};   // id -> {name, short, color}
  (meta.suppliers || []).forEach(function (s) { SUPPLIER_MAP[s.id] = s; });

  // ---------- 工具 ----------
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function fmt(n) { return n == null ? "—" : String(Math.round(n * 100) / 100); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function catColor(c) { return CAT_COLORS[c] || CAT_COLORS["其他"]; }
  function supInfo(id) { return SUPPLIER_MAP[id] || { name: id, short: id, color: "#888" }; }

  // ---------- 状态 ----------
  var state = { q: "", cat: "全部", sort: "default" };
  var lastFetchedAt = meta.generatedAt || "";

  // ---------- 顶部信息 ----------
  function renderMeta() {
    var lv = (meta.stats && meta.stats.liveCount) || 0;
    var tot = (meta.stats && meta.stats.total) || 0;
    document.getElementById("navDate").textContent = meta.liveDate ? ("实时 " + meta.liveDate) : (meta.priceDate ? "时价 " + meta.priceDate : "时价更新中");
    document.getElementById("priceMeta").textContent =
      (meta.quotePeriod ? meta.quotePeriod + " 报价基准 ·" : "") +
      (meta.priceDate ? " 全国时价 " + meta.priceDate : "") +
      (lv ? " · 联网实时 " + lv + "/" + tot : "") +
      (meta.standardSource ? " · 标准来源：" + meta.standardSource : "");
    document.getElementById("snapMeta").textContent =
      (meta.liveDate ? "行情更新于 " + meta.liveDate + " · " : "") +
      "新发地当日实时 " + lv + "/" + tot + " 品类，其余沿用上期参考价";
    document.getElementById("noteSource").textContent =
      "全国主要批发市场（农业农村部信息中心）及各地市场公开行情，单位统一为「元/斤」；时价日期：" + (meta.priceDate || "—");
    document.getElementById("noteStandard").textContent =
      "与上海规格书重合的品类采用上海标准（" + (meta.stats ? meta.stats.standardCovered : 0) + "/" +
      (meta.stats ? meta.stats.total : 0) + " 个），其余品类沿用原验收标准；具体以到货封样为准。";
    document.getElementById("disclaimer").textContent = "※ " + (meta.disclaimer || "");
    document.getElementById("stdMeta").textContent =
      "以下通用要求来自" + (meta.standardSource || "上海规格书") +
      (meta.standardVersion ? " " + meta.standardVersion : "") + "，适用于全部品类。";
    document.getElementById("footerMeta").textContent =
      "数据生成于 " + lastFetchedAt + " · 时价日期 " + (meta.priceDate || "—") +
      " · 每 " + (meta.refreshInterval || 300) + " 秒自动刷新 · 仅供内部核价与议价参考";
  }

  // ---------- 统计条 ----------
  function renderStats() {
    var grid = document.getElementById("statsGrid");
    grid.innerHTML = "";
    var comp = items.filter(function (i) { return i.delta != null; });
    var avg = comp.length ? comp.reduce(function (s, i) { return s + i.delta; }, 0) / comp.length : 0;
    var ref = items.filter(function (i) {
      return (i.prices || []).some(function (p) { return p.isRef; });
    }).length;
    var st = meta.stats || {};
    var liveFlag = (st.liveCount || 0) > 0;
    var cards = [
      { num: st.total || items.length, unit: " 品", label: "在售蔬菜品类" },
      { num: (st.standardCovered || 0) + "/" + (st.total || items.length), label: "上海标准覆盖" },
      { num: st.supplierCount || 1, unit: " 家", label: "在网供应商" },
      { num: meta.priceDate || "—", label: "全国时价日期" },
      { num: (st.liveCount || 0) + "/" + (st.total || 0), label: "联网实时更新", color: liveFlag ? "var(--down)" : undefined },
      { num: (avg > 0 ? "+" : "") + avg.toFixed(1) + "%", label: "时价较报价均涨跌", color: avg > 0 ? "var(--up)" : "var(--down)" },
      { num: ref, unit: " 品", label: "参考价品类" }
    ];
    cards.forEach(function (c) {
      var card = el("div", "stat-card");
      var num = el("div", "stat-num", esc(c.num) + (c.unit ? '<small>' + esc(c.unit) + "</small>" : ""));
      if (c.color) num.style.color = c.color;
      card.appendChild(num);
      card.appendChild(el("div", "stat-label", esc(c.label)));
      grid.appendChild(card);
    });
  }

  // ---------- 品类 chips ----------
  function renderChips() {
    var box = document.getElementById("chips");
    box.innerHTML = "";
    var cats = ["全部"];
    items.forEach(function (i) { if (cats.indexOf(i.category) < 0) cats.push(i.category); });
    cats.forEach(function (c) {
      var n = c === "全部" ? items.length : items.filter(function (i) { return i.category === c; }).length;
      var chip = el("button", "chip" + (state.cat === c ? " active" : ""), esc(c) + '<span class="cnt">' + n + "</span>");
      chip.type = "button";
      chip.setAttribute("role", "tab");
      chip.setAttribute("aria-selected", state.cat === c ? "true" : "false");
      chip.onclick = function () { state.cat = c; renderChips(); renderGrid(); };
      box.appendChild(chip);
    });
  }

  // ---------- 实时行情滚动条 ----------
  function renderTicker() {
    var track = document.getElementById("tickerTrack");
    if (!track) return;
    var list = items.slice().sort(function (a, b) {
      return (featuredValue(b) || 0) - (featuredValue(a) || 0);
    });
    function build() {
      return list.map(function (it) {
        var f = featuredPriceObj(it);
        var price = f ? (fmt(f.price) + " 元/" + esc(f.unit)) : "—";
        var d = it.delta;
        var cls = d == null ? "flat" : (d > 0 ? "up" : (d < 0 ? "down" : "flat"));
        var arrow = d == null ? "—" : (d > 0 ? "▲" : (d < 0 ? "▼" : "—"));
        var dTxt = d == null ? "不可比" : (d > 0 ? "+" : "") + d.toFixed(0) + "%";
        return '<span class="ticker-item ' + cls + '">' +
          '<span class="ticker-name">' + esc(it.name) + '</span>' +
          '<span class="ticker-price">' + price + '</span>' +
          '<span class="ticker-delta">' + arrow + ' ' + dTxt + '</span>' +
          '</span>';
      }).join("");
    }
    // 复制两份实现无缝循环滚动
    track.innerHTML = build() + build();
  }

  // ---------- 市场快照 ----------
  function renderSnapshot() {
    var ring = document.getElementById("coverageRing");
    var num = document.getElementById("coverageNum");
    var pct = document.getElementById("coveragePct");
    var st = meta.stats || {};
    var lv = st.liveCount || 0, tot = st.total || items.length;
    if (ring) {
      var p = tot ? Math.round(lv / tot * 100) : 0;
      ring.style.setProperty("--p", p);
      if (num) num.textContent = lv + "/" + tot;
      if (pct) pct.textContent = p + "%";
    }
    renderMovers("dropBars", -1);
    renderMovers("riseBars", 1);
  }
  function renderMovers(elId, dir) {
    var box = document.getElementById(elId);
    if (!box) return;
    var comp = items.filter(function (i) { return i.delta != null && i.delta !== 0; });
    if (!comp.length) { box.innerHTML = '<div class="bars-empty">暂无足够可比数据</div>'; return; }
    comp.sort(function (a, b) { return (dir > 0) ? (b.delta - a.delta) : (a.delta - b.delta); });
    var top = comp.slice(0, 5);
    var maxAbs = Math.max.apply(null, top.map(function (i) { return Math.abs(i.delta); }));
    box.innerHTML = top.map(function (i) {
      var w = maxAbs ? Math.max(8, Math.abs(i.delta) / maxAbs * 100) : 8;
      var cls = i.delta > 0 ? "bar-up" : "bar-down";
      var val = (i.delta > 0 ? "+" : "") + i.delta.toFixed(0) + "%";
      return '<div class="bar-row ' + cls + '">' +
        '<span class="bar-label" title="' + esc(i.name) + '">' + esc(i.name) + '</span>' +
        '<span class="bar-track"><span class="bar-fill" style="width:' + w.toFixed(0) + '%"></span></span>' +
        '<span class="bar-val">' + val + '</span>' +
        '</div>';
    }).join("");
  }

  // ---------- 过滤 + 排序 ----------
  function getVisible() {
    var q = state.q.trim().toLowerCase();
    var list = items.filter(function (i) {
      if (state.cat !== "全部" && i.category !== state.cat) return false;
      if (!q) return true;
      return (i.name + " " + i.sysName).toLowerCase().indexOf(q) >= 0;
    });
    var s = state.sort;
    list.sort(function (a, b) {
      var pa = featuredValue(a), pb = featuredValue(b);
      if (s === "priceAsc") return (pa || 0) - (pb || 0);
      if (s === "priceDesc") return (pb || 0) - (pa || 0);
      if (s === "drop") return (a.delta == null ? 1e9 : a.delta) - (b.delta == null ? 1e9 : b.delta);
      if (s === "rise") return (b.delta == null ? -1e9 : b.delta) - (a.delta == null ? -1e9 : a.delta);
      if (a.category !== b.category) return a.category.localeCompare(b.category, "zh");
      return (a.id || 0) - (b.id || 0);
    });
    return list;
  }
  // 主展示价：多方比价取最低（数据已在脚本端算好，自带单位与来源）
  function featuredPriceObj(it) {
    if (it.featured) return it.featured;
    var mkt = (it.prices || []).filter(function (p) { return p.supplier === "market"; })[0];
    return mkt || (it.prices && it.prices[0]) || null;
  }
  function featuredValue(it) {
    var f = featuredPriceObj(it);
    return f ? f.price : null;
  }

  // ---------- 卡片 ----------
  function deltaBadge(d) {
    if (d == null) return '<span class="delta na">— 不可比</span>';
    if (d > 0) return '<span class="delta up">▲ ' + d.toFixed(0) + "%</span>";
    if (d < 0) return '<span class="delta down">▼ ' + Math.abs(d).toFixed(0) + "%</span>";
    return '<span class="delta flat">— 持平</span>';
  }

  function renderSupplierRows(it) {
    var wrap = el("div", "sup-list");
    var feat = featuredPriceObj(it);
    var fUnit = feat ? feat.unit : null;
    var sameUnit = (it.prices || []).filter(function (p) { return fUnit && p.unit === fUnit && typeof p.price === "number"; });
    var maxP = sameUnit.length ? Math.max.apply(null, sameUnit.map(function (p) { return p.price; })) : 0;
    (it.prices || []).forEach(function (p) {
      var isBest = it.best && p.supplier === it.best.supplier && p.price === it.best.price;
      var info = supInfo(p.supplier);
      var row = el("div", "sup-row" + (isBest ? " best" : ""));
      var dot = el("span", "sup-dot");
      dot.style.background = info.color || "#888";
      row.appendChild(dot);
      row.appendChild(el("span", "sup-name", esc(p.label || info.name)));
      row.appendChild(el("span", "sup-price", fmt(p.price) + " 元/" + esc(p.unit)));
      if (isBest) row.appendChild(el("span", "sup-flag", "最低"));
      else if (p.isRef) row.appendChild(el("span", "sup-flag ref", "参考"));
      if (maxP && p.unit === fUnit) {
        var bar = el("span", "sup-bar");
        bar.style.width = Math.max(8, p.price / maxP * 100) + "%";
        row.appendChild(bar);
      }
      wrap.appendChild(row);
    });
    return wrap;
  }

  function renderStdPanel(it) {
    var s = it.standard || {};
    var panel = el("div", "std-panel");
    if (s.source === "上海标准") {
      var dl = el("dl");
      if (s.category3) { dl.appendChild(el("dt", null, "类目")); dl.appendChild(el("dd", null, esc(s.category3))); }
      if (s.packing) { dl.appendChild(el("dt", null, "包装规格")); dl.appendChild(el("dd", null, esc(s.packing))); }
      if (s.appearance) { dl.appendChild(el("dt", null, "感官规格")); dl.appendChild(el("dd", null, esc(s.appearance))); }
      if (s.acceptance) { dl.appendChild(el("dt", null, "验收标准")); dl.appendChild(el("dd", null, esc(s.acceptance))); }
      panel.appendChild(dl);
      panel.appendChild(el("span", "std-ref", "标准来源：" + esc(s.ref || "上海规格书")));
    } else {
      panel.appendChild(el("div", null, s.note ? esc(s.note) : "暂无验收标准"));
      panel.appendChild(el("span", "std-ref", "标准来源：马厂老火锅报价表（上海规格书未收录该品类）"));
    }
    panel.hidden = true;
    return panel;
  }

  function renderGrid() {
    var grid = document.getElementById("cardGrid");
    var empty = document.getElementById("emptyState");
    var list = getVisible();
    grid.innerHTML = "";
    empty.hidden = list.length !== 0;

    list.forEach(function (it) {
      var color = catColor(it.category);
      var card = el("article", "card");
      card.style.setProperty("--cat", color);
      card.appendChild(el("div", "card-ribbon " + (it.marketLive ? "live" : "carry"), it.marketLive ? "实时" : "沿用"));

      var top = el("div", "card-top");
      top.appendChild(el("span", "card-cat", esc(it.category)));
      var badges = el("div", "card-badges");
      var std = it.standard || {};
      badges.appendChild(el("span", "card-std" + (std.source === "上海标准" ? "" : " old"), std.source || "原标准"));
      if ((it.prices || []).some(function (p) { return p.isRef; })) badges.appendChild(el("span", "card-ref", "参考价"));
      top.appendChild(badges);
      card.appendChild(top);

      card.appendChild(el("h3", "card-name", esc(it.name)));
      var spec = (std.source === "上海标准" && std.packing) ? std.packing : it.sysName;
      card.appendChild(el("div", "card-spec", esc(spec)));

      var priceRow = el("div", "card-price");
      var feat = featuredPriceObj(it);
      priceRow.appendChild(el("span", "price-now",
        fmt(feat ? feat.price : null) + '<span class="unit">元/' + esc(feat ? feat.unit : it.unit) + "</span>"));
      var badgeWrap = el("span");
      badgeWrap.innerHTML = deltaBadge(it.delta);
      priceRow.appendChild(badgeWrap);
      card.appendChild(priceRow);

      // 主价格来源说明（多方比价取最低）
      if (feat) {
        var sup = supInfo(feat.supplier);
        card.appendChild(el("div", "price-cap",
          "取最低 · " + esc(feat.label || sup.name) + (feat.date ? "（" + esc(feat.date) + "）" : "")));
      }

      // 数据新鲜度标识：实时(新发地当日) / 沿用上期
      card.appendChild(el("div", "card-live " + (it.marketLive ? "live" : "carry"),
        (it.marketLive ? "● " : "○ ") + esc(it.marketNote || "")));

      card.appendChild(renderSupplierRows(it));

      var foot = el("div", "card-foot");
      var mkt = (it.prices || []).filter(function (p) { return p.supplier === "market"; })[0];
      foot.appendChild(el("span", "card-src", "来源：" + esc(mkt && mkt.note ? mkt.note : "—")));
      var btn = el("button", "std-toggle", "质量标准 ▾");
      btn.type = "button";
      var panel = renderStdPanel(it);
      btn.onclick = function () { panel.hidden = !panel.hidden; btn.textContent = panel.hidden ? "质量标准 ▾" : "收起 ▴"; };
      foot.appendChild(btn);
      card.appendChild(foot);
      card.appendChild(panel);

      grid.appendChild(card);
    });
  }

  // ---------- 通用验收标准 tabs ----------
  var STD_TABS = [
    { key: "basic", label: "基础通用" },
    { key: "temperature", label: "温区矩阵" },
    { key: "coldSensitive", label: "冷敏品类" },
    { key: "testing", label: "检测方案" },
    { key: "receiving", label: "收货验收" },
    { key: "prohibited", label: "禁止红线" }
  ];
  function renderStandards() {
    var tabs = document.getElementById("stdTabs");
    var panels = document.getElementById("stdPanels");
    tabs.innerHTML = ""; panels.innerHTML = "";
    STD_TABS.forEach(function (t, idx) {
      var rows = general[t.key] || [];
      if (!rows.length) return;
      var tab = el("button", "tab" + (idx === 0 ? " active" : ""), esc(t.label));
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.onclick = function () {
        tabs.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
        tab.classList.add("active");
        panels.querySelectorAll(".panel").forEach(function (x) { x.hidden = true; });
        var p = document.getElementById("panel-" + t.key);
        if (p) p.hidden = false;
      };
      tabs.appendChild(tab);

      var panel = el("div", "panel");
      panel.id = "panel-" + t.key;
      if (idx !== 0) panel.hidden = true;
      panel.appendChild(el("h3", null, esc(t.label)));

      if (t.key === "temperature") {           // 多列表格
        var head = rows[0];
        var tb = el("table", "mini-table");
        var thead = el("thead");
        var trh = el("tr");
        Object.keys(head).forEach(function (c) { trh.appendChild(el("th", null, esc(head[c]))); });
        thead.appendChild(trh); tb.appendChild(thead);
        var tbody = el("tbody");
        rows.slice(1).forEach(function (r) {
          var tr = el("tr");
          Object.keys(head).forEach(function (c) { tr.appendChild(el("td", null, esc(r[c] || ""))); });
          tbody.appendChild(tr);
        });
        tb.appendChild(tbody); panel.appendChild(tb);
      } else if (t.key === "prohibited") {      // 红线列表
        var rules = el("div", "rules");
        rows.slice(1).forEach(function (r) {
          var rule = el("div", "rule");
          rule.appendChild(el("span", "rule-no", esc(r["1"] || "")));
          var body = el("div", "rule-body");
          body.appendChild(el("b", null, esc(r["2"] || "")));
          body.appendChild(el("span", null, esc(r["3"] || "")));
          rule.appendChild(body);
          rules.appendChild(rule);
        });
        panel.appendChild(rules);
      } else {                                  // key/value
        var kv = el("div", "kv");
        rows.forEach(function (r) {
          var row = el("div", "kv-row");
          row.appendChild(el("span", "k", esc(r.k)));
          row.appendChild(el("span", "v", esc(r.v)));
          kv.appendChild(row);
        });
        panel.appendChild(kv);
      }
      panels.appendChild(panel);
    });
    if (!tabs.children.length) {
      document.getElementById("standards").hidden = true;
    }
  }

  // ---------- 实时刷新 ----------
  var timer = null;
  var prevGeneratedAt = meta.generatedAt || "";
  function setLive(loading) {
    var badge = document.getElementById("liveBadge");
    var text = document.getElementById("liveText");
    badge.classList.toggle("loading", !!loading);
    text.textContent = loading ? "更新中" : "实时";
    badge.title = "数据时间：" + lastFetchedAt;
  }
  function flashUpdated() {
    var badge = document.getElementById("liveBadge");
    var text = document.getElementById("liveText");
    badge.classList.remove("loading");
    badge.classList.add("updated");
    text.textContent = "已更新";
    setTimeout(function () { badge.classList.remove("updated"); setLive(false); }, 4000);
  }
  function fetchData(showBusy) {
    var btn = document.getElementById("refreshBtn");
    var prog = document.getElementById("progress");
    if (showBusy && btn) btn.classList.add("busy");
    if (prog) { prog.classList.add("active"); prog.style.width = "30%"; }
    setLive(true);
    return fetch("assets/data/data.js?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (txt) {
        var m = txt.match(/window\.PRICE_DATA\s*=\s*(\{[\s\S]*\})\s*;/);
        if (!m) throw new Error("bad data");
        var fresh = JSON.parse(m[1]);
        if (fresh && fresh.items && fresh.items.length) {
          var changed = (fresh.meta && fresh.meta.generatedAt) !== prevGeneratedAt;
          DATA.meta = fresh.meta; DATA.general = fresh.general || {}; DATA.items = fresh.items;
          meta = DATA.meta; general = DATA.general; items = DATA.items;
          SUPPLIER_MAP = {};
          (meta.suppliers || []).forEach(function (s) { SUPPLIER_MAP[s.id] = s; });
          lastFetchedAt = meta.generatedAt || lastFetchedAt;
          prevGeneratedAt = lastFetchedAt;
          if (prog) prog.style.width = "100%";
          renderAll();
          if (changed && !showBusy) flashUpdated();
        }
      })
      .catch(function () { /* 静态托管外/离线时静默保留内置数据 */ })
      .finally(function () {
        setLive(false);
        if (btn) btn.classList.remove("busy");
        if (prog) { prog.style.width = "100%"; setTimeout(function () { prog.classList.remove("active"); prog.style.width = "0"; }, 350); }
      });
  }
  function startAutoRefresh() {
    var sec = parseInt(meta.refreshInterval, 10) || 0;
    if (!sec || !window.fetch) return;
    if (timer) clearInterval(timer);
    timer = setInterval(function () { fetchData(false); }, sec * 1000);
  }

  // ---------- 事件 ----------
  function bind() {
    document.getElementById("searchInput").addEventListener("input", function () { state.q = this.value; renderGrid(); });
    document.getElementById("sortSelect").addEventListener("change", function () { state.sort = this.value; renderGrid(); });
    document.getElementById("refreshBtn").addEventListener("click", function () { fetchData(true); });
    var toTop = document.getElementById("toTop");
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () { toTop.hidden = window.scrollY < 400; }, { passive: true });
  }

  // ---------- 启动 ----------
  function renderAll() { renderMeta(); renderStats(); renderChips(); renderGrid(); renderStandards(); renderTicker(); renderSnapshot(); }
  if (!items.length) {
    document.getElementById("cardGrid").innerHTML = '<p class="empty">暂无数据，请确认 assets/data/data.js 已正确生成。</p>';
  } else {
    renderAll();
    bind();
    setLive(false);
    startAutoRefresh();
    // 首次进入时静默同步一次最新数据
    if (window.fetch) fetchData(false);
  }
})();
