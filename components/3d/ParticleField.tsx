'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Generate particle positions
  const [particlesPosition, particlesColor] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const color1 = new THREE.Color('#3b82f6');
    const color2 = new THREE.Color('#8b5cf6');
    const color3 = new THREE.Color('#ec4899');
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Positions
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Colors
      const mixedColor = new THREE.Color();
      const t = Math.random();
      
      if (t < 0.33) {
        mixedColor.lerpColors(color1, color2, t * 3);
      } else if (t < 0.66) {
        mixedColor.lerpColors(color2, color3, (t - 0.33) * 3);
      } else {
        mixedColor.lerpColors(color3, color1, (t - 0.66) * 3);
      }
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return [positions, colors];
  }, [count]);

  // Handle mouse movement
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

  useFrame((state) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle wave motion
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + positions[i3]) * 0.002;
      
      // Rotate around center
      const angle = Math.atan2(positions[i3 + 1], positions[i3]);
      const distance = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2);
      
      positions[i3] = Math.cos(angle + 0.0005) * distance;
      positions[i3 + 1] = Math.sin(angle + 0.0005) * distance;
      
      // React to mouse (subtle)
      const dx = mousePosition.current.x * 5 - positions[i3];
      const dy = mousePosition.current.y * 5 - positions[i3 + 1];
      const distance2D = Math.sqrt(dx * dx + dy * dy);
      
      if (distance2D < 3) {
        positions[i3] -= dx * 0.001;
        positions[i3 + 1] -= dy * 0.001;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire field
    points.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particlesColor, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <Particles count={800} />
      </Canvas>
    </div>
  );
}
