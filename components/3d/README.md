# 3D Animation Components Documentation

This portfolio includes professional 3D animations built with React Three Fiber and Framer Motion. All animations are optimized, subtle, and enhance the user experience without being distracting.

## 🎨 Available Components

### 1. **ParticleField** (Currently Active)
Interactive particle system with 800 animated particles that respond to mouse movement.

**Features:**
- Gradient colored particles (blue → purple → pink)
- Subtle rotation and wave motion
- Mouse-reactive movement
- Additive blending for glow effect
- Performance optimized with `useMemo`

**Usage:**
```tsx
import { ParticleField } from '@/components/3d';

<ParticleField />
```

---

### 2. **FloatingShapes**
Floating geometric 3D shapes with distortion effects.

**Features:**
- 6 different shapes (spheres, torus, octahedrons)
- Gentle floating animation
- Material distortion effects
- Metallic and glass-like appearance
- Positioned strategically for depth

**Usage:**
```tsx
import { FloatingShapes } from '@/components/3d';

<FloatingShapes />
```

**To Switch:** Replace `<ParticleField />` with `<FloatingShapes />` in `ParticleBackground.tsx`

---

### 3. **WaveBackground**
Animated wave plane with custom GLSL shaders.

**Features:**
- Custom vertex shader for wave motion
- Multi-layered wave patterns
- Gradient color transition
- Positioned at bottom for depth
- Ultra-smooth 60 FPS animation

**Usage:**
```tsx
import { WaveBackground } from '@/components/3d';

<WaveBackground />
```

---

### 4. **Interactive3DCard**
Wrapper component for project cards with 3D tilt effect.

**Features:**
- Mouse-tracking 3D rotation
- Hover glow effect
- Smooth spring animations
- Customizable intensity
- Transform perspective depth

**Usage:**
```tsx
import { Interactive3DCard } from '@/components/3d';

<Interactive3DCard intensity={15} className="your-classes">
  <YourCardContent />
</Interactive3DCard>
```

**Props:**
- `children`: React nodes to wrap
- `className`: Additional CSS classes
- `intensity`: Rotation intensity (default: 20)

**Integration Example:**
```tsx
// In Projects.tsx
import { Interactive3DCard } from '@/components/3d';

<Interactive3DCard>
  <div className="glass-effect rounded-2xl p-6">
    {/* Your project card content */}
  </div>
</Interactive3DCard>
```

---

## 🔄 Switching Animations

### Current Setup
The portfolio uses `ParticleField` by default. To switch:

1. **Open** `components/ParticleBackground.tsx`
2. **Change** the import:
```tsx
// Current
const ParticleField = dynamic(
  () => import('./3d/ParticleField'),
  { ssr: false, loading: () => null }
);

// To use FloatingShapes instead
const FloatingShapes = dynamic(
  () => import('./3d/FloatingShapes'),
  { ssr: false, loading: () => null }
);

// Or WaveBackground
const WaveBackground = dynamic(
  () => import('./3d/WaveBackground'),
  { ssr: false, loading: () => null }
);
```

3. **Update** the return statement:
```tsx
const ParticleBackground = () => {
  return <FloatingShapes />; // or <WaveBackground />
};
```

---

## 🎯 Combining Multiple Animations

You can layer multiple 3D effects for a richer experience:

```tsx
// In ParticleBackground.tsx
const ParticleField = dynamic(() => import('./3d/ParticleField'), { ssr: false });
const FloatingShapes = dynamic(() => import('./3d/FloatingShapes'), { ssr: false });

const ParticleBackground = () => {
  return (
    <>
      <ParticleField />
      <FloatingShapes />
    </>
  );
};
```

**Note:** Combining too many effects may impact performance on lower-end devices.

---

## ⚙️ Customization

### Particle Field
Edit `components/3d/ParticleField.tsx`:

```tsx
// Change particle count (line ~145)
<Particles count={800} /> // Default: 800

// Modify colors (line ~33-35)
const color1 = new THREE.Color('#3b82f6'); // Your color 1
const color2 = new THREE.Color('#8b5cf6'); // Your color 2
const color3 = new THREE.Color('#ec4899'); // Your color 3

// Adjust particle size (line ~123)
size={0.08} // Default: 0.08

// Change opacity (line ~127)
opacity={0.6} // Default: 0.6
```

