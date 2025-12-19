# Vercel 部署配置指南

这个文档会详细说明如何在 Vercel 上部署这个项目，以及每个配置项的含义。

## 📋 部署前准备

1. **确保代码已推送到 GitHub**
   - 你的代码已经在 GitHub 上了：https://github.com/SanfordSurfing/Mortgage-Payoff-Calculator.git
   - 确保最新的代码已经推送

2. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录（推荐，这样可以直接连接仓库）

---

## ⚙️ 配置参数详解

### 1. Framework Preset（框架预设）
**值：** `Next.js` ✅（已自动识别）

**说明：**
- Vercel 会自动检测到这是 Next.js 项目
- 不需要修改，保持默认即可

---

### 2. Root Directory（根目录）
**值：** `./` ✅（默认值）

**说明：**
- 如果你的项目在仓库的根目录，保持 `./` 即可
- 如果项目在子文件夹中（比如 `./frontend`），需要改成对应的路径
- **你的情况：保持 `./` 即可**

---

### 3. Build and Output Settings（构建和输出设置）

#### 3.1 Build Command（构建命令）
**值：** `npm run build` ✅（默认值，保持开启）

**说明：**
- 这是 Next.js 的标准构建命令
- 开关保持**开启**（白色圆圈在右侧）
- 不需要修改

#### 3.2 Output Directory（输出目录）
**值：** `Next.js default` ✅（默认值，保持开启）

**说明：**
- Next.js 会自动处理输出目录
- 开关保持**开启**
- 不需要修改

#### 3.3 Install Command（安装命令）
**值：** `npm install` ✅（默认值，保持开启）

**说明：**
- 使用 npm 安装依赖
- 如果你使用 yarn 或 pnpm，Vercel 会自动检测
- 开关保持**开启**
- 不需要修改

---

### 4. Environment Variables（环境变量）

**重要：** 这里需要添加网站的实际域名，但**第一次部署时可以先不填**，部署成功后再添加。

#### 需要添加的环境变量：

**变量名（Key）：** `NEXT_PUBLIC_SITE_URL`

**变量值（Value）：** 
- **第一次部署：** 可以先不填，或者填 `https://your-project-name.vercel.app`（Vercel 会自动生成一个域名）
- **部署后：** 填写实际的域名，例如：
  - 如果使用 Vercel 默认域名：`https://mortgage-payoff-calculator.vercel.app`
  - 如果使用自定义域名：`https://yourdomain.com`

**如何添加：**
1. 点击 "+ Add More" 按钮
2. 在 Key 栏输入：`NEXT_PUBLIC_SITE_URL`
3. 在 Value 栏输入：你的域名（可以先填 Vercel 自动生成的域名）
4. 点击保存

**为什么需要这个变量？**
- 这个变量用于生成 sitemap.xml 和 robots.txt
- 告诉搜索引擎你的网站地址
- 如果不填，sitemap 和 robots.txt 中的 URL 会是 `https://yourdomain.com`（占位符）

---

## 🚀 部署步骤

### 第一次部署：

1. **连接 GitHub 仓库**
   - 在 Vercel 中点击 "Import Project"
   - 选择你的 GitHub 仓库：`SanfordSurfing/Mortgage-Payoff-Calculator`
   - 授权 Vercel 访问仓库

2. **配置项目（按上面的说明填写）**
   - Framework Preset: `Next.js`（自动）
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（默认，保持开启）
   - Output Directory: `Next.js default`（默认，保持开启）
   - Install Command: `npm install`（默认，保持开启）

3. **环境变量（第一次可以先跳过）**
   - 第一次部署时，环境变量可以先不填
   - 部署成功后，Vercel 会给你一个域名（比如 `xxx.vercel.app`）
   - 然后再添加环境变量 `NEXT_PUBLIC_SITE_URL`，值为这个域名

4. **点击 "Deploy" 按钮**
   - 等待构建完成（通常 2-5 分钟）
   - 构建成功后，你会得到一个可访问的网址

---

### 部署后配置：

1. **获取实际域名**
   - 部署成功后，在 Vercel 项目页面可以看到域名
   - 通常是：`https://mortgage-payoff-calculator-xxx.vercel.app`

2. **添加环境变量**
   - 进入项目设置（Settings）
   - 找到 "Environment Variables" 部分
   - 添加：
     - Key: `NEXT_PUBLIC_SITE_URL`
     - Value: `https://你的实际域名.vercel.app`
   - 选择环境：Production（生产环境）、Preview（预览环境）、Development（开发环境）
   - 建议三个环境都勾选
   - 点击 "Save"

3. **重新部署**
   - 添加环境变量后，需要重新部署才能生效
   - 在 "Deployments" 页面，点击最新的部署，选择 "Redeploy"

---

## ✅ 验证部署

部署成功后，访问以下 URL 验证：

1. **首页：** `https://你的域名.vercel.app`
2. **Sitemap：** `https://你的域名.vercel.app/sitemap.xml`
3. **Robots.txt：** `https://你的域名.vercel.app/robots.txt`

---

## 🔧 常见问题

### Q1: 构建失败怎么办？
- 检查 `package.json` 中的依赖是否正确
- 查看 Vercel 构建日志中的错误信息
- 确保代码没有语法错误

### Q2: 环境变量不生效？
- 确保变量名是 `NEXT_PUBLIC_SITE_URL`（注意大小写）
- 添加环境变量后需要重新部署
- 检查是否选择了正确的环境（Production/Preview/Development）

### Q3: 如何添加自定义域名？
- 在 Vercel 项目设置中找到 "Domains"
- 添加你的自定义域名
- 按照提示配置 DNS 记录
- 更新环境变量 `NEXT_PUBLIC_SITE_URL` 为新域名

### Q4: 如何更新代码？
- 直接推送到 GitHub 的 main 分支
- Vercel 会自动检测并重新部署
- 非常方便！

---

## 📝 总结

**最简单的部署方式：**
1. 连接 GitHub 仓库
2. 所有配置保持默认（Vercel 会自动识别 Next.js）
3. 点击 "Deploy"
4. 部署成功后，添加环境变量 `NEXT_PUBLIC_SITE_URL`
5. 重新部署

**就是这么简单！** 🎉

