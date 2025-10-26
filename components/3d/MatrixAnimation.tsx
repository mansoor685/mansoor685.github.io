'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

interface MatrixColumnProps {
  position: [number, number, number];
  speed: number;
  color: string;
}

function MatrixColumn({ position, speed, color }: MatrixColumnProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(0.3, 20, 1, 40);
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec2 uMouse;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      // Create matrix effect
      float column = floor(vUv.y * 40.0);
      float row = floor(vUv.x * 10.0);
      
      // Falling effect
      float fall = fract((column * 0.1 + uTime * 0.5));
      
      // Character appearance
      float char = step(0.5, random(vec2(row, column + floor(uTime * 10.0))));
      
      // Fade from top to bottom
      float fade = smoothstep(0.0, 0.2, fall) * smoothstep(1.0, 0.7, fall);
      
      // Mouse interaction
      vec2 mouseEffect = uMouse - vPosition.xy;
      float mouseDist = length(mouseEffect);
      float mouseInfluence = smoothstep(5.0, 0.0, mouseDist) * 0.5;
      
      // Final color
      float brightness = char * fade + mouseInfluence;
      vec3 finalColor = uColor * brightness;
      
      gl_FragColor = vec4(finalColor, brightness);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [color]
  );

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    
    // Update mouse position for interaction
    const worldMouse = new THREE.Vector3(
      mousePosition.current.x * 10,
      mousePosition.current.y * 10,
      0
    );
    
    const localMouse = meshRef.current.worldToLocal(worldMouse);
    materialRef.current.uniforms.uMouse.value.set(localMouse.x, localMouse.y);
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
    <mesh ref={meshRef} position={position} geometry={geometry}>
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

function MatrixRain() {
  const columns = useMemo(() => {
    const cols = [];
    const numColumns = 30;
    const colors = ['#00ff41', '#00ff88', '#00ffaa', '#39ff14'];
    
    for (let i = 0; i < numColumns; i++) {
      cols.push({
        position: [
          (i - numColumns / 2) * 0.8,
          Math.random() * 10 - 5,
          (Math.random() - 0.5) * 10
        ] as [number, number, number],
        speed: 0.3 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    return cols;
  }, []);

  return (
    <>
      {columns.map((col, index) => (
        <MatrixColumn
          key={index}
          position={col.position}
          speed={col.speed}
          color={col.color}
        />
      ))}
    </>
  );
}

function InteractiveCursor() {
  const cursorRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const trail = useRef<THREE.Vector3[]>([]);

  const cursorGeometry = useMemo(() => new THREE.RingGeometry(0.3, 0.5, 32), []);
  
  const trailGeometry = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
  }, []);

  useFrame(() => {
    if (!cursorRef.current || !trailRef.current) return;

    const targetX = mousePosition.current.x * 10;
    const targetY = mousePosition.current.y * 8;

    // Smooth cursor movement
    cursorRef.current.position.x += (targetX - cursorRef.current.position.x) * 0.1;
    cursorRef.current.position.y += (targetY - cursorRef.current.position.y) * 0.1;
    cursorRef.current.position.z = 2;

    // Rotate cursor
    cursorRef.current.rotation.z += 0.05;

    // Update trail
    trail.current.unshift(cursorRef.current.position.clone());
    if (trail.current.length > 50) trail.current.pop();

    const positions = trailRef.current.geometry.attributes.position.array as Float32Array;
    trail.current.forEach((pos, i) => {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z - i * 0.05;
    });
    
    trailRef.current.geometry.attributes.position.needsUpdate = true;
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
    <>
      {/* Cursor ring */}
      <mesh ref={cursorRef} geometry={cursorGeometry}>
        <meshBasicMaterial
          color="#00ff41"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Trail particles */}
      <points ref={trailRef} geometry={trailGeometry}>
        <pointsMaterial
          color="#00ff41"
          size={0.1}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

function DigitalGrid() {
  const gridRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const size = 40;
    const divisions = 40;
    const vertices: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      const pos = (i / divisions) * size - size / 2;
      vertices.push(-size / 2, pos, -10);
      vertices.push(size / 2, pos, -10);
      vertices.push(pos, -size / 2, -10);
      vertices.push(pos, size / 2, -10);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geom;
  }, []);

  useFrame((state) => {
    if (!gridRef.current) return;

    // Ripple effect from mouse
    const positions = gridRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      const dx = x - mousePosition.current.x * 20;
      const dy = y - mousePosition.current.y * 20;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const wave = Math.sin(dist * 0.3 - time * 2) * Math.exp(-dist * 0.05) * 2;
      positions[i + 2] = -10 + wave;
    }

    gridRef.current.geometry.attributes.position.needsUpdate = true;

    // Subtle rotation
    gridRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
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
    <lineSegments ref={gridRef} geometry={geometry}>
      <lineBasicMaterial
        color="#00ff41"
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
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#00ff41" />
      
      <MatrixRain />
      <DigitalGrid />
      <InteractiveCursor />
    </>
  );
}

export default function MatrixAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0a0a0a' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
        <fog attach="fog" args={['#0a0a0a', 10, 30]} />
        
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
