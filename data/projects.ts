export interface Bilingual {
  ru: string
  en: string
}

export interface ProjectResult {
  n: Bilingual
  l: Bilingual
}

export type ProjectCategory = 'saas' | 'landing' | 'dashboard' | 'ai' | 'ecommerce'

export interface ProjectData {
  id: string
  featured: boolean
  category: ProjectCategory
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

const PROD_NOTE: Bilingual = {
  ru: 'Production-проект в активной эксплуатации у реального клиента.',
  en: 'Production project actively used by a real client.',
}

export const PROJECT_CATEGORIES: { id: ProjectCategory | 'all'; label: Bilingual }[] = [
  { id: 'all',       label: { ru: 'Все',        en: 'All' } },
  { id: 'saas',      label: { ru: 'SaaS',       en: 'SaaS' } },
  { id: 'landing',   label: { ru: 'Лендинги',   en: 'Landings' } },
  { id: 'dashboard', label: { ru: 'Дашборды',   en: 'Dashboards' } },
  { id: 'ai',        label: { ru: 'AI',         en: 'AI' } },
  { id: 'ecommerce', label: { ru: 'E-commerce', en: 'E-commerce' } },
]

export const PROJECTS: ProjectData[] = [
  // ── FEATURED (top-6 на главной) ──
  {
    id: 'romark-crm',
    featured: true,
    category: 'ai',
    badge: { ru: 'SaaS · AI · Production', en: 'SaaS · AI · Production' },
    title: 'Star CRM',
    shortDesc: {
      ru: 'AI-платформа автоматических ответов на отзывы Wildberries и Ozon. GPT генерирует персонализированные ответы в стиле бренда. Production на star-crm.ru.',
      en: 'AI platform for automated Wildberries and Ozon review replies. GPT generates personalized brand-voice responses. Production at star-crm.ru.',
    },
    tags: ['AI', 'WB/Ozon', 'Production'],
    colors: ['#3DD68C', '#6BA3FF'],
    demo: false,
    demoNote: PROD_NOTE,
    desc: {
      ru: 'Задача: крупные продавцы на маркетплейсах (Wildberries, Ozon) получают тысячи отзывов в день — отвечать вручную нереально, но игнорировать нельзя (рейтинг, SEO на площадке).\n\nРешение: SaaS-платформа читает отзывы через API маркетплейсов, генерирует ответ через GPT в стиле бренда (tone of voice, guidelines, запрещённые фразы), публикует обратно. Дашборд статистики, правила для авто-ответов и ручная модерация для edge-cases.',
      en: 'Task: large marketplace sellers (Wildberries, Ozon) receive thousands of reviews daily — manual replies are impossible, but ignoring hurts rating and in-platform SEO.\n\nSolution: SaaS platform reads reviews via marketplace APIs, generates brand-voice replies with GPT (tone, guidelines, banned phrases), publishes back. Stats dashboard, auto-reply rules and manual moderation for edge cases.',
    },
    results: [
      { n: { ru: 'AI', en: 'AI' }, l: { ru: 'GPT-ответы', en: 'GPT replies' } },
      { n: { ru: '24/7', en: '24/7' }, l: { ru: 'автономно', en: 'autonomous' } },
      { n: { ru: 'Prod', en: 'Prod' }, l: { ru: 'star-crm.ru', en: 'star-crm.ru' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Python', 'OpenAI API', 'Wildberries API', 'Ozon API', 'PostgreSQL'],
    liveUrl: 'https://app.star-crm.ru/romark',
  },
  {
    id: 'eclipse-premiumrent',
    featured: true,
    category: 'landing',
    badge: { ru: 'Лендинг · Аренда авто', en: 'Landing · Car Rental' },
    title: 'LiteRent Premium',
    shortDesc: {
      ru: 'Премиум-лендинг сервиса аренды авто в Калининграде. Каталог машин по классам, калькулятор стоимости по дням, форма брони, тёмная эстетика, Lighthouse 100/100.',
      en: 'Premium car rental landing in Kaliningrad. Class-filtered car catalog, daily rate calculator, booking form, dark aesthetic, Lighthouse 100/100.',
    },
    tags: ['Next.js', 'Tailwind', 'Calculator'],
    colors: ['#A78BFA', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: лендинг премиум-сегмента аренды авто — доверие, понятный каталог, лёгкий путь к брони без регистрации.\n\nРешение: Next.js + Tailwind, тёмная эстетика, фото-галерея авто с фильтрами по классу (Premium/Business/Economy), встроенный калькулятор (ставка × дни + доставка), форма брони с валидацией полей и уведомлением менеджеру.',
      en: 'Task: a premium-segment car rental landing — trust, clear catalog, smooth booking path without registration.\n\nSolution: Next.js + Tailwind, dark aesthetic, car gallery with class filters (Premium/Business/Economy), built-in pricing calculator (rate × days + delivery), booking form with validation and manager notification.',
    },
    results: [
      { n: { ru: '100', en: '100' }, l: { ru: 'Lighthouse score', en: 'Lighthouse score' } },
      { n: { ru: '8%', en: '8%' }, l: { ru: 'конверсия в заявку', en: 'lead conversion' } },
      { n: { ru: '5 дн', en: '5 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://eclipse-premiumrent.pages.dev/',
  },
  {
    id: 'lms-platform',
    featured: true,
    category: 'saas',
    badge: { ru: 'SaaS · Образование', en: 'SaaS · Education' },
    title: 'Learnix',
    shortDesc: {
      ru: 'Modern LMS-платформа с конструктором курсов, авто-проверкой тестов и прогрессом студентов. Три роли: админ, преподаватель, студент. Видео-уроки и Markdown-контент.',
      en: 'Modern LMS platform with course builder, auto-graded quizzes and student progress. Three roles: admin, teacher, student. Video lessons and Markdown content.',
    },
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    colors: ['#6BA3FF', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: LMS-платформа для образовательного проекта — загрузка курсов, прохождение уроков, тесты с авто-проверкой, прогресс студента, отчёты преподавателя.\n\nРешение: Next.js SSR + PostgreSQL, ролевая модель (admin/teacher/student), загрузка видео, рендер markdown-уроков, встроенный конструктор тестов.',
      en: 'Task: an LMS platform for an educational project — course uploads, lesson progression, auto-graded quizzes, student progress, teacher reports.\n\nSolution: Next.js SSR + PostgreSQL, role model (admin/teacher/student), video uploads, markdown lesson rendering, built-in quiz builder.',
    },
    results: [
      { n: { ru: '3', en: '3' }, l: { ru: 'роли доступа', en: 'access roles' } },
      { n: { ru: '∞', en: '∞' }, l: { ru: 'курсов и студентов', en: 'courses & students' } },
      { n: { ru: '3 нед', en: '3 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind', 'Markdown'],
    liveUrl: 'https://lms-platform-mocha-nine.vercel.app/',
  },
  {
    id: 'shotforge',
    featured: true,
    category: 'ai',
    badge: { ru: 'AI · Видео', en: 'AI · Video' },
    title: 'ShotForge',
    shortDesc: {
      ru: 'AI Virtual Studio для генерации продуктовых видео за минуты — промпт + фото → готовый 4K-ролик. Работает на OpenAI API и кастомном FFmpeg-пайплайне.',
      en: 'AI Virtual Studio generating product videos in minutes — prompt + photo → ready 4K clip. Powered by OpenAI API and a custom FFmpeg pipeline.',
    },
    tags: ['Next.js', 'OpenAI', 'AI'],
    colors: ['#A78BFA', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: сервис для бизнеса который автоматически создаёт продуктовые видео из фото + текста через нейросети. Минимум ручного труда, результат за минуты.\n\nРешение: Next.js-фронт + очередь задач, интеграция с моделями генерации видео, рендеринг сцен, экспорт в MP4. Веб-интерфейс для настройки промптов и стиля.',
      en: 'Task: a service that automatically creates product videos from photo + text via neural nets. Minimal manual work, result in minutes.\n\nSolution: Next.js front + task queue, video generation model integration, scene rendering, MP4 export. Web UI to tune prompts and style.',
    },
    results: [
      { n: { ru: '3 мин', en: '3 min' }, l: { ru: 'генерация ролика', en: 'video generation' } },
      { n: { ru: '4K', en: '4K' }, l: { ru: 'качество экспорта', en: 'export quality' } },
      { n: { ru: '4 нед', en: '4 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI API', 'Python', 'FFmpeg', 'Redis Queue'],
    liveUrl: 'https://shotforge.pages.dev/',
  },
  {
    id: 'eclipse-valhalla',
    featured: true,
    category: 'landing',
    badge: { ru: 'Лендинг · Бренд', en: 'Landing · Brand' },
    title: 'Eclipse Valhalla',
    shortDesc: {
      ru: 'Брендовый лендинг в тёмной эстетике с кастомными WebGL-шейдерами на фоне Hero и плавными параллаксами при скролле. Lighthouse 100/100, вау-эффект для premium-сегмента.',
      en: 'Brand landing in dark aesthetic with custom WebGL shaders in Hero and smooth scroll parallax. Lighthouse 100/100, wow-factor for the premium segment.',
    },
    tags: ['Next.js', 'Framer Motion', 'WebGL'],
    colors: ['#6BA3FF', '#A78BFA'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: "вау"-лендинг для бренда в premium-сегменте. Главное — эмоциональный impact и уникальность.\n\nРешение: тёмная эстетика, WebGL-шейдеры на фоне Hero, плавные параллакс-эффекты при скролле, кастомные hover-анимации, 100/100 Lighthouse.',
      en: 'Task: a "wow" landing for a premium-segment brand. The goal — emotional impact and uniqueness.\n\nSolution: dark aesthetic, WebGL shaders in Hero, smooth scroll parallax, custom hover animations, 100/100 Lighthouse.',
    },
    results: [
      { n: { ru: '100/100', en: '100/100' }, l: { ru: 'Lighthouse', en: 'Lighthouse' } },
      { n: { ru: 'WebGL', en: 'WebGL' }, l: { ru: 'кастомные шейдеры', en: 'custom shaders' } },
      { n: { ru: '1 нед', en: '1 wk' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'Tailwind'],
    liveUrl: 'https://eclipse-valhalla.pages.dev/',
  },
  {
    id: 'fashion-store',
    featured: true,
    category: 'ecommerce',
    badge: { ru: 'E-commerce · Магазин', en: 'E-commerce · Store' },
    title: 'NOIRE',
    shortDesc: {
      ru: 'Интернет-магазин женской одежды NOIRE с фасетными фильтрами по размеру, цвету и коллекции. Персистентная корзина, оплата через Stripe, админка товаров и заказов.',
      en: 'NOIRE women\'s fashion e-commerce with faceted filters by size, color and collection. Persistent cart, Stripe checkout, products and orders admin.',
    },
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    colors: ['#A78BFA', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: e-commerce магазин одежды с адаптивной витриной, удобными фильтрами, личным кабинетом и приёмом оплат.\n\nРешение: Next.js SSR-каталог с фильтрами по размерам и категориям, корзина с persistent-хранилищем, оплата через Stripe, админка для товаров и заказов.',
      en: 'Task: a fashion e-commerce store with responsive storefront, convenient filters, user accounts and payment.\n\nSolution: Next.js SSR catalog with size/category filters, persistent cart, Stripe checkout, admin for products and orders.',
    },
    results: [
      { n: { ru: '< 1 сек', en: '< 1 s' }, l: { ru: 'время загрузки', en: 'load time' } },
      { n: { ru: 'Stripe', en: 'Stripe' }, l: { ru: 'платёжный шлюз', en: 'payment gateway' } },
      { n: { ru: '2 нед', en: '2 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind', 'Zustand'],
    liveUrl: 'https://04fashionstore.vercel.app/',
  },

  // ── РЕАЛЬНЫЕ КЛИЕНТСКИЕ ПРОЕКТЫ ──
  {
    id: 'vadim-tamada',
    featured: true,
    category: 'landing',
    badge: { ru: 'Лендинг · Ведущий · Production', en: 'Landing · Host · Production' },
    title: 'Вадим Белоглазов',
    shortDesc: {
      ru: 'Сайт-визитка ведущего мероприятий из Калининграда. Свадьбы, корпоративы, юбилеи — всё на одной странице с формой заявки. Заточен под локальный SEO-поиск.',
      en: 'Personal website for an event host from Kaliningrad. Weddings, corporate events, anniversaries — all on one page with a lead form. Optimized for local SEO.',
    },
    tags: ['Лендинг', 'SEO', 'Production'],
    colors: ['#A78BFA', '#FF6B9D'],
    demo: false,
    demoNote: PROD_NOTE,
    desc: {
      ru: 'Задача: профессиональный сайт для тамады — показать услуги, создать доверие, получать заявки онлайн.\n\nРешение: одностраничный лендинг с описанием услуг (свадьбы, корпоративы, юбилеи), галерея мероприятий, отзывы клиентов, форма обратной связи. Оптимизирован под местный поиск в Калининграде.',
      en: 'Task: a professional website for a toastmaster — showcase services, build trust, capture leads online.\n\nSolution: single-page landing with service descriptions (weddings, corporate, anniversaries), event gallery, client reviews, contact form. Optimized for local search in Kaliningrad.',
    },
    results: [
      { n: { ru: 'Prod', en: 'Prod' }, l: { ru: 'живой сайт', en: 'live site' } },
      { n: { ru: 'SEO', en: 'SEO' }, l: { ru: 'локальный поиск', en: 'local search' } },
      { n: { ru: 'Mobile', en: 'Mobile' }, l: { ru: 'адаптив 100%', en: '100% responsive' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://vadim-beloglazov.ru/',
  },
  {
    id: 'djobs-shop',
    featured: true,
    category: 'ecommerce',
    badge: { ru: 'Лендинг · Электроника · Production', en: 'Landing · Electronics · Production' },
    title: 'DJOBS Shop',
    shortDesc: {
      ru: 'Продающий лендинг для магазина электроники параллельного импорта. Apple, Sony, Dyson до 30% дешевле рынка. Сравнение цен, каталог по категориям, заявки через Telegram.',
      en: 'Sales landing for a parallel import electronics shop. Apple, Sony, Dyson up to 30% below retail. Price comparison, category catalog, leads via Telegram.',
    },
    tags: ['Лендинг', 'Telegram', 'Production'],
    colors: ['#2AABEE', '#6BA3FF'],
    demo: false,
    demoNote: PROD_NOTE,
    desc: {
      ru: 'Задача: продающий одностраничник для магазина параллельного импорта техники. Главная цель — убедить в легальности и выгоде, довести до заявки менеджеру.\n\nРешение: лендинг с таблицей сравнения цен, каталогом по категориям (iPhone, MacBook, Sony, Dyson), блоком "как мы работаем", FAQ и формой заявки. Все заявки идут напрямую менеджеру в Telegram.',
      en: 'Task: a high-converting landing for a parallel import electronics shop. Main goal — convince on legality and savings, drive users to message the manager.\n\nSolution: landing with price comparison table, category catalog (iPhone, MacBook, Sony, Dyson), "how we work" block, FAQ and lead form. All leads go directly to the Telegram manager.',
    },
    results: [
      { n: { ru: 'Prod', en: 'Prod' }, l: { ru: 'живой сайт', en: 'live site' } },
      { n: { ru: '30%', en: '30%' }, l: { ru: 'выгода vs розница', en: 'vs retail price' } },
      { n: { ru: 'TG', en: 'TG' }, l: { ru: 'воронка в Telegram', en: 'Telegram funnel' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Telegram Bot API'],
    liveUrl: 'https://djobs.shop/',
  },
  {
    id: 'sport-nardy',
    featured: true,
    category: 'saas',
    badge: { ru: 'Портал · Спорт · Production', en: 'Portal · Sport · Production' },
    title: 'Федерация нард',
    shortDesc: {
      ru: 'Официальный портал Федерации нард Калининградской области. Календарь турниров, онлайн-регистрация участников, оплата взносов, расписание тренировок и профили спортсменов.',
      en: 'Official portal for the Kaliningrad Region Backgammon Federation. Tournament calendar, online participant registration, fee payments, training schedule and athlete profiles.',
    },
    tags: ['Портал', 'Регистрация', 'Production'],
    colors: ['#3DD68C', '#6BA3FF'],
    demo: false,
    demoNote: PROD_NOTE,
    desc: {
      ru: 'Задача: полноценный сайт спортивной организации — анонс соревнований, онлайн-запись участников, оплата взносов, новости, расписание тренировок.\n\nРешение: информационный портал с календарём турниров, формой регистрации участников с онлайн-оплатой взносов, расписанием секций, профилями топ-спортсменов, документами и новостями. Отдельная программа для пенсионеров "Балтийское долголетие".',
      en: 'Task: a full-featured sports organization website — event announcements, online participant registration, fee payments, news, training schedule.\n\nSolution: information portal with tournament calendar, registration forms with online payment, section schedule, top athlete profiles, documents and news. Special "Baltic Longevity" program for seniors.',
    },
    results: [
      { n: { ru: 'Prod', en: 'Prod' }, l: { ru: 'живой сайт', en: 'live site' } },
      { n: { ru: 'Online', en: 'Online' }, l: { ru: 'регистрация и оплата', en: 'registration & pay' } },
      { n: { ru: 'Portal', en: 'Portal' }, l: { ru: 'полный функционал', en: 'full features' } },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://sportnardy39.ru/',
  },

  // ── НЕ-FEATURED (на /projects) ──
  {
    id: 'cryptopulse',
    featured: false,
    category: 'saas',
    badge: { ru: 'SaaS · Финансы', en: 'SaaS · Finance' },
    title: 'CryptoPulse',
    shortDesc: {
      ru: 'Cyberpunk-терминал для крипто-трейдеров с живыми WebSocket-котировками, интерактивными графиками и мониторингом портфеля. 100+ торговых пар через Binance API.',
      en: 'Cyberpunk crypto trading terminal with live WebSocket quotes, interactive charts and portfolio monitoring. 100+ trading pairs via Binance API.',
    },
    tags: ['Next.js', 'WebSocket', 'Recharts'],
    colors: ['#A78BFA', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: futuristic-дашборд для крипто-трейдеров с живыми данными, мониторингом портфеля, техиндикаторами.\n\nРешение: Next.js + WebSocket-подключение к биржам, неоновая киберпанк-эстетика, интерактивные графики, кастомные индикаторы.',
      en: 'Task: a futuristic dashboard for crypto traders with live data, portfolio monitoring, indicators.\n\nSolution: Next.js + WebSocket to exchanges, neon cyberpunk style, interactive charts, custom indicators.',
    },
    results: [
      { n: { ru: 'Live', en: 'Live' }, l: { ru: 'WebSocket-данные', en: 'WebSocket feed' } },
      { n: { ru: '100+', en: '100+' }, l: { ru: 'торговых пар', en: 'trading pairs' } },
      { n: { ru: '2 нед', en: '2 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'WebSocket', 'Recharts', 'Tailwind', 'Binance API'],
    liveUrl: 'https://cryptopulse-1d0.pages.dev/',
  },
  {
    id: 'interviewforge',
    featured: false,
    category: 'ai',
    badge: { ru: 'AI · EdTech', en: 'AI · EdTech' },
    title: 'InterviewForge',
    shortDesc: {
      ru: 'AI-наставник для подготовки к IT-собесам — задаёт вопросы, разбирает ответы через GPT-4 и ведёт прогресс по 15+ темам. Персональные рекомендации после каждой сессии.',
      en: 'AI mentor for IT interview prep — asks questions, analyzes answers via GPT-4 and tracks progress across 15+ topics. Personal recommendations after each session.',
    },
    tags: ['Next.js', 'OpenAI', 'EdTech'],
    colors: ['#6BA3FF', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: платформа для подготовки к IT-собесам — даёт вопросы, анализирует ответы через AI, ведёт прогресс по темам.\n\nРешение: Next.js + OpenAI GPT для анализа ответов, банк вопросов по 15+ темам, личный кабинет с прогрессом и рекомендациями.',
      en: 'Task: a platform for IT interview prep — asks questions, analyzes answers via AI, tracks topic progress.\n\nSolution: Next.js + OpenAI GPT for answer analysis, question bank across 15+ topics, dashboard with progress and recommendations.',
    },
    results: [
      { n: { ru: '15+', en: '15+' }, l: { ru: 'тем покрытия', en: 'topics covered' } },
      { n: { ru: 'GPT-4', en: 'GPT-4' }, l: { ru: 'AI-разбор ответов', en: 'AI answer analysis' } },
      { n: { ru: '3 нед', en: '3 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Tailwind'],
    liveUrl: 'https://interviewforge-3pf.pages.dev/',
  },
  {
    id: 'eclipse-ai-hub',
    featured: false,
    category: 'landing',
    badge: { ru: 'Лендинг · AI', en: 'Landing · AI' },
    title: 'Eclipse AI Hub',
    shortDesc: {
      ru: 'Лендинг AI-сервиса в фирменной эстетике Eclipse со встроенным интерактивным демо на реальных AI-запросах. Блок интеграций, логотипы партнёров, 98+ Lighthouse.',
      en: 'AI service landing in Eclipse aesthetic with embedded interactive demo on real AI queries. Integrations block, partner logos, 98+ Lighthouse.',
    },
    tags: ['Next.js', 'Tailwind', 'AI'],
    colors: ['#6BA3FF', '#A78BFA'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: лендинг для AI-сервиса — показать возможности, добавить интерактивное демо, блок с интеграциями.\n\nРешение: Next.js-лендинг в фирменной тёмной эстетике Eclipse, интерактивный demo-блок с реальными AI-запросами, блок логотипов партнёров.',
      en: 'Task: a landing for an AI service — showcase features, interactive demo, integrations block.\n\nSolution: Next.js landing in Eclipse dark aesthetic, interactive demo with real AI queries, partner logos block.',
    },
    results: [
      { n: { ru: 'Live', en: 'Live' }, l: { ru: 'встроенный AI-демо', en: 'embedded AI demo' } },
      { n: { ru: '98+', en: '98+' }, l: { ru: 'Lighthouse', en: 'Lighthouse' } },
      { n: { ru: '7 дн', en: '7 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'OpenAI API'],
    liveUrl: 'https://eclipse-ai-hub.pages.dev/',
  },
  {
    id: 'eclipse-media',
    featured: false,
    category: 'landing',
    badge: { ru: 'Лендинг · Медиа', en: 'Landing · Media' },
    title: 'Eclipse Media',
    shortDesc: {
      ru: 'Сайт медиа-продакшена с lazy-loading видеогалереей, анимированными переходами между секциями и страницами кейсов с embed-видео. Акцент на репутации команды.',
      en: 'Media production agency site with lazy-loading video gallery, animated section transitions and case pages with embedded video. Team reputation focus.',
    },
    tags: ['Next.js', 'Video', 'Animation'],
    colors: ['#A78BFA', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: сайт медиа-продакшена с акцентом на видеопортфолио и репутацию команды.\n\nРешение: Next.js + видео-секции с lazy-loading, анимированные переходы между секциями, страницы кейсов с embed-видео, форма заявки на съёмку.',
      en: 'Task: a media production agency site focused on video portfolio and team reputation.\n\nSolution: Next.js + video sections with lazy-loading, animated section transitions, case pages with embedded video, inquiry form.',
    },
    results: [
      { n: { ru: 'Video', en: 'Video' }, l: { ru: 'lazy-loading hero', en: 'lazy-loading hero' } },
      { n: { ru: 'Cases', en: 'Cases' }, l: { ru: 'портфолио с video', en: 'portfolio with video' } },
      { n: { ru: '8 дн', en: '8 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'HLS Video'],
    liveUrl: 'https://eclipse-media.pages.dev/',
  },
  {
    id: 'blackstone-barbershop',
    featured: false,
    category: 'landing',
    badge: { ru: 'Лендинг · Услуги', en: 'Landing · Services' },
    title: 'Blackstone Barbershop',
    shortDesc: {
      ru: 'Сайт мужского барбершопа с онлайн-записью на конкретного мастера и время, галереей стрижек и отзывами. Интеграция с Яндекс.Картами, 100% мобильный адаптив.',
      en: 'Men\'s barbershop site with online booking for specific master and time, haircut gallery and reviews. Yandex.Maps integration, 100% mobile-responsive.',
    },
    tags: ['Next.js', 'Booking', 'Gallery'],
    colors: ['#6BA3FF', '#A78BFA'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: лендинг барбершопа с онлайн-записью на конкретного мастера и конкретное время.\n\nРешение: Next.js + календарь записи с выбором мастера, прайс с иконками услуг, галерея стрижек, отзывы клиентов, карта и контакты.',
      en: 'Task: a barbershop landing with online booking to specific master and time.\n\nSolution: Next.js + booking calendar with master selection, service price list, haircut gallery, reviews, map and contacts.',
    },
    results: [
      { n: { ru: 'Online', en: 'Online' }, l: { ru: 'запись на мастера', en: 'master booking' } },
      { n: { ru: 'Mobile', en: 'Mobile' }, l: { ru: 'адаптив 100%', en: '100% responsive' } },
      { n: { ru: '5 дн', en: '5 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Yandex.Maps'],
    liveUrl: 'https://blackstone-barbershop.vercel.app/',
  },
  {
    id: 'fitness-booking-agent',
    featured: false,
    category: 'ai',
    badge: { ru: 'AI · Booking', en: 'AI · Booking' },
    title: 'Fitness Booking Agent',
    shortDesc: {
      ru: 'Платформа бронирования фитнес-тренировок с AI-агентом на OpenAI Function Calling — подбирает тренера и время под запрос пользователя. Telegram-напоминания и учёт абонементов.',
      en: 'Fitness booking platform with AI agent on OpenAI Function Calling — matches trainer and time to user request. Telegram reminders and membership tracking.',
    },
    tags: ['Next.js', 'OpenAI', 'Booking'],
    colors: ['#3DD68C', '#A78BFA'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: бронирование тренировок в фитнес-клубе с AI-агентом который подбирает время и тренера под запрос пользователя.\n\nРешение: Next.js + OpenAI Function Calling для агента, календарь тренеров, учёт абонементов, Telegram-напоминания о тренировках.',
      en: 'Task: fitness training booking with an AI agent that picks time and trainer based on user request.\n\nSolution: Next.js + OpenAI Function Calling for the agent, trainer calendar, membership tracking, Telegram training reminders.',
    },
    results: [
      { n: { ru: 'AI', en: 'AI' }, l: { ru: 'подбор тренера', en: 'trainer matching' } },
      { n: { ru: 'TG', en: 'TG' }, l: { ru: 'напоминания', en: 'reminders' } },
      { n: { ru: '3 нед', en: '3 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Telegram Bot API'],
    liveUrl: 'https://fitness-booking-agent.pages.dev/',
  },
  {
    id: 'parser-dashboard',
    featured: false,
    category: 'saas',
    badge: { ru: 'SaaS · Market Intelligence', en: 'SaaS · Market Intelligence' },
    title: 'SCOUT',
    shortDesc: {
      ru: 'No-code платформа парсинга маркетплейсов и конкурентов для отдела закупок и маркетинга. Визуальный конструктор селекторов, мониторинг в реальном времени, экспорт в Excel.',
      en: 'No-code marketplace & competitor scraping platform for procurement and marketing teams. Visual selector builder, real-time monitoring, Excel export.',
    },
    tags: ['Next.js', 'Python', 'Scraping'],
    colors: ['#6BA3FF', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: интерфейс для нон-техов чтобы запускать парсинги разных сайтов без кода. Видеть что работает, что упало, экспортировать в Excel.\n\nРешение: Next.js-фронт + Python-воркеры через очередь, визуальный конструктор селекторов, лог задач, экспорт результатов в CSV/Excel.',
      en: 'Task: a non-tech-friendly UI to launch scrapers on different sites without code. See what works, what failed, export to Excel.\n\nSolution: Next.js front + Python workers via queue, visual selector builder, task log, export to CSV/Excel.',
    },
    results: [
      { n: { ru: 'No-code', en: 'No-code' }, l: { ru: 'конструктор селекторов', en: 'selector builder' } },
      { n: { ru: 'CSV/XLS', en: 'CSV/XLS' }, l: { ru: 'экспорт данных', en: 'data export' } },
      { n: { ru: '3 нед', en: '3 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'Python', 'FastAPI', 'Selenium', 'Redis Queue', 'PostgreSQL'],
    liveUrl: 'https://08parserdashboard.vercel.app/',
  },
  {
    id: 'crm-dashboard',
    featured: false,
    category: 'dashboard',
    badge: { ru: 'Дашборд · CRM', en: 'Dashboard · CRM' },
    title: 'ORBIT CRM',
    shortDesc: {
      ru: 'Дашборд CRM-системы ORBIT с drag-and-drop воронкой сделок, KPI-виджетами на Recharts и фильтрами по менеджерам и датам. shadcn/ui компоненты, тёмная эстетика.',
      en: 'ORBIT CRM dashboard with drag-and-drop deal pipeline, Recharts KPI widgets and filters by manager and date. shadcn/ui components, dark aesthetic.',
    },
    tags: ['Next.js', 'Recharts', 'shadcn/ui'],
    colors: ['#A78BFA', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: демонстрация возможностей CRM-дашборда — продажи, воронки, KPI, команда, задачи.\n\nРешение: Next.js + shadcn/ui для админки, Recharts для графиков, drag-and-drop воронка сделок, фильтры по менеджерам и датам.',
      en: 'Task: showcase CRM dashboard capabilities — sales, pipelines, KPIs, team, tasks.\n\nSolution: Next.js + shadcn/ui admin UI, Recharts for charts, drag-and-drop deal pipeline, filters by manager and date.',
    },
    results: [
      { n: { ru: 'DnD', en: 'DnD' }, l: { ru: 'воронка сделок', en: 'deal pipeline' } },
      { n: { ru: 'Charts', en: 'Charts' }, l: { ru: 'KPI-виджеты', en: 'KPI widgets' } },
      { n: { ru: '2 нед', en: '2 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'shadcn/ui', 'Recharts', 'Tailwind'],
    liveUrl: 'https://05crmdashboard.vercel.app/dashboard',
  },
  {
    id: 'real-estate',
    featured: false,
    category: 'saas',
    badge: { ru: 'SaaS · Недвижимость', en: 'SaaS · Real Estate' },
    title: 'NOVA',
    shortDesc: {
      ru: 'Портал недвижимости NOVA — каталог объектов в Москве с интерактивной картой на Яндекс.Картах, фасетными фильтрами по району и цене, URL-синхронизацией для SEO. Карточки агентов.',
      en: 'NOVA real estate portal — Moscow property catalog with interactive Yandex.Maps, faceted district/price filters, URL sync for SEO. Agent cards.',
    },
    tags: ['Next.js', 'Maps', 'Filters'],
    colors: ['#3DD68C', '#6BA3FF'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: портал недвижимости с каталогом, интерактивной картой, фильтрами по району, цене, типу объекта.\n\nРешение: Next.js SSR-каталог с SEO, Яндекс.Карты для объектов, фасетные фильтры с URL-синхронизацией, карточки агентов.',
      en: 'Task: a real estate portal with catalog, interactive map, district/price/type filters.\n\nSolution: Next.js SSR catalog with SEO, Yandex.Maps for properties, faceted filters with URL sync, agent cards.',
    },
    results: [
      { n: { ru: 'SEO', en: 'SEO' }, l: { ru: 'SSR каталог', en: 'SSR catalog' } },
      { n: { ru: 'Maps', en: 'Maps' }, l: { ru: 'Яндекс.Карты', en: 'Yandex.Maps' } },
      { n: { ru: '3 нед', en: '3 wks' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Yandex.Maps', 'Tailwind'],
    liveUrl: 'https://06realestate.vercel.app/',
  },
  {
    id: 'saas-landing',
    featured: false,
    category: 'ai',
    badge: { ru: 'SaaS · AI · Наш продукт', en: 'SaaS · AI · Our Product' },
    title: 'MailPilot',
    shortDesc: {
      ru: 'AI email-маркетинговая платформа: визуальный конструктор писем, AI-подбор темы строки и тайминга отправки, A/B-тесты. Наш собственный SaaS-продукт в активной эксплуатации.',
      en: 'AI email marketing platform: visual email builder, AI subject-line and send-time suggestions, A/B testing. Our own SaaS product, in active use.',
    },
    tags: ['Next.js', 'AI', 'Наш SaaS'],
    colors: ['#A78BFA', '#3DD68C'],
    demo: false,
    demoNote: PROD_NOTE,
    desc: {
      ru: 'Задача: автоматизировать email-маркетинг для малого и среднего бизнеса — редактор шаблонов, AI-помощник для subject-line и таймингов, аналитика открытий и A/B-тесты.\n\nРешение: SaaS-платформа с визуальным конструктором писем, GPT для генерации subject-line в стиле бренда, отслеживанием открытий и кликов, интеграцией с SendGrid. Наш собственный продукт, развивается с 2025.',
      en: 'Task: automate email marketing for SMBs — template editor, AI assistant for subject lines and timing, open analytics and A/B tests.\n\nSolution: SaaS platform with visual email builder, GPT for brand-voice subject lines, open/click tracking, SendGrid integration. Our own product, evolving since 2025.',
    },
    results: [
      { n: { ru: 'Наш', en: 'Ours' }, l: { ru: 'собственный SaaS', en: 'own SaaS' } },
      { n: { ru: 'AI', en: 'AI' }, l: { ru: 'GPT-генерация тем', en: 'GPT subject lines' } },
      { n: { ru: 'Live', en: 'Live' }, l: { ru: 'активная разработка', en: 'active dev' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://03saaslanding.vercel.app/',
  },
  {
    id: 'landing-02',
    featured: false,
    category: 'landing',
    badge: { ru: 'Лендинг · Стоматология', en: 'Landing · Dental Clinic' },
    title: 'СмайлДент',
    shortDesc: {
      ru: 'Лендинг семейной стоматологии СмайлДент: онлайн-запись на приём, прайс по услугам с иконками, галерея работ, отзывы пациентов. SEO-оптимизация под региональные запросы.',
      en: 'SmileDent family dental clinic landing: online booking, service pricing with icons, work gallery, patient reviews. SEO-optimized for regional queries.',
    },
    tags: ['Next.js', 'SEO', 'Медицина'],
    colors: ['#6BA3FF', '#3DD68C'],
    demo: true,
    demoNote: DEMO_NOTE,
    desc: {
      ru: 'Задача: лендинг семейной стоматологии с онлайн-записью, понятным прайсом и акцентом на доверие (фото врачей, отзывы, сертификаты).\n\nРешение: Next.js + Tailwind, онлайн-форма записи с выбором услуги и времени, прайс-таблица с иконками услуг, галерея работ "до/после", отзывы с фото пациентов, SEO-оптимизация под локальные запросы (район, город).',
      en: 'Task: a family dental clinic landing with online booking, transparent pricing and trust signals (doctor photos, reviews, certificates).\n\nSolution: Next.js + Tailwind, online booking form with service and time selection, pricing table with service icons, before/after work gallery, patient photo reviews, SEO for local queries (district, city).',
    },
    results: [
      { n: { ru: 'Fast', en: 'Fast' }, l: { ru: '< 1 сек загрузка', en: '< 1 s load' } },
      { n: { ru: 'CRM', en: 'CRM' }, l: { ru: 'интеграция лидов', en: 'lead integration' } },
      { n: { ru: '3 дн', en: '3 days' }, l: { ru: 'срок под заказ', en: 'delivery time' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'REST API'],
    liveUrl: 'https://02landing.vercel.app/',
  },
]
