import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

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

      // Spawn 2-3 sparkles per move
      const count = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        const size = Math.random() * 2.5 + 0.5;
        const hue = Math.random() > 0.5 ? 185 : 260; // cyan or purple
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          size,
          alpha: 1,
          hue,
          sat: Math.random() * 20 + 80,
          light: Math.random() * 20 + 60,
          life: Math.random() * 40 + 30,
          maxLife: 0,
        });
        particles[particles.length - 1].maxLife = particles[particles.length - 1].life;
      }
    };

    // Soft glow ring around cursor
    let glowX = width / 2, glowY = height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth glow ring following cursor
      glowX += (mouse.x - glowX) * 0.12;
      glowY += (mouse.y - glowY) * 0.12;

      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 80);
      gradient.addColorStop(0, 'rgba(34,211,238,0.07)');
      gradient.addColorStop(0.5, 'rgba(34,211,238,0.03)');
      gradient.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(glowX, glowY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Draw + update sparkles
      particles = particles.filter(p => p.life > 0);
      for (const p of particles) {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // slight gravity
        p.vx *= 0.97;
        p.alpha = p.life / p.maxLife;

        const s = p.size * p.alpha;

        // Star shape (4-point cross)
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 0.05);
        ctx.fillStyle = `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
        ctx.shadowBlur = 6;

        // Draw a tiny 4-point star
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

      requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    return () => {
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
      {/* Starry cursor sparkle layer */}
      <StarCursor />

      {/* New nebula background */}
      <div
        className="fixed inset-0 -z-20 bg-[url('/nebula_bg.jpg')] bg-cover bg-center bg-no-repeat"
      />
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 -z-10 bg-slate-950/70" />

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
