import { useState, useEffect, useCallback, useRef } from 'react';
import { collections } from '../data/collections';
const VALID = ['projects', 'skills', 'experience', 'contact'];
const empty = () => ({ windows: [], selectedItemId: null });
function parseHash() {
  const [id, itemId] = window.location.hash.slice(1).split('/');
  return VALID.includes(id) ? { windows: [id], selectedItemId: collections[id]?.some(item => item.id === itemId) ? itemId : null } : empty();
}
function url(state) {
  const top = state.windows.at(-1);
  return window.location.pathname + window.location.search + (top ? `#${top}${state.selectedItemId ? '/' + state.selectedItemId : ''}` : '');
}
export function useHashWindows() {
  const [state, setState] = useState(parseHash);
  const [originRects, setOriginRects] = useState({});
  const current = useRef(state);
  const openers = useRef({});
  const sequence = useRef(0);
  const entry = useRef(0);
  const invalid = useRef(new Set());
  const entries = useRef(new Map());
  const session = useRef(null);
  const commit = useCallback((next, push = false) => {
    current.current = next; setState(next);
    if (push) entry.current = ++sequence.current;
    entries.current.set(entry.current, next);
    invalid.current.delete(entry.current);
    history[push ? 'pushState' : 'replaceState']({ portfolio: session.current, entry: entry.current, view: next }, '', url(next));
  }, []);
  useEffect(() => {
    session.current = crypto.randomUUID();
    const initial = parseHash();
    // A direct link has a local landing entry behind it, but opens only its own section.
    history.replaceState({ portfolio: session.current, entry: 0, view: empty() }, '', url(empty()));
    entry.current = 0;
    entries.current.set(0, empty());
    if (initial.windows.length) {
      entry.current = ++sequence.current;
      entries.current.set(entry.current, initial);
      history.pushState({ portfolio: session.current, entry: entry.current, view: initial }, '', url(initial));
    }
    const traverse = event => {
      const previous = current.current;
      const saved = event.state;
      let next;
      if (saved?.portfolio === session.current) {
        if (saved.entry < entry.current) invalid.current.add(entry.current);
        next = invalid.current.has(saved.entry) ? (saved.entry < entry.current ? empty() : previous) : saved.view;
        entry.current = saved.entry;
        if (JSON.stringify(next) === JSON.stringify(previous) && !invalid.current.has(saved.entry)) {
          next = previous.selectedItemId
            ? { ...previous, selectedItemId: null }
            : { windows: previous.windows.slice(0, -1), selectedItemId: null };
        }
      } else next = parseHash();
      commit(next);
    };
    const hashChange = () => {
      if (window.location.pathname + window.location.search + window.location.hash !== url(current.current)) commit(parseHash());
    };
    window.addEventListener('popstate', traverse); window.addEventListener('hashchange', hashChange);
    return () => { window.removeEventListener('popstate', traverse); window.removeEventListener('hashchange', hashChange); };
  }, [commit]);
  const openWindow = useCallback((id, rect = null, opener = document.activeElement) => {
    if (!VALID.includes(id)) return;
    if (rect) setOriginRects(prev => ({ ...prev, [id]: { left: rect.left, top: rect.top, width: rect.width, height: rect.height } }));
    openers.current[id] = opener;
    const previous = current.current;
    if (previous.windows.at(-1) === id) return;
    // The switcher replaces the current section, including any open card detail.
    for (const [key, view] of entries.current) {
      if (view.windows.some(item => previous.windows.includes(item))) invalid.current.add(key);
    }
    commit({ windows: [id], selectedItemId: null }, previous.windows.length === 0);
  }, [commit]);
  const closeWindow = useCallback(id => {
    const previous = current.current;
    for (const [key, view] of entries.current) if (view.windows.includes(id)) invalid.current.add(key);
    const windows = previous.windows.filter(item => item !== id);
    commit({ windows, selectedItemId: null });
  }, [commit]);
  const closeTopWindow = useCallback(() => closeWindow(current.current.windows.at(-1)), [closeWindow]);
  const bringToFront = useCallback(id => {
    if (current.current.windows.includes(id)) openWindow(id, null, openers.current[id]);
  }, [openWindow]);
  const setSelectedItemId = useCallback(value => {
    const previous = current.current;
    const id = typeof value === 'function' ? value(previous.selectedItemId) : value;
    const selectedItemId = collections[previous.windows.at(-1)]?.some(item => item.id === id) ? id : null;
    if (!selectedItemId) for (const [key, view] of entries.current) if (view.selectedItemId) invalid.current.add(key);
    commit({ ...previous, selectedItemId }, Boolean(selectedItemId && !previous.selectedItemId));
  }, [commit]);
  return { ...state, topWindowId: state.windows.at(-1) ?? null, originRects, openers, openWindow, closeWindow, closeTopWindow, bringToFront, setSelectedItemId };
}
