import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function SpaceBackground({ reducedMotion = false }) {
  const canvasRef = useRef(null);
  const starsRef = useRef(null);
  const touch = useMediaQuery('(hover: none) and (pointer: coarse)');
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    if (!starsRef.current) {
    starsRef.current = Array.from({ length: 130 }, (_, i) => ({
      x: Math.random(), y: Math.random(), layer: i % 3,
      radius: 0.3 + Math.random() * 0.55 + (i % 3) * 0.18,
      alpha: 0.22 + Math.random() * 0.3 + (i % 3) * 0.08,
      phase: Math.random() * Math.PI * 2, speed: 0.18 + Math.random() * 0.3,
    }));
  }
    const stars = starsRef.current.slice(0, touch ? 80 : 130);
    const styles = getComputedStyle(document.documentElement);
    const colors = [styles.getPropertyValue('--text-primary').trim(), styles.getPropertyValue('--accent').trim()];
    const animated = !reducedMotion && !touch;
    let width = 0, height = 0, frame = 0, previous = 0, elapsed = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let layer = 0; layer < 3; layer++) {
        ctx.fillStyle = colors[layer === 2 ? 1 : 0];
        const drift = animated ? Math.sin(elapsed * 0.015 + layer) * layer * 1.5 : 0;
        for (const star of stars) {
          if (star.layer !== layer) continue;
          ctx.globalAlpha = star.alpha * (animated ? 0.85 + Math.sin(elapsed * star.speed + star.phase) * 0.15 : 1);
          ctx.beginPath(); ctx.arc(star.x * width + drift, star.y * height, star.radius, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(); // Repaint in the resize event; normalized star positions never randomize.
    };
    const tick = now => {
      elapsed += previous ? Math.min((now - previous) / 1000, 0.1) : 0;
      previous = now; draw(); frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame); previous = 0;
      if (!document.hidden && animated) frame = requestAnimationFrame(tick);
    };
    resize(); visibility();
    window.addEventListener('resize', resize); document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility); };
  }, [reducedMotion, touch]);
  return <div className="space-background" aria-hidden="true"><canvas ref={canvasRef} /><div className="space-vignette" /></div>;
}
