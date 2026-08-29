import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// ─── Space Background: Twinkling Stars + Meteor Showers ──────────────────────
function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    // ── Stars ──────────────────────────────────────────────────────────────────
    let stars = [];
    const STAR_COUNT = 220;

    const initStars = () => {
      const now = Date.now();
      stars = Array.from({ length: STAR_COUNT }, () => {
        const palette = Math.random();
        let color;
        if (palette < 0.6) color = { h: 200, s: 20, l: 95 };       // cool white
        else if (palette < 0.8) color = { h: 185, s: 80, l: 75 };  // cyan
        else color = { h: 270, s: 70, l: 80 };                       // purple

        // ~30% of stars are "blinkers"
        const isBlinker = Math.random() < 0.30;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: isBlinker ? Math.random() * 2 + 0.8 : Math.random() * 1.2 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005,
          color,
          isBlinker,
          // Use real timestamps for reliable blink timing
          nextBlink: now + Math.random() * 3000,          // when next flash starts
          blinkInterval: 2000 + Math.random() * 5000,    // gap between flashes
          blinkDuration: 150 + Math.random() * 200,      // ms the flash lasts
          blinkStart: 0,                                   // timestamp of current flash
          isFlashing: false,
          baseAlpha: 0.15 + Math.random() * 0.15,        // visible dim resting state
        };
      });
    };

    initStars();

    // ── Meteors ────────────────────────────────────────────────────────────────
    let meteors = [];
    let lastMeteorTime = Date.now() + 8000; // first shower after 8s
    const METEOR_INTERVAL_MIN = 25000; // 25s
    const METEOR_INTERVAL_MAX = 45000; // 45s
    let nextMeteorDelay = METEOR_INTERVAL_MIN +
      Math.random() * (METEOR_INTERVAL_MAX - METEOR_INTERVAL_MIN);

    const spawnMeteorShower = () => {
      const count = Math.floor(Math.random() * 2) + 2; // 2–3 meteors
      for (let i = 0; i < count; i++) {
        const delay = i * (200 + Math.random() * 300);
        setTimeout(() => {
          const angle = Math.PI / 5; // ~36° diagonal
          const speed = 12 + Math.random() * 8;
          meteors.push({
            x: Math.random() * width * 0.7 + width * 0.1,
            y: -20,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 80 + Math.random() * 120,
            alpha: 1,
            decay: 0.012 + Math.random() * 0.008,
            width: Math.random() * 1.5 + 0.5,
          });
        }, delay);
      }
    };

    // ── Draw Loop ──────────────────────────────────────────────────────────────
    let animId;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.016;

      // Check meteor shower timer
      const now = Date.now();
      if (now - lastMeteorTime > nextMeteorDelay) {
        spawnMeteorShower();
        lastMeteorTime = now;
        nextMeteorDelay = METEOR_INTERVAL_MIN +
          Math.random() * (METEOR_INTERVAL_MAX - METEOR_INTERVAL_MIN);
      }

      // Draw stars (twinklers + blinkers)
      const nowMs = Date.now();
      for (const s of stars) {
        let alpha, scale, shadowBlur;

        if (s.isBlinker) {
          // Trigger a new flash?
          if (!s.isFlashing && nowMs >= s.nextBlink) {
            s.isFlashing = true;
            s.blinkStart = nowMs;
          }

          if (s.isFlashing) {
            const elapsed = nowMs - s.blinkStart;
            if (elapsed < s.blinkDuration) {
              // Arc from 0 → peak → 0 using sine
              const progress = Math.sin((elapsed / s.blinkDuration) * Math.PI);
              alpha = s.baseAlpha + progress * 0.85;
              scale = 1 + progress * 1.2;        // grows noticeably during flash
              shadowBlur = 4 + progress * 20;   // big glow burst at peak
            } else {
              // Flash over — reset
              s.isFlashing = false;
              s.nextBlink = nowMs + s.blinkInterval;
              alpha = s.baseAlpha;
              scale = 1;
              shadowBlur = 2;
            }
          } else {
            alpha = s.baseAlpha;
            scale = 1;
            shadowBlur = 2;
          }
        } else {
          // Smooth sine twinkle
          const twinkle = Math.sin(t * s.speed * 60 + s.phase);
          alpha = 0.25 + 0.65 * ((twinkle + 1) / 2);
          scale = 0.7 + 0.3 * ((twinkle + 1) / 2);
          shadowBlur = s.r > 1 ? 4 : 2;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = `hsl(${s.color.h}, ${s.color.s}%, ${s.color.l}%)`;
        ctx.shadowColor = `hsl(${s.color.h}, 90%, 90%)`;
        ctx.shadowBlur = shadowBlur;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw meteors
      meteors = meteors.filter(m => m.alpha > 0);
      for (const m of meteors) {
        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(180,240,255,${m.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${m.alpha})`);

        ctx.save();
        ctx.globalAlpha = m.alpha;
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(160, 230, 255, 0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.restore();

        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── Starry Cursor Sparkle ────────────────────────────────────────────────────
function StarCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2 };
    let particles = [];

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const count = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        const size = Math.random() * 2.5 + 0.5;
        const hue = Math.random() > 0.5 ? 185 : 260;
        const life = Math.random() * 40 + 30;
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          size, alpha: 1, hue,
          sat: Math.random() * 20 + 80,
          light: Math.random() * 20 + 60,
          life, maxLife: life,
        });
      }
    };

    let glowX = width / 2, glowY = height / 2;
    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Snap glow directly to cursor — no lag
      glowX = mouse.x;
      glowY = mouse.y;

      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 80);
      gradient.addColorStop(0, 'rgba(34,211,238,0.07)');
      gradient.addColorStop(0.5, 'rgba(34,211,238,0.03)');
      gradient.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(glowX, glowY, 80, 0, Math.PI * 2);
      ctx.fill();

      particles = particles.filter(p => p.life > 0);
      for (const p of particles) {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.97;
        p.alpha = p.life / p.maxLife;

        const s = p.size * p.alpha;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 0.05);
        ctx.fillStyle = `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const a = (j / 4) * Math.PI * 2;
          const r = j % 2 === 0 ? s * 2.5 : s * 0.7;
          ctx[j === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-sky-500/30">
      {/* ── Deep space CSS background — clean, no image needed ── */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(15,30,60,0.95) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 85% 75%, rgba(20,10,50,0.9) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(10,25,55,0.7) 0%, transparent 70%),
            linear-gradient(160deg, #020811 0%, #060d1f 30%, #050a18 60%, #040810 100%)
          `
        }}
      />
      {/* Subtle nebula colour hints */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 45% 35% at 10% 35%, rgba(34,211,238,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 90% 60%, rgba(139,92,246,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 30% 25% at 65% 20%, rgba(56,189,248,0.03) 0%, transparent 60%)
          `
        }}
      />

      {/* Twinkling stars + meteor showers */}
      <SpaceBackground />

      {/* Starry cursor sparkle */}
      <StarCursor />

      {/* Main Content */}
      <main className="relative z-10 w-full">
        <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-transparent border-b border-white/5">
          <div className="font-bold text-xl tracking-tighter font-mono">
            DION<span className="text-cyan-400">.DEV</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300 font-mono">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Skills</button>
            <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</button>
          </div>
        </nav>

        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
