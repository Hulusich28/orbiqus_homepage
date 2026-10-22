import Wave from './Wave.jsx';

// Eigene, einfache Linien-Illustrationen für die drei Schritte
const ArtTalk = () => (
  <svg viewBox="0 0 160 120" aria-hidden="true">
    <rect x="18" y="22" width="78" height="46" rx="14" />
    <path d="M38 68l-6 16 20-16" />
    <rect x="66" y="52" width="76" height="42" rx="14" className="fill" />
    <path d="M122 94l6 14-18-14" />
    <path d="M34 40h46M34 52h30M82 70h44M82 80h28" />
  </svg>
);
const ArtBuild = () => (
  <svg viewBox="0 0 160 120" aria-hidden="true">
    <rect x="20" y="18" width="120" height="78" rx="10" />
    <path d="M20 34h120" />
    <circle cx="30" cy="26" r="2.5" /><circle cx="39" cy="26" r="2.5" /><circle cx="48" cy="26" r="2.5" />
    <rect x="32" y="44" width="40" height="40" rx="6" className="fill" />
    <path d="M84 48h42M84 60h32M84 72h38" />
    <path d="M60 104h40" />
  </svg>
);
const ArtLaunch = () => (
  <svg viewBox="0 0 160 120" aria-hidden="true">
    <circle cx="80" cy="60" r="20" className="fill" />
    <ellipse cx="80" cy="60" rx="58" ry="20" transform="rotate(-20 80 60)" />
    <circle cx="131" cy="38" r="6" />
    <path d="M20 22l4 4M140 98l4 4M30 100h.01M128 16h.01" />
  </svg>
);

const steps = [
  { art: ArtTalk, tone: 'violet', title: 'Wir reden', text: 'Ein kostenloses Gespräch über Ihren Betrieb, Ihre Termine und was Sie brauchen.' },
  { art: ArtBuild, tone: 'cyan', title: 'Wir richten ein', text: 'Wir richten Buchung, Website oder Server komplett für Sie ein. Sie geben nur Feedback.' },
  { art: ArtLaunch, tone: 'sun', title: 'Sie starten', text: 'Go-live, kurze Einweisung, und wir bleiben auch danach Ihr Ansprechpartner.' },
];

export default function Process() {
  return (
    <section className="steps" id="ablauf">
      <div className="wrap">
        <h2 className="h2 center steps__title">
          Ein kurzes Gespräch, eine Woche Einrichtung, und Ihre Kunden buchen online.
        </h2>
        <ol className="steps__grid">
          {steps.map(({ art: Art, ...s }, i) => (
            <li key={s.title} className="step sketch">
              <span className={`step__num tone--${s.tone}`}>0{i + 1}</span>
              <div className={`step__art art--${s.tone}`}><Art /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <Wave color="var(--paper)" />
    </section>
  );
}
