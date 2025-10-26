'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import all 3D components
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });
const FloatingShapes = dynamic(() => import('./FloatingShapes'), { ssr: false });
const WaveBackground = dynamic(() => import('./WaveBackground'), { ssr: false });

const animations = [
  {
    id: 'particles',
    name: 'Particle Field',
    description: 'Interactive particles that respond to mouse movement with gradient colors',
    component: ParticleField,
  },
  {
    id: 'shapes',
    name: 'Floating Shapes',
    description: 'Geometric 3D shapes with distortion and metallic materials',
    component: FloatingShapes,
  },
  {
    id: 'waves',
    name: 'Wave Background',
    description: 'Animated wave plane with custom GLSL shaders',
    component: WaveBackground,
  },
];

export default function Animation3DDemo() {
  const [activeAnimation, setActiveAnimation] = useState('particles');

  const ActiveComponent = animations.find((anim) => anim.id === activeAnimation)?.component;

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      {/* Render active 3D animation */}
      {ActiveComponent && <ActiveComponent />}

      {/* Control Panel */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-8 border border-white/10"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              3D Animation <span className="gradient-text">Preview</span>
            </h1>
            <p className="text-gray-400 mb-8">
              Choose a 3D animation to preview and integrate into your portfolio
            </p>

            {/* Animation Selector */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {animations.map((anim) => (
                <motion.button
                  key={anim.id}
                  onClick={() => setActiveAnimation(anim.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-xl border transition-all ${
                    activeAnimation === anim.id
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <h3 className="text-lg font-bold text-white mb-2">{anim.name}</h3>
                  <p className="text-sm text-gray-400">{anim.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Current Animation Info */}
            <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold text-sm">Active Animation</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {animations.find((a) => a.id === activeAnimation)?.name}
              </h4>
              <p className="text-gray-300 text-sm">
                {animations.find((a) => a.id === activeAnimation)?.description}
              </p>
            </div>

            {/* Integration Code */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Integration Code</h3>
              <div className="bg-[#1a1a24] border border-white/10 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{`// In ParticleBackground.tsx
import dynamic from 'next/dynamic';

const ${animations.find((a) => a.id === activeAnimation)?.component.name} = dynamic(
  () => import('./3d/${animations.find((a) => a.id === activeAnimation)?.component.name}'),
  { ssr: false, loading: () => null }
);

const ParticleBackground = () => {
  return <${animations.find((a) => a.id === activeAnimation)?.component.name} />;
};

export default ParticleBackground;`}</code>
                </pre>
              </div>
            </div>

            {/* Back to Portfolio Link */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-glow transition-all"
            >
              ← Back to Portfolio
            </motion.a>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 grid md:grid-cols-3 gap-4"
          >
            <div className="glass-effect rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-white mb-2">Performance</h4>
              <p className="text-sm text-gray-400">
                All animations are optimized for 60 FPS and minimal GPU usage
              </p>
            </div>
            <div className="glass-effect rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🎨</div>
              <h4 className="font-bold text-white mb-2">Customizable</h4>
              <p className="text-sm text-gray-400">
                Easy to modify colors, speed, and intensity to match your brand
              </p>
            </div>
            <div className="glass-effect rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-bold text-white mb-2">Responsive</h4>
              <p className="text-sm text-gray-400">
                Works seamlessly across desktop, tablet, and mobile devices
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
