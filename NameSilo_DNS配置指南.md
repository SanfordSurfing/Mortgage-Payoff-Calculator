# NameSilo DNS 配置指南

这个文档会详细说明如何在 NameSilo 中配置 DNS 记录，将你的域名连接到 Vercel。

## 📋 配置前准备

根据 Vercel 的提示，你需要配置以下 DNS 记录：

- **类型：** CNAME
- **主机名（Name）：** `www`
- **目标（Value）：** `a392ecdeac103058.vercel-dns-017.com.`
- **域名：** `mortgage-payoff-calculator.top`

---

## 🔧 NameSilo DNS 配置步骤

### 第一步：登录 NameSilo

1. 访问 https://www.namesilo.com
2. 点击右上角 "Login" 登录你的账号
3. 登录后，点击 "My Account" → "Manage My Domains"

### 第二步：找到你的域名

1. 在域名列表中，找到 `mortgage-payoff-calculator.top`
2. 点击域名名称或右侧的 "Manage" 按钮

### 第三步：进入 DNS 管理页面

1. 在域名管理页面，找到 "DNS Records" 或 "DNS" 选项
2. 点击进入 DNS 记录管理页面

### 第四步：添加 CNAME 记录

在 DNS 记录管理页面，你需要添加或修改 CNAME 记录：

#### 如果使用 NameSilo 的 DNS 管理界面：

1. **找到 "Add/Edit a Resource Record" 或类似的按钮**
   - 通常在页面顶部或底部

2. **选择记录类型**
   - 在 "Type" 下拉菜单中选择 **"CNAME"**

3. **填写主机名（Hostname/Name）**
   - 在 "Hostname" 或 "Name" 字段中输入：`www`
   - **注意：** 只需要输入 `www`，不需要输入完整域名
   - NameSilo 会自动添加 `.mortgage-payoff-calculator.top`

4. **填写目标值（Target/Value）**
   - 在 "Target" 或 "Value" 字段中输入：`a392ecdeac103058.vercel-dns-017.com`
   - **重要：** 在 NameSilo 中，**不要输入末尾的点（`.`）**
   - NameSilo 会自动处理 DNS 记录的格式
   - 只输入：`a392ecdeac103058.vercel-dns-017.com`（没有末尾的点）

5. **TTL（Time To Live）**
   - 通常保持默认值（如 3600 或 7207）
   - 或者设置为 3600（1小时）

6. **点击 "Submit" 或 "Add Record" 保存**

---

## 📝 配置示例

根据你的情况，配置应该如下：

```
类型（Type）: CNAME
主机名（Hostname）: www
目标（Target）: a392ecdeac103058.vercel-dns-017.com
TTL: 3600（或默认值）
```

**重要提示：**
- 在 NameSilo 中，目标值**不要包含末尾的点**
- 只输入：`a392ecdeac103058.vercel-dns-017.com`（没有点）

**配置后的完整记录：**
- `www.mortgage-payoff-calculator.top` → `a392ecdeac103058.vercel-dns-017.com`

---

## ✅ 验证配置

### 1. 在 NameSilo 中检查

配置完成后，在 DNS 记录列表中应该能看到：
- 类型：CNAME
- 主机名：www
- 值：a392ecdeac103058.vercel-dns-017.com.

### 2. 等待 DNS 传播

- DNS 更改通常需要 **15 分钟到 48 小时** 才能完全生效
- 大多数情况下，**1-2 小时内**就会生效

### 3. 在 Vercel 中验证

1. 回到 Vercel 项目页面
2. 进入域名设置页面
3. 点击 "Refresh" 按钮
4. 等待 Vercel 验证 DNS 记录
5. 如果配置正确，状态会从 "Invalid Configuration" 变为 "Valid"

### 4. 使用命令行验证（可选）

在终端中运行以下命令检查 DNS 记录：

```bash
# 检查 CNAME 记录
dig www.mortgage-payoff-calculator.top CNAME

# 或者使用 nslookup
nslookup -type=CNAME www.mortgage-payoff-calculator.top
```

