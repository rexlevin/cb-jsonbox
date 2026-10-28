# Changelog

本文件记录项目的所有版本变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

## [0.1.2] - 2026-10-28

### feat | 新功能 / Features

底栏新增排序按钮，支持原始、key 升序、key 降序三态循环，图标与提示随状态变化
排序递归作用于嵌套对象，数组顺序不变，并保留原文缩进与单行紧凑格式
排序状态按标签页独立保存，关闭 APP 后重新打开按上次状态显示
空内容或非法 JSON 时给出提示，不改变当前排序状态

Added a footer sort button cycling through original, key ascending, and key descending states with state-specific icon and tooltip
Sorting applies recursively to nested objects while preserving array order, indentation, and compact single-line format
Each tab keeps its own sort state, restored on next launch
Shows a notice for empty or invalid JSON without changing the current sort state

### refactor | 重构 / Refactoring

将系统原生通知替换为应用内通知，移除主进程与预加载脚本中的原生通知代码

Replaced native system notifications with in-app notifications and removed native notification code from main and preload scripts

### build | 构建 / Build

版本号更新至 0.1.2

Bumped version to 0.1.2

## [0.1.1] - 2026-10-27

### docs | 文档 / Documentation

更新 json.yaml.js 文件的作者信息

Updated author information in json.yaml.js

### refactor | 重构 / Refactoring

新建标签页快捷键由 Ctrl+T 改为 Ctrl+N

Changed the new tab shortcut from Ctrl+T to Ctrl+N

### build | 构建 / Build

调整依赖分类：渲染层依赖（monaco-editor、vue、element-plus 等）移入 devDependencies，仅保留 nanoid 作为运行时依赖
发布包体积显著减小：app.asar 由约 156MB 降至约 6.5MB，发布 zip 由约 33MB 降至约 2.4MB
package.json 新增 displayName 字段

Adjusted dependency classification: moved renderer dependencies (monaco-editor, vue, element-plus, etc.) to devDependencies, keeping only nanoid as a runtime dependency
Significantly reduced release package size: app.asar from ~156MB to ~6.5MB, release zip from ~33MB to ~2.4MB
Added displayName field to package.json

## [0.1.0] - 2026-10-23

### feat | 新功能 / Features

新增标签页切换快捷键：Ctrl+Tab / Ctrl+Shift+Tab、Ctrl+PageDown / Ctrl+PageUp 切换到下一个/上一个标签
新增标签页排序快捷键：Ctrl+Shift+PageDown / Ctrl+Shift+PageUp 后移/前移当前标签
设置入口快捷键由 Alt+S 调整为 Ctrl+,，并为设置按钮添加 tooltip 提示

Added tab switching shortcuts: Ctrl+Tab / Ctrl+Shift+Tab and Ctrl+PageDown / Ctrl+PageUp to switch to next/previous tab
Added tab reordering shortcuts: Ctrl+Shift+PageDown / Ctrl+Shift+PageUp to move current tab backward/forward
Changed the settings shortcut from Alt+S to Ctrl+, and added a tooltip to the settings button

### build | 构建 / Build

.canbox-app 配置新增 category 字段

Added category field to .canbox-app config

## [0.0.9] - 2026-09-22

### feat | 新功能 / Features

持久化保存窗口缩放因子，启动时自动恢复上次设置的缩放比例

Persist window zoom factor across sessions and restore on startup

### fix | 问题修复 / Bug Fixes

锁定 electron 版本为 42.5.1，避免版本范围导致的依赖解析问题

Lock electron version to 42.5.1 to avoid dependency resolution issues from version ranges

### ci | 持续集成 / Continuous Integration

优化CI构建的npm和Electron镜像源选择逻辑，自动选用最快源

Optimize CI build npm and Electron mirror source selection logic to automatically choose the fastest source

## [0.0.8] - 2026-07-18

### feat | 新功能 / Features

添加 .canbox-app 配置文件，声明 APP 类型和 Electron 版本范围，支持 Electron 多版本管理

Add .canbox-app config file declaring app type and Electron version range, supporting Electron multi-version management

### chore | 维护 / Maintenance

Electron 从 41.2.1 升级到 42.5.1

Upgrade Electron from 41.2.1 to 42.5.1

## [0.0.7] - 2026-07-15

### feat | 新功能 / Features

添加编辑器字体缩放快捷键（Ctrl++/-/0）
优化设置页面体验
添加界面整体缩放快捷键（Ctrl++/-/0），缩放作用于整个界面而非仅编辑器

Add editor font zoom shortcuts (Ctrl++/-/0)
Improve settings page experience
Add full-interface zoom shortcuts (Ctrl++/-/0), zoom applies to entire UI instead of editor only

### fix | 问题修复 / Bug Fixes

修复 GitHub Release 页面不显示 CHANGELOG 内容的问题

Fix GitHub Release page not showing CHANGELOG content

### refactor | 重构 / Refactoring

将设置页面改为弹层对话框，外部链接改用系统浏览器打开

Convert settings page to a modal dialog, open external links in system browser

### style | 样式 / Styling

为 JsonBox 组件添加标签页样式

Add tab styling for JsonBox component

## [0.0.6] - 2026-07-12

### feat | 新功能 / Features

迁移到 canbox 新架构，基于 canbox-core 注入机制运行
增加定期兜底保存和关闭超时机制，防止数据丢失
使用 keep-alive 包裹 router-view 实现组件缓存

Migrate to canbox new architecture, running on canbox-core injection mechanism
Add periodic fallback save and close timeout mechanism to prevent data loss
Wrap router-view with keep-alive for component caching

### chore | 维护 / Maintenance

移除未使用的构建配置文件和自定义 UI 样式库
更新项目版本至 0.0.6 并重构资源文件结构

Remove unused build config files and custom UI style library
Update project version to 0.0.6 and refactor resource file structure

### build | 构建 / Build

添加 electron-builder 构建配置和 GitHub release workflow

Add electron-builder config and GitHub release workflow