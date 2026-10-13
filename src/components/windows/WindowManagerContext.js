import { createContext, useContext } from 'react';

// ─── WindowManager Context ───────────────────────────────────────────────────
export const WindowManagerContext = createContext(null);

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManager');
  }
  return context;
}
