'use client'

import { useRef, useState } from 'react'

export function useMagneticHover(strength = 0.4) {
  const ref = useRef<HTMLElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPosition({ x, y })
  }

  const onMouseLeave = () => setPosition({ x: 0, y: 0 })

  return { ref, position, onMouseMove, onMouseLeave }
}
