const steps = [
  { title: 'Erstgespräch', text: 'Wir lernen Ihr Unternehmen und Ihre Anforderungen kennen – kostenlos und unverbindlich.' },
  { title: 'Konzept & Design', text: 'Sie erhalten ein klares Konzept und einen Designentwurf zur Abstimmung.' },
  { title: 'Umsetzung', text: 'Wir entwickeln Ihre Lösung und richten Terminbuchung oder Website vollständig ein.' },
  { title: 'Launch & Support', text: 'Go-live, Einweisung und persönliche Betreuung auch nach dem Start.' },
];

export default function Process() {
  return (
    <section className="section" id="ablauf">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Ablauf</span>
          <h2>In 4 Schritten zur Lösung</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
