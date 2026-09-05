import { useEffect, useRef } from 'react';

/**
 * Sophisticated 3D AI/business network object rendered via Canvas 2D.
 * Features: central translucent core, orbital rings, connected nodes,
 * particles, geometric data points, mouse parallax, depth movement.
 * Simplifies on mobile. Respects prefers-reduced-motion.
 */
export default function Hero3DVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;

    type Node = {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      z: number;
      ring: number;
    };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    };

    let nodes: Node[] = [];
    let particles: Particle[] = [];

    const NODE_COUNT = isMobile ? 10 : 18;
    const PARTICLE_COUNT = isMobile ? 15 : 30;
    const RINGS = isMobile ? 2 : 3;

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = [];
      for (let r = 0; r < RINGS; r++) {
        const count = Math.ceil(NODE_COUNT / RINGS);
        const baseRadius = isMobile ? 50 + r * 35 : 70 + r * 50;
        for (let i = 0; i < count; i++) {
          nodes.push({
            angle: (i / count) * Math.PI * 2 + (r * 0.4),
            radius: baseRadius + Math.random() * 12,
            speed: (0.0003 + r * 0.0001) * (r % 2 === 0 ? 1 : -1),
            size: 1.5 + Math.random() * 2,
            z: 0.3 + r * 0.2,
            ring: r,
          });
        }
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.12 + 0.02,
        });
      }
    }

    function drawCore(cx: number, cy: number) {
      if (!ctx) return;
      const pulse = Math.sin(t * 0.001) * 3;
      const r = (isMobile ? 28 : 42) + pulse;

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3);
      glow.addColorStop(0, 'rgba(251, 191, 36, 0.08)');
      glow.addColorStop(0.3, 'rgba(251, 191, 36, 0.03)');
      glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core
      const core = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      core.addColorStop(0, 'rgba(40, 40, 50, 0.6)');
      core.addColorStop(0.5, 'rgba(30, 30, 40, 0.4)');
      core.addColorStop(1, 'rgba(20, 20, 30, 0.1)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Inner ring
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      // Small dot at center
      ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawRings(cx: number, cy: number) {
      if (!ctx) return;
      for (let r = 0; r < RINGS; r++) {
        const radius = isMobile ? 50 + r * 35 : 70 + r * 50;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 - r * 0.005})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawNodes(cx: number, cy: number) {
      if (!ctx) return;
      for (const n of nodes) {
        const px = cx + Math.cos(n.angle) * n.radius;
        const py = cy + Math.sin(n.angle) * n.radius;

        // Line to core
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.04 * n.z})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        // Lines between adjacent ring nodes
        for (const n2 of nodes) {
          if (n2.ring === n.ring && n2 !== n) {
            const dx = n.angle - n2.angle;
            if (Math.abs(dx) < 0.7 || Math.abs(dx) > Math.PI * 2 - 0.7) {
              const px2 = cx + Math.cos(n2.angle) * n2.radius;
              const py2 = cy + Math.sin(n2.angle) * n2.radius;
              ctx.strokeStyle = `rgba(180, 180, 200, ${0.04 * n.z})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(px2, py2);
              ctx.stroke();
            }
          }
        }

        // Node dot
        ctx.fillStyle = `rgba(220, 220, 240, ${0.3 * n.z})`;
        ctx.beginPath();
        ctx.arc(px, py, n.size, 0, Math.PI * 2);
        ctx.fill();

        // Node ring
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.08 * n.z})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(px, py, n.size + 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawParticles() {
      if (!ctx) return;
      for (const p of particles) {
        ctx.fillStyle = `rgba(200, 200, 220, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function update() {
      for (const n of nodes) {
        n.angle += n.speed;
      }
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      t += 16;

      const cx = w / 2 + mx * 12;
      const cy = h / 2 + my * 12;

      drawParticles();
      drawRings(cx, cy);
      drawNodes(cx, cy);
      drawCore(cx, cy);
    }

    function animate() {
      if (!reduced) {
        update();
        render();
      } else {
        if (ctx) {
          ctx.clearRect(0, 0, w, h);
          drawParticles();
          drawRings(w / 2, h / 2);
          drawNodes(w / 2, h / 2);
          drawCore(w / 2, h / 2);
        }
      }
      raf = requestAnimationFrame(animate);
    }

    function onMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    resize();
    initNodes();
    initParticles();
    animate();

    const onResize = () => {
      resize();
      initNodes();
      initParticles();
    };
    window.addEventListener('resize', onResize);
    if (!reduced) {
      window.addEventListener('mousemove', onMove);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
