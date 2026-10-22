import { ArrowUpRight, Bell, Layers, People, Shield, Sync } from './Icons.jsx';

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

export default function Features() {
  return (
    <section className="diff" id="vorteile">
      <div className="wrap">
        <h2 className="h2">Der Unterschied mit Orbiqus</h2>

        <div className="diff__intro">
          <div className="diff__price">
            <span className="pill pill--light">ab 29 € im Monat</span>
            <a href="#preise" className="round round--light" aria-label="Zu den Preisen"><ArrowUpRight /></a>
          </div>
          <div className="diff__week" aria-hidden="true">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((d, i) => (
              <div key={d} className="day">
                <span>{d}</span>
                {[0, 1, 2].map((r) => (
                  <i key={r} className={`b b--${['violet', 'cyan', 'sun', 'mint'][(i + r) % 4]} ${(i * 3 + r) % 4 === 0 ? 'b--tall' : ''}`} />
                ))}
              </div>
            ))}
          </div>
          <p className="diff__claim">14 Tage kostenlos testen. Monatlich kündbar.</p>
        </div>

        <ol className="stack">
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
