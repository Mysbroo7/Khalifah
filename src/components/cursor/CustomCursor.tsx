'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'view' | 'go' | 'drag' | 'text'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const trailSpringConfig = { damping: 35, stiffness: 150, mass: 0.8 }

  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)
  const trailX = useSpring(mouseX, trailSpringConfig)
  const trailY = useSpring(mouseY, trailSpringConfig)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleEnter = () => setIsVisible(true)
    const handleLeave = () => setIsVisible(false)

    const updateState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="view"]')) setState('view')
      else if (target.closest('[data-cursor="go"]')) setState('go')
      else if (target.closest('[data-cursor="drag"]')) setState('drag')
      else if (target.closest('p, h1, h2, h3, span, a')) setState('text')
      else setState('default')
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousemove', updateState)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousemove', updateState)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [mouseX, mouseY, isVisible])

  const cursorSize = {
    default: 12,
    view: 80,
    go: 80,
    drag: 60,
    text: 4,
  }[state]

  const showLabel = state === 'view' || state === 'go' || state === 'drag'
  const label = { view: 'VIEW', go: "LET'S GO", drag: 'DRAG', default: '', text: '' }[state]

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center overflow-hidden"
          style={{ width: '100%', height: '100%' }}
          animate={{
            background: state === 'view' || state === 'go' || state === 'drag'
              ? 'rgba(255, 59, 0, 0.9)'
              : state === 'text'
              ? 'rgba(0, 245, 212, 1)'
              : 'rgba(240, 238, 232, 1)',
            mixBlendMode: state === 'text' ? 'difference' : 'normal',
          }}
          transition={{ duration: 0.3 }}
        >
          {showLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-void font-display text-xs tracking-widest whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Trail ring */}
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-ghost/30"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
        }}
        animate={{
          opacity: isVisible && state === 'default' ? 0.5 : 0,
          scale: state === 'default' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
