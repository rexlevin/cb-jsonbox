# Changelog

本文件记录项目的所有版本变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

## [0.0.8] - 2026-07-17

### chore | 维护 / Maintenance

升级版本号至 0.0.8，Electron 升级到 42.5.1

Bump version to 0.0.8, upgrade Electron to 42.5.1

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
