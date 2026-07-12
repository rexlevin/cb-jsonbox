# Changelog

本文件记录项目的所有版本变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

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
