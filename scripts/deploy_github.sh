#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 马厂蔬菜报价 · 一键上线到 GitHub Pages（含每日自动更新）
#
# 前置：本机已登录 GitHub CLI
#   gh auth login            # 或先 export GH_TOKEN=<你的令牌>
#
# 用法：
#   bash scripts/deploy_github.sh [仓库名]
# 默认仓库名 machang-veg-price，默认建成【私有】仓库（报价数据建议私有）。
# ─────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

REPO="${1:-machang-veg-price}"

# 1) 检查登录
if ! gh auth status >/dev/null 2>&1; then
  echo "❌ 未登录 GitHub CLI。请先执行：gh auth login   （或 export GH_TOKEN=<令牌>）"
  exit 1
fi
OWNER="$(gh api user --jq '.login')"
echo "✅ 已登录：$OWNER"

# 2) 确保是 git 仓库且有提交
if [ ! -d .git ]; then git init -q; fi
if ! git rev-parse HEAD >/dev/null 2>&1; then
  git add -A
  git -c user.name="machang" -c user.email="dev@machang.local" commit -q -m "init: 马厂蔬菜实时报价看板"
fi

# 3) 创建私有仓库并推送（幂等：已存在则只关联远程并推送）
if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "ℹ️  仓库已存在：$OWNER/$REPO"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$OWNER/$REPO.git"
else
  gh repo create "$REPO" --private --source=. --remote=origin --push
fi
git push -u origin main

# 4) 开启 Actions 写权限（机器人需要提交 data.js 与部署）
gh api --method PUT "/repos/$OWNER/$REPO/actions/permissions" \
  -F enabled=true -f default_workflow_permissions=write >/dev/null \
  && echo "✅ 已开启 Actions 写权限"

# 5) 启用 Pages（构建来源 = GitHub Actions）
gh api --method POST "/repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null 2>&1 \
  && echo "✅ 已启用 GitHub Pages（Actions 构建）" \
  || echo "ℹ️  Pages 可能已启用，继续"

# 6) 立即触发一次每日更新工作流（首次抓取当天价格）
gh workflow run daily-prices.yml >/dev/null 2>&1 \
  && echo "🚀 已触发首次更新工作流（约 1~3 分钟完成抓取与部署）" \
  || echo "ℹ️  请稍后在 Actions 页面手动 Run workflow"

cat <<EOF

────────────────────────────────────────
🎉 上线动作已全部发出！
仓库：https://github.com/$OWNER/$REPO
站点：https://$OWNER.github.io/$REPO/   （首次工作流跑完后可访问）
之后每天北京时间 09:30 自动抓取新发地当日价并重新部署。
自定义域名：仓库 Settings → Pages → Custom domain 添加即可。
────────────────────────────────────────
EOF
