# 项目文件介绍文档

这个文档会详细解释项目中每个文件的作用，以及代码的写法和规则。我会用通俗易懂的语言，帮助你理解整个项目。

## 📁 项目整体结构

这个项目是一个 **Mortgage Payoff Calculator（房贷还款计算器）**，简单来说就是一个网页工具，帮助人们计算房贷需要还多久、能省多少钱。

### 为什么选择 Next.js？

- **Next.js** 是一个基于 React 的框架，可以快速构建网页
- 它支持 **静态生成**，意味着网页可以提前生成好，用户打开时不需要等待服务器启动（即开即用）
- **Vercel** 是 Next.js 的创建者，部署非常方便，免费方案也很好用
- 对 **SEO（搜索引擎优化）** 很友好，更容易被 Google 等搜索引擎找到

---

## 📂 主要文件夹说明

### `/app` 文件夹
这是 Next.js 14 的核心文件夹，所有页面和路由都在这里。

**规则**：
- 每个文件夹代表一个网页路径
- `page.tsx` 文件就是显示在浏览器中的页面内容
- `layout.tsx` 文件定义页面的整体布局（比如导航栏、页脚）

**例子**：
- `/app/page.tsx` → 网站的首页（网址是 `/`）
- `/app/about/page.tsx` → 关于页面（网址是 `/about`）

### `/components` 文件夹
这里存放所有的 **组件**（Component）。

**什么是组件？**
组件就像积木块，每个组件负责一个功能。比如：
- 一个输入框组件
- 一个按钮组件
- 一个图表组件

**规则**：
- 每个组件放在独立的文件中
- 组件名用大写字母开头（比如 `Calculator.tsx`）
- 组件可以重复使用，就像乐高积木可以拼出不同的东西

**例子**：
- `Calculator.tsx` - 计算器输入界面
- `ResultsTable.tsx` - 结果显示表格
- `Chart.tsx` - 图表展示

### `/lib` 文件夹
这里存放 **工具函数**，就是一些可以重复使用的代码逻辑。

**规则**：
- 这些函数不直接显示在页面上，而是被其他组件调用
- 比如计算房贷的逻辑、导出文件的逻辑等

**例子**：
- `calculations.ts` - 房贷计算的核心算法
- `export.ts` - 导出 PDF、Excel 的功能

### `/types` 文件夹
这里存放 **TypeScript 类型定义**。

**什么是类型？**
TypeScript 是 JavaScript 的增强版，可以定义数据的"形状"。比如：
- 一个数字（number）
- 一个字符串（string）
- 一个对象，包含哪些属性

**规则**：
- 用 `.ts` 文件定义类型
- 类型名通常用大写字母开头
- 这样写代码时，编辑器会提示你，避免出错

**例子**：
```typescript
// 定义房贷参数的类型
type MortgageParams = {
  loanAmount: number;      // 贷款金额（数字）
  interestRate: number;    // 利率（数字）
  loanTerm: number;        // 贷款期限（数字）
}
```

### `/public` 文件夹
这里存放 **静态资源**，比如图片、图标等。

**规则**：
- 这些文件可以直接通过网址访问
- 比如 `/public/logo.png` 可以通过 `/logo.png` 访问

---

## 📝 代码写法规则

### 1. 组件写法（React）

```typescript
// 这是一个简单的组件例子
export default function Calculator() {
  return (
    <div>
      <h1>房贷计算器</h1>
      {/* 这里是组件的内容 */}
    </div>
  );
}
```

**规则**：
- 组件名用大写字母开头
- 使用 `export default` 导出，这样其他文件可以导入使用
- 返回的内容用 `return` 和括号包裹
- 使用 JSX 语法（看起来像 HTML，但其实是 JavaScript）

### 2. 函数写法

```typescript
// 这是一个计算函数
function calculateMortgage(amount: number, rate: number): number {
  // amount: 贷款金额（必须是数字）
  // rate: 利率（必须是数字）
  // : number 表示返回的是数字
  return amount * rate;
}
```

**规则**：
- 函数名用小写字母开头，多个单词用驼峰命名（camelCase）
- 参数后面用 `: 类型` 指定类型
- 函数名后面用 `: 类型` 指定返回类型

### 3. 变量命名规则

```typescript
// 好的命名
const loanAmount = 100000;        // 贷款金额
const interestRate = 0.05;        // 利率
const monthlyPayment = 500;       // 月供

// 不好的命名（避免）
const a = 100000;                 // 不知道是什么
const x = 0.05;                   // 不清楚含义
```

**规则**：
- 变量名要有意义，一看就知道是什么
- 使用英文单词，多个单词用驼峰命名
- 避免使用单个字母（除非是循环中的临时变量）

### 4. 注释规则

