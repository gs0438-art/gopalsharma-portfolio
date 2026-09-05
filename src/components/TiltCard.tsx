import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * 3D tilt card — responds to cursor with perspective rotateX/rotateY.
 * On mobile (no fine pointer) or reduced-motion, renders a static card.
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    ref.current.style.transform = `perspective(800px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg) scale(${scale})`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${enabled ? '' : ''} ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
