const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
const slots = [
  { time: '09:00', name: 'Haarschnitt – Lisa M.', tone: 'primary' },
  { time: '10:30', name: 'Beratung – Herr Weber', tone: 'accent' },
  { time: '13:00', name: 'Physiotherapie – T. Klein', tone: 'primary' },
  { time: '15:15', name: 'Online-Termin – S. Yilmaz', tone: 'success' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="badge">Terminsoftware & Webentwicklung</span>
          <h1>
            Software, die Ihre <span className="gradient-text">Termine</span> und Ihren
            Auftritt in Bewegung bringt.
          </h1>
          <p className="lead">
            Orbiqus entwickelt intelligente Online-Terminbuchung und moderne Websites für
            Praxen, Salons, Dienstleister und Unternehmen – schnell, sicher und
            DSGVO-konform.
          </p>
          <div className="hero__actions">
            <a href="#kontakt" className="btn btn--primary btn--lg">Kostenlose Demo anfragen</a>
            <a href="#leistungen" className="btn btn--ghost btn--lg">Leistungen ansehen</a>
          </div>
          <ul className="hero__stats">
            <li><strong>24/7</strong><span>Online buchbar</span></li>
            <li><strong>−70 %</strong><span>weniger Telefonate</span></li>
            <li><strong>100 %</strong><span>DSGVO-konform</span></li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="mock">
            <div className="mock__header">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="mock__title">Orbiqus Kalender</span>
            </div>
            <div className="mock__days">
              {days.map((d, i) => (
                <span key={d} className={i === 2 ? 'is-active' : ''}>{d}</span>
              ))}
            </div>
            <ul className="mock__slots">
              {slots.map((s) => (
                <li key={s.time} className={`slot slot--${s.tone}`}>
                  <time>{s.time}</time>
                  <span>{s.name}</span>
                </li>
              ))}
            </ul>
            <div className="mock__toast">✓ Neuer Termin gebucht</div>
          </div>
        </div>
      </div>
    </section>
  );
}
