'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Gradient sphere with vivid colors
function GradientSphere({ position, colors, size = 1, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      // Create animated gradient
      float angle = atan(vPosition.y, vPosition.x);
      float gradient = sin(angle * 3.0 + uTime) * 0.5 + 0.5;
      float gradient2 = cos(vPosition.z * 2.0 + uTime * 0.5) * 0.5 + 0.5;
      
      // Mix three colors
      vec3 color = mix(uColor1, uColor2, gradient);
      color = mix(color, uColor3, gradient2);
      
      // Add brightness variation
      float brightness = 1.0 + sin(uTime * 2.0) * 0.2;
      color *= brightness;
      
      gl_FragColor = vec4(color, 0.9);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(colors[0]) },
      uColor2: { value: new THREE.Color(colors[1]) },
      uColor3: { value: new THREE.Color(colors[2]) },
    }),
    [colors]
  );

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime * speed;
    materialRef.current.uniforms.uTime.value = time;

    // Floating motion
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.8;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.5;

    // Rotation
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;

    // Scale pulse
    const scale = size + Math.sin(time * 0.8) * 0.15;
    meshRef.current.scale.set(scale, scale, scale);

    // Mouse interaction
    const targetX = mousePosition.current.x * 3;
    const targetY = mousePosition.current.y * 3;
    const dx = targetX - meshRef.current.position.x;
    const dy = targetY - meshRef.current.position.y;
    
    meshRef.current.position.x += dx * 0.02;
    meshRef.current.position.y += dy * 0.02;
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
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Geometric rings with bright colors
function GeometricRing({ position, color, radius = 2, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;

    // Rotation on multiple axes
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.z = time * 0.2;

    // Floating
    meshRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.5;

    // Mouse tilt
    const targetRotX = mousePosition.current.y * 0.5;
    const targetRotZ = mousePosition.current.x * 0.5;
    
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.03;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.03;
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
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, 0.15, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Vibrant particle field
function VibrantParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const [positions, colors, scales] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#ff006e'), // Hot pink
      new THREE.Color('#fb5607'), // Orange
      new THREE.Color('#ffbe0b'), // Yellow
      new THREE.Color('#8338ec'), // Purple
      new THREE.Color('#3a86ff'), // Blue
      new THREE.Color('#06ffa5'), // Cyan
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random();
    }

    return [positions, colors, scales];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < posArray.length; i += 3) {
      const x = posArray[i];
      const y = posArray[i + 1];
      const z = posArray[i + 2];

      // Spiral motion
      const angle = Math.atan2(y, x);
      const radius = Math.sqrt(x * x + y * y);
      
      posArray[i] = Math.cos(angle + time * 0.05) * radius;
      posArray[i + 1] = Math.sin(angle + time * 0.05) * radius;
      posArray[i + 2] = z + Math.sin(time + i) * 0.01;

      // Mouse attraction
      const dx = mousePosition.current.x * 20 - posArray[i];
      const dy = mousePosition.current.y * 20 - posArray[i + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 8) {
        posArray[i] += dx * 0.005;
        posArray[i + 1] += dy * 0.005;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.z = time * 0.02;
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
    geom.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    return geom;
  }, [positions, colors, scales]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Animated waves background
function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Wave effect
      float wave1 = sin(pos.x * 0.5 + uTime) * 0.5;
      float wave2 = cos(pos.y * 0.5 + uTime * 0.8) * 0.5;
      
      // Mouse influence
      float dx = pos.x - uMouse.x * 20.0;
      float dy = pos.y - uMouse.y * 20.0;
      float dist = sqrt(dx * dx + dy * dy);
      float mouseWave = sin(dist * 0.5 - uTime * 2.0) * exp(-dist * 0.1) * 3.0;
      
      pos.z = wave1 + wave2 + mouseWave;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      // Rainbow gradient
      vec3 color1 = vec3(1.0, 0.0, 0.43); // Pink
      vec3 color2 = vec3(0.22, 0.53, 1.0); // Blue
      vec3 color3 = vec3(0.02, 1.0, 0.65); // Cyan
      
      float mixValue = vElevation * 0.2 + 0.5;
      vec3 color = mix(color1, color2, sin(mixValue + uTime) * 0.5 + 0.5);
      color = mix(color, color3, cos(mixValue * 2.0 + uTime * 0.5) * 0.5 + 0.5);
      
      gl_FragColor = vec4(color, 0.3);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.set(
      mousePosition.current.x,
      mousePosition.current.y
    );
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
    <mesh ref={meshRef} position={[0, 0, -15]} rotation={[-Math.PI / 6, 0, 0]}>
      <planeGeometry args={[50, 50, 100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ff006e" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#3a86ff" />
      <pointLight position={[0, 0, 10]} intensity={1.5} color="#ffbe0b" />

      {/* Gradient spheres */}
      <GradientSphere
        position={[-4, 2, -4]}
        colors={['#ff006e', '#fb5607', '#ffbe0b']}
        size={1.5}
        speed={0.8}
      />
      <GradientSphere
        position={[4, -2, -6]}
        colors={['#3a86ff', '#8338ec', '#06ffa5']}
        size={1.3}
        speed={1}
      />
      <GradientSphere
        position={[0, 3, -5]}
        colors={['#ffbe0b', '#06ffa5', '#ff006e']}
        size={1.2}
        speed={1.2}
      />

      {/* Geometric rings */}
      <GeometricRing position={[-3, -1, -3]} color="#ff006e" radius={1.5} speed={0.6} />
      <GeometricRing position={[3, 1, -4]} color="#3a86ff" radius={1.8} speed={0.8} />
      <GeometricRing position={[0, -2, -2]} color="#06ffa5" radius={1.3} speed={1} />

      {/* Particle system */}
      <VibrantParticles />

      {/* Wave grid background */}
      <WaveGrid />
    </>
  );
}

export default function AestheticAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a1f 100%)' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
        <fog attach="fog" args={['#0a0a1f', 10, 35]} />
        
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0005]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
