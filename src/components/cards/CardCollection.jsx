import { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import CollectionCard from './CollectionCard';
import CardDetail from './CardDetail';
import { useWindowManager } from '../windows/WindowManagerContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
export default function CardCollection({ sectionId, title, items, renderDetail }) {
  const { selectedItemId, setSelectedItemId, reducedMotion, topWindowId } = useWindowManager();
  const pointer = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 640px)');
  const slotRefs = useMemo(() => items.map(() => createRef()), [items]);
  const buttons = useRef([]), gridRef = useRef(null), scroll = useRef(0), previousId = useRef(selectedItemId);
  const scrollCaptured = useRef(false);
  const focusTarget = useRef(null);
  const [geometry, setGeometry] = useState([]), [dealt, setDealt] = useState({}), [positions, setPositions] = useState({}), [activeCard, setActiveCard] = useState(null);
  const index = items.findIndex(p => p.id === selectedItemId);
  const selected = items[index] || null;
  useLayoutEffect(() => {
    const measure = () => {
      if (!gridRef.current || selectedItemId) return;
      const columns = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ').length;
      setGeometry(slotRefs.map((ref, i) => { const r = ref.current.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, dx: window.innerWidth / 2 - (r.left + r.width / 2), dy: window.innerHeight * 0.78 - (r.top + r.height / 2), above: r.top < window.innerHeight - 88, column: i % columns }; }));
    };
    const timer = setTimeout(measure, reducedMotion ? 0 : 340);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, [slotRefs, reducedMotion, selectedItemId]);
  useLayoutEffect(() => {
    const viewport = gridRef.current?.closest('.project-layer-body');
    const previous = previousId.current; previousId.current = selectedItemId;
    if (!viewport) return;
    if (selectedItemId) focusTarget.current = null;
    if (selectedItemId && !previous) { if (!scrollCaptured.current) scroll.current = viewport.scrollTop; scrollCaptured.current = false; viewport.scrollTop = 0; }
    if (!selectedItemId && previous) {
      viewport.scrollTop = scroll.current;
      focusTarget.current = previous;
    }
    if (selectedItemId !== previous && selectedItemId) viewport.scrollTop = 0;
  }, [selectedItemId, items]);
  useLayoutEffect(() => {
    if (selectedItemId || !focusTarget.current) return;
    const targetIndex = items.findIndex(item => item.id === focusTarget.current);
    const button = buttons.current[targetIndex];
    if (!button) return; // Direct links measure and mount the cards after the detail closes.
    const frame = requestAnimationFrame(() => {
      button.focus({ preventScroll: true });
      const slot = slotRefs[targetIndex].current;
      const viewport = gridRef.current.closest('.project-layer-body').getBoundingClientRect();
      const bounds = slot.getBoundingClientRect();
      if (bounds.top < viewport.top || bounds.bottom > viewport.bottom) slot.scrollIntoView({ block: 'nearest' });
      focusTarget.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedItemId, geometry, items, slotRefs]);
  useEffect(() => {
    if (!selected || topWindowId !== sectionId) return;
    const navigate = e => {
      if (e.defaultPrevented || document.querySelector('[data-image-viewer]')) return;
      if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); setSelectedItemId(items[index - 1].id); }
      if (e.key === 'ArrowRight' && index < items.length - 1) { e.preventDefault(); setSelectedItemId(items[index + 1].id); }
    };
    document.addEventListener('keydown', navigate);
    return () => document.removeEventListener('keydown', navigate);
  }, [selected, index, topWindowId, setSelectedItemId, sectionId, items]);
  const keyDown = (e, i) => {
    if (topWindowId !== sectionId) return;
    const cols = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ').length;
    const next = { ArrowLeft: i - 1, ArrowRight: i + 1, ArrowUp: i - cols, ArrowDown: i + cols, Home: 0, End: items.length - 1 }[e.key];
    if (next !== undefined) { e.preventDefault(); buttons.current[next]?.focus(); }
  };
  const selectCard = id => {
    scroll.current = gridRef.current.closest('.project-layer-body').scrollTop;
    scrollCaptured.current = true;
    setDealt(previous => ({ ...previous, [id]: true }));
    setSelectedItemId(id);
  };
  return <LayoutGroup id={sectionId}><div className="projects-experience" data-collection={sectionId}>
    <div ref={gridRef} className="project-grid" data-count={items.length} data-detail={Boolean(selected)} inert={Boolean(selected)} aria-hidden={Boolean(selected)}>
      {items.map((item, i) => <div className="project-slot" key={item.id} ref={slotRefs[i]} style={{ zIndex: activeCard === item.id ? 30 : 10 - i, '--card-offset': `${reducedMotion || !pointer ? 0 : [0, 8, -5, 5, -4, 3][i % 6]}px` }}>
        {geometry[i] && selectedItemId !== item.id && <CollectionCard item={item} index={i} slotRef={slotRefs[i]} geometry={geometry[i]} dealt={Boolean(dealt[item.id])} onDealt={() => setDealt(prev => ({ ...prev, [item.id]: true }))} onSelect={selectCard} cardRef={el => { buttons.current[i] = el; }} onKeyDown={e => keyDown(e, i)} reducedMotion={reducedMotion} canDrag={pointer && topWindowId === sectionId} active={activeCard === item.id} onActivate={() => setActiveCard(item.id)} position={positions[item.id]} onPosition={position => setPositions(prev => ({ ...prev, [item.id]: position }))} />}
      </div>)}
    </div>
    {/* Keep the component identity aligned with its shared layout ID when browsing. */}
    {selected && <CardDetail key={selected.id} item={selected} sectionId={sectionId} title={title} onBack={() => setSelectedItemId(null)} onPrev={() => setSelectedItemId(items[index - 1]?.id)} onNext={() => setSelectedItemId(items[index + 1]?.id)} hasPrev={index > 0} hasNext={index < items.length - 1} reducedMotion={reducedMotion}>{renderDetail(selected, reducedMotion)}</CardDetail>}
  </div></LayoutGroup>;
}
