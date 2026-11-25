'use client';

import { useEffect, useRef } from 'react';

// Vanta.js GLOBE effect
const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaRef.current || vantaEffect.current) return;

    // Dynamically import vanta and three
    const loadVanta = async () => {
      try {
        // Import THREE first
        const THREE = await import('three');
        
        // Make THREE globally available for Vanta
        (window as any).THREE = THREE;

        // Import Vanta GLOBE effect
        const VANTA = await import('vanta/dist/vanta.globe.min.js');

        // Initialize Vanta effect
        vantaEffect.current = (VANTA as any).default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xc9a86a, // Gold accent
          color2: 0x4a6a94, // Soft navy-blue
          backgroundColor: 0x0f1b2d, // Navy background
          size: 1.20,
          spacing: 15.00,
        });
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    loadVanta();

    // Cleanup
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100vh', opacity: 0.35 }}
    />
  );
};

export default VantaBackground;
