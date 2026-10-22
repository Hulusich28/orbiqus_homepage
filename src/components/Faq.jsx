import { useState } from 'react';
import { Reveal, TextReveal } from './motion.jsx';

const faqs = [
  {
    q: 'Wie lange dauert es, bis meine Kunden online buchen können?',
    a: 'Meist wenige Tage. Nach dem Erstgespräch richten wir Leistungen, Öffnungszeiten und Mitarbeiter für Sie ein. Sie müssen nur noch prüfen und freigeben.',
  },
  {
    q: 'Kann ich Orbiqus erst testen?',
    a: 'Ja. Sie können die Terminsoftware 14 Tage kostenlos und unverbindlich testen. Danach ist sie monatlich kündbar.',
  },
  {
    q: 'Funktioniert die Buchung auf meiner bestehenden Website?',
    a: 'Ja. Sie bekommen ein Buchungs-Widget, das sich in jede Website einbauen lässt, oder eine eigene Buchungsseite unter Ihrem Namen. Wenn Sie noch keine Website haben, bauen wir Ihnen eine.',
  },
  {
    q: 'Wo werden die Daten meiner Kunden gespeichert?',
    a: 'Auf Servern in Deutschland, die wir selbst betreiben. Orbiqus ist DSGVO-konform, und Sie erhalten von uns einen Vertrag zur Auftragsverarbeitung.',
  },
  {
    q: 'Was passiert, wenn ein Kunde nicht erscheint?',
    a: 'Erinnerungen per SMS und E-Mail senken das Risiko deutlich. Auf Wunsch können Kunden bei der Buchung eine Anzahlung leisten.',
  },
  {
    q: 'Muss ich alle drei Produkte nehmen?',
    a: 'Nein. Jedes Produkt funktioniert für sich. Wer mehrere kombiniert, hat aber nur einen Ansprechpartner und eine Rechnung.',
  },
  {
    q: 'Was bedeutet Server-Hosting bei Orbiqus genau?',
    a: 'Wir richten einen Server für Ihre Anwendungen oder Website ein, kümmern uns um Updates, Backups und Überwachung und melden uns, bevor ein Problem entsteht.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="wrap wrap--narrow">
        <TextReveal className="h2 center" text="Häufige Fragen" />
        <Reveal className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`} style={{ '--s': i }} data-stagger>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <i className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
