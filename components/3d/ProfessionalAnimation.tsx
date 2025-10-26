'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

// Enhanced floating orb with gradient effect
function FloatingOrb({ position, color, size = 1, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;
    
    // Smooth floating motion
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.6;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.4;
    
    // Elegant rotation
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;

    // Smooth scale pulse
    const scale = size + Math.sin(time * 0.8) * 0.12;
    meshRef.current.scale.set(scale, scale, scale);

    // Glow layer sync
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.rotation.copy(meshRef.current.rotation);
      const glowScale = scale * 1.2;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
    }

    // React to mouse - smooth
    const targetX = mousePosition.current.x * 2.5;
    const targetY = mousePosition.current.y * 2.5;
    const dx = targetX - meshRef.current.position.x;
    const dy = targetY - meshRef.current.position.y;
    
    meshRef.current.position.x += dx * 0.015;
    meshRef.current.position.y += dy * 0.015;

    // Update light
    if (lightRef.current) {
      lightRef.current.position.copy(meshRef.current.position);
      lightRef.current.intensity = 2.0 + Math.sin(time * 0.5) * 0.5;
    }
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Main sphere */}
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      <pointLight
        ref={lightRef}
        color={color}
        intensity={2.0}
        distance={18}
        decay={2}
      />
    </group>
  );
}

// Enhanced particle system
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const [positions, colors, sizes] = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorPalette = [
      new THREE.Color('#3b82f6'), // Blue
      new THREE.Color('#8b5cf6'), // Purple
      new THREE.Color('#f59e0b'), // Amber
      new THREE.Color('#60a5fa'), // Light blue
      new THREE.Color('#a78bfa'), // Light purple
    ];

    for (let i = 0; i < count; i++) {
      // Spread particles across the scene
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      // Assign colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Variable sizes
      sizes[i] = Math.random() * 0.5 + 0.3;
    }

    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < posArray.length; i += 3) {
      const x = posArray[i];
      const y = posArray[i + 1];

      // Elegant wave motion
      posArray[i + 2] += Math.sin(time * 0.3 + x * 0.1 + y * 0.1) * 0.003;

      // Mouse interaction - smooth attraction
      const dx = mousePosition.current.x * 18 - x;
      const dy = mousePosition.current.y * 18 - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 6) {
        const force = (1 - distance / 6) * 0.003;
        posArray[i] += dx * force;
        posArray[i + 1] += dy * force;
      }

      // Boundary check
      if (Math.abs(posArray[i]) > 17) posArray[i] *= 0.95;
      if (Math.abs(posArray[i + 1]) > 17) posArray[i + 1] *= 0.95;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.015;
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geom;
  }, [positions, colors, sizes]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Connection lines between particles
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const positions = [];
    const colors = [];
    
    // Create a grid of points
    for (let x = -10; x <= 10; x += 2) {
      for (let y = -10; y <= 10; y += 2) {
        positions.push(x, y, -8);
        positions.push(x + 2, y, -8);
        
        positions.push(x, y, -8);
        positions.push(x, y + 2, -8);

        // Blue-purple gradient colors
        for (let i = 0; i < 4; i++) {
          colors.push(0.23, 0.51, 0.96); // Blue
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geom;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = linesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Wave effect
      const wave = Math.sin(x * 0.2 + y * 0.2 + time * 0.5) * 0.3;
      
      // Mouse influence
      const dx = x - mousePosition.current.x * 15;
      const dy = y - mousePosition.current.y * 15;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 8) * 2;
      
      positions[i + 2] = -8 + wave + influence;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      {/* Enhanced ambient lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#3b82f6" />
      
      {/* Floating orbs with better positioning */}
      <FloatingOrb position={[-5, 2, -4]} color="#3b82f6" size={1.4} speed={0.8} />
      <FloatingOrb position={[5, -1, -5]} color="#8b5cf6" size={1.2} speed={1} />
      <FloatingOrb position={[0, 3, -6]} color="#f59e0b" size={1.1} speed={1.2} />
      <FloatingOrb position={[-3, -2, -3]} color="#60a5fa" size={1} speed={0.9} />
      <FloatingOrb position={[4, 2, -7]} color="#a78bfa" size={1.3} speed={0.7} />
      <FloatingOrb position={[-2, 0, -2]} color="#3b82f6" size={0.9} speed={1.1} />
      
      {/* Particle system */}
      <ParticleSystem />
      
      {/* Connection lines */}
      <ConnectionLines />
    </>
  );
}

export default function ProfessionalAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0a0a0f' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
        <fog attach="fog" args={['#0a0a0f', 8, 25]} />
        
        <EffectComposer>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
