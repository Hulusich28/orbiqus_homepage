import { useEffect, useState } from 'react';
import { ArrowUpRight } from './Icons.jsx';
import { RollingNumber, TextReveal, prefersReduced } from './motion.jsx';

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

const industries = ['Friseure', 'Physiotherapie', 'Arztpraxen', 'Kosmetikstudios', 'Fitnessstudios', 'Werkstätten', 'Coaches', 'Beratung', 'Tattoo-Studios', 'Fahrschulen'];

export default function Hero() {
  // Vier Einträge im DOM, drei sichtbar: der neue schiebt die anderen nach unten
  const [items, setItems] = useState(() => pool.slice(0, 4).reverse().map((p, i) => ({ ...p, id: i })));
  const [count, setCount] = useState(12);

  useEffect(() => {
    if (prefersReduced()) return;
    let c = 4;
    const t = setInterval(() => {
      const next = pool[c % pool.length];
      const id = c;
      setItems((list) => [{ ...next, id, fresh: true }, ...list.map((l) => ({ ...l, fresh: false }))].slice(0, 4));
      setCount((n) => n + 1);
      c += 1;
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="orbit orbit--1"><i /></span>
        <span className="orbit orbit--2"><i /></span>
        <span className="orbit orbit--3"><i /></span>
      </div>

      <div className="wrap hero__inner">
        <a href="#produkte" className="hero__badge">
          <span className="hero__badge-dot" /> Jetzt 14 Tage kostenlos testen
        </a>

        <TextReveal as="h1" className="hero__title" text={['Termine, die', 'sich selbst buchen.']} onLoad delay={150} />

        <p className="hero__lead">
          Orbiqus ist die Terminsoftware für Salons, Praxen und Studios. Dazu bauen wir Ihre
          Website und betreiben Ihren Server. Alles aus einer Hand, gehostet in Deutschland.
        </p>
        <div className="hero__actions">
          <a href="#kontakt" className="btn btn--ink btn--lg btn--shine">Kostenlose Demo anfragen</a>
          <a href="#produkte" className="btn btn--line btn--lg">Produkte ansehen</a>
        </div>

        <div className="hero__stage">
          <span className="hero__outline" aria-hidden="true" />
          <a href="#produkte" className="hero__card" aria-label="Zur Terminsoftware">
            <div className="app">
              <div className="app__head">
                <span>Heute</span>
                <span className="app__live"><i /> live</span>
              </div>
              <ul className="app__list" aria-hidden="true">
                {items.map((it) => (
                  <li key={it.id} className={`slot-wrap ${it.fresh ? 'is-fresh' : ''}`}>
                    <div className={`slot slot--${it.tone}`}>
                      <time>{it.time}</time>
                      <span>
                        <strong>{it.what}</strong>
                        <small>{it.who}</small>
                      </span>
                      {it.fresh && <em>Neu</em>}
                    </div>
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
          </a>
          <span className="hero__counter" aria-hidden="true">
            <RollingNumber value={count} startFrom={0} /> Buchungen heute
          </span>
          <span className="hero__float hero__float--a" aria-hidden="true">SMS-Erinnerung gesendet</span>
          <span className="hero__float hero__float--b" aria-hidden="true">Mit Google Kalender synchronisiert</span>
        </div>
      </div>

      <div className="marquee" aria-label="Branchen, die mit Orbiqus arbeiten können">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <ul key={k} className="marquee__group" aria-hidden={k === 1}>
              {industries.map((x) => <li key={x}>{x}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
