import Contours from './Contours.jsx';
import { Reveal, SectionHead } from './motion.jsx';

// Eigene Linien-Illustrationen; pathLength=1 erlaubt das "Zeichnen" per CSS
const L = { pathLength: 1 };
const ArtTalk = () => (
  <svg viewBox="0 0 160 120" aria-hidden="true">
    <rect {...L} x="18" y="22" width="78" height="46" rx="10" />
    <path {...L} d="M38 68l-6 16 20-16" />
    <rect {...L} x="66" y="52" width="76" height="42" rx="10" className="gold" />
    <path {...L} d="M122 94l6 14-18-14" className="gold" />
    <path {...L} d="M34 40h46M34 52h30" />
  </svg>
);
const ArtBuild = () => (
  <svg viewBox="0 0 160 120" aria-hidden="true">
    <rect {...L} x="20" y="18" width="120" height="78" rx="8" />
    <path {...L} d="M20 34h120" />
    <rect {...L} x="32" y="46" width="40" height="38" rx="4" className="gold" />
    <path {...L} d="M84 50h42M84 62h32M84 74h38" />
  </svg>
);
const ArtLaunch = () => (
  <svg viewBox="0 0 160 120" aria-hidden="true">
    <path {...L} d="M40 34h56M58 60h66M40 86h56" />
    <path {...L} d="M58 60h66" className="gold thick" />
    <path {...L} d="M40 34h56M40 86h56" className="thick" />
    <circle {...L} cx="134" cy="60" r="5" className="gold" />
  </svg>
);

const steps = [
  { art: ArtTalk, label: 'Kick-off', title: 'Wir reden', text: 'Ein kostenloses Gespräch über Ihren Betrieb, Ihre Termine und was Sie brauchen.' },
  { art: ArtBuild, label: 'Einrichtung', title: 'Wir richten ein', text: 'Wir richten Buchung, Website oder Server komplett für Sie ein. Sie geben nur Feedback.' },
  { art: ArtLaunch, label: 'Go-Live', title: 'Sie starten', text: 'Go-live, kurze Einweisung, und wir bleiben auch danach Ihr Ansprechpartner.' },
];

export default function Process() {
  return (
    <section className="section steps dark" id="ablauf">
      <Contours className="steps__lines" levels={6} cell={20} alpha={0.2} speed={0.5} />
      <div className="wrap">
        <SectionHead
          kicker="So geht es weiter"
          title="Ein Gespräch, ein paar Tage Einrichtung – und Ihre Kunden buchen *online*."
          meta="3 Schritte"
        />
        <Reveal as="ol" className="steps__grid">
          {steps.map(({ art: Art, ...s }, i) => (
            <li key={s.title} className="step" style={{ '--s': i }} data-stagger>
              <span className="step__rule" aria-hidden="true" />
              <div className="step__top">
                <span className="step__num">{i + 1}</span>
                <span className="kicker">{s.label}</span>
              </div>
              <div className="step__art"><Art /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
