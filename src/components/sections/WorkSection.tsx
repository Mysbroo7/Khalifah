'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const projects = [
  {
    id: 1,
    number: '01',
    title: 'OrderzHouse',
    subtitle: 'Freelancing Platform',
    category: 'Web App · Exchange Services · AI',
    description: 'Built scalable platform with optimized performance. Improved responsiveness and user flow.',
    tags: ['JavaScript', 'WordPress', 'AI'],
    color: '#ff3b00',
    accentColor: 'rgba(255,59,0,0.15)',
    year: '2024',
    link: 'https://orderzhouse.com/',
  },
  {
    id: 2,
    number: '02',
    title: 'Heiasat Design',
    subtitle: 'Agency Website',
    category: 'Branding · UI Design · SEO',
    description: 'Designed modern UI with strong branding. Optimized loading speed and SEO.',
    tags: ['UI Design', 'Branding', 'SEO'],
    color: '#00f5d4',
    accentColor: 'rgba(0,245,212,0.15)',
    year: '2025',
    link: 'https://orderzhouse.com/',
  },
  {
    id: 3,
    number: '03',
    title: 'Istidamah Labs',
    subtitle: 'Corporate Website',
    category: 'Corporate · Web Dev · Performance',
    description: 'Developed clean, professional business website. Enhanced performance and structure.',
    tags: ['Web Dev', 'Corporate', 'Performance'],
    color: '#8b5cf6',
    accentColor: 'rgba(139,92,246,0.15)',
    year: '2025',
    link: 'https://istidamahlabs.com/',
  },
  {
    id: 4,
    number: '04',
    title: 'Noor Al Hayat',
    subtitle: 'Spiritual Healing Website',
    category: 'Web Design · UX · Responsive',
    description: 'Built responsive website with user-focused design for a spiritual healing platform.',
    tags: ['Web Design', 'UX', 'Responsive'],
    color: '#f59e0b',
    accentColor: 'rgba(245,158,11,0.15)',
    year: '2025',
    link: 'https://noor-alhayat.com/',
  },
  {
    id: 5,
    number: '05',
    title: 'Dynify Solutions',
    subtitle: 'Microsoft Partner Website',
    category: 'Corporate · UX · Web Design',
    description: 'Designed a clean, modern website with clear service structure. Enhanced UX with intuitive navigation and responsive design.',
    tags: ['Web Design', 'UX', 'Microsoft Partner'],
    color: '#38bdf8',
    accentColor: 'rgba(56,189,248,0.15)',
    year: '2024',
    link: 'https://dynifysolutions.com/',
  },
  {
    id: 6,
    number: '06',
    title: 'DropStore System',
    subtitle: 'E-Commerce Dropshipping Platform',
    category: 'E-Commerce · Dropshipping · Automation',
    description: 'Built a full-scale dropshipping e-commerce system with automated order management, supplier integration, inventory sync, and conversion-optimized product pages.',
    tags: ['E-Commerce', 'Dropshipping', 'Automation', 'WooCommerce'],
    color: '#10b981',
    accentColor: 'rgba(16,185,129,0.15)',
    year: '2025',
    link: 'https://vimeo.com/1189148202?fl=tl&fe=ec',
    videoLink: '',
  },
  {
    id: 6,
    number: '06',
    title: 'Valeria Store',
    subtitle: 'E-Commerce Website',
    category: 'E-Commerce · Fashion · Modern Design',
    description: 'Built a full-scale E-Commerce Website with automated order management, supplier integration, inventory sync, and conversion-optimized product pages.',
    tags: ['E-Commerce', 'Dropshipping', 'Supabase', 'WooCommerce'],
    color: '#10b981',
    accentColor: 'rgba(16,185,129,0.15)',
    year: '2026',
    link: 'https://vimeo.com/1189149688?fl=tl&fe=ec',
    videoLink: '',
  },
  {
    id: 7,
    number: '07',
    title: 'MediaBuyer Pro',
    subtitle: 'Media Buying Management System',
    category: 'Media Buying · Ads · Analytics',
    description: 'Developed a comprehensive media buying system with campaign tracking, ad performance analytics, budget management, and multi-platform reporting dashboard.',
    tags: ['Media Buying', 'Analytics', 'Dashboard', 'Ads'],
    color: '#ec4899',
    accentColor: 'rgba(236,72,153,0.15)',
    year: '2025',
    link: '',
    videoLink: '',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20
    setTilt({ x, y })
    mousePos.current = { x, y }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
      data-cursor="view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={`group relative ${project.link ? "cursor-pointer" : "cursor-default"}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: hovered
          ? `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(20px)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: hovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div
        className="relative border border-ghost/10 overflow-hidden"
        style={{
          background: hovered ? project.accentColor : 'rgba(240,238,232,0.02)',
          borderColor: hovered ? project.color + '40' : 'rgba(240,238,232,0.1)',
          transition: 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-ghost/10">
          <span className="font-mono text-xs text-ghost/30 tracking-widest">{project.number}</span>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: project.color }}>
            {project.category}
          </span>
          <span className="font-mono text-xs text-ghost/30">{project.year}</span>
        </div>

        {/* Main content */}
        <div className="px-8 py-10">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-ghost mb-2 group-hover:text-gradient-ember transition-all duration-500">
                {project.title}
              </h3>
              <p className="font-body text-ghost/50 text-lg mb-6">{project.subtitle}</p>
              <p className="font-body text-ghost/40 text-sm leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              className="flex-shrink-0 w-16 h-16 border border-ghost/20 flex items-center justify-center"
              animate={hovered ? { rotate: -45, borderColor: project.color } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
              style={{ borderColor: hovered ? project.color : undefined }}
            >
              <span className="text-2xl text-ghost/50 group-hover:text-ghost transition-colors">→</span>
            </motion.div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs tracking-widest px-3 py-1.5 border border-ghost/10 text-ghost/40"
                style={{
                  borderColor: hovered ? project.color + '30' : undefined,
                  color: hovered ? project.color + 'CC' : undefined,
                  transition: 'all 0.4s',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover shimmer line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}08 0%, transparent 70%)`,
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  )
}

export function WorkSection() {
  const { ref, inView } = useInView()

  return (
    <section id="work" className="section-pad" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-end justify-between mb-20 flex-wrap gap-8">
          <div>
            <motion.p
              className="font-mono text-xs tracking-[0.4em] text-ember uppercase mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              className="font-display text-[clamp(4rem,8vw,8rem)] leading-none text-ghost"
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              PROJECTS
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="font-mono text-xs tracking-widest text-ghost/40 hover:text-ghost transition-colors hover-underline uppercase"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            View All Work →
          </motion.a>
        </div>

        {/* Project grid */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
