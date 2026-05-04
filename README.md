# NOVA — Immersive Portfolio

> A mind-blowing interactive portfolio experience built with Next.js 14, React Three Fiber, Framer Motion, and GSAP.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✨ Features

- **3D Robot** — Built with React Three Fiber. Mouse-tracking head, idle breathing, hover glow, click bounce animation
- **Custom Cursor** — Context-aware cursor with state changes (VIEW, LET'S GO, text mode)
- **Smooth Scroll** — Lenis-powered buttery smooth scrolling
- **Magnetic Buttons** — Buttons that attract the cursor
- **Cinematic Loader** — Progress counter with reveal animation  
- **Parallax Hero** — Depth layers and particle field in 3D
- **Interactive Project Cards** — 3D tilt on hover, color transforms
- **Scroll Animations** — Every section reveals with motion
- **Noise Texture** — Film grain overlay for premium feel

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations & transitions |
| React Three Fiber | 3D rendering (robot) |
| @react-three/drei | 3D helpers |
| GSAP | Timeline animations |
| Lenis | Smooth scrolling |

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── 3d/
│   │   └── RobotScene.tsx    # 3D robot with R3F
│   ├── cursor/
│   │   └── CustomCursor.tsx  # Context-aware cursor
│   ├── hero/
│   │   └── HeroSection.tsx   # Cinematic hero
│   ├── sections/
│   │   ├── WorkSection.tsx   # Interactive project grid
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       ├── Loader.tsx
│       ├── Nav.tsx
│       ├── Footer.tsx
│       ├── MagneticButton.tsx
│       └── SmoothScroll.tsx
├── hooks/
│   ├── useInView.ts
│   └── useMagneticHover.ts
└── styles/
    └── globals.css
```

## 🎨 Customize

### Colors (globals.css)
```css
:root {
  --void: #020205;      /* Background */
  --ember: #ff3b00;     /* Primary accent */
  --plasma: #00f5d4;    /* Secondary accent */
  --ghost: #f0eee8;     /* Text */
}
```

### Projects (WorkSection.tsx)
Edit the `projects` array to add your own work.

### Robot Appearance (RobotScene.tsx)
Modify `accentColor`, eye colors, and geometry for a different look.

## 🚀 Deploy

```bash
npm run build
npm start
```

Deploy to Vercel with zero config: `vercel`
