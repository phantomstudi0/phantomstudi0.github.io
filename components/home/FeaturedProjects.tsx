'use client'
import { useState, useEffect, useCallback } from 'react'
import { PROJECTS, type ProjectData } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import { IconInfo } from '@/components/ui/icons'
import { useT } from '@/lib/i18n'
import Reveal from '@/components/ui/Reveal'
import { GlowCard, type GlowColor } from '@/components/ui/spotlight-card'

const PROJECT_GLOW: Record<string, GlowColor> = {
  scout:     'blue',
  mailpilot: 'green',
  dentalight:'blue',
  pulse:     'purple',
}

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
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}>
            {PROJECTS.map(p => (
              <GlowCard
                key={p.id}
                glowColor={PROJECT_GLOW[p.id] ?? 'blue'}
                className="proj-card"
                onClick={() => setActive(p)}
                style={{
                  background: 'var(--bg-card)', padding: 36,
                  cursor: 'pointer', borderRadius: 16,
                  transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <div className="proj-bar" style={{
                  height: 3, borderRadius: 2, marginBottom: 24, width: 48,
                  background: `linear-gradient(90deg, ${p.colors[0]}, ${p.colors[1]})`,
                  transition: 'width .3s',
                }} />
                <div style={{
                  fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
                  color: 'var(--text-dim)', marginBottom: 14,
                }}>
                  {p.badge[lang]}
                </div>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 26, fontWeight: 400, letterSpacing: '-.03em',
                  color: 'var(--text)', marginBottom: 10,
                }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 24 }}>
                  {p.shortDesc[lang]}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)', padding: '3px 10px', borderRadius: 4, fontSize: 11,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="proj-more" style={{
                  fontSize: 12, color: 'var(--text-muted)',
                  letterSpacing: '.06em', textTransform: 'uppercase',
                  transition: 'color .2s',
                }}>
                  {t('proj.more')}
                </div>
              </GlowCard>
            ))}
          </div>
        </Reveal>
      </div>

      <Modal project={active} onClose={close} />
    </section>
  )
}

