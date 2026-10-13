import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function PointerAccent({ reducedMotion = false }) {
  const accentRef = useRef(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    const accent = accentRef.current;
    if (!accent || !finePointer || reducedMotion) return;

    let x = 0, y = 0, targetX = 0, targetY = 0;
    let frame = 0, previous = 0, visible = false;
    const position = () => { accent.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
    const updateHover = target => {
      const control = target instanceof Element
        ? target.closest('a[href], button, [role="button"], [data-draggable="true"]')
        : null;
      accent.dataset.interactive = Boolean(control && !control.closest('[disabled], [aria-disabled="true"], [inert]'));
    };
    const tick = now => {
      const delta = previous ? Math.min(now - previous, 50) : 16;
      previous = now;
      const ease = 1 - Math.exp(-delta / 55);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      position();
      if (Math.hypot(targetX - x, targetY - y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        previous = 0;
      }
    };
    const hide = () => {
      visible = false;
      accent.dataset.visible = 'false';
      accent.dataset.pressed = 'false';
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    };
    const move = event => {
      if (event.pointerType !== 'mouse') { hide(); return; }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX; y = targetY;
        position();
        visible = true;
        accent.dataset.visible = 'true';
      }
      updateHover(event.target);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const press = event => {
      if (event.pointerType === 'mouse' && event.button === 0) accent.dataset.pressed = 'true';
    };
    const release = () => { accent.dataset.pressed = 'false'; };
    const leave = event => { if (!event.relatedTarget) hide(); };
    const keyboard = event => { if (event.key === 'Tab' || event.key === 'Escape') hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const scroll = () => { if (visible) updateHover(document.elementFromPoint(targetX, targetY)); };

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
  return <div ref={accentRef} className="pointer-accent" aria-hidden="true"><span /></div>;
}
