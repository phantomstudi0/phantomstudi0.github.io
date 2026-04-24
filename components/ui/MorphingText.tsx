'use client'
import { useCallback, useEffect, useRef } from 'react'

const MORPH_TIME = 1.2
const COOLDOWN_TIME = 2.0

function useMorphingText(texts: string[]) {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(COOLDOWN_TIME)
  const timeRef = useRef(Date.now())
  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback((fraction: number) => {
    const [el1, el2] = [text1Ref.current, text2Ref.current]
    if (!el1 || !el2) return
    el2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
    el2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
    const inv = 1 - fraction
    el1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
    el1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    el1.textContent = texts[textIndexRef.current % texts.length]
    el2.textContent = texts[(textIndexRef.current + 1) % texts.length]
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
    if (fraction === 1) textIndexRef.current++
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [el1, el2] = [text1Ref.current, text2Ref.current]
    if (el1 && el2) {
      el2.style.filter = 'none'
      el2.style.opacity = '100%'
      el1.style.filter = 'none'
      el1.style.opacity = '0%'
    }
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

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  texts: string[]
  style?: React.CSSProperties
  className?: string
}

export function MorphingText({ texts, style, className }: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingText(texts)

  return (
    <>
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <defs>
          <filter id="morph-threshold">
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      <div
        className={className}
        style={{
          position: 'relative',
          filter: 'url(#morph-threshold) blur(0.5px)',
          ...style,
        }}
      >
        <span ref={text1Ref} style={{ position: 'absolute', inset: 0, textAlign: 'inherit' }} />
        <span ref={text2Ref} style={{ position: 'absolute', inset: 0, textAlign: 'inherit' }} />
      </div>
    </>
  )
}
