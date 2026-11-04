import { useEffect, useRef, useState } from 'react';
import Contours from './Contours.jsx';
import { Mark } from './Logo.jsx';
import { Arrow, Calendar, Gear, List, Users } from './Icons.jsx';
import { RollingNumber, prefersReduced } from './motion.jsx';

// Live-Vorschau: Im Produkt-Fenster laufen laufend neue Buchungen ein
const pool = [
  { time: '09:30', what: 'Haarschnitt', who: 'Lisa M.' },
  { time: '10:15', what: 'Physiotherapie', who: 'Tom K.' },
  { time: '11:00', what: 'Beratung', who: 'Herr Weber' },
  { time: '13:45', what: 'Massage', who: 'Sara Y.' },
  { time: '14:30', what: 'Färben', who: 'Jana P.' },
  { time: '15:00', what: 'Probetraining', who: 'Ali B.' },
  { time: '16:20', what: 'Kontrolle', who: 'Frau Roth' },
  { time: '17:00', what: 'Coaching', who: 'Max L.' },
];

// Tagesplan im Mockup: Spalte = Mitarbeiterin, top/len in Halbstunden ab 9:00
const plan = [
  { col: 0, top: 0, len: 2, what: 'Erstgespräch', who: 'M. Keller' },
  { col: 0, top: 3, len: 1, what: 'Kontrolle', who: 'J. Brandt' },
  { col: 0, top: 5, len: 2, what: 'Behandlung', who: 'S. Yilmaz', gold: true },
  { col: 1, top: 1, len: 3, what: 'Physiotherapie', who: 'T. Klein' },
  { col: 1, top: 5, len: 1, what: 'Beratung', who: 'A. Weber' },
  { col: 2, top: 0, len: 1, what: 'Kurztermin', who: 'L. Roth' },
  { col: 2, top: 2, len: 2, what: 'Massage', who: 'P. Novak', gold: true },
  { col: 2, top: 5, len: 2, what: 'Coaching', who: 'M. Lenz' },
];
const staff = ['Anna', 'Ben', 'Clara'];
const hours = ['09:00', '10:00', '11:00', '12:00'];

const industries = ['Friseure', 'Physiotherapie', 'Arztpraxen', 'Kosmetikstudios', 'Fitnessstudios', 'Werkstätten', 'Coaches', 'Beratung', 'Tattoo-Studios', 'Fahrschulen'];

export default function Hero() {
  // Vier Einträge im DOM, drei sichtbar: der neue schiebt die anderen nach unten
  const [items, setItems] = useState(() => pool.slice(0, 4).reverse().map((p, i) => ({ ...p, id: i })));
  const [count, setCount] = useState(12);
  const stageRef = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    let c = 4;
    const t = setInterval(() => {
      const next = pool[c % pool.length];
      const id = c;
      setItems((list) => [{ ...next, id, fresh: true }, ...list.map((l) => ({ ...l, fresh: false }))].slice(0, 4));
      setCount((n) => n + 1);
      c += 1;
    }, 3200);
    return () => clearInterval(t);
  }, []);

  // Das Produktfenster richtet sich beim Scrollen auf
  useEffect(() => {
    if (prefersReduced()) return;
    const el = stageRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (r.top - window.innerHeight * 0.25) / (window.innerHeight * 0.6)));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero dark" id="top">
      <Contours className="hero__lines" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="wrap hero__inner">
        <a href="/preise" className="chip hero__chip">
          <i className="dot" /> Jetzt 14 Tage kostenlos testen <Arrow width="14" height="14" />
        </a>

        <h1 className="hero__title" aria-label="Termine, die sich selbst buchen.">
          <span className="hero__line" aria-hidden="true">
            <span className="w" style={{ '--i': 0 }}>Termine,</span>{' '}
            <span className="hero__tile w" style={{ '--i': 1 }}><Mark size={46} className="mark--live" /></span>{' '}
            <span className="w" style={{ '--i': 2 }}>die sich</span>
          </span>
          <span className="hero__line" aria-hidden="true">
            <span className="w" style={{ '--i': 3 }}><em>selbst</em></span>{' '}
            <span className="w" style={{ '--i': 4 }}>buchen.</span>
          </span>
        </h1>

        <p className="hero__lead">
          Orbiqus ist die Terminsoftware für Salons, Praxen und Studios. Dazu bauen wir Ihre
          Website und betreiben Ihren Server. Alles aus einer Hand, gehostet in Deutschland.
        </p>
        <div className="hero__actions">
          <a href="/kontakt" className="btn btn--light btn--lg">Kostenlose Demo anfragen <Arrow width="18" height="18" /></a>
          <a href="/produkte" className="btn btn--ghost btn--lg">Produkte ansehen</a>
        </div>
        <p className="meta hero__meta">Gehostet in Deutschland <i /> DSGVO-konform <i /> Monatlich kündbar</p>
      </div>

      {/* Produkt-Vorschau im Stil eines App-Fensters */}
      <div className="wrap hero__stage" ref={stageRef}>
        <div className="win" aria-hidden="true">
          <div className="win__top">
            <span className="win__dots"><i /><i /><i /></span>
            <span className="win__url">termin.orbiqus.de/kalender</span>
            <span className="win__live"><i /> live</span>
          </div>
          <div className="win__body">
            <aside className="win__side">
              <div className="win__brand"><Mark size={18} /> <span>Praxis Sonnenhof</span></div>
              <span className="win__nav is-on"><Calendar width="16" height="16" /> Kalender</span>
              <span className="win__nav"><List width="16" height="16" /> Buchungen</span>
              <span className="win__nav"><Users width="16" height="16" /> Kunden</span>
              <span className="win__nav"><Gear width="16" height="16" /> Einstellungen</span>
            </aside>

            <div className="win__main">
              <div className="win__head">
                <div>
                  <span className="meta">Heute</span>
                  <strong>Mittwoch, 4. November</strong>
                </div>
                <span className="win__seg"><b>Tag</b><span>Woche</span><span>Monat</span></span>
              </div>
              <div className="win__stats">
                <div><span className="meta">Buchungen heute</span><strong><RollingNumber value={count} startFrom={0} /></strong></div>
                <div><span className="meta">Freie Slots</span><strong>7</strong></div>
                <div><span className="meta">Erinnerungen</span><strong>18</strong><small>versendet</small></div>
              </div>
              <div className="win__cal">
                <div className="win__hours">{hours.map((h) => <span key={h}>{h}</span>)}</div>
                {staff.map((s, ci) => (
                  <div key={s} className="win__col">
                    <span className="win__who">{s}</span>
                    <div className="win__track">
                      {plan.filter((p) => p.col === ci).map((p) => (
                        <span key={p.what + p.top} className={`win__evt ${p.gold ? 'is-gold' : ''}`} style={{ '--top': p.top, '--len': p.len }}>
                          <b>{p.what}</b><small>{p.who}</small>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="win__feed">
              <span className="meta">Neue Buchungen</span>
              <ul className="feed">
                {items.map((it) => (
                  <li key={it.id} className={`feed__wrap ${it.fresh ? 'is-fresh' : ''}`}>
                    <div className="feed__item">
                      <time>{it.time}</time>
                      <span><strong>{it.what}</strong><small>{it.who}</small></span>
                      {it.fresh && <em>Neu</em>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="win__toast"><i /> SMS-Erinnerung gesendet</div>
            </div>
          </div>
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
