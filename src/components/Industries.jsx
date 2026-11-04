import { useEffect, useState } from 'react';
import { SectionHead, prefersReduced } from './motion.jsx';

const items = [
  { who: 'Friseur & Beauty', slot: 'Schnitt & Farbe · 120 Min.', text: 'Kundinnen buchen Schnitt, Farbe oder Pflege abends vom Sofa aus. Jede Behandlung bekommt ihre eigene Dauer, und Ihr Telefon bleibt während der Arbeit still.' },
  { who: 'Praxen & Therapie', slot: 'Physiotherapie · 30 Min.', text: 'Patienten wählen selbst einen freien Termin, bekommen am Vortag eine Erinnerung und sagen bei Bedarf online ab. Die frei gewordene Lücke ist sofort wieder buchbar.' },
  { who: 'Fitness & Coaching', slot: 'Probetraining · 60 Min.', text: 'Probetrainings, Kurse und Einzelstunden in einem Kalender. Teilnehmerlimits und Wartelisten laufen automatisch.' },
  { who: 'Werkstatt & Handwerk', slot: 'Reifenwechsel · 45 Min.', text: 'Reifenwechsel, Inspektion oder Vor-Ort-Termin: Ihre Kunden sehen, wann Sie wirklich Zeit haben, und Sie planen Hebebühne und Team gleich mit.' },
  { who: 'Beratung & Agenturen', slot: 'Erstgespräch · Video', text: 'Erstgespräche direkt über Ihre Website buchen lassen, mit Videolink in der Bestätigung. Kein E-Mail-Pingpong um einen passenden Termin mehr.' },
];

const AUTO = 6000;

export default function Industries() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  // Wechselt automatisch, pausiert bei Hover/Fokus
  useEffect(() => {
    if (paused || prefersReduced()) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), AUTO);
    return () => clearTimeout(t);
  }, [active, paused]);

  const it = items[active];

  return (
    <section className="section ind" id="branchen">
      <div className="wrap">
        <SectionHead
          kicker="Branchen"
          title="Gemacht für alle, die mit *Terminen* arbeiten"
          meta={`0${active + 1} / 0${n}`}
        />

        <div
          className="ind__grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="ind__tabs" role="tablist" aria-label="Branche wählen">
            {items.map((x, i) => (
              <button
                key={x.who}
                role="tab"
                id={`ind-tab-${i}`}
                aria-selected={i === active}
                aria-controls="ind-panel"
                className={`ind__tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                style={{ '--t': `${AUTO}ms` }}
                data-paused={paused}
              >
                <span className="meta">0{i + 1}</span>
                <span className="ind__name">{x.who}</span>
                <i className="ind__progress" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="ind__panel dark" id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${active}`}>
            <div key={active} className="ind__swap">
              <span className="kicker">{it.who}</span>
              <p className="ind__text">{it.text}</p>
              <div className="ind__slot" aria-hidden="true">
                <span className="ind__check">✓</span>
                <span><b>Online gebucht</b><small>{it.slot}</small></span>
                <span className="meta">Bestätigt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
