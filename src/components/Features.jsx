const features = [
  { icon: '⏰', title: 'Automatische Erinnerungen', text: 'Weniger No-Shows dank SMS- und E-Mail-Benachrichtigungen.' },
  { icon: '🔄', title: 'Kalender-Synchronisation', text: 'Termine landen sofort in Google, Outlook oder Apple Kalender.' },
  { icon: '👥', title: 'Team & Ressourcen', text: 'Mitarbeiter, Räume und Geräte zentral planen und verwalten.' },
  { icon: '💳', title: 'Online-Zahlung', text: 'Anzahlungen und Gebühren direkt bei der Buchung kassieren.' },
  { icon: '🔒', title: 'DSGVO & Hosting in DE', text: 'Ihre Daten liegen sicher auf Servern in Deutschland.' },
  { icon: '📊', title: 'Statistiken', text: 'Auslastung, Umsatz und Buchungsquellen auf einen Blick.' },
];

export default function Features() {
  return (
    <section className="section section--alt" id="funktionen">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Funktionen</span>
          <h2>Terminsoftware, die mitdenkt</h2>
          <p>Ihre Kunden buchen in Sekunden – Sie sparen Zeit für das Wesentliche.</p>
        </div>
        <div className="grid grid--3">
          {features.map((f) => (
            <div key={f.title} className="feature">
              <span className="feature__icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
