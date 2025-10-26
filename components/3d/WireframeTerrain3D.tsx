'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

function WireframeTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Create low-poly terrain
  const [geometry, wireframeGeometry] = useMemo(() => {
    const geo = new THREE.PlaneGeometry(24, 24, 30, 30);
    
    // Add height variation for terrain
    const positions = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Create mountain-like terrain
      const distance = Math.sqrt(x * x + y * y);
      const height = Math.max(0, 4 - distance * 0.3) * (1 + Math.sin(x * 0.5) * 0.3 + Math.cos(y * 0.5) * 0.3);
      positions[i + 2] = height;
    }
    
    geo.computeVertexNormals();
    
    const wireGeo = new THREE.WireframeGeometry(geo);
    
    return [geo, wireGeo];
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    // Slow rotation
    meshRef.current.rotation.z += 0.0003;
    wireframeRef.current.rotation.z += 0.0003;

    // React to mouse - subtle
    const targetRotationX = -Math.PI / 3 + mousePosition.current.y * 0.15;
    const targetRotationY = mousePosition.current.x * 0.2;
    
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.02;
    
    wireframeRef.current.rotation.x = meshRef.current.rotation.x;
    wireframeRef.current.rotation.y = meshRef.current.rotation.y;

    // Gentle wave animation
    const positions = geometry.attributes.position.array as Float32Array;
    const originalPositions = geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const time = state.clock.elapsedTime;
      
      const wave = Math.sin(x * 0.4 + time * 0.5) * 0.15 + Math.cos(y * 0.4 - time * 0.3) * 0.15;
      positions[i + 2] = originalPositions[i + 2] + wave;
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  useMemo(() => {
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
    <group position={[0, -4, -6]} scale={1.8}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#00bfff"
          transparent
          opacity={0.04}
          flatShading
          side={THREE.DoubleSide}
          emissive="#00bfff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.85}
          linewidth={2.5}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

function FloatingWireframeShape({ position, size = 1, color = '#00bfff' }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const [geometry, wireframeGeometry] = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(size, 0);
    const wireGeo = new THREE.EdgesGeometry(geo, 10);
    return [geo, wireGeo];
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    // Rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;
    wireframeRef.current.rotation.copy(meshRef.current.rotation);

    // Mouse proximity effect - subtle
    const dx = mousePosition.current.x * 5 - position[0];
    const dy = mousePosition.current.y * 5 - position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 4) {
      meshRef.current.position.x = position[0] - dx * 0.08;
      meshRef.current.position.y = position[1] - dy * 0.08;
    } else {
      meshRef.current.position.x += (position[0] - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (position[1] - meshRef.current.position.y) * 0.05;
    }
    
    wireframeRef.current.position.copy(meshRef.current.position);

    // Floating
    meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.35;
    wireframeRef.current.position.z = meshRef.current.position.z;
  });

  useMemo(() => {
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
    <group scale={2.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.06}
          flatShading
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.9}
          linewidth={3}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 8, 8]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[-8, 5, 0]} intensity={0.6} color="#0099ff" />
      <pointLight position={[0, 8, 5]} intensity={0.5} color="#00bfff" />

      <WireframeTerrain />
      
      <FloatingWireframeShape position={[-3, 2, -3]} size={0.9} color="#00d4ff" />
      <FloatingWireframeShape position={[3, 1, -4]} size={1.1} color="#00bfff" />
      <FloatingWireframeShape position={[0, 3, -2]} size={0.7} color="#0099ff" />
      <FloatingWireframeShape position={[-2, -1, -1]} size={0.8} color="#00aaff" />
    </>
  );
}

export default function WireframeTerrain3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0d0d0d' }}>
      <Canvas
        camera={{ position: [0, 3, 14], fov: 55 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
        <fog attach="fog" args={['#0d0d0d', 10, 24]} />
        
        {/* Bloom effect for glowing wireframes */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
