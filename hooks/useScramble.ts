'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function useScramble(text: string, delay = 0) {
  const [output, setOutput] = useState(text)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let iteration = 0

    const animate = () => {
      setOutput(
        text.split('').map((char, i) => {
          if (char === ' ' || char === '\n') return char
          if (i < Math.floor(iteration)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iteration += 0.08
      if (iteration < text.length) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setOutput(text)
      }
    }

    const timer = setTimeout(() => {
      iteration = 0
      rafRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [text, delay])

  return output
}
