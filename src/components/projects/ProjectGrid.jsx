import { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import { useWindowManager } from '../windows/WindowManagerContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
export default function ProjectGrid() {
  const { selectedProjectId, setSelectedProjectId, reducedMotion, topWindowId } = useWindowManager();
  const pointer = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 640px)');
  const slotRefs = useMemo(() => projects.map(() => createRef()), []);
  const buttons = useRef([]), gridRef = useRef(null), scroll = useRef(0), previousId = useRef(selectedProjectId);
  const scrollCaptured = useRef(false);
  const [geometry, setGeometry] = useState([]), [dealt, setDealt] = useState({}), [positions, setPositions] = useState({}), [activeCard, setActiveCard] = useState(null);
  const index = projects.findIndex(p => p.id === selectedProjectId);
  const selected = projects[index] || null;
  useLayoutEffect(() => {
    const measure = () => {
      if (!gridRef.current || selectedProjectId) return;
      const columns = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ').length;
      setGeometry(slotRefs.map((ref, i) => { const r = ref.current.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, dx: window.innerWidth / 2 - (r.left + r.width / 2), dy: window.innerHeight * 0.78 - (r.top + r.height / 2), above: r.top < window.innerHeight - 88, column: i % columns }; }));
    };
    const timer = setTimeout(measure, reducedMotion ? 0 : 340);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, [slotRefs, reducedMotion, selectedProjectId]);
  useLayoutEffect(() => {
    const viewport = gridRef.current?.closest('.project-layer-body');
    const previous = previousId.current; previousId.current = selectedProjectId;
    if (!viewport) return;
    if (selectedProjectId && !previous) { if (!scrollCaptured.current) scroll.current = viewport.scrollTop; scrollCaptured.current = false; viewport.scrollTop = 0; }
    if (!selectedProjectId && previous) {
      viewport.scrollTop = scroll.current;
      const frame = requestAnimationFrame(() => buttons.current[projects.findIndex(p => p.id === previous)]?.focus({ preventScroll: true }));
      return () => cancelAnimationFrame(frame);
    }
    if (selectedProjectId !== previous && selectedProjectId) viewport.scrollTop = 0;
  }, [selectedProjectId]);
  useEffect(() => {
    if (!selected || topWindowId !== 'projects') return;
    const navigate = e => {
      if (e.defaultPrevented || document.querySelector('[data-image-viewer]')) return;
      if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); setSelectedProjectId(projects[index - 1].id); }
      if (e.key === 'ArrowRight' && index < projects.length - 1) { e.preventDefault(); setSelectedProjectId(projects[index + 1].id); }
    };
    document.addEventListener('keydown', navigate);
    return () => document.removeEventListener('keydown', navigate);
  }, [selected, index, topWindowId, setSelectedProjectId]);
  const keyDown = (e, i) => {
    if (topWindowId !== 'projects') return;
    const cols = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ').length;
    const next = { ArrowLeft: i - 1, ArrowRight: i + 1, ArrowUp: i - cols, ArrowDown: i + cols, Home: 0, End: projects.length - 1 }[e.key];
    if (next !== undefined) { e.preventDefault(); buttons.current[next]?.focus(); }
  };
  const selectProject = id => {
    scroll.current = gridRef.current.closest('.project-layer-body').scrollTop;
    scrollCaptured.current = true;
    setDealt(previous => ({ ...previous, [id]: true }));
    setSelectedProjectId(id);
  };
  return <LayoutGroup id="projects"><div className="projects-experience">
    <div ref={gridRef} className="project-grid" data-detail={Boolean(selected)} inert={Boolean(selected)} aria-hidden={Boolean(selected)}>
      {projects.map((project, i) => <div className="project-slot" key={project.id} ref={slotRefs[i]} style={{ zIndex: activeCard === project.id ? 30 : 10 - i, '--card-offset': `${reducedMotion || !pointer ? 0 : [0, 8, -5, 5, -4, 3][i % 6]}px` }}>
        {geometry[i] && selectedProjectId !== project.id && <ProjectCard project={project} index={i} slotRef={slotRefs[i]} geometry={geometry[i]} dealt={Boolean(dealt[project.id])} onDealt={() => setDealt(prev => ({ ...prev, [project.id]: true }))} onSelect={selectProject} cardRef={el => { buttons.current[i] = el; }} onKeyDown={e => keyDown(e, i)} reducedMotion={reducedMotion} canDrag={pointer && topWindowId === 'projects'} active={activeCard === project.id} onActivate={() => setActiveCard(project.id)} position={positions[project.id]} onPosition={position => setPositions(prev => ({ ...prev, [project.id]: position }))} />}
      </div>)}
    </div>
    {/* Keep the component identity aligned with its shared layout ID when browsing. */}
    {selected && <ProjectDetail key={selected.id} project={selected} onBack={() => setSelectedProjectId(null)} onPrev={() => setSelectedProjectId(projects[index - 1]?.id)} onNext={() => setSelectedProjectId(projects[index + 1]?.id)} hasPrev={index > 0} hasNext={index < projects.length - 1} reducedMotion={reducedMotion} />}
  </div></LayoutGroup>;
}
