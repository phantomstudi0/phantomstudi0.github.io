'use client'
import { useState, useEffect } from 'react'
import { useT } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useT()
  const { toggle: toggleTheme } = useTheme()

  const NAV = [
    { href: '#services', label: t('nav.services') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact',  label: t('nav.contact') },
  ]

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background-color .35s, border-color .35s',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        <a href="#" style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em',
          color: 'var(--text)', textDecoration: 'none',
        }}>
          Phantom<span style={{ color: 'var(--accent)' }}>.</span>Studio
        </a>

        <div className="nav-links-desktop" style={{ display: 'flex', gap: 32 }}>
          {NAV.map(item => (
            <a key={item.href} href={item.href} style={{
              fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none',
              transition: 'color .15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-toggles-desktop" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="pill" role="group" aria-label="Language">
            <button
              className={lang === 'ru' ? 'active' : ''}
              onClick={() => setLang('ru')}
              aria-pressed={lang === 'ru'}
            >RU</button>
            <button
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >EN</button>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 34, height: 34,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .2s, border-color .2s, transform .2s',
              padding: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <span className="theme-toggle-icon-sun" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </span>
            <span className="theme-toggle-icon-moon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            </span>
          </button>

          <a href="#contact" className="nav-cta-desktop" style={{
            background: 'rgba(var(--accent-rgb), 0.12)',
            border: '1px solid rgba(var(--accent-rgb), 0.25)',
            color: 'var(--accent)',
            padding: '8px 20px', borderRadius: 8,
            fontSize: 13, fontWeight: 500,
            textDecoration: 'none', transition: 'all .2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.2)'
              e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.12)'
              e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.25)'
            }}
          >
            {t('nav.cta')}
          </a>
        </div>

        <button className="nav-burger" onClick={() => setOpen(!open)} style={{
          display: 'none', background: 'none', border: 'none',
          color: 'var(--text-soft)', cursor: 'pointer', padding: 4,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          padding: '12px 20px 20px',
        }}>
          {NAV.map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0',
              fontSize: 14, color: 'var(--text-soft)', textDecoration: 'none',
              borderBottom: '1px solid var(--border)',
            }}>
              {item.label}
            </a>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <div className="pill" role="group" aria-label="Language">
              <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RU</button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: 34, height: 34,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: 0,
              }}
            >
              <span className="theme-toggle-icon-sun" aria-hidden="true">☀</span>
              <span className="theme-toggle-icon-moon" aria-hidden="true">◐</span>
            </button>
          </div>

          <a href="#contact" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 16, padding: '12px 20px',
            background: 'rgba(var(--accent-rgb), 0.12)',
            border: '1px solid rgba(var(--accent-rgb), 0.25)',
            color: 'var(--accent)', borderRadius: 8,
            fontSize: 13, fontWeight: 500, textAlign: 'center', textDecoration: 'none',
          }}>
            {t('nav.cta')}
          </a>
        </div>
      )}
    </nav>
  )
}
