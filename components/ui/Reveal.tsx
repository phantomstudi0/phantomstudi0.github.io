'use client'
import { useEffect, useRef, useState, useLayoutEffect, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  stagger?: boolean
  threshold?: number
  delay?: number
}

// Use layout effect on client, no-op during SSR
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function Reveal({
  children, className = '', stagger = false, threshold = 0.12, delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)

  // Synchronously check if element is already in viewport on first commit
  // → above-the-fold content doesn't flash.
  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (r.top < vh && r.bottom > 0) {
      if (delay > 0) {
        const timer = setTimeout(() => setVisible(true), delay)
        return () => clearTimeout(timer)
      }
      setVisible(true)
    }
  }, [delay])

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
          io.disconnect()
        }
      })
    }, { threshold, rootMargin: '0px 0px -60px 0px' })

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, delay, visible])

  // Mark done after transition to strip transform (avoids containing-block issues).
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setDone(true), 900)
    return () => clearTimeout(t)
  }, [visible])

  const cls = [
    stagger ? 'reveal-stagger' : 'reveal',
    visible ? 'is-visible' : '',
    done ? 'reveal-done' : '',
    className,
  ].filter(Boolean).join(' ')

  return <div ref={ref} className={cls}>{children}</div>
}
