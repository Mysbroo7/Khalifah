'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const services = [
  {
    number: '01',
    title: 'Interactive Development',
    short: 'BUILD',
    description: 'Next.js, React, TypeScript. Pixel-perfect implementation with performance-first architecture. SPAs, full-stack apps, real-time systems.',
    tools: ['Next.js', 'Wordpress', 'Node.js', 'PostgreSQL'],
    color: '#ff3b00',
  },
  {
    number: '02',
    title: '3D & WebGL Experiences',
    short: 'RENDER',
    description: 'Immersive 3D environments, product visualizers, and data visualization using Three.js, React Three Fiber and custom GLSL shaders.',
    tools: ['Three.js', 'R3F', 'GLSL', 'Blender'],
    color: '#00f5d4',
  },
  {
    number: '03',
    title: 'Motion & Animation',
    short: 'MOVE',
    description: 'Cinematic animations and micro-interactions. GSAP timelines, Framer Motion, CSS animations that breathe life into interfaces.',
    tools: ['GSAP', 'Framer Motion', 'Lottie', 'CSS'],
    color: '#8b5cf6',
  },
  {
    number: '04',
    title: 'Creative Direction',
    short: 'DIRECT',
    description: 'Visual identity, design systems, and art direction. Translating brand strategy into immersive digital experiences.',
    tools: ['Figma', 'After Effects', 'Spline', 'Rive'],
    color: '#f59e0b',
  },
]

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { ref, inView } = useInView()

  return (
    <section id="services" className="section-pad border-t border-ghost/10" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              className="font-mono text-xs tracking-[0.4em] text-ember uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              What I Do
            </motion.p>
            <motion.h2
              className="font-display text-[clamp(3rem,6vw,6rem)] leading-none text-ghost mb-8"
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              SERVICES
            </motion.h2>
            <motion.p
              className="font-body text-ghost/40 text-lg leading-relaxed max-w-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              From concept to deployment — a full-stack creative developer who bridges design and engineering.
            </motion.p>

            {/* Active service display */}
            {activeIndex !== null && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-6 border border-ghost/10"
                style={{ borderColor: services[activeIndex].color + '30' }}
              >
                <p
                  className="font-display text-6xl mb-4"
                  style={{ color: services[activeIndex].color }}
                >
                  {services[activeIndex].short}
                </p>
                <div className="flex flex-wrap gap-2">
                  {services[activeIndex].tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs tracking-widest px-3 py-1 border"
                      style={{
                        borderColor: services[activeIndex].color + '40',
                        color: services[activeIndex].color,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — Service list */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, x: 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="group border-b border-ghost/10 py-8 px-4 cursor-none transition-all duration-300 hover:bg-ghost/[0.02]"
              >
                <div className="flex items-start gap-6">
                  <span
                    className="font-mono text-xs text-ghost/30 mt-2 transition-colors duration-300"
                    style={{ color: activeIndex === i ? service.color : undefined }}
                  >
                    {service.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-2xl md:text-3xl text-ghost group-hover:translate-x-2 transition-transform duration-500">
                        {service.title}
                      </h3>
                      <motion.span
                        className="text-ghost/30 text-xl"
                        animate={activeIndex === i ? { rotate: -45, x: -5 } : { rotate: 0, x: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ color: activeIndex === i ? service.color : undefined }}
                      >
                        →
                      </motion.span>
                    </div>
                    <motion.p
                      className="font-body text-ghost/40 text-sm leading-relaxed"
                      animate={{ height: activeIndex === i ? 'auto' : 'auto' }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                </div>

                {/* Progress bar on hover */}
                <motion.div
                  className="h-px mt-6 -mb-8"
                  style={{ background: service.color }}
                  animate={{ scaleX: activeIndex === i ? 1 : 0, originX: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
