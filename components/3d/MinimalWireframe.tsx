'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

// Custom grid geometry helper
class GridGeometry extends THREE.BufferGeometry {
  constructor(width = 10, height = 10, widthSegments = 10, heightSegments = 10) {
    super();

    const vertices: number[] = [];
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Horizontal lines
    for (let i = 0; i <= heightSegments; i++) {
      const y = (i / heightSegments) * height - halfHeight;
      vertices.push(-halfWidth, y, 0);
      vertices.push(halfWidth, y, 0);
    }

    // Vertical lines
    for (let i = 0; i <= widthSegments; i++) {
      const x = (i / widthSegments) * width - halfWidth;
      vertices.push(x, -halfHeight, 0);
      vertices.push(x, halfHeight, 0);
    }

    this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  }
}

function MinimalWireframeGrid() {
  const gridRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const size = 26;
    const divisions = 24;
    return new GridGeometry(size, size, divisions, divisions);
  }, []);

  useFrame((state) => {
    if (!gridRef.current) return;

    // Gentle wave effect
    const positions = geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const time = state.clock.elapsedTime;
      
      const distance = Math.sqrt(x * x + y * y);
      const wave = Math.sin(distance * 0.25 - time * 0.5) * 0.7;
      positions[i + 2] = wave;
    }
    
    geometry.attributes.position.needsUpdate = true;

    // React to mouse - subtle
    const targetRotationX = -Math.PI / 4 + mousePosition.current.y * 0.1;
    const targetRotationY = mousePosition.current.x * 0.15;
    
    gridRef.current.rotation.x += (targetRotationX - gridRef.current.rotation.x) * 0.03;
    gridRef.current.rotation.y += (targetRotationY - gridRef.current.rotation.y) * 0.03;
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
    <lineSegments ref={gridRef} geometry={geometry} position={[0, -3, -10]} scale={1.5}>
      <lineBasicMaterial 
        color="#00d4ff" 
        transparent 
        opacity={0.8}
        linewidth={2}
        toneMapped={false}
      />
    </lineSegments>
  );
}

function AbstractWireframeSphere({ position, size = 1.5, color = '#00bfff' }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const [geometry, wireframeGeometry] = useMemo(() => {
    const geo = new THREE.SphereGeometry(size, 10, 8);
    const wireGeo = new THREE.EdgesGeometry(geo, 15);
    return [geo, wireGeo];
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    // Slow rotation
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;
    wireframeRef.current.rotation.copy(meshRef.current.rotation);

    // Mouse interaction - slight tilt
    const targetRotationZ = mousePosition.current.x * 0.15;
    meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.03;
    wireframeRef.current.rotation.z = meshRef.current.rotation.z;

    // Gentle pulse
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    meshRef.current.scale.set(scale, scale, scale);
    wireframeRef.current.scale.set(scale, scale, scale);
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
    <group position={position} scale={2.3}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.03}
        />
      </mesh>
      
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.9}
          linewidth={2.5}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[12, 12, 12]} intensity={0.6} color="#00d4ff" />
      <pointLight position={[-8, 6, 8]} intensity={0.4} color="#00bfff" />

      <MinimalWireframeGrid />
      
      <AbstractWireframeSphere position={[0, 0, -6]} size={1.6} color="#00d4ff" />
      <AbstractWireframeSphere position={[-5, 1.5, -8]} size={1.1} color="#00bfff" />
      <AbstractWireframeSphere position={[5, -1.5, -7]} size={1.3} color="#0099ff" />
    </>
  );
}

export default function MinimalWireframe() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0d0d0d' }}>
      <Canvas
        camera={{ position: [0, 0, 13], fov: 55 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
        <fog attach="fog" args={['#0d0d0d', 12, 22]} />
        
        {/* Bloom effect for glowing wireframes */}
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
