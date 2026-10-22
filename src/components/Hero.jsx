import { useEffect, useState } from 'react';
import { ArrowUpRight } from './Icons.jsx';

// Live-Vorschau: In der Produktkarte laufen laufend neue Buchungen ein
const pool = [
  { time: '09:30', what: 'Haarschnitt', who: 'Lisa M.', tone: 'violet' },
  { time: '10:15', what: 'Physiotherapie', who: 'Tom K.', tone: 'cyan' },
  { time: '11:00', what: 'Beratung', who: 'Herr Weber', tone: 'sun' },
  { time: '13:45', what: 'Massage', who: 'Sara Y.', tone: 'mint' },
  { time: '14:30', what: 'Färben', who: 'Jana P.', tone: 'violet' },
  { time: '15:00', what: 'Probetraining', who: 'Ali B.', tone: 'cyan' },
  { time: '16:20', what: 'Kontrolle', who: 'Frau Roth', tone: 'sun' },
  { time: '17:00', what: 'Coaching', who: 'Max L.', tone: 'mint' },
];

export default function Hero() {
  const [items, setItems] = useState(() => pool.slice(0, 3).map((p, i) => ({ ...p, id: i })));
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setCount((c) => {
        const next = pool[c % pool.length];
        setItems((list) => [{ ...next, id: c, fresh: true }, ...list.map((l) => ({ ...l, fresh: false }))].slice(0, 3));
        return c + 1;
      });
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__orbits" aria-hidden="true">
        <span className="orbit orbit--1"><i /></span>
        <span className="orbit orbit--2"><i /></span>
        <span className="orbit orbit--3"><i /></span>
      </div>

      <div className="wrap hero__inner">
        <h1 className="hero__title">
          <span className="line"><span style={{ '--i': 0 }}>Termine, die</span></span>
          <span className="line"><span style={{ '--i': 1 }}>sich selbst buchen.</span></span>
        </h1>
        <p className="hero__lead">
          Orbiqus ist die Terminsoftware für Salons, Praxen und Studios. Dazu bauen wir Ihre
          Website und betreiben Ihren Server. <mark>Alles aus einer Hand</mark>, gehostet
          in <mark className="mark--violet">Deutschland</mark>.
        </p>
        <div className="hero__actions">
          <a href="#kontakt" className="btn btn--ink btn--lg">Kostenlose Demo anfragen</a>
          <a href="#produkte" className="btn btn--line btn--lg">Produkte ansehen</a>
        </div>

        <a href="#produkte" className="hero__card sketch" aria-label="Zur Terminsoftware">
          <div className="app">
            <div className="app__head">
              <span>Heute</span>
              <span className="app__live"><i /> live</span>
            </div>
            <ul className="app__list" aria-hidden="true">
              {items.map((it) => (
                <li key={it.id} className={`slot slot--${it.tone} ${it.fresh ? 'is-fresh' : ''}`}>
                  <time>{it.time}</time>
                  <span>
                    <strong>{it.what}</strong>
                    <small>{it.who}</small>
                  </span>
                  {it.fresh && <em>Neu</em>}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__card-foot">
            <div>
              <strong>Orbiqus Termine</strong>
              <p>Online-Buchung, Erinnerungen und Kalender für Ihr ganzes Team.</p>
            </div>
            <span className="round"><ArrowUpRight /></span>
          </div>
          <span className="hero__counter" aria-hidden="true">{count} Buchungen heute</span>
        </a>
      </div>
    </section>
  );
}
