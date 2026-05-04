'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from './MagneticButton'

const navLinks = ['Work', 'Services', 'About']

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 50))
    return unsub
  }, [scrollY])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[9990] mix-blend-normal"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        className="container-custom flex items-center justify-between py-6 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(2,2,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(240,238,232,0.05)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="font-display text-2xl text-ghost tracking-widest hover-underline"
          whileHover={{ scale: 1.02 }}
        >
          Khalifah<span className="text-ember">DEV</span>
        </motion.a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs tracking-widest text-ghost/60 hover:text-ghost transition-colors duration-300 hover-underline uppercase"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton>
          <a
            href="#contact"
            data-cursor="go"
            className="font-mono text-xs tracking-widest border border-ember text-ember px-6 py-3 hover:bg-ember hover:text-void transition-all duration-300 uppercase"
          >
            Let's Talk
          </a>
        </MagneticButton>
      </div>
    </motion.nav>
  )
}
