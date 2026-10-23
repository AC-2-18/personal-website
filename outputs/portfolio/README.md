# 桂紫超 · 个人空间

React + Vite 个人网站。2026-10-20 按用户纠正恢复到静态改版之前的三栏动态版：全宽标题横幅、左侧人物与作品目录、中间内容、右侧日历与站点信息。开场视频和页脚 Firefly / MIT 署名仍按之前要求移除，许可证继续保留。

## 运行与构建

在本目录执行 `npm ci` 安装依赖，`npm run dev` 启动本地预览；`npm run build` 生成 dist，`npm run preview` 检查构建。本地默认 base 为 `/`；GitHub Pages 工作流根据站点配置自动注入 base，支持仓库子路径、用户主页和自定义域名根路径。本次仅准备发布配置，未执行部署。

免费上线的最少步骤、子路径预览和故障排查见 [GitHub Pages 发布说明](DEPLOYMENT.md)。

## 当前布局与动效

- PatternWaves 波浪线条背景，支持交互、后台暂停及减少动态。
- ParticleText 导航粒子字、BlurText 中文标题显现、英文渐入、SplitFlapText 翻页寄语。
- HeroActions / SlingButton 三个快捷入口，支持点击、键盘和拖动。
- PersonalPhotoCard / ProfileCard 人物卡片，保留倾斜柔光与五种表情切换。
- TargetCursor 导航吸附光标；SpotlightCard 中部柔光卡片；内容一次性入场。
- BranchedMenu 作品与个人菜单；日历翻月；独立中间项目、搜索、关于、联系和资料页面。

首页不再等待开场，不提供重播按钮，不加载 OceanIntro 或海景视频。没有恢复被用户否定的静态作品网格和 10-20 新搜索页。

## 维护入口

- src/HomePage.jsx：恢复的三栏布局、导航、侧栏与动态组件。
- src/home.css、src/firefly-adaptation.css、src/refined-motion.css：当前页面样式。
- src/HeroTypography.jsx、src/HeroActions.jsx、src/HomeBackground.jsx：标题、按钮、背景。
- src/CenterPages.jsx、src/center-pages.css：项目和搜索。
- src/ProfilePages.jsx、src/profile-pages.css：公开及密码资料。
- src/useCenterRoute.js：哈希路由；src/content.js：真实项目内容。
- public/assets：用户人物图与项目示意图；public/licenses 和 THIRD_PARTY.md：许可与来源记录。

src/portfolio.css 是被撤回的静态版样式，当前未导入。被撤回版本保存在项目根目录 work/static-version-before-restore/ 和既有备份，开场资源在 work/retired-intro-2026-10-15/，均不随 dist 发布。

## 内容与资料

设计师定位不变，技术项目作为跨领域作品。经历和指标沿用用户简历；概念作品与示意图有说明。私人资料继续使用现有 PBKDF2 + AES-GCM 加密与掩码输入，只发布 dist，不发布 work 或私人原文。六位密码是轻量访问限制，不等同于服务端认证。

## 恢复验证

构建通过；work/verify-restored-dynamic.cjs 在生产 /portfolio/ 子路径验证动画实际变化、寄语轮播、人物切换、弹弓入口、项目导航、搜索/联系/资料入口、移动菜单及减少动态。320/390/768/1024/1440/1920 下无横向溢出，资源正常，无脚本异常。报告 work/restored-dynamic-report.json。
