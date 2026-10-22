import { useState } from 'react';
import { ArrowLeft, ArrowRight } from './Icons.jsx';

const items = [
  { tone: 'violet', who: 'Friseur & Beauty', text: 'Kundinnen buchen Schnitt, Farbe oder Pflege abends vom Sofa aus. Jede Behandlung bekommt ihre eigene Dauer, und Ihr Telefon bleibt während der Arbeit still.' },
  { tone: 'cyan', who: 'Praxen & Therapie', text: 'Patienten wählen selbst einen freien Termin, bekommen am Vortag eine Erinnerung und sagen bei Bedarf online ab. Die frei gewordene Lücke ist sofort wieder buchbar.' },
  { tone: 'sun', who: 'Fitness & Coaching', text: 'Probetrainings, Kurse und Einzelstunden in einem Kalender. Teilnehmerlimits und Wartelisten laufen automatisch.' },
  { tone: 'mint', who: 'Werkstatt & Handwerk', text: 'Reifenwechsel, Inspektion oder Vor-Ort-Termin: Ihre Kunden sehen, wann Sie wirklich Zeit haben, und Sie planen Hebebühne und Team gleich mit.' },
  { tone: 'ink', who: 'Beratung & Agenturen', text: 'Erstgespräche direkt über Ihre Website buchen lassen, mit Videolink in der Bestätigung. Kein E-Mail-Pingpong um einen passenden Termin mehr.' },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const n = items.length;
  const go = (d) => setActive((a) => (a + d + n) % n);

  return (
    <section className="ind" id="branchen">
      <div className="wrap">
        <h2 className="h2 center">Gemacht für alle, die mit Terminen arbeiten</h2>

        <div className="deck" aria-roledescription="Karussell" aria-label="Branchen">
          {items.map((it, i) => {
            const pos = (i - active + n) % n;
            return (
              <article
                key={it.who}
                className={`deck__card deck__card--${it.tone}`}
                data-pos={pos}
                aria-hidden={pos !== 0}
                style={{ '--pos': pos, zIndex: n - pos }}
              >
                <p className="deck__text">{it.text}</p>
                <span className="deck__who">{it.who}</span>
              </article>
            );
          })}
        </div>

        <div className="deck__nav">
          <button className="round round--line" onClick={() => go(-1)} aria-label="Vorherige Branche"><ArrowLeft /></button>
          <span className="deck__count" aria-live="polite">{active + 1} / {n}</span>
          <button className="round round--line" onClick={() => go(1)} aria-label="Nächste Branche"><ArrowRight /></button>
        </div>
      </div>
    </section>
  );
}
