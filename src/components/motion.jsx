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

/*
  Überschrift, deren Wörter nacheinander aus der Unschärfe auftauchen.
  Wörter in *Sternchen* werden als kursiver Akzent (Serif) gesetzt.
*/
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
  const plain = lines.join(' ').replace(/\*/g, '');
  let i = 0;
  return (
    <Tag ref={ref} className={`text-reveal ${show ? 'is-in' : ''} ${className}`} aria-label={plain}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <span key={li} className="text-reveal__line" aria-hidden="true">
            {words.map((w, wi) => {
              const accent = /^\*.*\*[.,!?]?$/.test(w);
              const clean = w.replace(/\*/g, '');
              return (
                <span key={wi} className="text-reveal__word" style={{ '--i': i++, '--d': `${delay}ms` }}>
                  {accent ? <em>{clean}</em> : clean}
                  {wi < words.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </span>
        );
      })}
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

/* Abschnittskopf: Label + große Überschrift links, Einleitung + Meta rechts */
export function SectionHead({ kicker, title, lede, meta, center = false }) {
  return (
    <header className={`shead ${center ? 'shead--center' : ''}`}>
      <div className="shead__main">
        {kicker && <p className="kicker">{kicker}</p>}
        <TextReveal className="h-section" text={title} />
      </div>
      {(lede || meta) && (
        <Reveal className="shead__side">
          {lede && <p className="lede">{lede}</p>}
          {meta && <p className="meta">{meta}</p>}
        </Reveal>
      )}
    </header>
  );
}
