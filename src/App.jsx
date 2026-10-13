import { useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import SpaceBackground from './components/SpaceBackground';
import PointerAccent from './components/PointerAccent';
import Landing from './components/Landing';
import WindowManager from './components/windows/WindowManager';
import { useHashWindows } from './hooks/useHashWindows';
import { useMediaQuery } from './hooks/useMediaQuery';
export default function App() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const manager = useHashWindows();
  const menuRefs = { projects: useRef(null), skills: useRef(null), experience: useRef(null), contact: useRef(null) };
  return <MotionConfig reducedMotion="user"><div className="app">
    <SpaceBackground reducedMotion={reducedMotion} />
    <PointerAccent reducedMotion={reducedMotion} />
    <Landing reducedMotion={reducedMotion} isWindowOpen={manager.windows.length > 0} onOpen={manager.openWindow} menuRefs={menuRefs} />
    <WindowManager {...manager} reducedMotion={reducedMotion} menuRefs={menuRefs} />
  </div></MotionConfig>;
}
