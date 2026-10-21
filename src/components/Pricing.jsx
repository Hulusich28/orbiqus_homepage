const plans = [
  {
    name: 'Starter',
    price: '29 €',
    period: '/ Monat',
    text: 'Für Einzelunternehmer, die online buchbar sein wollen.',
    features: ['1 Kalender', 'Online-Buchungsseite', 'E-Mail-Erinnerungen', 'E-Mail-Support'],
  },
  {
    name: 'Business',
    price: '79 €',
    period: '/ Monat',
    text: 'Für Teams und Praxen mit mehreren Mitarbeitern.',
    features: ['Bis zu 10 Kalender', 'SMS-Erinnerungen', 'Kalender-Sync', 'Online-Zahlung', 'Prioritäts-Support'],
    highlight: true,
  },
  {
    name: 'Website + Termine',
    price: 'Individuell',
    period: '',
    text: 'Komplette Website inklusive integrierter Terminbuchung.',
    features: ['Individuelles Webdesign', 'Buchungssystem integriert', 'SEO-Grundoptimierung', 'Hosting & Wartung'],
  },
];

export default function Pricing() {
  return (
    <section className="section section--alt" id="preise">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Preise</span>
          <h2>Transparent und fair</h2>
          <p>Monatlich kündbar. 14 Tage kostenlos testen.</p>
        </div>
        <div className="grid grid--3">
          {plans.map((p) => (
            <article key={p.name} className={`plan ${p.highlight ? 'plan--highlight' : ''}`}>
              {p.highlight && <span className="plan__tag">Beliebt</span>}
              <h3>{p.name}</h3>
              <p className="plan__price">
                {p.price} <small>{p.period}</small>
              </p>
              <p className="plan__text">{p.text}</p>
              <ul className="checklist">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="#kontakt" className={`btn ${p.highlight ? 'btn--primary' : 'btn--ghost'} btn--block`}>
                Jetzt anfragen
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
