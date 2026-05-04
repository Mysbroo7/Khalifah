'use client'

import { useEffect, useRef, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'

const RobotScene = lazy(() =>
  import('../3d/RobotScene').then((mod) => ({ default: mod.RobotScene }))
)

const words = ['CREATIVE', 'IMMERSIVE', 'INTERACTIVE', 'DIGITAL']

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0])
const scale = useTransform(scrollYProgress, [0, 1], [1, 0.99])

  const titleVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 2.8 },
    },
  }

  const letterVariants = {
    hidden: { y: 120, opacity: 0, rotateX: -40 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      id="hero"
    >
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,59,0,0.12) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
          }}
          animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Horizontal line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,59,0,0.4), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
      />

      <motion.div
        className="container-custom relative z-10 w-full"
        style={{ y, opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen pt-24">
          {/* Left — Text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2.6 }}
              className="flex items-center gap-4"
            >
              <motion.span
                className="block w-8 h-px bg-ember"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              />
              <span className="font-mono text-xs tracking-[0.4em] text-ember uppercase">
                Web Systems Developer
              </span>
            </motion.div>

            {/* Main title */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.9] text-ghost"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                {'BUILDING'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <br />
                <span className="text-gradient-ember">
                  {'WORLDS'.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      variants={letterVariants}
                      style={{ display: 'inline-block' }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
                <br />
                {'ONLINE'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    style={{ display: 'inline-block', color: 'rgba(240,238,232,0.25)' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 3.2 }}
              className="font-body text-lg text-ghost/50 max-w-md leading-relaxed"
            >
              Crafting digital experiences that push the limits of what's possible on the web.
              3D, motion, and code working in perfect harmony.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 3.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <MagneticButton>
                <a
                  href="#work"
                  data-cursor="go"
                  className="group relative flex items-center gap-3 bg-ember text-void font-display text-sm tracking-widest px-8 py-4 overflow-hidden"
                >
                  <span className="relative z-10">SELECTED WORK</span>
                  <motion.span
                    className="relative z-10 text-lg"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                  <div className="absolute inset-0 bg-ghost transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://wa.me/962780618576"
                  className="font-mono text-xs tracking-[0.3em] text-ghost/60 hover:text-ghost transition-colors duration-300 uppercase hover-underline"
                >
                  Get In Touch
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 3.6 }}
              className="flex items-center gap-10 pt-4 border-t border-ghost/10"
            >
              {[
                { num: '7+', label: 'Years Experience' },
                { num: '60+', label: 'Projects Shipped' },
                { num: '∞', label: 'Creative Ideas' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-ghost">{stat.num}</p>
                  <p className="font-mono text-xs text-ghost/40 tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Robot */}
          <motion.div
            className="relative w-full h-[600px] lg:h-[750px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Decorative ring */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="w-[380px] h-[380px] rounded-full border border-dashed"
                style={{ borderColor: 'rgba(255,59,0,0.15)' }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="w-[480px] h-[480px] rounded-full border border-dashed"
                style={{ borderColor: 'rgba(0,245,212,0.08)' }}
              />
            </motion.div>

            {/* The 3D canvas */}
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 border-2 border-ember border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              }
            >
              <RobotScene />
            </Suspense>

            {/* Corner labels */}
            <motion.div
              className="absolute top-8 right-8 text-right pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              <p className="font-mono text-xs text-ghost/30 tracking-widest">INTERACTIVE</p>
              <p className="font-mono text-xs text-ember tracking-widest">3D ENTITY</p>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-8 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.7 }}
            >
              <p className="font-mono text-xs text-ghost/30 tracking-widest">REACT THREE FIBER</p>
              <motion.div
                className="flex gap-1 mt-1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-plasma" />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        <span className="font-mono text-xs tracking-[0.4em] text-ghost/30 uppercase">Scroll</span>
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-ghost/30 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
