'use client'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { useT } from '@/lib/i18n'

interface Review {
  text: { ru: string; en: string }
  author: string
  project: { ru: string; en: string }
  stars: number
}

const REVIEWS: Review[] = [
  {
    text: {
      ru: 'Сделали сайт быстро и без лишних вопросов. Объяснил что хочу — через несколько дней уже был готовый результат. Внесли правки без проблем.',
      en: 'Built the site quickly and without unnecessary questions. I explained what I wanted — a few days later the result was ready. Made edits without any issues.',
    },
    author: 'Вадим Б.',
    project: { ru: 'Лендинг для ведущего мероприятий', en: 'Event host landing page' },
    stars: 5,
  },
  {
    text: {
      ru: 'Отличная работа, всё сделано аккуратно. Сайт работает стабильно, клиенты находят через поиск. Рекомендую.',
      en: 'Great work, everything done neatly. The site works stable, clients find it through search. Recommended.',
    },
    author: 'Алексей М.',
    project: { ru: 'Интернет-магазин электроники', en: 'Electronics online store' },
    stars: 5,
  },
  {
    text: {
      ru: 'Реализовали сложный функционал — регистрация, оплата взносов, календарь турниров. Всё работает как надо. Будем обращаться ещё.',
      en: 'Implemented complex functionality — registration, fee payments, tournament calendar. Everything works as needed. Will contact again.',
    },
    author: 'Федерация нард КО',
    project: { ru: 'Спортивный портал', en: 'Sports portal' },
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t, lang } = useT()

  return (
    <section className="ph-shell">
      <div className="ph-wrap">
        <Reveal>
          <SectionHeader
            label={lang === 'ru' ? 'Отзывы' : 'Reviews'}
            title={lang === 'ru' ? 'Что говорят клиенты' : 'What clients say'}
            subtitle={lang === 'ru'
              ? 'Работаем честно — результат говорит сам за себя'
              : 'We work honestly — the result speaks for itself'}
          />
        </Reveal>

        <Reveal stagger>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 14,
            marginTop: 48,
          }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* quote mark */}
                <div aria-hidden style={{
                  position: 'absolute', top: 16, right: 20,
                  fontSize: 80, lineHeight: 1,
                  color: 'rgba(var(--accent-rgb), 0.06)',
                  fontFamily: 'Georgia, serif',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  "
                </div>

                <Stars count={r.stars} />

                <p style={{
                  fontSize: 14,
                  color: 'var(--text-soft)',
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                }}>
                  {r.text[lang]}
                </p>

                <div style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 14, fontWeight: 600,
                    color: 'var(--text)',
                  }}>
                    {r.author}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    {r.project[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <a
              href="https://t.me/reviewsphantomteam"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(42,171,238,.10)',
                border: '1px solid rgba(42,171,238,.28)',
                color: '#2AABEE',
                padding: '14px 32px', borderRadius: 100,
                fontSize: 14, fontWeight: 500,
                textDecoration: 'none',
                transition: 'background .2s, border-color .2s',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(42,171,238,.20)'
                e.currentTarget.style.borderColor = 'rgba(42,171,238,.50)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(42,171,238,.10)'
                e.currentTarget.style.borderColor = 'rgba(42,171,238,.28)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.23l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.983.329z"/>
              </svg>
              {lang === 'ru' ? 'Все отзывы в Telegram' : 'All reviews on Telegram'}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
