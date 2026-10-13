import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
function ImageViewer({ screenshots, initialIndex, onClose, reducedMotion }) {
  const [index, setIndex] = useState(initialIndex);
  const ref = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    const app = document.querySelector('.app');
    const wasInert = app.inert; app.inert = true;
    closeRef.current?.focus();
    return () => { app.inert = wasInert; };
  }, []);
  useEffect(() => {
    const key = e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); onClose(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopImmediatePropagation(); setIndex(i => Math.max(0, Math.min(screenshots.length - 1, i + (e.key === 'ArrowLeft' ? -1 : 1)))); }
      if (e.key === 'Tab') {
        const controls = Array.from(ref.current.querySelectorAll('button:not([disabled])'));
        const i = controls.indexOf(document.activeElement);
        if (e.shiftKey ? i <= 0 : i === controls.length - 1) { e.preventDefault(); controls[e.shiftKey ? controls.length - 1 : 0].focus(); }
      }
    };
    document.addEventListener('keydown', key, true);
    return () => document.removeEventListener('keydown', key, true);
  }, [onClose, screenshots.length]);
  const current = screenshots[index];
  return createPortal(<motion.div ref={ref} className="image-viewer" data-image-viewer role="dialog" aria-modal="true" aria-label={current.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0.12 : 0.18 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <button ref={closeRef} className="icon-button viewer-close" aria-label="Close screenshot" onClick={onClose}><X size={22} /></button>
    <div className="viewer-image"><AnimatePresence mode="wait" initial={false}><motion.img key={current.path} src={current.path} alt={current.alt} width="1600" height="1000" decoding="async" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} /></AnimatePresence></div>
    {screenshots.length > 1 && <div className="viewer-navigation"><button className="icon-button" disabled={index === 0} aria-label="Previous screenshot" onClick={() => setIndex(i => i - 1)}><ChevronLeft /></button><button className="icon-button" disabled={index === screenshots.length - 1} aria-label="Next screenshot" onClick={() => setIndex(i => i + 1)}><ChevronRight /></button></div>}
    {current.caption && <p className="viewer-caption">{current.caption}</p>}
  </motion.div>, document.body);
}
export default function ScreenshotGallery({ screenshots, project, reducedMotion }) {
  const [index, setIndex] = useState(0), [viewer, setViewer] = useState(false);
  const opener = useRef(null);
  const current = screenshots[index] || screenshots[0];
  const close = () => { setViewer(false); requestAnimationFrame(() => opener.current?.focus({ preventScroll: true })); };
  return <div className="screenshot-gallery">
    <button ref={opener} className="screenshot-frame" aria-label={`Open ${current.alt}`} onClick={() => setViewer(true)}>
      <AnimatePresence initial={false}><motion.img key={current.path} src={current.path} alt={current.alt} width="1600" height="1000" loading="lazy" decoding="async" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} /></AnimatePresence>
    </button>
    {screenshots.length > 1 && <div className="screenshot-thumbnails">{screenshots.map((image, i) => <button key={image.path + i} aria-label={`${project.title} screenshot ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)}><img src={image.path} alt="" width="160" height="100" loading="lazy" decoding="async" /></button>)}</div>}
    {current.caption && <p className="screenshot-caption">{current.caption}</p>}
    {viewer && <ImageViewer screenshots={screenshots} initialIndex={index} onClose={close} reducedMotion={reducedMotion} />}
  </div>;
}
