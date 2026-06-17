'use client'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { useT } from '@/lib/i18n'

interface Platform {
  name: string
  handle: string | null
  url: string | null
  color: string
  active: boolean
  icon: React.ReactNode
  description: { ru: string; en: string }
}

const PLATFORMS: Platform[] = [
  {
    name: 'Kwork',
    handle: '@phantomteam',
    url: 'https://kwork.ru/user/phantomteam',
    color: '#2ECC71',
    active: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#2ECC71" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="18" fontWeight="800" fontFamily="Outfit, sans-serif">K</text>
      </svg>
    ),
    description: { ru: 'Русскоязычная биржа фриланса', en: 'Russian freelance marketplace' },
  },
  {
    name: 'FL.ru',
    handle: '@phantombuisnes',
    url: 'https://www.fl.ru/users/phantombuisnes/portfolio/',
    color: '#FF6B35',
    active: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#FF6B35" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">FL</text>
      </svg>
    ),
    description: { ru: 'Ведущая биржа фриланса РФ', en: 'Top Russian freelance exchange' },
  },
  {
    name: 'Freelancer',
    handle: null,
    url: null,
    color: '#29B2FE',
    active: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#29B2FE" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">Fr</text>
      </svg>
    ),
    description: { ru: 'Международная платформа', en: 'International freelance platform' },
  },
  {
    name: 'Upwork',
    handle: '@phantomteam',
    url: 'https://www.upwork.com/freelancers/~01cecb022f13956a35',
    color: '#6FDA44',
    active: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#6FDA44" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">Up</text>
      </svg>
    ),
    description: { ru: 'Топ платформа для IT', en: 'Top platform for IT freelancers' },
  },
  {
    name: 'Telegram',
    handle: '@phantomteamdev',
    url: 'https://t.me/phantomteamdev',
    color: '#2AABEE',
    active: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#2AABEE" />
        <path d="M8 20.5l4.5 1.5 2 5.5 3-3.5 5 3.5 5.5-15-20 8z" fill="white" opacity="0.5"/>
        <path d="M8 20.5l20-8-5.5 15-5-3.5-3 3.5-2-5.5-4.5-1.5z" fill="none"/>
        <path d="M9 20l19.5-7.5-5.5 14.5-4.5-3-3.5 3.5-1.5-5-4.5-2.5z" fill="white"/>
      </svg>
    ),
    description: { ru: 'Наш канал — кейсы и новости', en: 'Our channel — cases & news' },
  },
  {
    name: 'Fiverr',
    handle: null,
    url: null,
    color: '#1DBF73',
    active: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1DBF73" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">Fi</text>
      </svg>
    ),
    description: { ru: 'Глобальный маркетплейс услуг', en: 'Global services marketplace' },
  },
]

export default function FreelanceProfiles() {
  const { t, lang } = useT()

  return (
    <section className="ph-shell">
      <div className="ph-wrap">
        <Reveal>
          <SectionHeader label={t('fl.label')} title={t('fl.title')} subtitle={t('fl.subtitle')} />
        </Reveal>

        <Reveal stagger>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14,
            marginTop: 48,
          }}>
            {PLATFORMS.map(p => (
              <div
                key={p.name}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${p.active ? `${p.color}40` : 'var(--border)'}`,
                  borderRadius: 16,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform .25s, box-shadow .25s, border-color .25s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-3px)'
                  el.style.borderColor = `${p.color}70`
                  el.style.boxShadow = `0 12px 32px ${p.color}18`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = p.active ? `${p.color}40` : 'var(--border)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* glow top-right */}
                {p.active && (
                  <div aria-hidden style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 80, height: 80, borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}22, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {p.icon}
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
                    textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999,
                    background: p.active ? `${p.color}20` : 'var(--tag-bg)',
                    color: p.active ? p.color : 'var(--text-dim)',
                    border: `1px solid ${p.active ? `${p.color}40` : 'var(--border)'}`,
                  }}>
                    {p.active ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: p.color, boxShadow: `0 0 6px ${p.color}`,
                          animation: 'ph-blink 2s ease-in-out infinite',
                          display: 'inline-block',
                        }} />
                        {t('fl.active')}
                      </span>
                    ) : t('fl.soon')}
                  </span>
                </div>

                {/* name + handle */}
                <div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 18, fontWeight: 600, letterSpacing: '-.02em',
                    color: 'var(--text)',
                  }}>
                    {p.name}
                  </div>
                  {p.handle && (
                    <div style={{ fontSize: 12, color: p.color, marginTop: 2 }}>{p.handle}</div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
                    {p.description[lang]}
                  </div>
                </div>

                {/* CTA */}
                {p.active && p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      fontSize: 12, fontWeight: 600,
                      color: p.color,
                      textDecoration: 'none',
                      marginTop: 'auto',
                      transition: 'opacity .15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.75' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    {t('fl.visit')}
                  </a>
                ) : (
                  <span style={{
                    fontSize: 12, color: 'var(--text-dim)',
                    marginTop: 'auto',
                  }}>
                    — скоро —
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
