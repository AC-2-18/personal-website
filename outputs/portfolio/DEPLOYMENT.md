# GitHub Pages 免费静态发布

当前 Git 远端为 `AC-2-18/personal-website`，默认地址预计为 <https://ac-2-18.github.io/personal-website/>。此地址是按仓库名称推导的目标地址，不代表已上线。本次仅修改本地配置，未推送、未修改 GitHub 设置、未执行部署。

## 上线前最少步骤

1. 使用 GitHub Free 时确认仓库为 **Public**，然后自行将本次文件变更提交并推送到默认分支（当前为 `main`）。保留项目根目录的 `.github/workflows/pages.yml` 和 `outputs/portfolio/` 目录结构；不用提交 `dist` 或 `node_modules`。
2. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。无需添加另一份模板工作流，无需购买域名或配置个人访问令牌。
3. 打开 **Actions → Deploy portfolio to GitHub Pages → Run workflow**，选择默认分支 `main` 并运行。等待 `build` 与 `deploy` 都成功，使用部署任务显示的站点地址访问。

后续更新仍需推送后手动运行工作流。没有 `push` 触发器；选择非默认分支时任务会跳过。如果仓库禁用了 Actions，先在仓库设置中启用并允许工作流所使用的官方 `actions/*`。

## 配置与目录

| 项目 | 配置 |
| --- | --- |
| 工作流位置 | 仓库根目录 `.github/workflows/pages.yml` |
| 安装、构建目录 | `outputs/portfolio` |
| 环境与安装 | Node.js 24，`npm ci`，锁定 `package-lock.json` |
| 构建命令 | `npm run build` |
| 唯一上传目录 | `outputs/portfolio/dist` |
| 发布方式 | 官方 Pages artifact + deploy-pages，无需 `gh-pages` 分支 |
| 权限 | 构建读取代码与 Pages 配置；部署使用 `pages: write`、`id-token: write` |
| 部署环境 | `github-pages`；串行部署，不中断正在进行的部署 |

`configure-pages` 在构建前读取站点配置，将 `base_path` 通过环境变量 `PAGES_BASE_PATH` 传给 Vite。配置统一补齐开头、结尾的 `/`：

- 当前项目站点：`/personal-website/`。
- `<用户名>.github.io` 用户主页仓库：`/`。
- 在 Pages 设置好自定义域名的根站点：`/`，更改域名后需重新运行工作流。
- 本地未设置环境变量：`/`。

现有图片和资料请求使用 `import.meta.env.BASE_URL`，随构建路径一起更新。页面使用 `#project/...` 等哈希路由，刷新和直达链接仍请求同一个 `index.html`，不需要服务器重写或复制 `404.html`。`public/` 中的资源随构建复制到 `dist`；过程材料 `work/` 不在上传范围内。

## 本地检查（PowerShell）

在仓库根目录运行：

```powershell
npm --prefix outputs/portfolio ci
$env:PAGES_BASE_PATH = '/personal-website/'
npm --prefix outputs/portfolio run build
npm --prefix outputs/portfolio run preview -- --port 4173
```

打开 <http://127.0.0.1:4173/personal-website/>，检查图片、作品详情、搜索与刷新。`preview` 与构建应使用相同的环境变量。预览完按 Ctrl+C，再清理该终端的变量：

```powershell
Remove-Item Env:PAGES_BASE_PATH -ErrorAction SilentlyContinue
```

需要恢复根路径产物时重新执行 `npm --prefix outputs/portfolio run build`。该变量在构建时生效，不能只改变预览地址来修改已生成的资源路径。

## 常见问题

- **configure-pages 找不到站点**：先完成 Settings → Pages → GitHub Actions。本工作流不会代为启用 Pages。
- **部署被环境规则拦截**：检查 `github-pages` 环境是否允许默认分支，是否有待处理的人工批准。
- **资源 404**：确认访问工作流给出的完整地址（含仓库子路径），更改仓库名或域名后重新构建部署。
- **工作流不显示**：确认文件已推送到默认分支，且 `.github` 位于仓库根目录。

## 官方依据

本地验证（2026-10-23）：按锁文件执行 `npm ci` 成功；`/` 与 `/personal-website/` 两种构建通过，并在严格按路径提供文件的本地静态服务器上用无头 Chrome 验证了 HTML 资源、图片、作品详情刷新、搜索、资料入口、加密静态文件及许可证访问，无脚本异常或 HTTP 资源错误。当前本地 `dist` 为 `/personal-website/` 版本。未运行 GitHub Actions，远端权限、Pages 设置与实际部署结果需在首次手动部署时确认。

- [Vite 静态部署与 GitHub Pages base 配置](https://vite.dev/guide/static-deploy#github-pages)
- [GitHub Pages 自定义工作流、权限与免费公开仓库支持](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
