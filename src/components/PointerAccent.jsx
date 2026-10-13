import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function PointerAccent({ reducedMotion = false }) {
  const accentRef = useRef(null);
  const headRef = useRef(null);
  const trailRef = useRef(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    const accent = accentRef.current;
    const head = headRef.current;
    const canvas = trailRef.current;
    if (!accent || !head || !canvas || !finePointer || reducedMotion) return;
    const ctx = canvas.getContext('2d');

    const lifetime = 170;
    const tailLength = 96;
    let x = 0, y = 0, width = 0, height = 0;
    let frame = 0, visible = false;
    let points = [];
    const updateHover = target => {
      const control = target instanceof Element
        ? target.closest('a[href], button, [role="button"], [data-draggable="true"]')
        : null;
      accent.dataset.interactive = Boolean(control && !control.closest('[disabled], [aria-disabled="true"], [inert]'));
    };
    const drawTrail = now => {
      frame = 0;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      points = points.filter(point => now - point.time < lifetime);
      let distance = 0;
      // Trace the actual mouse path, tapering by distance and age.
      for (let i = points.length - 1; i > 0 && distance < tailLength; i--) {
        const start = points[i];
        const end = points[i - 1];
        const length = Math.hypot(end.x - start.x, end.y - start.y);
        if (length < 0.1) continue;
        const used = Math.min(length, tailLength - distance);
        const fraction = used / length;
        const endX = start.x + (end.x - start.x) * fraction;
        const endY = start.y + (end.y - start.y) * fraction;
        const endTime = start.time + (end.time - start.time) * fraction;
        const opacity = (position, time) => 0.5 * (1 - position / tailLength) ** 1.5 * Math.max(0, 1 - (now - time) / lifetime);
        const gradient = ctx.createLinearGradient(start.x, start.y, endX, endY);
        gradient.addColorStop(0, `rgba(158,193,255,${opacity(distance, start.time)})`);
        gradient.addColorStop(1, `rgba(158,193,255,${opacity(distance + used, endTime)})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.4 + 2.6 * (1 - (distance + used / 2) / tailLength);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        distance += used;
      }
      if (points.length > 1) frame = requestAnimationFrame(drawTrail);
    };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = [];
    };
    const hide = () => {
      visible = false;
      accent.dataset.visible = 'false';
      accent.dataset.pressed = 'false';
      cancelAnimationFrame(frame);
      frame = 0;
      points = [];
      ctx?.clearRect(0, 0, width, height);
    };
    const move = event => {
      if (event.pointerType !== 'mouse') { hide(); return; }
      x = event.clientX;
      y = event.clientY;
      // The head follows the event directly: no easing or positional lag.
      head.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        visible = true;
        accent.dataset.visible = 'true';
      }
      const now = performance.now();
      points = points.filter(point => now - point.time < lifetime).slice(-63);
      points.push({ x, y, time: now });
      updateHover(event.target);
      if (ctx && !frame) frame = requestAnimationFrame(drawTrail);
    };
    const press = event => {
      if (event.pointerType === 'mouse' && event.button === 0) accent.dataset.pressed = 'true';
    };
    const release = () => { accent.dataset.pressed = 'false'; };
    const leave = event => { if (!event.relatedTarget) hide(); };
    const keyboard = event => { if (event.key === 'Tab' || event.key === 'Escape') hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const scroll = () => { if (visible) updateHover(document.elementFromPoint(x, y)); };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointercancel', hide);
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('scroll', scroll, { passive: true, capture: true });
    return () => {
      hide();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', keyboard);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('scroll', scroll, true);
    };
  }, [finePointer, reducedMotion]);

  if (!finePointer || reducedMotion) return null;
  return <div ref={accentRef} className="pointer-accent" aria-hidden="true"><canvas ref={trailRef} /><span ref={headRef} className="pointer-head" /></div>;
}
