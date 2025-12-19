# Mortgage Payoff Calculator

一个功能强大的房贷还款计算器 Web 应用，帮助用户计算房贷还款时间、节省的利息，并支持多种导出格式。

## 项目目标

开发一个纯前端的 Mortgage Payoff Calculator，用户可以：
- 输入房贷参数（贷款金额、利率、期限等）
- 支持提前还款（一次性或定期额外还款）
- 支持不同还款频率（月付/双周付）
- 查看详细的计算结果（文字、表格、图表）
- 导出计算结果为 PDF、Excel 或图片格式
- 了解房贷相关术语和概念

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **导出**: jsPDF, html2canvas, xlsx
- **部署**: Vercel (免费方案)

## 项目结构

```
Mortgage_Payoff_Calculator/
├── app/                    # Next.js App Router 目录
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── ...
├── components/             # React 组件
│   ├── calculator/         # 计算器相关组件
│   ├── results/            # 结果展示组件
│   ├── glossary/           # 名词解释组件
│   └── ...
├── lib/                    # 工具函数和计算逻辑
│   ├── calculations.ts    # 房贷计算核心逻辑
│   └── export.ts          # 导出功能
├── types/                  # TypeScript 类型定义
└── public/                 # 静态资源

```

## 核心功能

### ✅ 已完成
- [x] 项目初始化和配置
- [x] 计算器输入界面（支持所有参数输入）
- [x] 计算结果展示（文字结论、表格、图表）
- [x] 导出功能（PDF、Excel、图片）
- [x] 名词解释模块（图文并茂）
- [x] SEO 优化（元数据、结构化数据）
- [x] UI/UX 设计优化（Apple 风格）

### 📋 功能特性
- ✅ 支持月付和双周付两种还款频率
- ✅ 支持一次性或定期额外还款
- ✅ 完整的还款明细表（Amortization Schedule）
- ✅ 多种可视化图表（折线图、柱状图、饼图）
- ✅ 三种导出格式（PDF、Excel、PNG 图片）
- ✅ 响应式设计，支持移动端
- ✅ 完整的 SEO 优化

## 开发规范

- 使用 TypeScript 确保类型安全
- 组件化设计，保持代码模块化
- 遵循 Next.js 14 最佳实践
- 响应式设计，支持移动端
- 代码注释清晰，便于理解

## 部署

项目将部署在 Vercel 免费方案上，支持即开即用，无需冷启动。

## 相关文档

- [项目介绍文档](./introduction.md) - 详细说明每个文件的作用和代码规则

