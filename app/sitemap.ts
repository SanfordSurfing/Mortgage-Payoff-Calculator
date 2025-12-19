import { MetadataRoute } from 'next'

/**
 * Sitemap 生成文件
 * 
 * 这个文件会自动生成 sitemap.xml，帮助 Google 等搜索引擎发现和索引网站的所有页面
 * Next.js 会自动在 /sitemap.xml 路径提供这个文件
 * 
 * 更新频率说明：
 * - always: 每次访问都检查更新
 * - hourly: 每小时更新
 * - daily: 每天更新
 * - weekly: 每周更新
 * - monthly: 每月更新
 * - yearly: 每年更新
 * - never: 从不更新
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 基础URL - 如果部署后，请更新为实际域名
  // 例如：'https://yourdomain.com'
  // 也可以从环境变量读取：process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly', // 首页更新频率：每周
      priority: 1.0, // 优先级：1.0（最高）
    },
    // 如果将来有其他页面，可以在这里添加
    // 例如：
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}

