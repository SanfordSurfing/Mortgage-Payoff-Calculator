import { MetadataRoute } from 'next'

/**
 * Robots.txt 生成文件
 * 
 * 这个文件会自动生成 robots.txt，告诉搜索引擎爬虫哪些页面可以访问，哪些不能访问
 * Next.js 会自动在 /robots.txt 路径提供这个文件
 * 
 * 规则说明：
 * - User-agent: 指定哪些爬虫需要遵守这些规则（* 表示所有爬虫）
 * - Allow: 允许访问的路径
 * - Disallow: 禁止访问的路径
 * - Sitemap: 告诉搜索引擎 sitemap 的位置
 */
export default function robots(): MetadataRoute.Robots {
  // 基础URL - 从环境变量读取，如果没有则使用默认域名
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mortgage-payoff-calculator.top'

  return {
    rules: [
      {
        userAgent: '*', // 所有搜索引擎爬虫
        allow: '/', // 允许访问所有页面
        disallow: [
          '/api/', // 如果有API路由，禁止爬虫访问
          '/_next/', // Next.js 内部文件，禁止访问
          '/private/', // 如果有私有页面，禁止访问
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // sitemap 的位置
  }
}