function Modal({ project, onClose }: { project: ProjectData | null; onClose: () => void }) {
  const { t, lang } = useT()
  const open = project !== null
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'var(--modal-backdrop)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity .25s',
      }}
    >
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        width: '100%', maxWidth: 880,
        maxHeight: '90vh', overflowY: 'auto',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.98)',
        transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
        position: 'relative',
      }}>
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', justifyContent: 'flex-end',
          padding: '20px 24px 0',
          background: 'linear-gradient(var(--bg-card), transparent)',
        }}>
          <button onClick={onClose} style={{
            background: 'var(--tag-bg)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            width: 36, height: 36, borderRadius: 8,
            fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            ✕
          </button>
        </div>

        {project && (
          <div style={{ padding: '0 40px 40px' }}>
            <ScreenshotSlider project={project} />

            <div style={{
              fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase',
              color: 'var(--text-dim)', marginBottom: 12,
            }}>
              {project.badge[lang]}
            </div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 38, fontWeight: 400, letterSpacing: '-.04em',
              color: 'var(--text)', marginBottom: 24,
            }}>
              {project.title}
            </div>

            <div className="modal-cols" style={{
              display: 'grid', gridTemplateColumns: '1fr 260px',
              gap: 32, marginBottom: 28,
            }}>
              <div>
                <div style={{
                  fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', marginBottom: 10,
                }}>
                  {t('proj.about')}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.75 }}>
                  {project.demo && (
                    <div style={{
                      background: 'rgba(var(--accent-rgb), 0.06)',
                      border: '1px solid rgba(var(--accent-rgb), 0.15)',
                      borderRadius: 8, padding: '10px 14px', marginBottom: 24,
                      fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5,
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1, display: 'inline-flex' }}>
                        <IconInfo size={14} />
                      </span>
                      {project.demoNote[lang]}
                    </div>
                  )}
                  {project.desc[lang].split('\n\n').map((p, i) => (
                    <p key={i} style={{ marginBottom: 12 }}>{p}</p>
                  ))}
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', marginBottom: 12,
                }}>
                  {t('proj.results')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {project.results.map((r, i) => (
                    <div key={i} style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 8, padding: '12px 16px',
                    }}>
                      <div style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 24, fontWeight: 500, letterSpacing: '-.03em',
                        color: project.colors[0],
                      }}>
                        {r.n[lang]}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.l[lang]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: 10,
            }}>
              {t('proj.stack')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
              {project.stack.map(s => (
                <span key={s} style={{
                  background: 'var(--tag-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-soft)', padding: '4px 12px', borderRadius: 6, fontSize: 12,
                }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{
              display: 'flex', gap: 10, flexWrap: 'wrap',
              borderTop: '1px solid var(--border)', paddingTop: 24,
            }}>
              <a href="#contact" onClick={onClose} style={{
                background: 'var(--accent)', color: 'var(--btn-fg)',
                padding: '11px 24px', borderRadius: 8,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
                {t('proj.want')}
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                  background: 'transparent', color: 'var(--text-soft)',
                  border: '1px solid var(--border)',
                  padding: '11px 24px', borderRadius: 8,
                  fontSize: 13, textDecoration: 'none',
                }}>
                  {t('proj.demo')}
                </a>
              )}
              <button onClick={onClose} style={{
                background: 'transparent', color: 'var(--text-soft)',
                border: '1px solid var(--border)',
                padding: '11px 24px', borderRadius: 8,
                fontSize: 13, cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                marginLeft: 'auto',
              }}>
                {t('proj.close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ScreenshotSlider({ project }: { project: ProjectData }) {
  const { t } = useT()
  const shots = project.screenshots ?? []
  const [idx, setIdx] = useState(0)

  useEffect(() => { setIdx(0) }, [project.id])

  const hasShots = shots.length > 0

  return (
    <div style={{
      width: '100%', height: 280, borderRadius: 12, marginBottom: 32,
      position: 'relative', overflow: 'hidden',
      border: '1px solid var(--border)',
      background: `linear-gradient(135deg, ${project.colors[0]}18, ${project.colors[1]}10)`,
    }}>
      {hasShots ? (
        <>
          {shots.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${project.title} — ${i + 1}`}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: i === idx ? 1 : 0,
                transition: 'opacity .35s',
              }}
            />
          ))}
          {shots.length > 1 && (
            <>
              <button
                aria-label={t('proj.prev')}
                onClick={() => setIdx((idx - 1 + shots.length) % shots.length)}
                style={navBtnStyle('left')}
              >
                ‹
              </button>
              <button
                aria-label={t('proj.next')}
                onClick={() => setIdx((idx + 1) % shots.length)}
                style={navBtnStyle('right')}
              >
                ›
              </button>
              <div style={{
                position: 'absolute', bottom: 14, left: 0, right: 0,
                display: 'flex', gap: 6, justifyContent: 'center',
              }}>
                {shots.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`${i + 1}`}
                    onClick={() => setIdx(i)}
                    style={{
                      width: i === idx ? 20 : 6, height: 6, borderRadius: 99,
                      background: i === idx ? 'var(--dot-active)' : 'var(--dot-inactive)',
                      border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'width .2s, background .2s',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 48, fontWeight: 700, letterSpacing: '-.04em',
            opacity: .15, color: project.colors[0],
          }}>
            {project.title}
          </div>
        </div>
      )}
    </div>
  )
}

function navBtnStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [side]: 12,
    width: 36, height: 36, borderRadius: 8,
    background: 'var(--slider-nav-bg)',
    border: '1px solid rgba(255,255,255,.12)',
    backdropFilter: 'blur(8px)',
    color: 'var(--slider-nav-fg)',
    fontSize: 20, lineHeight: 1,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'DM Sans, sans-serif',
  } as React.CSSProperties
}
