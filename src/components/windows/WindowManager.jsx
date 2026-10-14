import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Window from './Window';
import Projects from '../Projects';
import Skills from '../Skills';
import Experience from '../Experience';
import Contact from '../Contact';
import { WindowManagerContext } from './WindowManagerContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
const CONFIG = {
  projects: { title: 'Projects', variant: 'layer', Component: Projects },
  skills: { title: 'Skills', variant: 'layer', Component: Skills },
  experience: { title: 'Experience', variant: 'layer', Component: Experience },
  contact: { title: 'Contact', variant: 'layer', Component: Contact },
};
export default function WindowManager(props) {
  const { windows, topWindowId, selectedItemId, setSelectedItemId, openWindow, closeWindow, bringToFront, closeTopWindow, reducedMotion, originRects, openers, menuRefs } = props;
  const isOpen = windows.length > 0;
  const mobile = useMediaQuery('(max-width: 639px)');
  const previousTop = useRef(null);
  const dockRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [isOpen]);
  useEffect(() => {
    const old = previousTop.current; previousTop.current = topWindowId;
    const frame = requestAnimationFrame(() => {
      if (topWindowId) {
        const dialog = document.querySelector(`[data-window="${topWindowId}"]`);
        if (!dialog?.contains(document.activeElement)) (dialog?.querySelector('[data-autofocus]') || dialog?.querySelector('button'))?.focus({ preventScroll: true });
      } else if (old) {
        const opener = openers.current[old];
        (opener?.isConnected && !opener.closest('[inert], .section-dock') ? opener : menuRefs[old]?.current)?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [topWindowId, openers, menuRefs]);
  useEffect(() => {
    if (!isOpen) return;
    const keyDown = e => {
      if (e.defaultPrevented || document.querySelector('[data-image-viewer]')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        if (selectedItemId) setSelectedItemId(null);
        else closeTopWindow();
      }
      if (e.key === 'Tab') {
        const dialog = document.querySelector(`[data-window="${topWindowId}"]`);
        const controls = [dialog, mobile ? null : dockRef.current].filter(Boolean).flatMap(root => Array.from(root.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]'))).filter(el => !el.closest('[inert]') && el.getClientRects().length);
        const index = controls.indexOf(document.activeElement);
        if (controls.length && (index === -1 || (e.shiftKey ? index === 0 : index === controls.length - 1))) {
          e.preventDefault(); controls[e.shiftKey ? controls.length - 1 : 0].focus();
        }
      }
    };
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener('keydown', keyDown);
  }, [isOpen, topWindowId, selectedItemId, setSelectedItemId, closeTopWindow, mobile]);
  const visible = windows.slice(-1);
  return <WindowManagerContext.Provider value={{ windows, topWindowId, selectedItemId, setSelectedItemId, openWindow, closeWindow, bringToFront, closeTopWindow, reducedMotion, mobile }}>
    <AnimatePresence>{isOpen && <motion.div className="window-backdrop" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={closeTopWindow} />}</AnimatePresence>
    <AnimatePresence>{visible.map((id, index) => { const { Component, ...config } = CONFIG[id]; return <Window key={id} id={id} {...config} depth={visible.length - 1 - index} isTop={id === topWindowId} originRect={originRects[id]} reducedMotion={reducedMotion} mobile={mobile} onClose={closeWindow} onBringToFront={bringToFront}><Component /></Window>; })}</AnimatePresence>
    <AnimatePresence>{isOpen && !mobile && <motion.nav ref={dockRef} id="section-switcher" className="section-dock" aria-label="Sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      {Object.entries(CONFIG).map(([id, config]) => <button key={id} className="dock-item" data-open={windows.includes(id)} aria-pressed={topWindowId === id} onClick={e => openWindow(id, e.currentTarget.getBoundingClientRect(), e.currentTarget)}>{config.title}<span aria-hidden="true" /></button>)}
    </motion.nav>}</AnimatePresence>
  </WindowManagerContext.Provider>;
}
