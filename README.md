# Little Things · 小事收藏室

私人图片收藏网站。首页是全屏图片组合，点击进入黑色背景的漂浮收藏；15 件物品各自缓慢移动、转动，支持点击放大。

## 当前完成度

- 已接入用户确认的全部 15 件素材，旧参考图片与参考站 Logo 已移除。
- 项链使用去链条版本；Miu Miu 包使用用户同意的补全版本。
- 桌面和手机独立排布；支持暂停动画、键盘 Escape 关闭大图、减少动态效果偏好。
- 纯 HTML / CSS / JavaScript，无需安装依赖或构建，无后端、账号、支付或数据库。
- 网页没有新增可见文案；图片中的原有品牌文字保留。

## 本地运行

在仓库根目录执行：

```sh
python3 -m http.server 3000 --bind 127.0.0.1 --directory dist
```

打开 <http://127.0.0.1:3000/>，漂浮页为 <http://127.0.0.1:3000/#collection>。

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
| `sources/originals/` | 15 件素材对应的原图 |
| `sources/processing.json` | AI 处理提示词、确认版本、已知差异和文件校验值 |
| `review/` | 已确认素材的原图对照页面 |
| `docs/HANDOFF.md` | 给后续开发者的交接说明 |
| `docs/STATUS.md` | 验证记录与发布状态 |
| `.openai/hosting.json` | 原有 Sites 站点标识与静态目录配置；不含凭证 |

当前网站：<https://little-things-memory-box.snowytide6.chatgpt.site>。访问权限沿用原站点设置，GitHub 仓库为私有。

GitHub 是代码与素材存档。推送 GitHub 不会自动发布到 Sites，发布流程见交接说明。仓库仅包含当前确认版本，旧参考素材和未选中的生成版本留在原本地归档。
