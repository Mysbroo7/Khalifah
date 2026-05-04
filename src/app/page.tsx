'use client'

import { HeroSection } from '@/components/hero/HeroSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'
import { Nav } from '@/components/ui/Nav'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="relative bg-void overflow-hidden">
      <Nav />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  )
}
