'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Individual floating shape component
function FloatingShape({ position, color, shape = 'sphere', scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
    
    // Subtle movement based on time
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.001;
  });

  const ShapeComponent = useMemo(() => {
    switch (shape) {
      case 'torus':
        return <Torus args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <Octahedron args={[1.2]} />;
      default:
        return <Sphere args={[1, 32, 32]} />;
    }
  }, [shape]);

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {ShapeComponent}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Scene with multiple shapes
function Scene() {
  const shapes = useMemo(() => [
    { position: [-8, 4, -5], color: '#3b82f6', shape: 'sphere', scale: 1.2 },
    { position: [8, -3, -8], color: '#8b5cf6', shape: 'torus', scale: 0.8 },
    { position: [-6, -4, -6], color: '#ec4899', shape: 'octahedron', scale: 1 },
    { position: [7, 5, -7], color: '#3b82f6', shape: 'sphere', scale: 0.9 },
    { position: [0, -2, -10], color: '#8b5cf6', shape: 'torus', scale: 1.1 },
    { position: [-9, 2, -9], color: '#ec4899', shape: 'octahedron', scale: 0.7 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {shapes.map((props, index) => (
        <FloatingShape key={index} {...props} />
      ))}
    </>
  );
}

// Main component
export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
