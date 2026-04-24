'use client'
import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  reverse?: boolean
  className?: string
}

export function BorderBeam({
  size = 80,
  duration = 6,
  delay = 0,
  colorFrom = 'var(--accent)',
  colorTo = 'var(--accent-2)',
  borderWidth = 1.5,
  reverse = false,
  className,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        border: `${borderWidth}px solid transparent`,
        WebkitMask: 'linear-gradient(transparent,transparent), linear-gradient(#000,#000)',
        WebkitMaskComposite: 'destination-in',
        maskComposite: 'intersect',
        maskClip: 'padding-box, border-box',
      } as CSSProperties}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          aspectRatio: '1',
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        } as CSSProperties}
        initial={{ offsetDistance: `${reverse ? 100 : 0}%` }}
        animate={{ offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
        }}
      />
    </div>
  )
}
