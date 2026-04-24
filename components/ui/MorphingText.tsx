'use client'
import { useCallback, useEffect, useRef } from 'react'

const MORPH_TIME = 0.9
const COOLDOWN_TIME = 2.2

function useMorphingText(texts: string[]) {
  const indexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(COOLDOWN_TIME)
  const timeRef = useRef(Date.now())
  const el1Ref = useRef<HTMLSpanElement>(null)
  const el2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback((fraction: number) => {
    const [el1, el2] = [el1Ref.current, el2Ref.current]
    if (!el1 || !el2) return
    const inv = 1 - fraction
    // outgoing: fade out + subtle blur
    const blur1 = Math.min(inv === 0 ? 0 : (1 - inv) * 4, 4)
    el1.style.opacity = `${inv}`
    el1.style.filter = blur1 > 0.1 ? `blur(${blur1.toFixed(1)}px)` : 'none'
    // incoming: fade in + subtle blur
    const blur2 = Math.min(fraction === 1 ? 0 : (1 - fraction) * 4, 4)
    el2.style.opacity = `${fraction}`
    el2.style.filter = blur2 > 0.1 ? `blur(${blur2.toFixed(1)}px)` : 'none'
    el1.textContent = texts[indexRef.current % texts.length]
    el2.textContent = texts[(indexRef.current + 1) % texts.length]
  }, [texts])

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0
    let fraction = morphRef.current / MORPH_TIME
    if (fraction > 1) {
      cooldownRef.current = COOLDOWN_TIME
      fraction = 1
    }
    setStyles(fraction)
    if (fraction === 1) indexRef.current++
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [el1, el2] = [el1Ref.current, el2Ref.current]
    if (!el1 || !el2) return
    el1.style.opacity = '0'
    el1.style.filter = 'none'
    el2.style.opacity = '1'
    el2.style.filter = 'none'
  }, [])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const now = Date.now()
      const dt = (now - timeRef.current) / 1000
      timeRef.current = now
      cooldownRef.current -= dt
      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }
    animate()
    return () => cancelAnimationFrame(rafId)
  }, [doMorph, doCooldown])

  return { el1Ref, el2Ref }
}

interface MorphingTextProps {
  texts: string[]
  style?: React.CSSProperties
  className?: string
}

export function MorphingText({ texts, style, className }: MorphingTextProps) {
  const { el1Ref, el2Ref } = useMorphingText(texts)

  return (
    <div
      className={className}
      style={{ position: 'relative', ...style }}
    >
      <span ref={el1Ref} style={{
        position: 'absolute', inset: 0,
        textAlign: 'inherit',
        opacity: 0,
        willChange: 'opacity, filter',
      }} />
      <span ref={el2Ref} style={{
        position: 'absolute', inset: 0,
        textAlign: 'inherit',
        opacity: 1,
        willChange: 'opacity, filter',
      }} />
    </div>
  )
}
