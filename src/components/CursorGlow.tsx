import { useEffect, useRef } from 'react';

/**
 * Subtle cursor glow — a soft radial light that follows the cursor.
 * Desktop only (pointer: fine). Does not replace the native cursor.
 * Respects prefers-reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    let rafId = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9999,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 60%)',
        opacity: 0,
        animation: 'cursorFadeIn 1s ease 0.5s forwards',
      }}
      aria-hidden="true"
    />
  );
}
