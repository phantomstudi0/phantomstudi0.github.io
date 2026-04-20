'use client'
import SectionHeader from '@/components/ui/SectionHeader'
import { useT } from '@/lib/i18n'
import Reveal from '@/components/ui/Reveal'

const TEAM = [
  {
    initial: 'А',
    name: 'Алексей',
    nameEn: 'Alex',
    roleKey: 'team.1.role' as const,
    accent: 'blue',
    skills: ['Python', 'Node.js', 'PostgreSQL', 'Telegram bots'],
  },
  {
    initial: 'М',
    name: 'Максим',
    nameEn: 'Max',
    roleKey: 'team.2.role' as const,
    accent: 'green',
    skills: ['React', 'Next.js', 'Figma', 'Tailwind'],
  },
  {
    initial: 'Д',
    name: 'Даниил',
    nameEn: 'Daniel',
    roleKey: 'team.3.role' as const,
    accent: 'purple',
    skills: ['Flutter', 'Docker', 'VPS', 'CI/CD'],
  },
] as const

const ACCENT = {
  blue:   { color: '#6BA3FF', bg: 'rgba(107,163,255,.1)',  border: 'rgba(107,163,255,.25)' },
  green:  { color: '#3DD68C', bg: 'rgba(61,214,140,.08)',  border: 'rgba(61,214,140,.2)'  },
  purple: { color: '#A78BFA', bg: 'rgba(167,139,250,.08)', border: 'rgba(167,139,250,.2)' },
} as const

export default function Process() {
  const { t, lang } = useT()

  return (
    <section id="team" className="ph-shell">
      <div className="ph-wrap">
        <Reveal>
          <SectionHeader
            label={t('team.label')}
            title={t('team.title')}
            subtitle={t('team.subtitle')}
          />
        </Reveal>

        <Reveal stagger>
          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}>
            {TEAM.map(m => {
              const a = ACCENT[m.accent]
              return (
                <div key={m.name} className="member" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 28,
                  transition: 'border-color .3s, transform .4s cubic-bezier(.16,1,.3,1), box-shadow .3s',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 18, fontWeight: 500,
                    marginBottom: 16,
                    background: a.bg,
                    border: `1px solid ${a.border}`,
                    color: a.color,
                  }}>
                    {m.initial}
                  </div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 16, fontWeight: 400, letterSpacing: '-.02em',
                    color: 'var(--text)', marginBottom: 3,
                  }}>
                    {lang === 'ru' ? m.name : m.nameEn}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>
                    {t(m.roleKey)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {m.skills.map(s => (
                      <span key={s} style={{
                        background: 'var(--tag-bg)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 4, fontSize: 11,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
