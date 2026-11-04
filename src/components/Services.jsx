import { useEffect, useRef, useState } from 'react';
import { Mark } from './Logo.jsx';
import { Arrow } from './Icons.jsx';
import { Reveal, SectionHead } from './motion.jsx';

/* Kleine Produkt-Illustrationen in CD-Farben */
const ArtTermin = () => (
  <div className="part part--termin" aria-hidden="true">
    <div className="part__grid">
      {Array.from({ length: 15 }, (_, i) => (
        <span key={i} className={[2, 6, 7, 11].includes(i) ? 'is-on' : i === 8 ? 'is-gold' : ''} />
      ))}
    </div>
    <span className="part__badge">Termin gebucht · 14:30</span>
  </div>
);
const ArtWeb = () => (
  <div className="part part--web" aria-hidden="true">
    <div className="part__browser">
      <i className="part__bar" />
      <i className="part__hero" />
      <i className="part__line" /><i className="part__line part__line--s" />
      <i className="part__btn" />
    </div>
    <div className="part__phone"><i /><i /><i /></div>
  </div>
);
const ArtServer = () => (
  <div className="part part--server" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <div key={i} className="part__rack"><i /><i /><b>{['web-01', 'db-01', 'backup'][i]}</b><span>OK</span></div>
    ))}
  </div>
);

const products = [
  {
    no: '01',
    title: 'Terminsoftware',
    note: 'Hauptprodukt · ab 29 € / Monat',
    tags: ['Online-Buchung', 'Erinnerungen', 'Kalender-Sync'],
    text: 'Ihre Kunden buchen rund um die Uhr online. Erinnerungen, Kalender-Sync und Teamplanung laufen automatisch.',
    points: ['Buchungsseite & Website-Widget', 'SMS- & E-Mail-Erinnerungen', 'Google-, Outlook- & Apple-Sync'],
    art: ArtTermin,
  },
  {
    no: '02',
    title: 'Websites',
    note: 'Individuell · nach Projekt',
    tags: ['Design', 'Mobil', 'SEO'],
    text: 'Moderne, schnelle Websites, die auf jedem Handy gut aussehen und bei Google gefunden werden.',
    points: ['Individuelles Design', 'Terminbuchung direkt eingebaut', 'Inhalte selbst pflegen'],
    art: ArtWeb,
  },
  {
    no: '03',
    title: 'Server-Hosting',
    note: 'Eingerichtet & betreut',
    tags: ['Einrichtung', 'Backups', 'Monitoring'],
    text: 'Wir richten Ihren Server ein und halten ihn am Laufen, damit Sie sich nicht darum kümmern müssen.',
    points: ['Einrichtung & Konfiguration', 'Updates, Backups & Monitoring', 'Standort Deutschland'],
    art: ArtServer,
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const fine = useRef(false);
  useEffect(() => {
    fine.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  return (
    <section className="section products" id="produkte">
      <div className="wrap">
        <SectionHead
          kicker="Drei Produkte · Ein Team"
          title="Alles, was Ihre *Termine* brauchen"
          lede="Von der ersten Buchung bis zum laufenden Server: Sie haben einen Ansprechpartner für alles."
          meta="01 — 03"
        />

        <Reveal as="ol" className="plist">
          {products.map(({ art: Art, ...p }, i) => {
            const open = active === i;
            return (
              <li
                key={p.title}
                className={`plist__row ${open ? 'is-open' : ''}`}
                style={{ '--s': i }}
                data-stagger
                onMouseEnter={() => fine.current && setActive(i)}
              >
                <span className="plist__no meta">{p.no}</span>
                <article className="plist__body">
                  <h3>
                    <button
                      className="plist__head"
                      aria-expanded={open}
                      aria-controls={`prod-${i}`}
                      onClick={() => setActive(open && !fine.current ? -1 : i)}
                    >
                      <span className="plist__title">{p.title}</span>
                      <span className="plist__note">{p.note}</span>
                    </button>
                  </h3>
                  <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="plist__more" id={`prod-${i}`}>
                    <div>
                      <div className="plist__detail">
                        <Art />
                        <div className="plist__text">
                          <p>{p.text}</p>
                          <ul className="ticks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                        </div>
                        <a href="/kontakt" className="plist__cta">Anfragen <Arrow width="16" height="16" /></a>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </Reveal>
        <p className="products__foot meta"><Mark size={14} /> Jedes Produkt funktioniert für sich – kombiniert gibt es eine Rechnung und einen Ansprechpartner.</p>
      </div>
    </section>
  );
}
