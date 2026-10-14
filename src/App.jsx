import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import SpaceBackground from './components/SpaceBackground';
import PointerAccent from './components/PointerAccent';
import GalaxyIntro from './components/GalaxyIntro';
import Landing from './components/Landing';
import WindowManager from './components/windows/WindowManager';
import { useHashWindows } from './hooks/useHashWindows';
import { useMediaQuery } from './hooks/useMediaQuery';

const INTRO_SESSION_KEY = 'portfolio-galaxy-intro-seen';
function initialIntroPhase() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.location.hash) return 'done';
  try { if (sessionStorage.getItem(INTRO_SESSION_KEY)) return 'done'; } catch { /* Storage is optional. */ }
  return 'playing';
}

export default function App() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [introPhase, setIntroPhase] = useState(initialIntroPhase);
  const restoreIntroFocus = useRef(false);
  const projectMenuRef = useRef(null);
  const manager = useHashWindows();
  const menuRefs = { projects: projectMenuRef, skills: useRef(null), experience: useRef(null), contact: useRef(null) };
  const introActive = introPhase !== 'done' && !reducedMotion;
  const revealIntro = useCallback((quick = false) => setIntroPhase(quick ? 'dismissing' : 'revealing'), []);
  const completeIntro = useCallback((restoreFocus = false) => {
    restoreIntroFocus.current = restoreFocus;
    try { sessionStorage.setItem(INTRO_SESSION_KEY, '1'); } catch { /* The intro still works without storage. */ }
    setIntroPhase('done');
  }, []);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = event => { if (event.matches) completeIntro(); };
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, [completeIntro]);
  useEffect(() => {
    if (introPhase === 'done' && restoreIntroFocus.current) {
      projectMenuRef.current?.focus({ preventScroll: true });
      restoreIntroFocus.current = false;
    }
  }, [introPhase]);

  return <MotionConfig reducedMotion="user"><div className="app">
    <SpaceBackground reducedMotion={reducedMotion} introActive={introActive} />
    {!introActive && <PointerAccent reducedMotion={reducedMotion} />}
    <Landing reducedMotion={reducedMotion} isRevealed={introPhase !== 'playing' || reducedMotion} introActive={introActive} quickReveal={introPhase === 'dismissing'} isWindowOpen={manager.windows.length > 0} onOpen={manager.openWindow} menuRefs={menuRefs} />
    {!introActive && <WindowManager {...manager} reducedMotion={reducedMotion} menuRefs={menuRefs} />}
    {introActive && <GalaxyIntro onReveal={revealIntro} onComplete={completeIntro} />}
  </div></MotionConfig>;
}