```typescript
// 这是单行注释，解释下面代码的作用

/**
 * 这是多行注释
 * 可以写多行说明
 * 通常用于解释函数的作用
 */
function calculateTotalInterest() {
  // 计算总利息的逻辑
  // 1. 先计算每月还款
  // 2. 再计算总还款
  // 3. 最后减去本金得到利息
}
```

**规则**：
- 注释要清晰，解释"为什么"而不是"是什么"
- 复杂逻辑必须写注释
- 函数开头写注释说明功能

---

## 🎨 样式写法（Tailwind CSS）

Tailwind CSS 是一个工具，可以直接在 HTML 标签上写样式类名。

```typescript
<div className="bg-blue-500 text-white p-4 rounded-lg">
  这是一个蓝色背景、白色文字、有内边距和圆角的盒子
</div>
```

**规则**：
- 使用 `className` 而不是 `class`（因为这是 React）
- 样式类名用空格分隔
- 常用类名：
  - `bg-颜色` - 背景色
  - `text-颜色` - 文字颜色
  - `p-数字` - 内边距（padding）
  - `m-数字` - 外边距（margin）
  - `rounded` - 圆角
  - `shadow` - 阴影

---

## 🔄 状态管理

在 React 中，我们使用 `useState` 来管理数据的变化。

```typescript
import { useState } from 'react';

function Calculator() {
  // 创建一个状态变量 loanAmount，初始值是 0
  // setLoanAmount 是用来更新这个值的函数
  const [loanAmount, setLoanAmount] = useState(0);

  return (
    <input 
      value={loanAmount}
      onChange={(e) => setLoanAmount(Number(e.target.value))}
    />
  );
}
```

**规则**：
- 使用 `useState` 创建状态
- 状态改变时，组件会自动重新渲染
- 状态名要清晰，一看就知道是什么

---

## 📊 文件更新记录

这个文档会随着项目的开发实时更新。每当我创建新文件或修改重要文件时，都会在这里添加说明。

### 当前文件列表

#### 配置文件
- `package.json` - 项目依赖和脚本配置
- `tsconfig.json` - TypeScript 编译配置
- `next.config.js` - Next.js 配置文件
- `tailwind.config.ts` - Tailwind CSS 样式配置
- `.eslintrc.json` - 代码检查规则
- `.gitignore` - Git 忽略文件配置

#### 文档文件
- `README.md` - 项目总体说明
- `introduction.md` - 本文件，项目介绍文档
- `prd.md` - 产品需求文档

#### 核心应用文件
- `app/layout.tsx` - 根布局组件，包含 SEO 元数据和全局样式
- `app/page.tsx` - 首页组件，整合计算器和名词解释
- `app/globals.css` - 全局样式文件

#### 类型定义
- `types/index.ts` - 所有 TypeScript 类型定义（房贷参数、计算结果等）

#### 计算逻辑
- `lib/calculations.ts` - 房贷计算核心算法
  - 支持月付和双周付
  - 支持一次性或定期额外还款
  - 生成完整的还款明细表

#### 导出功能
- `lib/export.ts` - 导出功能模块
  - PDF 导出（使用 jsPDF 和 html2canvas）
  - Excel 导出（使用 xlsx 库）
  - 图片导出（PNG 格式）

#### 组件文件

**计算器组件** (`components/calculator/`)
- `MortgageCalculator.tsx` - 主计算器组件
  - 包含所有输入字段
  - 处理用户输入和计算触发

**结果展示组件** (`components/results/`)
- `ResultsDisplay.tsx` - 结果展示主组件
  - 整合所有结果相关的子组件
  - 提供标签页切换功能
- `ResultsSummary.tsx` - 结果摘要组件
  - 显示关键指标卡片（原始方案、新方案、节省情况）
- `ResultsCharts.tsx` - 图表组件
  - 余额变化趋势图（折线图）
  - 利息对比柱状图
  - 本金和利息占比饼图
- `AmortizationTable.tsx` - 还款明细表组件
  - 显示每期的还款详情
  - 支持显示额外还款列
- `ExportButtons.tsx` - 导出按钮组件
  - 提供 PDF、Excel、图片三种导出方式

**名词解释组件** (`components/glossary/`)
- `Glossary.tsx` - 名词解释组件
  - 图文并茂地解释房贷相关术语
  - 包含 8 个核心术语的解释

---

## 💡 学习建议

如果你是完全的初学者，建议按这个顺序理解：

1. **先看整体结构** - 了解项目有哪些文件夹
2. **再看组件** - 理解每个组件做什么
3. **最后看逻辑** - 理解计算和处理的代码

遇到不懂的地方，可以：
- 查看这个文档
- 查看代码中的注释
- 搜索相关概念（比如"React 组件是什么"）

记住：编程是一个逐步学习的过程，不要着急，慢慢理解每个部分的作用！

