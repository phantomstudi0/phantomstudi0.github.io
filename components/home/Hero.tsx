'use client'
import { useT } from '@/lib/i18n'
import Reveal from '@/components/ui/Reveal'
import ShaderBackground from '@/components/ui/ShaderBackground'

export default function Hero() {
  const { t } = useT()

  const STATS = [
    { n: t('hero.stat1.n'), l: t('hero.stat1.l'), color: '#6BA3FF' },
    { n: t('hero.stat2.n'), l: t('hero.stat2.l'), color: '#3DD68C' },
    { n: t('hero.stat3.n'), l: t('hero.stat3.l'), color: '#A78BFA' },
    { n: t('hero.stat4.n'), l: t('hero.stat4.l'), color: '#9DC4FF' },
  ]

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.55,
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 35%, #000 70%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 35%, #000 70%)',
      }}>
        <ShaderBackground />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent 70%, var(--bg) 100%)',
      }} />

      <div className="ph-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500,
          background: 'radial-gradient(ellipse at 50% 0%, var(--glow-blue), transparent 65%)',
          pointerEvents: 'none',
        }} />

        <Reveal>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(var(--accent-rgb), 0.08)',
            border: '1px solid rgba(var(--accent-rgb), 0.2)',
            padding: '6px 14px', borderRadius: 100,
            fontSize: 11, fontWeight: 500,
            color: 'var(--accent)', letterSpacing: '.08em', textTransform: 'uppercase',
            marginBottom: 36,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#3DD68C', boxShadow: '0 0 8px #3DD68C',
              animation: 'ph-blink 2s ease-in-out infinite',
            }} />
            {t('hero.badge')}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(3.2rem, 7vw, 6.5rem)',
            fontWeight: 500, letterSpacing: '-.045em', lineHeight: 0.95,
            marginBottom: 28, maxWidth: 740,
          }}>
            <span className="g1">{t('hero.t1')}</span><br />
            <span className="g2">{t('hero.t2')}</span><br />
            <span className="g3">{t('hero.t3')}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            fontSize: 17, color: 'var(--text-soft)',
            lineHeight: 1.7, maxWidth: 450, marginBottom: 48,
            whiteSpace: 'pre-line',
          }}>
            {t('hero.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              background: 'var(--accent)', color: 'var(--btn-fg)',
              padding: '13px 28px', borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'background .2s, transform .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t('hero.cta')}
            </a>
            <a href="#projects" style={{
              background: 'transparent', color: 'var(--text-soft)',
              border: '1px solid var(--border)',
              padding: '13px 24px', borderRadius: 8,
              fontSize: 14, textDecoration: 'none',
              transition: 'border-color .2s, color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-soft)' }}
            >
              {t('hero.cta2')}
            </a>
          </div>
        </Reveal>

        <Reveal stagger delay={100}>
          <div className="hero-stats" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1, background: 'var(--border)',
            border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
            marginTop: 80,
          }}>
            {STATS.map(s => (
              <div key={s.l} style={{ background: 'var(--bg-card)', padding: '28px 24px' }}>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 40, fontWeight: 500, letterSpacing: -2, lineHeight: 1,
                  marginBottom: 6, color: s.color,
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontSize: 11, color: 'var(--text-dim)',
                  textTransform: 'uppercase', letterSpacing: '.14em',
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}
