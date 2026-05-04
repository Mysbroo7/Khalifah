'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const skills = [
  { name: 'Next.js / React', level: 98 },
  { name: 'Wordpress', level: 95  },
  { name: 'Mysql / Postgresql / Supabase / Firebase', level: 95 },
  { name: 'GSAP / Framer Motion', level: 73 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'AI TOOLS  ( AI Buliders / Video / Image / Automations / Ads )', level: 95 },
  { name: 'Node.js / API', level: 88 },
  { name: 'Docker', level: 80 },
]

const timeline = [
  { year: '2026', role: 'Web Systems Developer (WordPress & AI-Assisted Solutions)', company: 'Freelance / Remote' },
  { year: '2024', role: 'Lead Frontend Engineer', company: 'PlusOne Agency' },
  { year: '2023', role: 'Senior Wordpress Developer', company: 'IT Media Agency' },
  { year: '2020', role: 'Wordpress Developer', company: 'Freelancer' },
]

export function AboutSection() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="section-pad border-t border-ghost/10" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container-custom">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-ember uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            About Me
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(4rem,8vw,8rem)] leading-none text-ghost"
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            THE HUMAN<br />
            <span className="text-ghost/20">BEHIND THE</span><br />
            MACHINE<span className="text-ember">.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          {/* Left — Bio */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <p className="font-body text-ghost/70 text-lg leading-relaxed">
                I'm a Creative Developer obsessed with the intersection of design, engineering, and experience.
                I build things that shouldn't exist yet.
              </p>
              <p className="font-body text-ghost/40 leading-relaxed">
                With 7+ years pushing pixels and polygons, I specialize in creating immersive web experiences
                that blend cutting-edge technology with thoughtful design. Every project is a chance to explore
                what's possible.
              </p>
            </motion.div>

            {/* Timeline */}
            <motion.div
              className="space-y-6 pt-8 border-t border-ghost/10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="font-mono text-xs tracking-widest text-ghost/30 uppercase">Timeline</p>
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-6 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span className="font-mono text-xs text-ember mt-1 w-10 flex-shrink-0">{item.year}</span>
                  <div>
                    <p className="font-body text-ghost/80 text-sm">{item.role}</p>
                    <p className="font-mono text-xs text-ghost/30 tracking-widest mt-1">{item.company}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Skills */}
          <div className="lg:col-span-3">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <p className="font-mono text-xs tracking-widest text-ghost/30 uppercase mb-8">Skills</p>

              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-ghost/70">{skill.name}</span>
                    <span className="font-mono text-xs text-ember">{skill.level}%</span>
                  </div>
                  <div className="h-px bg-ghost/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      style={{ background: 'linear-gradient(90deg, #ff3b00, #00f5d4)' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.4 + i * 0.1,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Big statement */}
              <motion.div
                className="mt-16 p-8 border border-ghost/10 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-ember to-plasma" />
                <p className="font-display text-4xl text-ghost leading-tight">
                  "I don't build websites.<br />
                  <span className="text-ember">I build experiences."</span>
                </p>
                <p className="font-mono text-xs text-ghost/30 tracking-widest mt-4">— MY PHILOSOPHY</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
