import { useEffect, useRef } from 'react';

/**
 * Subtle animated background — fine grid, slow-moving particles,
 * soft network lines, drifting light gradients.
 * Fixed position behind all content. Respects prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;

    type Dot = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    let dots: Dot[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initDots() {
      const count = w < 768 ? 12 : 25;
      dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          r: Math.random() * 1 + 0.3,
          alpha: Math.random() * 0.08 + 0.02,
        });
      }
    }

    function drawGrid() {
      if (!ctx) return;
      const spacing = 60;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    function drawDots() {
      if (!ctx) return;
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        ctx.fillStyle = `rgba(190, 190, 210, ${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawConnections() {
      if (!ctx) return;
      const maxDist = 140;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.025;
            ctx.strokeStyle = `rgba(170, 170, 190, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      drawDots();
      drawConnections();
      raf = requestAnimationFrame(render);
    }

    resize();
    initDots();

    if (reduced) {
      drawGrid();
      drawDots();
    } else {
      render();
    }

    const onResize = () => {
      resize();
      initDots();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute top-[8%] left-[3%] w-[450px] h-[450px] rounded-full blur-[160px] animate-bg-drift-1"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.025), transparent 70%)' }}
        />
        <div
          className="absolute bottom-[10%] right-[3%] w-[380px] h-[380px] rounded-full blur-[140px] animate-bg-drift-2"
          style={{ background: 'radial-gradient(circle, rgba(100,90,70,0.02), transparent 70%)' }}
        />
      </div>
    </>
  );
}
