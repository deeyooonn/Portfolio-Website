import { useEffect, useRef } from 'react';
import { GALAXY_DURATION as DURATION, GALAXY_TILT, GALAXY_COLORS, createGalaxyParticles, galaxyRadius, galaxyPoint, ambientAlpha } from '../utils/galaxy';

const REVEAL_AT = 1550;
const DISMISS_DURATION = 420;
const TAU = Math.PI * 2;
const smooth = (start, end, value) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

function makeGlow(color) {
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  const ctx = sprite.getContext('2d');
  if (!ctx) return null;
  const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  glow.addColorStop(0, `rgba(${color},0.5)`);
  glow.addColorStop(0.25, `rgba(${color},0.2)`);
  glow.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 64, 64);
  return sprite;
}

export default function GalaxyIntro({ onReveal, onComplete }) {
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) { onComplete(); return; }

    const particles = createGalaxyParticles(window.innerWidth < 640 ? 1000 : 1900);
    const colors = GALAXY_COLORS;
    const glows = colors.map(makeGlow);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let width = 0, height = 0, radius = 0, frame = 0;
    let previousTime = null, elapsed = 0, revealed = false, finished = false;
    let playbackRate = 1, dismissing = false, restoreFocusOnFinish = false;
    const finish = (restoreFocus = false) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      onComplete(restoreFocus || restoreFocusOnFinish || document.activeElement === overlay);
    };
    const dismiss = (restoreFocus = false) => {
      if (finished || dismissing) return;
      dismissing = true;
      restoreFocusOnFinish = restoreFocus;
      playbackRate = Math.max(1, (DURATION - elapsed) / DISMISS_DURATION);
      revealed = true;
      onReveal(true);
    };
    const click = event => dismiss(event.detail === 0);
    const draw = time => {
      const arrive = smooth(0, 650, time);
      const release = smooth(1300, DURATION, time);
      const dissolve = 1 - smooth(1950, DURATION, time);
      const settle = smooth(1900, DURATION, time);
      const turn = time * 0.000075;
      const scale = 0.91 + smooth(0, 1450, time) * 0.09;
      ctx.clearRect(0, 0, width, height);
      overlay.style.setProperty('--intro-veil', 1 - smooth(1450, 3150, time));

      ctx.save();
      ctx.translate(width * 0.5, height * 0.47);
      ctx.rotate(GALAXY_TILT);

      // Broad, dim light gives the disc depth without a bright central flash.
      ctx.save();
      ctx.scale(1, 0.48);
      const hazeRadius = radius * (0.85 + release * 0.65);
      const haze = ctx.createRadialGradient(0, 0, 0, 0, 0, hazeRadius);
      haze.addColorStop(0, 'rgba(181,199,229,0.15)');
      haze.addColorStop(0.16, 'rgba(137,165,216,0.12)');
      haze.addColorStop(0.48, 'rgba(91,114,176,0.06)');
      haze.addColorStop(1, 'rgba(91,114,176,0)');
      ctx.globalAlpha = arrive * (1 - release);
      ctx.fillStyle = haze;
      ctx.fillRect(-hazeRadius, -hazeRadius, hazeRadius * 2, hazeRadius * 2);
      ctx.restore();

      for (const particle of particles) {
        const { x, y } = galaxyPoint(particle, radius, Math.max(width, height), release, turn, scale);
        const alpha = particle.alpha * arrive * dissolve * (1 - release * (particle.star ? 0.25 : 0.8));

        if (particle.mist && glows[particle.color]) {
          const size = (18 + particle.radius * 23) * (1 + release);
          ctx.globalAlpha = alpha * 0.28 * (1 - release);
          ctx.drawImage(glows[particle.color], x - size / 2, y - size / 2, size, size);
        }
        ctx.globalAlpha = alpha * (1 - settle) + ambientAlpha(particle) * settle;
        ctx.fillStyle = `rgb(${colors[particle.color]})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size * (particle.star ? 1 : 0.7), 0, TAU);
        ctx.fill();
      }

      const core = glows[2];
      if (core) {
        const size = radius * 0.2;
        ctx.globalAlpha = arrive * (1 - release) * 0.65;
        ctx.drawImage(core, -size / 2, -size / 2, size, size);
      }
      ctx.restore();
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      radius = galaxyRadius(width, height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(elapsed);
    };
    const tick = now => {
      if (finished) return;
      if (previousTime !== null) elapsed += (now - previousTime) * playbackRate;
      previousTime = now;
      if (elapsed >= DURATION) { finish(); return; }
      if (elapsed >= REVEAL_AT && !revealed) { revealed = true; onReveal(); }
      draw(elapsed);
      frame = requestAnimationFrame(tick);
    };
    const keyDown = event => {
      if (event.key === 'Escape') { event.preventDefault(); dismiss(true); }
    };
    const visibility = () => { if (document.hidden) finish(); };

    resize();
    frame = requestAnimationFrame(tick);
    overlay.addEventListener('click', click);
    window.addEventListener('resize', resize);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('visibilitychange', visibility);
    // Release the page even if animation frames are throttled by the browser.
    const deadline = window.setTimeout(() => finish(), DURATION + 600);
    return () => {
      finished = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(deadline);
      overlay.removeEventListener('click', click);
      window.removeEventListener('resize', resize);
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('visibilitychange', visibility);
      document.body.style.overflow = previousOverflow;
    };
  }, [onReveal, onComplete]);

  return <button ref={overlayRef} type="button" className="galaxy-intro" aria-label="Skip opening animation">
    <span className="galaxy-intro-veil" aria-hidden="true" />
    <canvas ref={canvasRef} aria-hidden="true" />
  </button>;
}
