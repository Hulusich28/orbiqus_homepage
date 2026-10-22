import { useEffect, useRef, useState } from 'react';

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Wird true, sobald das Element ins Bild scrollt (einmalig) */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: options.threshold ?? 0.2, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/* Blendet Kinder beim Reinscrollen weich ein, Kinder mit [data-stagger] versetzt */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* Überschrift, deren Wörter nacheinander aus der Unschärfe auftauchen */
export function TextReveal({ as: Tag = 'h2', text, className = '', delay = 0, onLoad = false }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!onLoad) return;
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, [onLoad]);
  const show = onLoad ? loaded : inView;
  const lines = Array.isArray(text) ? text : [text];
  let i = 0;
  return (
    <Tag ref={ref} className={`text-reveal ${show ? 'is-in' : ''} ${className}`} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="text-reveal__line" aria-hidden="true">
          {line.split(' ').map((w, wi) => (
            <span key={wi} className="text-reveal__word" style={{ '--i': i++, '--d': `${delay}ms` }}>
              {w}{wi < line.split(' ').length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/* Ziffern rollen wie ein Zählwerk auf ihren Wert */
export function RollingNumber({ value, className = '', startFrom = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const shown = inView ? value : startFrom;
  const digits = String(shown).split('');
  const target = String(value).length;
  const padded = digits.length < target ? Array(target - digits.length).fill('0').concat(digits) : digits;
  return (
    <span ref={ref} className={`roll ${className}`} aria-label={String(value)}>
      {padded.map((d, i) => (
        <span key={padded.length - i} className="roll__digit" aria-hidden="true">
          <span className="roll__strip" style={{ transform: `translateY(${-Number(d) * 10}%)`, transitionDelay: `${i * 70}ms` }}>
            {'0123456789'.split('').map((n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}

/* Karte neigt sich zur Maus, ein Lichtkegel folgt dem Zeiger */
export function TiltCard({ as: Tag = 'div', className = '', max = 6, children, style, ...rest }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const fine = useRef(true);
  useEffect(() => {
    fine.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced();
  }, []);
  const move = (e) => {
    if (!fine.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
      el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
  };
  const leave = () => {
    const el = ref.current;
    cancelAnimationFrame(frame.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave} style={style} {...rest}>
      {children}
      <span className="tilt__light" aria-hidden="true" />
    </Tag>
  );
}