### Floating Shapes
Edit `components/3d/FloatingShapes.tsx`:

```tsx
// Change shapes array (line ~51-56)
const shapes = useMemo(() => [
  { position: [-8, 4, -5], color: '#3b82f6', shape: 'sphere', scale: 1.2 },
  // Add more shapes or modify existing ones
], []);

// Available shapes: 'sphere', 'torus', 'octahedron'
```

### Wave Background
Edit `components/3d/WaveBackground.tsx`:

```tsx
// Adjust wave properties (line ~57-61)
uWaveFrequency: { value: 1.5 }, // Higher = more waves
uWaveAmplitude: { value: 0.5 }, // Higher = taller waves
uOpacity: { value: 0.15 },      // Transparency
```

---

## 🚀 Performance Optimization

All components are optimized for production:

### Built-in Optimizations
- **Dynamic imports** with `next/dynamic` (no SSR)
- **Device pixel ratio** limited to `[1, 2]`
- **useMemo** for expensive calculations
- **powerPreference: 'high-performance'**
- **Efficient render loops** with `useFrame`

### Performance Tips
1. **Mobile**: Reduce particle count to 400-600
2. **Low-end devices**: Use WaveBackground (lightest)
3. **High-end**: Combine ParticleField + FloatingShapes
4. **Monitor FPS**: Use browser DevTools Performance tab

### Disable on Mobile (Optional)
```tsx
'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('./3d/ParticleField'), { ssr: false });

const ParticleBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null; // Disable on mobile

  return <ParticleField />;
};
```

---

## 🎨 Color Scheme

All 3D components use your portfolio's color palette:

- **Primary Blue**: `#3b82f6`
- **Secondary Purple**: `#8b5cf6`
- **Accent Pink**: `#ec4899`

These match the CSS variables in `globals.css`.

---

## 📦 Dependencies

Required packages (already installed):
```json
{
  "three": "^0.180.0",
  "@react-three/fiber": "latest",
  "@react-three/drei": "latest",
  "framer-motion": "^11.x"
}
```

---

## 🐛 Troubleshooting

### Issue: "window is not defined"
**Solution**: Components use `dynamic` import with `ssr: false`

### Issue: Animations not visible
**Check:**
1. Z-index is set correctly (`z-0`)
2. Canvas has `pointer-events-none`
3. Browser supports WebGL

### Issue: Poor performance
**Solutions:**
1. Reduce particle count
2. Switch to simpler animation (WaveBackground)
3. Disable on mobile devices
4. Check GPU acceleration is enabled

### Issue: Black screen/no render
**Debug:**
```tsx
// Add error boundary
<Canvas onError={(error) => console.error('WebGL Error:', error)}>
```

---

## 🎬 Animation Behaviors

### ParticleField
- Continuous slow rotation
- Gentle wave motion
- Mouse proximity reaction (3 unit radius)
- Smooth color transitions

### FloatingShapes
- Vertical floating (Float component)
- Gentle rotation on all axes
- Material distortion animation
- Independent shape movement

### WaveBackground
- Multi-layered sine waves
- Time-based animation
- Color gradient based on elevation
- Perspective depth

### Interactive3DCard
- Follows mouse within bounds
- Spring-based smooth transitions
- Hover glow effect
- Returns to neutral on mouse leave

---

## 💡 Best Practices

1. **Use only one background animation** at a time
2. **Test on multiple devices** before deploying
3. **Monitor performance** in production
4. **Keep animations subtle** - they should enhance, not distract
5. **Respect reduced motion** preferences (add in future)

---

## 🔮 Future Enhancements

Potential additions:
- [ ] Scroll-based animation triggers
- [ ] Touch gesture support for mobile
- [ ] Reduced motion support (accessibility)
- [ ] Theme-based color switching
- [ ] Performance mode toggle
- [ ] Custom shape loader for 3D models
- [ ] Bloom post-processing effects

---

## 📚 Learn More

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Framer Motion 3D](https://www.framer.com/motion/3d/)

---

## 🤝 Support

Need help customizing? Check:
1. Component prop types for available options
2. Three.js documentation for advanced features
3. Browser console for WebGL errors

---

**Created with ❤️ for your portfolio**
