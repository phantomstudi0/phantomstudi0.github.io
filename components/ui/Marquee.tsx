'use client'
import { CSSProperties, ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
  gap?: number
  duration?: number
  style?: CSSProperties
  className?: string
}

export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  gap = 16,
  duration = 40,
  style,
  className,
}: MarqueeProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        overflow: 'hidden',
        gap,
        '--marquee-gap': `${gap}px`,
        '--marquee-duration': `${duration}s`,
        ...style,
      } as CSSProperties}
    >
      {Array(repeat).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexShrink: 0,
            justifyContent: 'space-around',
            gap,
            animation: `marquee-scroll ${duration}s linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
            animationPlayState: 'running',
          }}
          className={pauseOnHover ? 'marquee-pause-on-hover' : ''}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
