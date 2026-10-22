import Wave from './Wave.jsx';
import { ArrowUpRight, Calendar, Globe, Server } from './Icons.jsx';

const products = [
  {
    icon: Calendar,
    tone: 'violet',
    tag: 'Hauptprodukt',
    title: 'Terminsoftware',
    text: 'Ihre Kunden buchen rund um die Uhr online. Erinnerungen, Kalender-Sync und Teamplanung laufen automatisch.',
    points: ['Buchungsseite & Website-Widget', 'SMS- & E-Mail-Erinnerungen', 'Google-, Outlook- & Apple-Sync'],
  },
  {
    icon: Globe,
    tone: 'cyan',
    title: 'Websites',
    text: 'Moderne, schnelle Websites, die auf jedem Handy gut aussehen und bei Google gefunden werden.',
    points: ['Individuelles Design', 'Terminbuchung direkt eingebaut', 'Inhalte selbst pflegen'],
  },
  {
    icon: Server,
    tone: 'sun',
    title: 'Server-Hosting',
    text: 'Wir richten Ihren Server ein und halten ihn am Laufen, damit Sie sich nicht darum kümmern müssen.',
    points: ['Einrichtung & Konfiguration', 'Updates, Backups & Monitoring', 'Standort Deutschland'],
  },
];

export default function Services() {
  return (
    <section className="products" id="produkte">
      <Wave color="var(--mist)" />
      <div className="products__body">
        <div className="wrap">
          <h2 className="h2 center">Drei Produkte. Ein Team.</h2>
          <p className="sub center">
            Von der ersten Buchung bis zum laufenden Server: Sie haben einen Ansprechpartner für alles.
          </p>
          <div className="products__grid">
            {products.map(({ icon: Icon, ...p }) => (
              <article key={p.title} className={`product sketch product--${p.tone}`}>
                <div className="product__art">
                  <span className="product__icon"><Icon width="34" height="34" /></span>
                  {p.tag && <span className="pill">{p.tag}</span>}
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="ticks">
                  {p.points.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <a href="#kontakt" className="product__more">
                  Anfragen <span className="round round--sm"><ArrowUpRight width="16" height="16" /></span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
