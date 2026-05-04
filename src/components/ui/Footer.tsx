'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const socials = [
    { name: 'Facebook', url: 'https://web.facebook.com/ibrahim.khalifa.58726' },
    { name: 'GitHub', url: 'https://github.com/Mysbroo7' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ibrahim-khalifa-dev/' },
    { name: 'Dribbble', url: 'https://dribbble.com/your_username' },
  ]

  return (
    <footer className="border-t border-ghost/10 py-12">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-ghost/40 tracking-widest">
          © 2026 KHALIFAH. CRAFTED WITH PASSION.
        </p>

        <div className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ghost/40 hover:text-ember transition-colors duration-300 tracking-wider hover-underline uppercase"
            >
              {social.name}
            </a>
          ))}
        </div>

        <motion.p
          className="font-mono text-xs text-ghost/20"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ALL SYSTEMS OPERATIONAL
        </motion.p>
      </div>
    </footer>
  )
}