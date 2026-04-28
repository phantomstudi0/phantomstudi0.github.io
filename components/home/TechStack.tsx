'use client'
import { Marquee } from '@/components/ui/Marquee'

const TECHS = [
  { name: 'Next.js',      icon: '▲' },
  { name: 'React',        icon: '⚛' },
  { name: 'TypeScript',   icon: '𝙏𝙎' },
  { name: 'Flutter',      icon: '◈' },
  { name: 'Python',       icon: '🐍' },
  { name: 'Node.js',      icon: '⬡' },
  { name: 'PostgreSQL',   icon: '🐘' },
  { name: 'Telegram API', icon: '✈' },
  { name: 'Tailwind CSS', icon: '◎' },
  { name: 'Docker',       icon: '🐳' },
  { name: 'Vercel',       icon: '△' },
  { name: 'Supabase',     icon: '⚡' },
]

function TechItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 20px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      background: 'var(--bg-card)',
      color: 'var(--text-muted)',
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      transition: 'border-color .2s, color .2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(var(--accent-rgb), .35)'
        ;(e.currentTarget as HTMLElement).style.color = 'var(--text-soft)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
        ;(e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
      }}
    >
      <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
      {name}
    </div>
  )
}

export default function TechStack() {
  return (
    <section style={{ padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
      {/* fade edges */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, var(--bg) 0%, transparent 12%, transparent 88%, var(--bg) 100%)',
      }} />

      <Marquee gap={12} duration={35} pauseOnHover repeat={3}>
        {TECHS.map(t => <TechItem key={t.name} {...t} />)}
      </Marquee>

      <div style={{ marginTop: 12 }}>
        <Marquee gap={12} duration={28} reverse pauseOnHover repeat={3}>
          {[...TECHS].reverse().map(t => <TechItem key={t.name} {...t} />)}
        </Marquee>
      </div>
    </section>
  )
}
