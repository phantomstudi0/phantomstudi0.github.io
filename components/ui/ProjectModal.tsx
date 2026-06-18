'use client'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { type ProjectData } from '@/data/projects'
import { IconInfo } from '@/components/ui/icons'
import { useT } from '@/lib/i18n'

interface Props {
  project: ProjectData | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
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
              <a href="/#contact" onClick={onClose} style={{
                background: 'var(--accent)', color: 'var(--btn-fg)',
                padding: '11px 24px', borderRadius: 8,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
                {t('proj.want')}
              </a>
              {project.liveUrl && !project.liveUrl.includes('.vercel.app') && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                  background: 'transparent', color: 'var(--text-soft)',
                  border: '1px solid var(--border)',
                  padding: '11px 24px', borderRadius: 8,
                  fontSize: 13, textDecoration: 'none',
                }}>
                  {project.demo ? t('proj.demo') : t('proj.live')}
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
  // Кандидаты: либо явно заданные, либо конвенция /projects/{id}-{1..6}.webp
  const candidates = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [1, 2, 3, 4, 5, 6].map(n => `/projects/${project.id}-${n}.webp`)
  const [idx, setIdx] = useState(0)
  const [direction, setDirection] = useState(0) // -1 = prev, +1 = next
  const [errored, setErrored] = useState<Record<number, boolean>>({})
  const [preloaded, setPreloaded] = useState<Record<number, boolean>>({})

  useEffect(() => { setIdx(0); setDirection(0); setErrored({}); setPreloaded({}) }, [project.id])

  // Превалидация: пробуем загрузить все кандидаты — определяем реальное кол-во
  useEffect(() => {
    candidates.forEach((src, i) => {
      if (preloaded[i] || errored[i]) return
      const img = new Image()
      img.onload = () => setPreloaded(prev => ({ ...prev, [i]: true }))
      img.onerror = () => setErrored(prev => ({ ...prev, [i]: true }))
      img.src = src
    })
  }, [project.id])

  // Валидные кадры — только те что реально загрузились
  const shots = candidates.filter((_, i) => preloaded[i] && !errored[i])
  const hasShots = shots.length > 0
  const currentSrc = shots[idx]

  const go = (dir: number) => {
    setDirection(dir)
    setIdx(i => (i + dir + shots.length) % shots.length)
  }

  // Keyboard nav
  useEffect(() => {
    if (!hasShots) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'ArrowRight') go(+1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hasShots, shots.length])

  return (
    <div style={{
      width: '100%', aspectRatio: '16 / 10', borderRadius: 12, marginBottom: 32,
      position: 'relative', overflow: 'hidden',
      border: '1px solid var(--border)',
      background: `linear-gradient(135deg, ${project.colors[0]}18, ${project.colors[1]}10)`,
    }}>
      {hasShots && currentSrc ? (
        <>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentSrc}
              src={currentSrc}
              alt={`${project.title} — ${idx + 1}`}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir >= 0 ? '100%' : '-100%',
                  opacity: 0,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                },
                exit: (dir: number) => ({
                  x: dir >= 0 ? '-100%' : '100%',
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 260, damping: 32 },
                opacity: { duration: 0.2 },
              }}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                willChange: 'transform',
              }}
            />
          </AnimatePresence>
          {shots.length > 1 && (
            <>
              <button
                aria-label={t('proj.prev')}
                onClick={() => go(-1)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
                style={navBtnStyle('left')}
              >
                ‹
              </button>
              <button
                aria-label={t('proj.next')}
                onClick={() => go(+1)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
                style={navBtnStyle('right')}
              >
                ›
              </button>
              <div style={{
                position: 'absolute', bottom: 14, left: 0, right: 0,
                display: 'flex', gap: 6, justifyContent: 'center',
                zIndex: 2,
              }}>
                {shots.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`${i + 1}`}
                    onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i) }}
                    style={{
                      width: i === idx ? 24 : 6, height: 6, borderRadius: 99,
                      background: i === idx ? 'var(--dot-active)' : 'var(--dot-inactive)',
                      border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'width .25s cubic-bezier(.16,1,.3,1), background .2s',
                    }}
                  />
                ))}
              </div>
              <div style={{
                position: 'absolute', top: 12, right: 14,
                background: 'var(--slider-nav-bg)',
                color: 'var(--slider-nav-fg)',
                padding: '4px 10px', borderRadius: 99,
                fontSize: 11, fontWeight: 500,
                fontFamily: 'DM Sans, sans-serif',
                backdropFilter: 'blur(8px)',
                zIndex: 2,
              }}>
                {idx + 1} / {shots.length}
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
    [side]: 14,
    width: 40, height: 40, borderRadius: 99,
    background: 'var(--slider-nav-bg)',
    border: '1px solid rgba(255,255,255,.14)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'var(--slider-nav-fg)',
    fontSize: 22, lineHeight: 1,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'transform .2s cubic-bezier(.16,1,.3,1), background .2s',
    zIndex: 2,
  } as React.CSSProperties
}
