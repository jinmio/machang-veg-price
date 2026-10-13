// 本文件由 update_prices.py 自动生成，请勿手动编辑。
// 实时更新：运行 fetch_live_prices.py 抓取新发地当日行情 -> update_prices.py --live 重新生成并部署。
window.PRICE_DATA = {
  "meta": {
    "brand": "马厂老火锅",
    "title": "马厂老火锅 · 蔬菜实时报价",
    "subtitle": "南京仓蔬菜供应商 · 上海验收标准 · 多供应商比价",
    "quotePeriod": "2026年10月上半月",
    "priceDate": "2026-10-13",
    "liveDate": "2026-10-13",
    "liveCount": 15,
    "generatedAt": "2026-10-13 20:15",
    "standardSource": "上海·聚垒蔬菜商品技术规格书",
    "standardVersion": "v1.0（2026-09-26）",
    "unitNote": "时价与报价单位均为「元/斤」；个别按包/袋/盒计价的品类（如菌菇、娃娃菜、鹌鹑蛋）其南京仓报价为包装价，与按斤时价不可直接比较，涨跌栏显示为「—」。",
    "disclaimer": "全国时价为产地/批发市场裸价（新发地等批发市场公开行情，每日联网抓取），南京仓报价含分拣、配送、损耗与利润，二者不可等同，建议作为议价与比价基准；验收标准采用上海·聚垒蔬菜商品技术规格书。",
    "refreshInterval": 300,
    "suppliers": [
      {
        "id": "nanjing",
        "name": "南京仓·马厂报价",
        "short": "南京仓",
        "type": "门店到货价",
        "color": "#c8321f",
        "desc": "含分拣、配送、损耗与利润的到货价"
      },
      {
        "id": "market",
        "name": "全国批发时价",
        "short": "全国时价",
        "type": "市场行情",
        "color": "#ef6c1a",
        "desc": "产地/批发市场裸价，每日更新"
      }
    ],
    "stats": {
      "total": 41,
      "standardCovered": 35,
      "supplierCount": 2,
      "liveCount": 15
    }
  },
  "general": {
    "basic": [
      {
        "k": "供应商名称",
        "v": "聚垒蔬菜"
      },
      {
        "k": "产地",
        "v": "待各 SKU 填"
      },
      {
        "k": "执行标准",
        "v": "按品类：生鲜蔬菜 GB/T 字样企标、食用菌、蛋品、腌制品分别适用对应标准，净菜/去皮品不得套生鲜标"
      },
      {
        "k": "储存条件",
        "v": "见 ②.1 温度矩阵（分品类，非全 0–4℃）"
      },
      {
        "k": "保质期",
        "v": "叶菜 2–3 天／根茎 7–15 天／蛋品 15–30 天／食用菌 3–5 天／腌制品按标示"
      },
      {
        "k": "包装通用要求",
        "v": "包装完整密封、无产品外露；无外源性杂质污渍；标签日期清晰可辨"
      },
      {
        "k": "商品理化指标",
        "v": "农残须符合 GB 2762 / GB 2763（到货附检测报告）；净菜/去皮加工品须符合微生物限量（菌落总数/大肠菌群）；食用菌须符合 GB 2762 重金属（镉）限量；蛋品须符合兽药残留（氟苯尼考/恩诺沙星）及沙门氏菌"
      },
      {
        "k": "产品金探要求",
        "v": "鲜品（未加工）一般标注\"不适用\"；净菜/去皮加工品（去皮马蹄、去皮莴笋）建议上金属筛或金探排查金属异物"
      },
      {
        "k": "工艺流程",
        "v": "采收 → 预冷 → 分级 → 包装 → 入库 → 冷链发货（如与实际情况不符请改写）"
      }
    ],
    "temperature": [
      {
        "1": "位置",
        "2": "商品接收",
        "3": "贮存",
        "4": "运输车辆",
        "5": "销售"
      },
      {
        "1": "供应商",
        "2": "—",
        "3": "0–8℃",
        "4": "0–8℃ 冷链",
        "5": "—"
      },
      {
        "1": "大仓",
        "2": "-1–8℃",
        "3": "0–8℃",
        "4": "0–8℃ 冷链",
        "5": "—"
      },
      {
        "1": "门店",
        "2": "-1–8℃",
        "3": "0–8℃",
        "4": "—",
        "5": "0–8℃"
      }
    ],
    "coldSensitive": [
      {
        "k": "冷敏品类（建议温区）",
        "v": "适用 SKU"
      },
      {
        "k": "薯类/根茎调味 7–13℃（姜 13–15℃）",
        "v": "土豆(3)、生姜(14)、甜玉米(26)"
      },
      {
        "k": "茄果类 10–13℃",
        "v": "西红柿(24)、圣女果(25)、红彩椒(27)、青椒(21)"
      },
      {
        "k": "瓜类 10–13℃",
        "v": "小黄瓜(8)、小南瓜(16)、冬瓜(17)"
      },
      {
        "k": "柠檬/柑橘 10–13℃",
        "v": "黄柠檬(18)、小青橘(34)"
      }
    ],
    "testing": [
      {
        "k": "检测频次",
        "v": "每产地批次/每到货批附农残快检或送检报告；叶菜类（茼蒿/油麦菜/香菜/荷兰芹/茴香苗等）每批必检；基地轮换须重新送检"
      },
      {
        "k": "检测项目",
        "v": "农残：有机磷/拟除虫菊酯类（GB 2763 重点监控）；食用菌加测镉（GB 2762 食用菌限量）；蛋品加测氟苯尼考/恩诺沙星（兽药）及沙门氏菌；净菜/去皮品加测菌落总数/大肠菌群"
      },
      {
        "k": "判定与处置",
        "v": "任一项目超限即整批拒收、追溯来源、记录台账；连续 2 批不合格启动供应商再评估（触发退出机制）"
      }
    ],
    "receiving": [
      {
        "k": "温度",
        "v": "超出约定温区（按 ②.1 分品类）可拒收，立即换货；每车到货测温并记入验收记录表，温控断链须有温度记录仪数据举证"
      },
      {
        "k": "产品允收期",
        "v": "保质期内到货，逾期拒拒收（保质期见 ②.0，待补）"
      },
      {
        "k": "内容物",
        "v": "① 内包装无破损封口严密；② 感官性状符合 ① 表\"外观形态\"列；③ 无霉变、无可见异物；无破损涨袋"
      },
      {
        "k": "包装",
        "v": "内包装无破损封口严密；标签标识符合 GB 7718，生产日期按实际打印清晰正确"
      },
      {
        "k": "运输",
        "v": "不与有毒有害有异味物品混运；车辆洁净无异味定期消毒；到货附农残检测报告+产地合格证（纸质/PDF）"
      },
      {
        "k": "量化阈值",
        "v": "单品腐烂/霉变率 >3%，或黄叶/老梗 >5 片（以大包装计），或肉眼可见异物 → 判拒收；主观项（脆嫩/新鲜/香气）须以封样/标样为基准，无标样不得主观放行"
      },
      {
        "k": "散称规则",
        "v": "冬瓜/丝瓜/圣女果/西芹/荷兰芹/茴香苗等散称品按净重验收，允许短缺率 ≤2%（参照 JJF 1070）；定量包装净含量须符合定量包装商品计量要求"
      }
    ],
    "prohibited": [
      {
        "1": "#",
        "2": "红线",
        "3": "说明"
      },
      {
        "1": "1",
        "2": "禁止蓝矾（硫酸铜）浸泡保绿",
        "3": "小葱、香菜等葱类香草严禁泡蓝矾；到货加测硫酸铜残留"
      },
      {
        "1": "2",
        "2": "禁止违规保鲜剂/防腐剂",
        "3": "超出 GB 2760 许可范围与限量者禁用"
      },
      {
        "1": "3",
        "2": "禁止检出国家禁用农药",
        "3": "按 GB 2763 禁限用农药名单；农残须符合 GB 2763 限量"
      },
      {
        "1": "4",
        "2": "禁止回收/落地品回用、腐败变质品修剪混入",
        "3": "鲜货一经落地/腐败即废弃，不得回用"
      },
      {
        "1": "5",
        "2": "禁止绝对化/虚假宣称",
        "3": "\"无农残\"\"零添加\"\"无催熟剂\"等不可证实表述不得用于标签与对外宣传；须改为\"农药残留符合 GB 2763 限量\"\"不使用外源催熟（如适用）\"等合规表述"
      },
      {
        "1": "6",
        "2": "净菜/去皮/真空鲜切须合规",
        "3": "净菜/去皮品须符合微生物限量；真空鲜切（SKU47）须严格 0–4℃+短保+脱氧，否则降级普通冷藏净菜（厌氧菌/肉毒风险）"
      }
    ]
  },
  "items": [
    {
      "id": 1,
      "name": "平菇",
      "sysName": "平菇（1斤/包）",
      "unit": "斤",
      "category": "菌菇类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "食用菌",
        "packing": "2斤/盒",
        "appearance": "黑灰色，表皮光滑无破损，干燥不水",
        "acceptance": "含水多/破损/变色拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 5.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏南环桥/甘邦农/中卫/鄂黄商)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -30.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 3.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 3.5,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 2,
      "name": "大白菜",
      "sysName": "大白菜（按斤散称）",
      "unit": "斤",
      "category": "叶菜类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜叶菜",
        "packing": "4斤/包",
        "appearance": "外绿内白包心紧实，无烂叶虫眼冻伤黑心，2–4斤",
        "acceptance": "松散/冻伤黑心拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 1.6,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 0.4,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -75.0,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 0.4,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 0.4,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 3,
      "name": "小葱",
      "sysName": "香葱(直径0.5-0.8公分)2斤/包",
      "unit": "斤",
      "category": "葱姜调味",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(葱类)",
        "packing": "2斤/包",
        "appearance": "葱白根部干净无泥土，葱叶新鲜翠绿，葱白根部干净无泥土，葱叶新鲜翠绿",
        "acceptance": "不可泡蓝矾，烂叶发黄拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.8,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 4.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(中卫香葱/渝永川/苏/鄂)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -6.2,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 4.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 4.5,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 4,
      "name": "云南香菜",
      "sysName": "香菜（2斤/包）",
      "unit": "斤",
      "category": "葱姜调味",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(香草·高农残风险)",
        "packing": "2斤/包",
        "appearance": "无烂叶黄叶，根茎不老，≤30cm",
        "acceptance": "烂叶老根拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 5.2,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.75,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -66.3,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 1.75,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.75,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 5,
      "name": "小米辣(小米椒)",
      "sysName": "小米椒(红)1斤/包",
      "unit": "斤",
      "category": "葱姜调味",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(辣椒)",
        "packing": "2斤/包",
        "appearance": "鲜红光滑坚硬，无发黑腐烂，约10cm×0.8cm，不得使用重金属超标产品",
        "acceptance": "发黑/软腐/过短拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 6.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 8.0,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(中卫小米椒7-9)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": 23.1,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "nanjing",
        "price": 6.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 6.5,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 6,
      "name": "冬瓜",
      "sysName": "冬瓜（按斤散称）",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜瓜菜(散称)",
        "packing": "按斤散称",
        "appearance": "绿色去两头中段≥15cm整块，切口无腐烂发黄",
        "acceptance": "分段/切口腐烂/短于15cm拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 1.4,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 0.35,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -75.0,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 0.35,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 0.35,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 7,
      "name": "干生姜",
      "sysName": "生姜（1斤/包）",
      "unit": "斤",
      "category": "葱姜调味",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(调味)",
        "packing": "2斤/包",
        "appearance": "表皮干净无破损，无腐烂，不得使用硫磺熏制产品",
        "acceptance": "破损腐烂拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/中卫/滕/渝生姜)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -12.5,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 3.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 3.5,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 8,
      "name": "小南瓜(板栗南瓜)",
      "sysName": "板栗南瓜（按斤散称）",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜瓜菜",
        "packing": "2斤/包",
        "appearance": "老贝贝，外皮无破损腐烂，单果6–8两",
        "acceptance": "嫩瓜/超8两/破损拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 2.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 2.0,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(中卫/滕/遵义贝贝南瓜)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -20.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 2.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 2.0,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 9,
      "name": "金针菇",
      "sysName": "金针菇（400g/袋）",
      "unit": "斤",
      "category": "菌菇类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "食用菌",
        "packing": "2斤/包",
        "appearance": "白色不发黄发黏，袋内无水汽",
        "acceptance": "发黄发黏/水汽拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 3.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.0,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(中卫/亳/甘/渝/城阳金针菇)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": 0.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "nanjing",
        "price": 3.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 3.0,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 10,
      "name": "香菇",
      "sysName": "香菇（1斤/包）",
      "unit": "斤",
      "category": "菌菇类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "食用菌(干制)",
        "packing": "1斤/包",
        "appearance": "干制不水，菇头厚实，灰白",
        "acceptance": "含水/菇头薄拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 9.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 5.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(中卫/苏/亳/甘香菇)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -38.9,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 5.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 5.5,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 11,
      "name": "甜玉米",
      "sysName": "甜玉米（2斤/包）",
      "unit": "斤",
      "category": "豆蛋制品",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜果菜",
        "packing": "3斤/包",
        "appearance": "外皮青绿无破损，颗粒饱满",
        "acceptance": "皮黄/空粒拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 2.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 2.8,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(渝永川/苏/鄂甜玉米)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": 12.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "nanjing",
        "price": 2.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 2.5,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 12,
      "name": "鸡蛋",
      "sysName": "鸡蛋（3.6斤/板）",
      "unit": "斤",
      "category": "豆蛋制品",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "蛋品",
        "packing": "30枚/板(≈3.3斤)",
        "appearance": "蛋壳清洁完整无裂纹，蛋清浓稠、蛋黄凸起不散，无散黄臭蛋",
        "acceptance": "散黄/臭蛋/裂纹整板拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 6.3,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 4.6,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(京丰岳/亳/苏鸡蛋)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -27.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 4.6,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 4.6,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 13,
      "name": "海鲜菇",
      "sysName": "海鲜菇（250g/袋）",
      "unit": "包",
      "category": "菌菇类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "食用菌",
        "packing": "1斤/包",
        "appearance": "白色不发黄发黏，袋内无水汽",
        "acceptance": "发黄发黏/水汽拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 3.0,
          "unit": "包",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.8,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(城阳/遵义海鲜菇)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": null,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": null,
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 3.0,
        "unit": "包",
        "date": "10月上半月"
      }
    },
    {
      "id": 14,
      "name": "荷兰土豆",
      "sysName": "土豆（5斤/包）",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜根茎",
        "packing": "5斤/包",
        "appearance": "黄心土豆，单果4–6两不超1斤，圆不扁",
        "acceptance": "非黄心/扁/超1斤即拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 1.4,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.2,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/中卫/滕/渝黄心土豆)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -14.3,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 1.2,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.2,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 15,
      "name": "莴笋",
      "sysName": "莴笋（4斤/包）",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜茎菜",
        "packing": "5斤/包",
        "appearance": "翠绿，去叶后根茎35–45cm，径≥6cm，无空心腐烂",
        "acceptance": "空心/短于35cm/径<6cm拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 2.8,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.1,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -60.7,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 1.1,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.1,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 16,
      "name": "豆芽",
      "sysName": "小黄豆芽（2斤/包）",
      "unit": "斤",
      "category": "豆蛋制品",
      "standard": {
        "source": "原标准",
        "ref": "马厂老火锅报价表",
        "note": "豆芽:要小黄豆芽，不能散碎太多，无豆壳，无发黑腐烂"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 1.2,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 0.88,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -26.7,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 0.88,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 0.88,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 17,
      "name": "藕(莲藕)",
      "sysName": "莲藕（2斤/包）",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜根茎",
        "packing": "3斤/包",
        "appearance": "中段，藕孔无泥渍，外皮无损伤，无发黑",
        "acceptance": "非中段/带泥/发黑拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.3,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/中卫/滕/渝莲藕)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -17.5,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 3.3,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 3.3,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 18,
      "name": "薄皮青椒",
      "sysName": "薄皮青椒(优质)1斤/包",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜果菜",
        "packing": "2斤/包",
        "appearance": "薄皮皱褶翠绿有光泽，脆嫩，10–15cm，无虫眼",
        "acceptance": "虫眼/药斑/过长拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 2.6,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.7,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/中卫/滕/京丰青椒)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -34.6,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 1.7,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.7,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 19,
      "name": "油麦菜",
      "sysName": "油麦菜（2斤/包）",
      "unit": "斤",
      "category": "叶菜类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜叶菜(高农残风险)",
        "packing": "2斤/包",
        "appearance": "嫩绿挺拔无烂叶黄叶，25–35cm，无老梗冻伤",
        "acceptance": "黄叶老梗/冻伤拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 3.2,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.15,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -64.1,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 1.15,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.15,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 20,
      "name": "虫草菇",
      "sysName": "虫草菇（0.5斤/包）",
      "unit": "斤",
      "category": "菌菇类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "食用菌",
        "packing": "100g/包",
        "appearance": "金黄至浅橙，饱满不干瘪，无发霉，袋内干燥",
        "acceptance": "干瘪/发霉/水汽拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 5.3,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 5.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(遵义鲜虫草花/城阳虫草花)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": 3.8,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "nanjing",
        "price": 5.3,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 5.3,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 21,
      "name": "西红柿",
      "sysName": "西红柿（2斤/包）（0.5斤/个）",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜果菜",
        "packing": "2斤/包",
        "appearance": "鲜红均匀，单果3–5两，无破损腐烂",
        "acceptance": "青红不均/超5两/破损拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 2.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 2.3,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -8.0,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 2.3,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 2.3,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 22,
      "name": "柠檬",
      "sysName": "黄柠檬（1斤/包）",
      "unit": "斤",
      "category": "水果类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜果菜",
        "packing": "1斤/包",
        "appearance": "鲜黄饱满80–120g，无青斑软烂，表皮无损伤虫眼",
        "acceptance": "青斑软烂/虫眼拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 6.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 6.0,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": 0.0,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "nanjing",
        "price": 6.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 6.0,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 23,
      "name": "小黄瓜(水果黄瓜)",
      "sysName": "荷兰黄瓜1斤/包（长度在16-18公分左右）",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜瓜菜",
        "packing": "2斤/包",
        "appearance": "水果黄瓜16–18cm，翠绿脆嫩，外皮无破损腐烂",
        "acceptance": "过长/软腐/破损拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 7.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.75,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -50.0,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 3.75,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 3.75,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 24,
      "name": "杏鲍菇",
      "sysName": "小杏鲍菇（500克/包）",
      "unit": "袋",
      "category": "菌菇类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "食用菌",
        "packing": "1斤/包",
        "appearance": "大粗干，无发霉",
        "acceptance": "小/湿/发霉拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.3,
          "unit": "袋",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(甘/城阳/鄂/遵义杏鲍菇)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": null,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": null,
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 4.3,
        "unit": "袋",
        "date": "10月上半月"
      }
    },
    {
      "id": 25,
      "name": "白萝卜",
      "sysName": "白萝卜（2斤/包）",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜根茎",
        "packing": "3斤/包",
        "appearance": "纯白光滑，无破损腐烂，无空心黑心",
        "acceptance": "空心黑心/破损拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 1.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 0.8,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/中卫/滕/京丰白萝卜)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -46.7,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 0.8,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 0.8,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 26,
      "name": "山药",
      "sysName": "脆山药（日本白/新）",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜根茎",
        "packing": "3斤/包",
        "appearance": "外皮无腐烂，去皮后无发黑",
        "acceptance": "外皮腐烂/去皮发黑拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.5,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/亳/渝/鄂山药)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -12.5,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 3.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 3.5,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 27,
      "name": "苘蒿",
      "sysName": "蒿子秆(1斤/包)",
      "unit": "斤",
      "category": "叶菜类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜叶菜(高农残风险)",
        "packing": "2斤/包",
        "appearance": "嫩绿脆嫩无老梗，无烂叶黄叶，20–30cm，无空心",
        "acceptance": "黄叶老梗/空心拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.2,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 3.0,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(中卫/苏/亳/京丰茼蒿)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -28.6,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 3.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 3.0,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 28,
      "name": "娃娃菜",
      "sysName": "娃娃菜（3个/袋）",
      "unit": "包",
      "category": "叶菜类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜叶菜",
        "packing": "3个/包",
        "appearance": "春耕高山黄娃娃菜，外皮无破损腐烂",
        "acceptance": "破损腐烂拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 5.0,
          "unit": "包",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 0.65,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": null,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": null,
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 5.0,
        "unit": "包",
        "date": "10月上半月"
      }
    },
    {
      "id": 29,
      "name": "鱼腥草",
      "sysName": "鱼腥草（1斤/包）",
      "unit": "斤",
      "category": "香草香料",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(香草)",
        "packing": "1斤/包",
        "appearance": "嫩白根茎折段脆嫩，无发黑霉变泥沙，自然气味",
        "acceptance": "发黑/泥沙/异味拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 7.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 5.0,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(鄂折耳根/遵义折耳根)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -28.6,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 5.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 5.0,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 30,
      "name": "生鹌鹑蛋",
      "sysName": "生鹌鹑蛋（20颗/盒）",
      "unit": "盒",
      "category": "豆蛋制品",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "蛋品",
        "packing": "24枚/盒",
        "appearance": "斑纹清晰完整无裂纹，摇之不散黄，≈0.56–0.6斤/盒",
        "acceptance": "裂纹/散黄/超出厂7日拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.0,
          "unit": "盒",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 5.5,
          "unit": "斤",
          "date": "",
          "note": "近期批发市场参考(无10-12逐品公开价)",
          "isRef": true,
          "isLive": false
        }
      ],
      "delta": null,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": null,
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 4.0,
        "unit": "盒",
        "date": "10月上半月"
      }
    },
    {
      "id": 31,
      "name": "生菜",
      "sysName": "生菜（5斤/包）",
      "unit": "斤",
      "category": "叶菜类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜叶菜",
        "packing": "5斤/包",
        "appearance": "高山大叶生菜，无烂叶黄叶，整颗13–20cm",
        "acceptance": "烂叶/黄叶/超长即拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 3.3,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.57,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -52.4,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 1.57,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.57,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 32,
      "name": "黄瓜",
      "sysName": "黄瓜（2斤/包）",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "原标准",
        "ref": "马厂老火锅报价表",
        "note": "黄瓜:要求，长，直，绿，脆，长度在35公分左右，外皮无破损腐烂"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 2.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 2.0,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": 0.0,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "nanjing",
        "price": 2.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 2.0,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 33,
      "name": "薄荷叶",
      "sysName": "薄荷叶0.5斤/包",
      "unit": "斤",
      "category": "香草香料",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(香草)",
        "packing": "100g/包",
        "appearance": "翠绿完整香浓，无枯黄烂叶杂质",
        "acceptance": "枯黄烂叶拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 8.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 7.0,
          "unit": "斤",
          "date": "",
          "note": "近期批发市场参考(香草类无当日公开逐品)",
          "isRef": true,
          "isLive": false
        }
      ],
      "delta": -12.5,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 7.0,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 7.0,
        "unit": "斤",
        "date": ""
      }
    },
    {
      "id": 34,
      "name": "清香草",
      "sysName": "清香木",
      "unit": "盒",
      "category": "香草香料",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜香辛(香草)",
        "packing": "50g/盒",
        "appearance": "青翠清香，无枯黄腐烂虫卵，整齐",
        "acceptance": "枯黄虫卵拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 6.0,
          "unit": "盒",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 6.0,
          "unit": "斤",
          "date": "",
          "note": "近期批发市场参考(香草类无当日公开逐品)",
          "isRef": true,
          "isLive": false
        }
      ],
      "delta": null,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": null,
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 6.0,
        "unit": "盒",
        "date": "10月上半月"
      }
    },
    {
      "id": 35,
      "name": "毛豆",
      "sysName": "毛豆（1斤/包）",
      "unit": "斤",
      "category": "豆蛋制品",
      "standard": {
        "source": "原标准",
        "ref": "马厂老火锅报价表",
        "note": ""
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.0,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 2.8,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/鄂/遵义毛豆)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -30.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 2.8,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 2.8,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 36,
      "name": "千张",
      "sysName": "千张（2斤/包）",
      "unit": "斤",
      "category": "豆蛋制品",
      "standard": {
        "source": "原标准",
        "ref": "马厂老火锅报价表",
        "note": ""
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 4.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 4.5,
          "unit": "斤",
          "date": "",
          "note": "近期批发市场参考(豆制品无当日公开逐品)",
          "isRef": true,
          "isLive": false
        }
      ],
      "delta": 0.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "nanjing",
        "price": 4.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 4.5,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 37,
      "name": "蒜米",
      "sysName": "蒜米-YGC",
      "unit": "斤",
      "category": "葱姜调味",
      "standard": {
        "source": "原标准",
        "ref": "马厂老火锅报价表",
        "note": "蒜米:无水去皮蒜米，包装完好，袋内无水无腐烂"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 3.5,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 4.2,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/亳/滕/渝去皮蒜)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": 20.0,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "nanjing",
        "price": 3.5,
        "unit": "斤"
      },
      "featured": {
        "supplier": "nanjing",
        "label": "南京仓报价",
        "price": 3.5,
        "unit": "斤",
        "date": "10月上半月"
      }
    },
    {
      "id": 38,
      "name": "胡萝卜",
      "sysName": "胡萝卜（1斤/包）",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜根茎",
        "packing": "2斤/包",
        "appearance": "广红品种，光滑无破损腐烂",
        "acceptance": "非广红/破损拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 1.6,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 0.9,
          "unit": "斤",
          "date": "2026-10-12",
          "note": "全国批发市场2026-10-12(苏/中卫/滕/京丰胡萝卜)",
          "isRef": false,
          "isLive": false
        }
      ],
      "delta": -43.8,
      "marketLive": false,
      "marketNote": "新发地今日未收录 · 沿用上期",
      "best": {
        "supplier": "market",
        "price": 0.9,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 0.9,
        "unit": "斤",
        "date": "2026-10-12"
      }
    },
    {
      "id": 39,
      "name": "圣女果",
      "sysName": "圣女果（按斤散称）",
      "unit": "斤",
      "category": "瓜茄类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "生鲜果菜(散称)",
        "packing": "2斤/包",
        "appearance": "圆润红亮皮薄肉嫩汁多，无裂果软烂，散称",
        "acceptance": "裂果软烂拒收"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 5.4,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 5.25,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -2.8,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 5.25,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 5.25,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 40,
      "name": "净莴笋",
      "sysName": "净莴笋2斤/包",
      "unit": "斤",
      "category": "根茎类",
      "standard": {
        "source": "上海标准",
        "ref": "上海·聚垒蔬菜商品技术规格书 v1.0（2026-09-26）",
        "category3": "净菜/去皮加工(真空)",
        "packing": "2斤/包",
        "appearance": "翠绿，真空包装，无空心腐烂",
        "acceptance": "真空鲜切高风险：须严格0–4℃+短保+脱氧，否则降级普通冷藏净菜；建议补微生物标准"
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 3.3,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 1.1,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -66.7,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 1.1,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 1.1,
        "unit": "斤",
        "date": "2026-10-13"
      }
    },
    {
      "id": 41,
      "name": "红心火龙果",
      "sysName": "红心火龙果（按斤称重）",
      "unit": "斤",
      "category": "水果类",
      "standard": {
        "source": "原标准",
        "ref": "马厂老火锅报价表",
        "note": ""
      },
      "prices": [
        {
          "supplier": "nanjing",
          "label": "南京仓报价",
          "price": 5.9,
          "unit": "斤",
          "date": "10月上半月",
          "note": "",
          "isRef": false
        },
        {
          "supplier": "market",
          "label": "全国批发时价",
          "price": 4.75,
          "unit": "斤",
          "date": "2026-10-13",
          "note": "新发地",
          "isRef": false,
          "isLive": true
        }
      ],
      "delta": -19.5,
      "marketLive": true,
      "marketNote": "新发地 2026-10-13",
      "best": {
        "supplier": "market",
        "price": 4.75,
        "unit": "斤"
      },
      "featured": {
        "supplier": "market",
        "label": "全国批发时价",
        "price": 4.75,
        "unit": "斤",
        "date": "2026-10-13"
      }
    }
  ]
};
