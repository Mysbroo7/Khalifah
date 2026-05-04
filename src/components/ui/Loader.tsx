'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Loader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'reveal' | 'done'>('counting')

  useEffect(() => {
    const duration = 2200
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(Math.floor(p))

      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setPhase('reveal')
        setTimeout(() => {
          setPhase('done')
          setLoading(false)
        }, 900)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-void flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Big number */}
          <motion.div
            className="font-display text-[20vw] leading-none text-ghost/10 select-none absolute"
            animate={phase === 'reveal' ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {progress}
          </motion.div>

          {/* Center content */}
          <div className="relative z-10 text-center">
            <motion.p
              className="font-mono text-xs tracking-[0.5em] text-ember mb-8 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading Experience
            </motion.p>

            {/* Progress bar */}
            <div className="w-64 h-px bg-ghost/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 loader-bar"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <motion.p
              className="font-display text-6xl text-ghost mt-8 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              KHALIFAH
            </motion.p>
          </div>

          {/* Corner decorations */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-8 h-8 border-ember`}
              style={{
                borderTop: i < 2 ? '1px solid' : 'none',
                borderBottom: i >= 2 ? '1px solid' : 'none',
                borderLeft: i % 2 === 0 ? '1px solid' : 'none',
                borderRight: i % 2 === 1 ? '1px solid' : 'none',
                borderColor: 'var(--ember)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
