export interface Bilingual {
  ru: string
  en: string
}

export interface ProjectResult {
  n: Bilingual
  l: Bilingual
}

export interface ProjectData {
  id: string
  badge: Bilingual
  title: string
  shortDesc: Bilingual
  tags: string[]
  colors: [string, string]
  demo: boolean
  demoNote: Bilingual
  desc: Bilingual
  results: ProjectResult[]
  stack: string[]
  liveUrl: string | null
  screenshots?: string[]
}

const DEMO_NOTE: Bilingual = {
  ru: 'Демо-проект — показывает наши возможности. Реализуем аналогичное под ваш бизнес.',
  en: 'Demo project — showcases our capabilities. We can build a similar one for your business.',
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'scout',
    badge: { ru: 'SaaS · Дашборд', en: 'SaaS · Dashboard' },
    title: 'SCOUT',
    shortDesc: {
      ru: 'Система мониторинга цен конкурентов. Парсинг 12+ площадок, визуализация в реальном времени.',
      en: 'Competitor price monitoring system. 12+ marketplaces parsed, real-time visualization.',
    },
    tags: ['Next.js', 'Python', 'PostgreSQL', 'Recharts'],
    colors: ['#6BA3FF', '#A78BFA'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: интернет-магазину нужно автоматически отслеживать цены конкурентов на 12+ площадках и получать алёрты когда кто-то снижает цену.\n\nРешение: парсер обходит площадки каждые 30 минут, сравнивает с вашими ценами и отправляет уведомление в Telegram. Все данные — на дашборде с графиками и фильтрами.',
      en: 'Task: an online store needs to track competitor prices across 12+ marketplaces and get alerts when someone lowers their price.\n\nSolution: a scraper polls marketplaces every 30 minutes, compares with your prices, and sends Telegram notifications. All data is on a dashboard with charts and filters.',
    },
    results: [
      { n: { ru: '12+', en: '12+' }, l: { ru: 'площадок мониторинга', en: 'marketplaces tracked' } },
      { n: { ru: '30мин', en: '30 min' }, l: { ru: 'интервал обновления', en: 'refresh interval' } },
      { n: { ru: '2 нед', en: '2 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Recharts', 'Selenium', 'Docker'],
    liveUrl: null,
  },
  {
    id: 'mailpilot',
    badge: { ru: 'SaaS · Автоматизация', en: 'SaaS · Automation' },
    title: 'MailPilot',
    shortDesc: {
      ru: 'Email-платформа с конструктором шаблонов, аналитикой открытий и A/B-тестированием.',
      en: 'Email platform with template builder, open analytics and A/B testing.',
    },
    tags: ['React', 'Node.js', 'Redis'],
    colors: ['#3DD68C', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: автоматизировать email-маркетинг — редактор шаблонов, рассылки по сегментам, аналитика и A/B-тесты в одном месте.\n\nРешение: SaaS-платформа с визуальным конструктором писем, отслеживанием открытий и кликов, интеграцией с SendGrid и Mailgun.',
      en: 'Task: automate email marketing — template editor, segment-based campaigns, analytics and A/B tests in one place.\n\nSolution: a SaaS platform with a visual email builder, open/click tracking, SendGrid and Mailgun integrations.',
    },
    results: [
      { n: { ru: '3×', en: '3×' }, l: { ru: 'быстрее создание рассылок', en: 'faster campaign creation' } },
      { n: { ru: '94%', en: '94%' }, l: { ru: 'доставляемость', en: 'deliverability' } },
      { n: { ru: '3 нед', en: '3 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['React', 'Node.js', 'Redis', 'PostgreSQL', 'SendGrid API', 'Recharts', 'Tailwind'],
    liveUrl: 'https://mailpilot-demo.vercel.app',
  },
  {
    id: 'dentalight',
    badge: { ru: 'Лендинг · Медицина', en: 'Landing · Medical' },
    title: 'DentaLight',
    shortDesc: {
      ru: 'Лендинг для стоматологической клиники с онлайн-записью и галереей работ.',
      en: 'Landing page for a dental clinic with online booking and case gallery.',
    },
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
    colors: ['#9DC4FF', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: лендинг для медицинской/сервисной компании — с галереей работ, отзывами, прайсом и формой онлайн-записи.\n\nРешение: быстрый Next.js лендинг с SEO-оптимизацией, плавными анимациями и конверсионными блоками.',
      en: 'Task: a landing page for a medical/service company — with case gallery, reviews, pricing and an online booking form.\n\nSolution: a fast Next.js landing with SEO optimization, smooth animations and conversion-focused sections.',
    },
    results: [
      { n: { ru: '7.2%', en: '7.2%' }, l: { ru: 'конверсия в заявку', en: 'lead conversion' } },
      { n: { ru: 'ТОП-3', en: 'TOP-3' }, l: { ru: 'Яндекс по нише', en: 'Yandex niche ranking' } },
      { n: { ru: '7 дн', en: '7 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Yandex.Maps API'],
    liveUrl: null,
  },
  {
    id: 'pulse',
    badge: { ru: 'Бот · Сервис', en: 'Bot · Service' },
    title: 'PULSE',
    shortDesc: {
      ru: 'Telegram-бот для записи клиентов — расписание, приём оплаты, напоминания.',
      en: 'Telegram bot for client booking — schedule, payments, reminders.',
    },
    tags: ['Python', 'aiogram', 'SQLite'],
    colors: ['#A78BFA', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: автоматизировать запись клиентов для сервисного бизнеса (фитнес, салон, врач). Убрать ручной труд и человеческий фактор.\n\nРешение: Telegram-бот — клиент выбирает время, оплачивает онлайн, получает напоминания. Владелец видит расписание и статистику.',
      en: 'Task: automate client booking for service businesses (fitness, salon, doctor). Remove manual work and human error.\n\nSolution: a Telegram bot — the client picks a time, pays online, gets reminders. The owner sees the schedule and stats.',
    },
    results: [
      { n: { ru: '300+', en: '300+' }, l: { ru: 'записей в месяц', en: 'bookings per month' } },
      { n: { ru: '0', en: '0' }, l: { ru: 'пропущенных броней', en: 'missed bookings' } },
      { n: { ru: '10 дн', en: '10 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Python', 'aiogram 3', 'SQLite', 'ЮКасса API', 'APScheduler'],
    liveUrl: null,
  },
]
