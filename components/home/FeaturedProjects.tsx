'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { PROJECTS, type ProjectData } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import { useT } from '@/lib/i18n'
import Reveal from '@/components/ui/Reveal'
import { GlowCard, type GlowColor } from '@/components/ui/spotlight-card'
import ProjectModal from '@/components/ui/ProjectModal'
import { BorderBeam } from '@/components/ui/BorderBeam'

const CATEGORY_GLOW: Record<string, GlowColor> = {
  saas:      'blue',
  landing:   'purple',
  dashboard: 'blue',
  ai:        'green',
  ecommerce: 'purple',
}

const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured)

export default function FeaturedProjects() {
  const { t, lang } = useT()
  const [active, setActive] = useState<ProjectData | null>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close])

  return (
    <section id="projects" className="ph-shell">
      <div className="ph-wrap">
        <Reveal>
          <SectionHeader label={t('proj.label')} title={t('proj.title')} />
        </Reveal>

        <Reveal stagger>
          <div className="proj-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}>
            {FEATURED_PROJECTS.map(p => (
              <GlowCard
                key={p.id}
                glowColor={CATEGORY_GLOW[p.category] ?? 'blue'}
                className="proj-card"
                onClick={() => setActive(p)}
                style={{
                  background: 'var(--bg-card)', padding: 0,
                  cursor: 'pointer', borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
                  position: 'relative',
                }}
              >
                <BorderBeam
                  duration={7}
                  delay={p.id.length * 1.5}
                  colorFrom="var(--accent)"
                  colorTo="var(--accent-2)"
                  borderWidth={1.5}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/projects/${p.id}-1.webp`}
                  alt={p.title}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  style={{
                    width: '100%', height: 200, objectFit: 'cover',
                    display: 'block',
                    borderBottom: '1px solid var(--border)',
                    background: `linear-gradient(135deg, ${p.colors[0]}18, ${p.colors[1]}10)`,
                  }}
                />
                <div style={{ padding: 28 }}>
                  <div className="proj-bar" style={{
                    height: 3, borderRadius: 2, marginBottom: 20, width: 48,
                    background: `linear-gradient(90deg, ${p.colors[0]}, ${p.colors[1]})`,
                    transition: 'width .3s',
                  }} />
                  <div style={{
                    fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
                    color: 'var(--text-dim)', marginBottom: 12,
                  }}>
                    {p.badge[lang]}
                  </div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 22, fontWeight: 400, letterSpacing: '-.025em',
                    color: 'var(--text)', marginBottom: 10,
                  }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 18 }}>
                    {p.shortDesc[lang]}
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {p.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        background: 'var(--tag-bg)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)', padding: '2px 9px', borderRadius: 4, fontSize: 11,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{
            display: 'flex', justifyContent: 'center', marginTop: 48,
          }}>
            <Link href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(var(--accent-rgb), .10)',
              border: '1px solid rgba(var(--accent-rgb), .25)',
              color: 'var(--accent)',
              padding: '14px 32px', borderRadius: 100,
              fontSize: 14, fontWeight: 500,
              textDecoration: 'none',
              transition: 'background .2s, border-color .2s, transform .2s',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(var(--accent-rgb), .18)'
                e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), .45)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(var(--accent-rgb), .10)'
                e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), .25)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {t('proj.viewAll')} <span style={{ fontSize: 18 }}>→</span>
            </Link>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  )
}

