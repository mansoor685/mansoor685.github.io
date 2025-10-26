'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

interface LowPolyMountainProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  rotationSpeed?: number;
}

function LowPolyMountain({ position, scale = 1, color = '#00bfff', rotationSpeed = 0.001 }: LowPolyMountainProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Create low-poly mountain geometry
  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1.5, 2.5, 6, 1);
    
    // Make it more irregular/low-poly
    const positions = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.2;
      positions[i + 1] += (Math.random() - 0.5) * 0.2;
      positions[i + 2] += (Math.random() - 0.5) * 0.2;
    }
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  // Create wireframe geometry
  const wireframeGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 15);
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    // Gentle rotation
    meshRef.current.rotation.y += rotationSpeed;
    wireframeRef.current.rotation.y += rotationSpeed;

    // React to mouse - subtle tilt
    const targetRotationX = mousePosition.current.y * 0.2;
    const targetRotationZ = mousePosition.current.x * 0.2;
    
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.03;
    meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.03;
    
    wireframeRef.current.rotation.x = meshRef.current.rotation.x;
    wireframeRef.current.rotation.z = meshRef.current.rotation.z;

    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    wireframeRef.current.position.y = meshRef.current.position.y;
  });

  // Update mouse position
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
    <group position={position} scale={scale * 2.5}>
      {/* Filled mesh with low opacity */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          flatShading
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Wireframe outline with glow */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.95}
          linewidth={3}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

function LowPolyShape({ position, type = 'icosahedron', color = '#00bfff' }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    switch (type) {
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1, 0);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(1, 0);
      default:
        return new THREE.IcosahedronGeometry(1, 0);
    }
  }, [type]);

  const wireframeGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 15);
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    // Slow rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;
    wireframeRef.current.rotation.x = meshRef.current.rotation.x;
    wireframeRef.current.rotation.y = meshRef.current.rotation.y;

    // Mouse interaction - scale slightly
    const distance = Math.sqrt(
      Math.pow(mousePosition.current.x * 5 - position[0], 2) +
      Math.pow(mousePosition.current.y * 5 - position[1], 2)
    );
    
    const targetScale = distance < 4 ? 1.15 : 1.0;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.05;
    
    meshRef.current.scale.set(newScale, newScale, newScale);
    wireframeRef.current.scale.set(newScale, newScale, newScale);

    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.2;
    wireframeRef.current.position.y = meshRef.current.position.y;
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
    <group position={position} scale={2.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.05}
          flatShading
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.95}
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
      {/* Enhanced lighting for better glow */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#00d4ff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0080ff" />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#00bfff" />

      {/* Low-poly mountains with enhanced scale */}
      <LowPolyMountain position={[-3, -1.5, -5]} scale={1} color="#00bfff" rotationSpeed={0.001} />
      <LowPolyMountain position={[3, -2, -7]} scale={1.2} color="#0099ff" rotationSpeed={-0.0008} />
      <LowPolyMountain position={[0, -2.5, -9]} scale={1.4} color="#0080ff" rotationSpeed={0.0012} />

      {/* Floating geometric shapes with enhanced scale */}
      <LowPolyShape position={[-4, 2, -4]} type="icosahedron" color="#00d4ff" />
      <LowPolyShape position={[4, 1, -6]} type="octahedron" color="#00bfff" />
      <LowPolyShape position={[-2, 3.5, -8]} type="tetrahedron" color="#0099ff" />
      <LowPolyShape position={[2, -0.5, -5]} type="dodecahedron" color="#00aaff" />
    </>
  );
}

export default function LowPolyWireframe() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0d0d0d' }}>
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
        <fog attach="fog" args={['#0d0d0d', 8, 20]} />
        
        {/* Bloom effect for glowing wireframes */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
