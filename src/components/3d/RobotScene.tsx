'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Procedural Robot built with Three.js primitives (no GLB needed)
function RobotBody({ mouse, hovered, clicked }: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  hovered: boolean
  clicked: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  const targetRotX = useRef(0)
  const targetRotY = useRef(0)
  const clickAnim = useRef(0)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Breathing / floating
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.12

      // Click bounce
      if (clicked) clickAnim.current = Math.min(clickAnim.current + 0.15, 1)
      else clickAnim.current = Math.max(clickAnim.current - 0.05, 0)
      groupRef.current.position.y += Math.sin(clickAnim.current * Math.PI) * 0.3
    }

    if (headRef.current) {
      // Mouse tracking with lerp
      targetRotY.current = THREE.MathUtils.lerp(targetRotY.current, mouse.current.x * 0.6, 0.08)
      targetRotX.current = THREE.MathUtils.lerp(targetRotX.current, -mouse.current.y * 0.3, 0.08)

      headRef.current.rotation.y = targetRotY.current
      headRef.current.rotation.x = targetRotX.current
    }

    // Eye glow pulse
    if (glowRef.current) {
      glowRef.current.intensity = hovered
        ? 3 + Math.sin(t * 4) * 1
        : 1.5 + Math.sin(t * 2) * 0.5
    }

    // Eye scale pulse
    if (eyeLeftRef.current && eyeRightRef.current) {
      const s = hovered ? 1.3 + Math.sin(t * 6) * 0.2 : 1
      eyeLeftRef.current.scale.setScalar(THREE.MathUtils.lerp(eyeLeftRef.current.scale.x, s, 0.1))
      eyeRightRef.current.scale.setScalar(THREE.MathUtils.lerp(eyeRightRef.current.scale.x, s, 0.1))
    }
  })

  const bodyColor = '#1a1a2e'
  const accentColor = hovered ? '#ff3b00' : '#00f5d4'
  const eyeColor = hovered ? '#ff8c00' : '#00f5d4'

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <boxGeometry args={[1.2, 1.4, 0.8]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.8}
          roughness={0.2}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.15 : 0.05}
        />
      </mesh>

      {/* Chest plate */}
      <mesh position={[0, -0.3, 0.42]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Chest light */}
      <mesh position={[0, -0.3, 0.48]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Shoulders */}
      {[-0.85, 0.85].map((x, i) => (
        <group key={i} position={[x, -0.1, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial
              color={bodyColor}
              metalness={0.85}
              roughness={0.15}
              emissive={accentColor}
              emissiveIntensity={0.05}
            />
          </mesh>
          {/* Arms */}
          <mesh position={[x > 0 ? 0.15 : -0.15, -0.5, 0]} castShadow>
            <boxGeometry args={[0.25, 0.9, 0.25]} />
            <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Hands */}
          <mesh position={[x > 0 ? 0.15 : -0.15, -1.0, 0]} castShadow>
            <boxGeometry args={[0.3, 0.28, 0.28]} />
            <meshStandardMaterial
              color={bodyColor}
              metalness={0.9}
              roughness={0.1}
              emissive={accentColor}
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Neck */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.25, 12]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.15} />
      </mesh>

      {/* HEAD GROUP */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        {/* Head */}
        <mesh castShadow>
          <boxGeometry args={[1.0, 0.9, 0.85]} />
          <meshStandardMaterial
            color={bodyColor}
            metalness={0.85}
            roughness={0.15}
            emissive={accentColor}
            emissiveIntensity={hovered ? 0.1 : 0.03}
          />
        </mesh>

        {/* Visor / face plate */}
        <mesh position={[0, 0.05, 0.44]}>
          <boxGeometry args={[0.7, 0.45, 0.05]} />
          <meshStandardMaterial
            color="#050510"
            metalness={1}
            roughness={0}
            emissive={eyeColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Eye Left */}
        <mesh ref={eyeLeftRef} position={[-0.18, 0.08, 0.48]}>
          <boxGeometry args={[0.18, 0.1, 0.02]} />
          <meshStandardMaterial
            color={eyeColor}
            emissive={eyeColor}
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>

        {/* Eye Right */}
        <mesh ref={eyeRightRef} position={[0.18, 0.08, 0.48]}>
          <boxGeometry args={[0.18, 0.1, 0.02]} />
          <meshStandardMaterial
            color={eyeColor}
            emissive={eyeColor}
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>

        {/* Mouth / speaker */}
        {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
          <mesh key={i} position={[x, -0.2, 0.46]}>
            <boxGeometry args={[0.05, 0.04, 0.02]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={hovered ? 3 : 1}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Antenna */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.83, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>

        {/* Eye glow light */}
        <pointLight
          ref={glowRef}
          position={[0, 0.05, 0.8]}
          color={eyeColor}
          intensity={1.5}
          distance={3}
        />
      </group>

      {/* Ground shadow glow */}
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={hovered ? 0.15 : 0.06}
        />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const count = 120
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  }

  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00f5d4" transparent opacity={0.6} />
    </points>
  )
}

function Scene({ mouse, hovered, clicked }: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  hovered: boolean
  clicked: boolean
}) {
  const { camera } = useThree()

  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.3, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.2 + 0.3, 0.05)
    camera.lookAt(0, 0.2, 0)
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#f0eee8" castShadow />
      <pointLight position={[-4, 3, -2]} intensity={1} color="#ff3b00" />
      <pointLight position={[4, -2, 2]} intensity={0.8} color="#00f5d4" />
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#0055ff" />

      <Environment preset="night" />

      <ParticleField />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <RobotBody mouse={mouse} hovered={hovered} clicked={clicked} />
      </Float>
    </>
  )
}

export function RobotScene() {
  const mouse = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 600)
  }

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      data-cursor="view"
    >
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} hovered={hovered} clicked={clicked} />
        </Suspense>
      </Canvas>
    </div>
  )
}
