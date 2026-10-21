const services = [
  {
    icon: '📅',
    title: 'Terminbuchungssoftware',
    text: 'Online-Terminbuchung rund um die Uhr – mit Kalender-Synchronisation, automatischen Erinnerungen und Mitarbeiterverwaltung.',
    points: ['Buchungs-Widget für Ihre Website', 'SMS- & E-Mail-Erinnerungen', 'Google- & Outlook-Sync'],
  },
  {
    icon: '🌐',
    title: 'Websites & Landingpages',
    text: 'Moderne, schnelle und responsive Websites, die Besucher zu Kunden machen – optimiert für Google und alle Geräte.',
    points: ['Individuelles Design', 'SEO & Performance', 'Einfache Pflege per CMS'],
  },
  {
    icon: '⚙️',
    title: 'Individuelle Softwarelösungen',
    text: 'Maßgeschneiderte Anwendungen und Schnittstellen, die exakt zu Ihren Prozessen passen und mit Ihrem Unternehmen wachsen.',
    points: ['Web-Apps & Kundenportale', 'API-Integrationen', 'Hosting & Wartung'],
  },
];

export default function Services() {
  return (
    <section className="section" id="leistungen">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Leistungen</span>
          <h2>Alles aus einer Hand</h2>
          <p>Von der Terminplanung bis zum kompletten Webauftritt – wir digitalisieren Ihr Geschäft.</p>
        </div>
        <div className="grid grid--3">
          {services.map((s) => (
            <article key={s.title} className="card">
              <div className="card__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="checklist">
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
