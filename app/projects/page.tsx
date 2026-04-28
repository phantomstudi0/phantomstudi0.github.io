'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { PROJECTS, PROJECT_CATEGORIES, type ProjectData, type ProjectCategory } from '@/data/projects'
import { useT } from '@/lib/i18n'
import Reveal from '@/components/ui/Reveal'
import { GlowCard, type GlowColor } from '@/components/ui/spotlight-card'
import ProjectModal from '@/components/ui/ProjectModal'

const CATEGORY_GLOW: Record<string, GlowColor> = {
  saas:      'blue',
  landing:   'purple',
  dashboard: 'blue',
  ai:        'green',
  ecommerce: 'purple',
}

type Filter = ProjectCategory | 'all'

export default function ProjectsPage() {
  const { t, lang } = useT()
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<ProjectData | null>(null)
  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close])

  const filtered = useMemo(
    () => filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter),
    [filter]
  )

  return (
    <main style={{ paddingTop: 120, paddingBottom: 120, minHeight: '100vh' }}>
      <div className="ph-wrap">
        <Reveal>
          <Link href="/" style={{
            fontSize: 13, color: 'var(--text-muted)',
            textDecoration: 'none', marginBottom: 32, display: 'inline-block',
            transition: 'color .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {t('proj.backHome')}
          </Link>
        </Reveal>

        <Reveal>
          <div style={{
            fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'var(--accent)', fontWeight: 500, marginBottom: 14,
          }}>
            {t('proj.label')}
          </div>
          <h1 className="g-title" style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 400, letterSpacing: '-.04em', lineHeight: 1.05,
            margin: 0, marginBottom: 18,
          }}>
            {t('proj.allTitle')}
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            color: 'var(--text-soft)', lineHeight: 1.6,
            maxWidth: 640, margin: 0, marginBottom: 48,
          }}>
            {t('proj.allSub')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            marginBottom: 40, paddingBottom: 24,
            borderBottom: '1px solid var(--border)',
          }}>
            {PROJECT_CATEGORIES.map(cat => {
              const isActive = filter === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as Filter)}
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--tag-bg)',
                    color: isActive ? 'var(--btn-fg)' : 'var(--text-soft)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    padding: '9px 18px', borderRadius: 100,
                    fontSize: 13, fontWeight: 500,
                    fontFamily: 'DM Sans, sans-serif',
                    cursor: 'pointer',
                    transition: 'all .2s',
                  }}
                >
                  {cat.label[lang]}
                </button>
              )
            })}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            color: 'var(--text-muted)', fontSize: 14,
          }}>
            {t('proj.noMatch')}
          </div>
        ) : (
          <Reveal stagger>
            <div className="proj-grid-all" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 14,
            }}>
              {filtered.map(p => (
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
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/projects/${p.id}-1.webp`}
                    alt={p.title}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    style={{
                      width: '100%', height: 180, objectFit: 'cover',
                      display: 'block',
                      borderBottom: '1px solid var(--border)',
                      background: `linear-gradient(135deg, ${p.colors[0]}18, ${p.colors[1]}10)`,
                    }}
                  />
                  <div style={{ padding: 24 }}>
                    <div style={{
                      height: 3, borderRadius: 2, marginBottom: 18, width: 40,
                      background: `linear-gradient(90deg, ${p.colors[0]}, ${p.colors[1]})`,
                    }} />
                    <div style={{
                      fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
                      color: 'var(--text-dim)', marginBottom: 10,
                    }}>
                      {p.badge[lang]}
                    </div>
                    <div style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 20, fontWeight: 400, letterSpacing: '-.025em',
                      color: 'var(--text)', marginBottom: 8,
                    }}>
                      {p.title}
                    </div>
                    <div style={{
                      fontSize: 12.5, color: 'var(--text-muted)',
                      lineHeight: 1.55, marginBottom: 16,
                    }}>
                      {p.shortDesc[lang]}
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {p.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{
                          background: 'var(--tag-bg)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-muted)', padding: '2px 9px',
                          borderRadius: 4, fontSize: 11,
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
        )}
      </div>

      <ProjectModal project={active} onClose={close} />
    </main>
  )
}
