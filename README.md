# Little Things · 小事收藏室

私人图片收藏网站。首页是全屏图片组合，点击进入黑色背景的漂浮收藏；15 件物品各自缓慢移动、转动，支持点击放大。

## 当前完成度

- 已接入用户确认的全部 15 件素材，旧参考图片与参考站 Logo 已移除。
- 项链使用去链条版本；Miu Miu 包使用用户同意的补全版本。
- 桌面和手机独立排布；支持暂停动画、键盘 Escape 关闭大图、减少动态效果偏好。
- 纯 HTML / CSS / JavaScript，无需安装依赖或构建，无后端、账号、支付或数据库。
- 展示页没有新增可见文案；图片中的原有品牌文字保留。
- 独立的 `editor.html` 素材排版画布：拖动、缩放、调整图层、分别编辑电脑和手机、撤销、自动本地保存与 JSON 导入/导出。

## 自己调整排版

打开 [排版画布](https://little-things-memory-box.snowytide6.chatgpt.site/editor.html)，建议使用电脑。

点击或拖动素材；从左侧图层列表可以选中被挡住的素材。右下角控制点等比例缩放，右侧按钮调整前后图层。电脑与手机的位置和大小分别保存，图层顺序共用。

修改保存在当前浏览器，不会自动同步到其他设备或更改正式展示页。排好后点击「完成并导出」下载 JSON 文件，交回对话即可按这个布局更新正式网站；也可以复制布局文本。布局文件可以重新导入继续编辑。详见 [画布交接说明](docs/LAYOUT_EDITOR.md)。

## 本地运行

在仓库根目录执行：

```sh
python3 -m http.server 3000 --bind 127.0.0.1 --directory dist
```

打开 <http://127.0.0.1:3000/>，漂浮页为 <http://127.0.0.1:3000/#collection>，编辑器为 <http://127.0.0.1:3000/editor.html>。

查看原图和确认版本的对照：

```sh
python3 -m http.server 3001 --bind 127.0.0.1
```

打开 <http://127.0.0.1:3001/review/overview.html>。

## 文件位置

| 位置 | 内容 |
| --- | --- |
| `dist/` | 可直接部署的网站代码 |
| `dist/assets/` | 15 件确认后的透明 PNG |
| `dist/collection.js` | 素材路径、桌面与手机位置、尺寸和叠放顺序 |
| `dist/style.css` | 页面样式、漂浮轨迹、手机适配 |
| `dist/app.js` | 路由、动画参数、放大、菜单、暂停 |
| `dist/editor.html`、`editor.css`、`editor.js` | 独立的排版画布与交互 |
| `dist/layout-model.mjs` | 布局数据、导入校验及正式页面坐标转换 |
| `docs/LAYOUT_EDITOR.md` | 排版导出格式与后续应用方法 |
| `sources/originals/` | 15 件素材对应的原图 |
| `sources/processing.json` | AI 处理提示词、确认版本、已知差异和文件校验值 |
| `review/` | 已确认素材的原图对照页面 |
| `docs/HANDOFF.md` | 给后续开发者的交接说明 |
| `docs/STATUS.md` | 验证记录与发布状态 |
| `.openai/hosting.json` | 原有 Sites 站点标识与静态目录配置；不含凭证 |

已于 2026-10-16 更新上线。当前网站：<https://little-things-memory-box.snowytide6.chatgpt.site>。访问权限沿用原站点设置，GitHub 仓库为私有。

GitHub 是代码与素材存档。推送 GitHub 不会自动发布到 Sites，发布流程见交接说明。仓库仅包含当前确认版本，旧参考素材和未选中的生成版本留在原本地归档。

## 双城开场 Demo

[温哥华与高雄 Demo](https://little-things-memory-box.snowytide6.chatgpt.site/city-demo.html)：两张用户照片、当地时钟、时差和点击展开进入收藏。详见 `docs/CITY_DEMO.md`。原首页与排版编辑器保持独立。
