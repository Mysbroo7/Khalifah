import type { Metadata } from 'next'
import '@/styles/globals.css'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { Loader } from '@/components/ui/Loader'

export const metadata: Metadata = {
  title: 'Khalifah — Creative Developer',
  description: 'Interactive portfolio experience — pushing the boundaries of what web can do.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
