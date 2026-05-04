'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { MagneticButton } from '../ui/MagneticButton'

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.2 })
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section
      id="contact"
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="section-pad border-t border-ghost/10 relative overflow-hidden"
    >
      {/* Background number */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y }}
      >
        <span
          className="font-display text-[35vw] leading-none text-ghost/[0.015]"
          style={{ userSelect: 'none' }}
        >
          HI
        </span>
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,59,0,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="container-custom relative z-10 text-center"
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ scale }}
      >
        <motion.p
          className="font-mono text-xs tracking-[0.4em] text-ember uppercase mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Let's Collaborate
        </motion.p>

        <motion.h2
          className="font-display text-[clamp(4rem,12vw,12rem)] leading-[0.85] text-ghost mb-10"
          initial={{ opacity: 0, y: 80 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          START A<br />
          <span className="text-gradient-ember">PROJECT</span>
        </motion.h2>

        <motion.p
          className="font-body text-ghost/40 text-xl max-w-xl mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          Have a vision that needs to be realized? Let's turn your idea into something
          that makes people say — "what the hell is this?"
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="https://wa.me/962780618576"
              data-cursor="go"
              className="group relative flex items-center gap-4 bg-ember text-void font-display text-lg tracking-widest px-12 py-5 overflow-hidden glow-ember"
            >
              <span className="relative z-10">GET IN TOUCH</span>
              <motion.span
                className="relative z-10 text-2xl"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              <div className="absolute inset-0 bg-ghost transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </a>
          </MagneticButton>

          <MagneticButton>
  <a
    href="/ATS.Ibrahim Kh-Developer.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-xs tracking-[0.3em] text-ghost/50 hover:text-ghost transition-colors border border-ghost/20 hover:border-ghost/60 px-8 py-5 uppercase"
  >
    Download CV
  </a>
</MagneticButton>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="flex items-center justify-center gap-12 mt-20 pt-12 border-t border-ghost/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: 'Email', value: 'ikhalifa685@gmail.com' },
            { label: 'Location', value: 'Remote / Worldwide' },
            { label: 'Status', value: '✦ Available', color: '#00f5d4' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-mono text-xs text-ghost/30 tracking-widest mb-2 uppercase">{item.label}</p>
              <p
                className="font-body text-sm"
                style={{ color: item.color || 'rgba(240,238,232,0.7)' }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
