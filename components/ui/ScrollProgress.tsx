'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200,
        height: 2,
        width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
        transition: 'width 80ms linear',
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(var(--accent-rgb), 0.6)',
      }}
    />
  )
}
