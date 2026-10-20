# 第三方设计与代码来源

更新：2026-10-20。已恢复静态改版前的三栏动态页面，开场与页脚署名继续移除。保留全部许可证和来源记录。

## 当前页面

### Motion 与 CodeSlots

`src/CodeSlots.jsx` / `.css` 基于用户提供的组件附件，原始副本保存在项目 `work/`。适配掩码输入、中文反馈、清理逻辑与减少动态设置。CodeSlots 仅详细资料页面通过动态导入加载；首页其他动态组件使用 Motion。未推断用户附件未注明的上游许可证。

Motion 14.1.0： https://github.com/motiondivision/motion ，许可证见 `public/licenses/Motion-LICENSE.md`。

### 设计研究

- Siteinspire：https://www.siteinspire.com/ ，查看页面与截图，参考图像优先、网格与清晰分类。
- Lapa Ninja：https://www.lapa.ninja/category/portfolio/ ，查看作品集案例列表，参考身份、项目、联系的访问路径。

本次自行实现页面布局与 CSS，未复制上述站点图片、代码或文案。

## 保留的历史来源

本次恢复加载 Firefly 适配样式、ParticleText、BlurText、SpotlightCard、内容入场、SplitFlapText、TargetCursor、SlingButton、BranchedMenu、NavDropdown、ProfileCard、PersonalPhotoCard、PatternWaves 和 HomeBackground。下文保留其历史来源和适配说明。GlitchText、ShapeWaves、AeroShards 和海景开场当前不加载。

### Firefly

- 上游：https://github.com/CuteLeaf/Firefly
- 历史核对版本：`91cbbefe53716e70b77ca9c41e27af10f5b27cab`
- MIT 完整许可证：`public/licenses/Firefly-LICENSE.txt`
- Copyright (c) 2024 saicaca
- Copyright (c) 2025 CuteLeaf

旧版参考 `src/styles/variables.styl`、`src/styles/layout-base.css`、`src/components/layout/PostCard.astro`、`src/layouts/MainGridLayout.astro`、`src/config/sidebarConfig.ts`、`src/config/displaySettingsConfig.ts` 和设置组件，转写了主题色、布局尺寸和配置交互，历史实现保留于 `src/firefly-adaptation.css`、`src/AppearanceSettings.jsx`、`src/siteConfig.js`、`src/NavDropdown.jsx`。旧版 HomePage 备份在项目 `work/practical-redesign-backup/`。没有迁入演示人物图片、音乐、文章、评论或统计服务。当前重新使用三栏适配布局；许可文件继续随发布产物保存，页面不显示来源条。

### React Bits

上游 https://github.com/DavidHDev/react-bits ，许可证 MIT + Commons Clause 原文见 `public/licenses/ReactBits-LICENSE.txt`。

- ParticleText：`src/components/reactbits/ParticleText.jsx` / `.css`，来自官方注册表 https://reactbits.dev/r/ParticleText-JS-CSS.json ，原始注册表和源码在项目 `work/`。曾用于导航粒子字，增加不可见/后台暂停和减少动态支持。
- BlurText、SpotlightCard：源于 https://reactbits.dev/r/BlurText-JS-CSS.json 和 https://reactbits.dev/r/SpotlightCard-JS-CSS.json ，快照在 `work/reactbits-study/`。历史版本适配中文、局部皮肤、减少动态与暂停机制。
- `useContentEntrance.js`：参考 https://www.reactbits.dev/animations/animated-content 的单次视口入场思路，以原生 Web Animations 和 IntersectionObserver 独立实现，未引入上游 GSAP。
- TextCursor：用户提供的 React Bits 组件源码，原用于开场。组件与样式已归档至 `work/retired-intro-2026-10-15/src/`，不随当前构建加载。

### 用户提供的其他视觉组件

用户原始附件副本保存在项目 `work/`；未推断附件未注明的组件许可证。

- GlitchText / SplitFlapText：历史标题及寄语，曾适配中文、可访问名称、屏幕外暂停与减少动态。
- TargetCursor / SlingButton：历史导航光标与快捷按钮；曾补充后台暂停、事件清理和键盘操作，SlingButton 使用 Motion。
- BranchedMenu / NavDropdown：历史展开菜单，适配 React、原生链接、受控当前页、焦点、方向键和减少动态；示例 Hugeicons 用现有 SVG 替代。
- ShapeWaves：保留 Inspired by https://vercel.com/labs 注释，曾适配 vgpu 的纹理类型与无 WebGPU 静态后备。
- ProfileCard / PersonalPhotoCard：历史全息倾斜与五张照片切换，适配本地图片、邮件入口和减少动态。
- AeroShards：历史背景，适配 React 与渲染失败后备，使用 vgpu。
- PatternWaves / HomeBackground：历史线条背景，适配 WebGL2 后备、上下文丢失、后台暂停及减少动态，使用 OGL。

vgpu 0.5.0：https://github.com/vercel-labs/vgpu ，MIT 全文见 `public/licenses/vgpu-LICENSE.txt`。
OGL 1.0.11：https://github.com/oframe/ogl ，包声明许可证为 Unlicense。
