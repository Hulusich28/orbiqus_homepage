import { Arrow } from './Icons.jsx';
import { Reveal, RollingNumber, SectionHead } from './motion.jsx';

const plans = [
  {
    name: 'Starter',
    price: 29,
    period: 'im Monat',
    text: 'Für Selbstständige, die online buchbar sein wollen.',
    features: ['1 Kalender', 'Eigene Buchungsseite', 'E-Mail-Erinnerungen', 'Support per E-Mail'],
  },
  {
    name: 'Business',
    price: 79,
    period: 'im Monat',
    text: 'Für Teams und Praxen mit mehreren Mitarbeitern.',
    features: ['Bis zu 10 Kalender', 'SMS-Erinnerungen', 'Kalender-Sync', 'Online-Zahlung', 'Bevorzugter Support'],
    highlight: true,
  },
  {
    name: 'Website & Hosting',
    price: null,
    period: 'nach Projekt',
    text: 'Ihre Website mit eingebauter Buchung, auf Wunsch mit eigenem Server.',
    features: ['Individuelles Design', 'Terminbuchung integriert', 'Hosting & Wartung', 'Server-Einrichtung'],
  },
];

export default function Pricing() {
  return (
    <section className="section pricing" id="preise">
      <div className="wrap">
        <SectionHead
          kicker="Preise"
          title="Wählen Sie Ihr *Paket*"
          lede="Starten Sie klein und wechseln Sie jederzeit, wenn Ihr Team wächst."
          meta="03 Pakete"
        />
        <Reveal className="pricing__grid">
          {plans.map((p, i) => (
            <article key={p.name} className={`plan ${p.highlight ? 'plan--hot dark' : ''}`} style={{ '--s': i }} data-stagger>
              <div className="plan__head">
                <span className="kicker">{p.name}</span>
                {p.highlight && <span className="chip chip--gold">Am beliebtesten</span>}
              </div>
              <p className="plan__price">
                {p.price ? <><RollingNumber value={p.price} /><span className="plan__cur">€</span></> : 'Individuell'}
              </p>
              <p className="meta plan__period">{p.period}</p>
              <p className="plan__text">{p.text}</p>
              <ul className="ticks">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="/kontakt" className={`btn btn--block ${p.highlight ? 'btn--light' : 'btn--navy'}`}>
                {p.highlight ? '14 Tage kostenlos testen' : 'Anfragen'} <Arrow width="16" height="16" />
              </a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
