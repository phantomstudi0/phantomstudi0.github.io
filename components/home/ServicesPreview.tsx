'use client'
import { SERVICES } from '@/data/services'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICE_ICON } from '@/components/ui/icons'
import { useT } from '@/lib/i18n'
import Reveal from '@/components/ui/Reveal'
import { GlowCard } from '@/components/ui/spotlight-card'

const ACCENT_MAP = {
  blue:   { color: '#6BA3FF', bg: 'rgba(107,163,255,.1)',  border: 'rgba(107,163,255,.2)',  line: 'rgba(107,163,255,.5)' },
  green:  { color: '#3DD68C', bg: 'rgba(61,214,140,.08)',  border: 'rgba(61,214,140,.2)',   line: 'rgba(61,214,140,.4)'  },
  purple: { color: '#A78BFA', bg: 'rgba(167,139,250,.08)', border: 'rgba(167,139,250,.2)',  line: 'rgba(167,139,250,.4)' },
} as const

export default function ServicesPreview() {
  const { t, lang } = useT()

  return (
    <section id="services" className="ph-shell">
      <div className="ph-wrap">
        <Reveal>
          <SectionHeader
            label={t('svc.label')}
            title={t('svc.title')}
            subtitle={t('svc.subtitle')}
          />
        </Reveal>

        <Reveal stagger>
          <div className="svc-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}>
            {SERVICES.map(s => {
              const a = ACCENT_MAP[s.accent]
              const Icon = SERVICE_ICON[s.icon]
              return (
                <GlowCard
                  key={s.num}
                  glowColor={s.accent}
                  className={`svc-card svc-${s.accent}`}
                  style={{
                    background: 'var(--bg-card)',
                    padding: '32px 28px',
                    borderRadius: 16,
                    transition: 'transform .5s cubic-bezier(.16,1,.3,1), box-shadow .3s',
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    background: a.bg,
                    border: `1px solid ${a.border}`,
                    color: a.color,
                  }}>
                    <Icon size={18} />
                  </div>
                  <div style={{
                    fontSize: 10, color: 'var(--text-dim)',
                    letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 12,
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 17, fontWeight: 400, letterSpacing: '-.02em',
                    color: 'var(--text)', marginBottom: 10,
                  }}>
                    {s.title[lang]}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 16 }}>
                    {s.description[lang]}
                  </div>
                  <div style={{ fontSize: 12, color: a.color }}>{s.price[lang]}</div>
                </GlowCard>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
