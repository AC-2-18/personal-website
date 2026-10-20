# 桂紫超 · 个人网站

个人作品集与设计、技术探索空间，使用 React + Vite。

当前采用三栏动态页面，包含波浪背景、动态标题、翻页寄语、人物卡片、作品详情、搜索及联系方式。已移除开场动画。

## 本地运行

```bash
cd outputs/portfolio
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

## 项目目录

- `outputs/portfolio/`：网站源码、公开素材和运行说明。
- `outputs/portfolio/THIRD_PARTY.md`：第三方组件与许可证记录。
- `outputs/portfolio/ASSETS.md`：素材与内容来源说明。
- `.github/workflows/pages.yml`：手动触发的 GitHub Pages 工作流，本次上传不自动部署。

原始素材、简历、过程记录、备份、本地依赖和构建缓存不纳入仓库。`public/profile.sealed.json` 为既有的加密资料文件，仓库不包含其明文或访问密码。

人物经历及工程项目依据本人提供的资料；概念作品、工程示意图与真实项目有明确区分。第三方许可见 `outputs/portfolio/public/licenses/`。
