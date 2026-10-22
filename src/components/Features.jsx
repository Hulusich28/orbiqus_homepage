import { useEffect, useRef } from 'react';
import { ArrowUpRight, Bell, Layers, People, Shield, Sync } from './Icons.jsx';
import { Reveal, TextReveal, prefersReduced } from './motion.jsx';

const cards = [
  {
    icon: Shield, tone: 'violet',
    title: 'DSGVO-konform, gehostet in Deutschland',
    text: 'Alle Kundendaten liegen auf Servern in Deutschland. Keine Weitergabe, keine Werbe-Tracker.',
  },
  {
    icon: Bell, tone: 'sun',
    title: 'Weniger vergessene Termine',
    text: 'Automatische Erinnerungen per SMS und E-Mail. Absagen und Verschieben geht mit einem Klick.',
  },
  {
    icon: Sync, tone: 'cyan',
    title: 'Ihr Kalender bleibt Ihr Kalender',
    text: 'Termine landen sofort in Google, Outlook oder Apple Kalender. In beide Richtungen.',
  },
  {
    icon: Layers, tone: 'mint',
    title: 'Software, Website und Server aus einer Hand',
    text: 'Kein Abstimmen zwischen drei Dienstleistern. Wenn etwas nicht läuft, wissen wir sofort, wo.',
  },
  {
    icon: People, tone: 'ink',
    title: 'Persönlicher Support von den Gründern',
    text: 'Sie schreiben nicht mit einem Ticketsystem, sondern direkt mit den Leuten, die Orbiqus bauen.',
  },
];

const week = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
const tones = ['violet', 'cyan', 'sun', 'mint'];

export default function Features() {
  const listRef = useRef(null);

  // Gestapelte Karten: Karten darunter werden kleiner und dunkler, sobald die nächste darüber gleitet
  useEffect(() => {
    if (prefersReduced()) return;
    const cardsEls = [...listRef.current.children];
    let raf = 0;
    const update = () => {
      raf = 0;
      cardsEls.forEach((el, i) => {
        const next = cardsEls[i + 1];
        if (!next) return;
        const a = el.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const covered = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        el.style.setProperty('--p', covered.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="diff" id="vorteile">
      <div className="wrap">
        <TextReveal className="h2" text="Der Unterschied mit Orbiqus" />

        <Reveal className="diff__intro">
          <div className="diff__price">
            <span className="pill pill--light">ab 29 € im Monat</span>
            <a href="#preise" className="round round--light" aria-label="Zu den Preisen"><ArrowUpRight /></a>
          </div>
          <div className="diff__week" aria-hidden="true">
            {week.map((d, i) => (
              <div key={d} className="day">
                <span>{d}</span>
                {[0, 1, 2].map((r) => (
                  <i
                    key={r}
                    className={`b b--${tones[(i + r) % 4]} ${(i * 3 + r) % 4 === 0 ? 'b--tall' : ''}`}
                    style={{ '--d': `${(i * 3 + r) * 60}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="diff__claim">14 Tage kostenlos testen. Monatlich kündbar.</p>
        </Reveal>

        <ol className="stack" ref={listRef}>
          {cards.map(({ icon: Icon, ...c }, i) => (
            <li key={c.title} className={`stack__card stack__card--${c.tone}`} style={{ '--i': i }}>
              <div className="stack__top">
                <span className="stack__num">0{i + 1}+</span>
                <span className="round round--light"><Icon /></span>
              </div>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
