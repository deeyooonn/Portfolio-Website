import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export default function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.1 }}
      className={cn(
        "relative px-8 py-3 font-semibold text-white bg-white/10 rounded-full",
        "backdrop-blur-md border border-white/20 overflow-hidden",
        "hover:bg-white/20 transition-colors duration-300",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
    </motion.button>
  );
}