如果配置正确，应该能看到返回 `a392ecdeac103058.vercel-dns-017.com`（DNS 查询结果可能会显示末尾的点，这是正常的）

---

## ⚠️ 常见问题

### Q1: 找不到 DNS 管理选项？

**解决方法：**
- 确保你使用的是 NameSilo 的 DNS 服务器
- 检查域名是否已解锁（Unlocked）
- 如果使用第三方 DNS（如 Cloudflare），需要在第三方平台配置

### Q2: 配置后仍然显示 "Invalid Configuration"？

**可能原因：**
1. DNS 记录还未传播（等待更长时间）
2. 记录值输入错误（在 NameSilo 中不要输入末尾的点）
3. 主机名输入错误（应该是 `www`，不是 `www.mortgage-payoff-calculator.top`）

**解决方法：**
- 仔细检查所有字段是否正确
- **确保目标值没有末尾的点**：`a392ecdeac103058.vercel-dns-017.com`（不是 `.com.`）
- 等待 1-2 小时后再次检查
- 在 Vercel 中点击 "Refresh" 按钮

### Q2.1: 出现 "Target hostname should be valid" 错误？

**错误原因：**
- NameSilo 不允许在目标值中包含点（`.`）以外的特殊字符
- 如果输入了末尾的点，会报错

**解决方法：**
- **移除末尾的点**，只输入：`a392ecdeac103058.vercel-dns-017.com`
- NameSilo 会自动处理 DNS 记录的格式

### Q3: 需要配置根域名（不带 www）吗？

**当前配置：**
- 你只需要配置 `www` 子域名
- 如果用户访问 `mortgage-payoff-calculator.top`（不带 www），可能需要额外配置

**如果需要支持根域名：**
- 在 Vercel 中添加根域名 `mortgage-payoff-calculator.top`
- 根据 Vercel 的提示，可能需要配置 A 记录或 CNAME 记录
- 某些域名提供商不支持根域名的 CNAME，需要使用 A 记录

### Q4: TTL 值应该设置多少？

**建议：**
- 首次配置：使用默认值或 3600（1小时）
- 配置稳定后：可以设置为 7200 或更高，减少 DNS 查询频率

---

## 🔄 配置根域名（可选）

如果你希望用户访问 `mortgage-payoff-calculator.top`（不带 www）也能正常工作：

### 方法 1：在 Vercel 中添加根域名

1. 在 Vercel 项目设置中，添加域名 `mortgage-payoff-calculator.top`（不带 www）
2. Vercel 会提供相应的 DNS 配置
3. 在 NameSilo 中按照 Vercel 的提示配置

### 方法 2：使用 URL 重定向

在 NameSilo 中设置 URL 转发，将根域名重定向到 www 版本。

---

## 📌 重要提示

1. **DNS 传播需要时间**：配置后不要立即期望生效，等待 1-2 小时
2. **不要输入末尾的点**：在 NameSilo 中，目标值**不要包含末尾的点（`.`）**，只输入 `a392ecdeac103058.vercel-dns-017.com`
3. **只输入主机名**：在 NameSilo 中，主机名字段只需要输入 `www`，不要输入完整域名
4. **保持耐心**：如果配置正确，等待一段时间后会自动生效

---

## 🎉 配置完成后的步骤

DNS 配置生效后：

1. **在 Vercel 中验证**
   - 状态应该变为 "Valid"
   - 域名应该可以正常访问

2. **更新环境变量**
   - 在 Vercel 项目设置中，更新 `NEXT_PUBLIC_SITE_URL`
   - 设置为：`https://www.mortgage-payoff-calculator.top`

3. **测试访问**
   - 访问 `https://www.mortgage-payoff-calculator.top`
   - 确认网站正常加载

4. **提交到 Google Search Console**
   - 在 Google Search Console 中添加网站
   - 提交 sitemap：`https://www.mortgage-payoff-calculator.top/sitemap.xml`

---

配置完成后，你的网站就可以通过自定义域名访问了！🚀

