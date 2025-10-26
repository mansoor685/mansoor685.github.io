'use client';

import dynamic from 'next/dynamic';

// Dynamically import Vanta background with no SSR
const VantaBackground = dynamic(
  () => import('./3d/VantaBackground'),
  { ssr: false, loading: () => null }
);

const ParticleBackground = () => {
  return <VantaBackground />;
};

export default ParticleBackground;
