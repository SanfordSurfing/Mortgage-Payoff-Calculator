import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mortgage Payoff Calculator - Calculate Your Loan Savings | Free Tool",
  description: "Free mortgage payoff calculator to calculate how much time and money you can save by making extra payments. Supports monthly and bi-weekly payments. Export results as PDF, Excel, or image. No registration required.",
  keywords: "mortgage calculator, payoff calculator, loan calculator, extra payment calculator, amortization calculator, mortgage savings, bi-weekly mortgage, mortgage payoff time, interest savings calculator",
  authors: [{ name: "Mortgage Calculator" }],
  openGraph: {
    title: "Mortgage Payoff Calculator - Free Tool",
    description: "Calculate your mortgage payoff time and savings with our free calculator. Supports extra payments and multiple payment frequencies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Payoff Calculator",
    description: "Free tool to calculate mortgage payoff time and interest savings",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 代码 - 紧跟在head元素之后 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-93XJE8SJ38"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-93XJE8SJ38');
            `,
          }}
        />
        {/* 结构化数据，帮助搜索引擎理解页面内容 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Mortgage Payoff Calculator",
              "description": "Free mortgage payoff calculator to calculate how much time and money you can save by making extra payments. Supports monthly and bi-weekly payments.",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "featureList": [
                "Calculate mortgage payoff time",
                "Calculate interest savings",
                "Support for extra payments",
                "Monthly and bi-weekly payment options",
                "Export results as PDF, Excel, or image",
                "Amortization schedule",
                "Visual charts and graphs",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

