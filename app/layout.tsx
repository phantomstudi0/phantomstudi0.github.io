import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from '@/lib/Providers'
import ScrollProgress from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: 'Phantom Studio — Сайты, Telegram-боты, CRM и автоматизация',
  description: 'IT-команда полного цикла. Сайты, SaaS, Telegram-боты, CRM, мобильные приложения и автоматизация — от идеи до деплоя.',
  keywords: ['веб-разработка', 'telegram бот', 'crm', 'saas', 'next.js', 'flutter', 'автоматизация', 'фриланс', 'разработка сайтов'],
  authors: [{ name: 'PhantomTeam' }],
  openGraph: {
    title: 'Phantom Studio — Сайты, Telegram-боты, CRM и автоматизация',
    description: 'IT-команда полного цикла. Сайты, SaaS, Telegram-боты, CRM, мобильные приложения и автоматизация — от идеи до деплоя.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Phantom Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phantom Studio — IT-команда полного цикла',
    description: 'Сайты, SaaS, Telegram-боты, CRM, мобильные приложения и автоматизация — от идеи до деплоя.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.dataset.theme = t;
      document.documentElement.style.colorScheme = t;
    }
  } catch(_) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <ScrollProgress />
          <div className="glow-top" />
          <div className="glow-left" />
          <div className="noise" />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
