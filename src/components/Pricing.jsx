import { Reveal, RollingNumber, TextReveal, TiltCard } from './motion.jsx';

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
    <section className="pricing" id="preise">
      <div className="wrap">
        <TextReveal className="h2 center" text="Klare Preise" />
        <p className="sub center">14 Tage kostenlos testen. Monatlich kündbar. Alle Preise zzgl. MwSt.</p>
        <Reveal className="pricing__grid">
          {plans.map((p, i) => (
            <TiltCard
              as="article"
              key={p.name}
              max={4}
              className={`plan sketch ${p.highlight ? 'plan--hot' : ''}`}
              style={{ '--s': i }}
              data-stagger
            >
              {p.highlight && <span className="pill pill--sun plan__tag">Am beliebtesten</span>}
              <h3>{p.name}</h3>
              <p className="plan__price">
                {p.price ? <><RollingNumber value={p.price} /> €</> : 'Individuell'}
                <small>{p.period}</small>
              </p>
              <p className="plan__text">{p.text}</p>
              <ul className="ticks">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="#kontakt" className={`btn btn--block ${p.highlight ? 'btn--sun btn--shine' : 'btn--ink'}`}>
                {p.highlight ? '14 Tage kostenlos testen' : 'Anfragen'}
              </a>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
