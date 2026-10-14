import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { GALAXY_TILT, GALAXY_COLORS, createGalaxyParticles, galaxyRadius, galaxyPoint, ambientAlpha } from '../utils/galaxy';

export default function SpaceBackground({ reducedMotion = false, introActive = false }) {
  const canvasRef = useRef(null);
  const starsRef = useRef(null);
  const touch = useMediaQuery('(hover: none) and (pointer: coarse)');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    if (!starsRef.current) {
      starsRef.current = createGalaxyParticles(window.innerWidth < 640 ? 1000 : 1900)
        .filter(particle => particle.star || particle.mist);
    }
    const stars = starsRef.current;
    const animated = !reducedMotion && !introActive;
    const motionScale = touch ? 0.5 : 1;
    const colors = GALAXY_COLORS.map(color => `rgb(${color})`);
    let width = 0, height = 0, frame = 0, previous = null, elapsed = 0, lastDraw = 0;
    let positions = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const point = positions[i];
        const phase = star.angle;
        // Start at the intro's exact final position, then float only a few pixels.
        const driftX = animated ? (Math.sin(elapsed * 0.045 + phase) - Math.sin(phase)) * 5 * motionScale : 0;
        const driftY = animated ? (Math.cos(elapsed * 0.035 + phase) - Math.cos(phase)) * 3 * motionScale : 0;
        const twinkle = animated ? 1 + Math.sin(elapsed * 0.3 + phase) * 0.1 * Math.min(elapsed / 3, 1) : 1;
        const x = point.x + driftX;
        const y = point.y + driftY;
        if (x < -2 || x > width + 2 || y < -2 || y > height + 2) continue;
        ctx.globalAlpha = ambientAlpha(star) * twinkle;
        ctx.fillStyle = colors[star.color];
        ctx.beginPath();
        ctx.arc(x, y, star.size * (star.star ? 1 : 0.7), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const radius = galaxyRadius(width, height);
      const cosine = Math.cos(GALAXY_TILT), sine = Math.sin(GALAXY_TILT);
      positions = stars.map(star => {
        const { x, y } = galaxyPoint(star, radius, Math.max(width, height));
        return { x: width * 0.5 + x * cosine - y * sine, y: height * 0.47 + x * sine + y * cosine };
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const tick = now => {
      elapsed += previous === null ? 0 : Math.min((now - previous) / 1000, 0.1);
      previous = now;
      if (now - lastDraw >= 1000 / 30) { draw(); lastDraw = now; }
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      previous = null;
      canvas.parentElement.dataset.paused = document.hidden || introActive;
      if (!document.hidden && animated) frame = requestAnimationFrame(tick);
    };

    resize();
    visibility();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [reducedMotion, touch, introActive]);

  return <div className="space-background" aria-hidden="true" data-reduced-motion={reducedMotion} data-intro-active={introActive}>
    <div className="space-atmosphere" />
    <div className="space-vignette" />
    <canvas ref={canvasRef} />
  </div>;
}
