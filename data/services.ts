export type ServiceAccent = 'blue' | 'green' | 'purple'

export interface Bilingual {
  ru: string
  en: string
}

export interface ServiceData {
  num: string
  title: Bilingual
  description: Bilingual
  price: Bilingual
  accent: ServiceAccent
  icon: 'bot' | 'globe' | 'stack' | 'chart' | 'mobile' | 'ai'
}

export const SERVICES: ServiceData[] = [
  {
    num: '01',
    title: { ru: 'Telegram-боты', en: 'Telegram bots' },
    description: {
      ru: 'Чат-боты для бизнеса, автоматизация заявок, интеграция с CRM и платёжными системами',
      en: 'Chat bots for business, lead automation, CRM and payment integrations',
    },
    price: { ru: 'от 5 000 ₽', en: 'from $60' },
    accent: 'blue',
    icon: 'bot',
  },
  {
    num: '02',
    title: { ru: 'Сайты и лендинги', en: 'Websites & landings' },
    description: {
      ru: 'Дизайн, вёрстка, SEO, мобильная адаптация. Под ключ за 7–14 дней',
      en: 'Design, development, SEO, mobile-friendly. Full build in 7–14 days',
    },
    price: { ru: 'от 5 000 ₽', en: 'from $60' },
    accent: 'blue',
    icon: 'globe',
  },
  {
    num: '03',
    title: { ru: 'CRM и интеграции', en: 'CRM & integrations' },
    description: {
      ru: 'AmoCRM, Bitrix, кастомные решения. Автоматизация воронок и бизнес-процессов',
      en: 'AmoCRM, Bitrix, custom solutions. Sales funnel and workflow automation',
    },
    price: { ru: 'от 15 000 ₽', en: 'from $180' },
    accent: 'blue',
    icon: 'stack',
  },
  {
    num: '04',
    title: { ru: 'Парсеры и аналитика', en: 'Scrapers & analytics' },
    description: {
      ru: 'Мониторинг цен конкурентов, сбор данных, дашборды визуализации',
      en: 'Competitor price monitoring, data collection, visualization dashboards',
    },
    price: { ru: 'от 8 000 ₽', en: 'from $95' },
    accent: 'green',
    icon: 'chart',
  },
  {
    num: '05',
    title: { ru: 'Мобильные приложения', en: 'Mobile applications' },
    description: {
      ru: 'iOS и Android на Flutter. Кроссплатформенная разработка с нативным UI',
      en: 'iOS and Android on Flutter. Cross-platform development with native UI',
    },
    price: { ru: 'от 80 000 ₽', en: 'from $950' },
    accent: 'green',
    icon: 'mobile',
  },
  {
    num: '06',
    title: { ru: 'AI-автоматизация', en: 'AI automation' },
    description: {
      ru: 'Интеграция GPT, нейро-ассистенты, умные воронки и автоответы в продукт',
      en: 'GPT integration, AI assistants, smart funnels and auto-replies in product',
    },
    price: { ru: 'от 20 000 ₽', en: 'from $240' },
    accent: 'purple',
    icon: 'ai',
  },
]
