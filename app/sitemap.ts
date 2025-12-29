import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 基础URL - 从环境变量读取，如果没有则使用默认域名
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mortgage-payoff-calculator.top'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly', // 首页更新频率：每周
      priority: 1.0, // 优先级：1.0（最高）
    },
    
  ]
}

