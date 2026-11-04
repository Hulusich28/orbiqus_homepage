import { useEffect, useRef } from 'react';
import { prefersReduced } from './motion.jsx';

/*
  Generative Höhenlinien (Marching Squares über ein langsam fließendes Feld).
  Reagiert sanft auf den Mauszeiger und pausiert, sobald der Bereich nicht sichtbar ist.
*/
export default function Contours({ className = '', levels = 7, cell = 16, color = '194,164,126', alpha = 0.42, speed = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReduced();
    let w = 0, h = 0, cols = 0, rows = 0, dpr = 1;
    let field = new Float32Array(0);
    let raf = 0, visible = true, t = Math.random() * 100;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      field = new Float32Array(cols * rows);
    };

    const sample = (x, y) => {
      const nx = x / Math.max(w, 1) * 3.2;
      const ny = y / Math.max(h, 1) * 2.4;
      let v = Math.sin(nx * 1.7 + t * 0.21) * Math.cos(ny * 2.1 - t * 0.17);
      v += 0.55 * Math.sin((nx + ny) * 1.3 - t * 0.13);
      v += 0.35 * Math.cos(Math.hypot(nx - 1.6, ny - 1.2) * 2.6 - t * 0.25);
      const dx = x - mouse.x, dy = y - mouse.y;
      v += 0.9 * Math.exp(-(dx * dx + dy * dy) / (2 * 140 * 140));
      return v;
    };

    const draw = () => {
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) field[j * cols + i] = sample(i * cell, j * cell);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let l = 0; l < levels; l++) {
        const iso = -1.3 + (l + 0.5) * (2.9 / levels);
        const a = alpha * (0.45 + 0.55 * (1 - Math.abs(l - levels / 2) / (levels / 2)));
        ctx.strokeStyle = `rgba(${color},${a.toFixed(3)})`;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a0 = field[j * cols + i], a1 = field[j * cols + i + 1];
            const a2 = field[(j + 1) * cols + i + 1], a3 = field[(j + 1) * cols + i];
            const idx = (a0 > iso ? 8 : 0) | (a1 > iso ? 4 : 0) | (a2 > iso ? 2 : 0) | (a3 > iso ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * cell, y = j * cell;
            const lerp = (p, q) => (iso - p) / (q - p || 1e-6);
            const top = [x + cell * lerp(a0, a1), y];
            const right = [x + cell, y + cell * lerp(a1, a2)];
            const bottom = [x + cell * lerp(a3, a2), y + cell];
            const left = [x, y + cell * lerp(a0, a3)];
            const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 5: seg(left, top); seg(bottom, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(left, top); break;
              case 10: seg(top, right); seg(left, bottom); break;
              default: break;
            }
          }
        }
        ctx.stroke();
      }
    };

    let last = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 33) return; // ~30 fps reicht für ruhige Bewegung
      last = now;
      t += 0.035 * speed;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      draw();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -5000) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    let io;
    if (!reduced) {
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(canvas);
      window.addEventListener('pointermove', onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [levels, cell, color, alpha, speed]);

  return <canvas ref={ref} className={`contours ${className}`} aria-hidden="true" />;
}
