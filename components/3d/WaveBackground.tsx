'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WavePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader for wave effect
  const vertexShader = `
    uniform float uTime;
    uniform float uWaveFrequency;
    uniform float uWaveAmplitude;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Create wave patterns
      float wave1 = sin(pos.x * uWaveFrequency + uTime) * uWaveAmplitude;
      float wave2 = sin(pos.y * uWaveFrequency * 1.5 - uTime * 0.7) * uWaveAmplitude;
      float wave3 = sin((pos.x + pos.y) * uWaveFrequency * 0.5 + uTime * 0.5) * uWaveAmplitude * 0.5;
      
      pos.z += wave1 + wave2 + wave3;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform float uOpacity;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vec3 color = mix(uColorStart, uColorEnd, vElevation * 2.0 + 0.5);
      gl_FragColor = vec4(color, uOpacity);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uWaveFrequency: { value: 1.5 },
    uWaveAmplitude: { value: 0.5 },
    uColorStart: { value: new THREE.Color('#3b82f6') },
    uColorEnd: { value: new THREE.Color('#8b5cf6') },
    uOpacity: { value: 0.15 },
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

export default function WaveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <WavePlane />
      </Canvas>
    </div>
  );
}
