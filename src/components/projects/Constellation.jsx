export default function Constellation({ id, className = '' }) {
  const seed = Array.from(id).reduce((n, c) => (Math.imul(n, 31) + c.charCodeAt(0)) >>> 0, 7);
  const points = Array.from({ length: 6 }, (_, i) => {
    const value = (Math.imul(seed ^ (i * 374761393), 1664525) + 1013904223) >>> 0;
    return { x: 20 + i * 27 + (value % 13), y: 20 + ((value >>> 8) % 65) };
  });
  return <svg className={`constellation ${className}`} viewBox="0 0 200 110" fill="none" aria-hidden="true">
    <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} pathLength="1" />
    {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={i === 2 ? 2.1 : 1.3} />)}
  </svg>;
}
