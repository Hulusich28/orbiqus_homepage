// Bildmarke laut Corporate Design: zwei Balken in Schriftfarbe, der mittlere in Gold und nach rechts versetzt
export function Mark({ size = 22, className = '' }) {
  return (
    <svg className={`mark ${className}`} viewBox="0 0 140 94" width={size} height={size * 0.67} aria-hidden="true">
      <rect className="mark__bar mark__bar--1" x="0" y="0" width="86" height="18" rx="2" fill="currentColor" />
      <rect className="mark__bar mark__bar--2" x="36" y="38" width="104" height="18" rx="2" fill="var(--gold)" />
      <rect className="mark__bar mark__bar--3" x="0" y="76" width="86" height="18" rx="2" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <a href="/" className={`logo ${className}`} aria-label="Orbiqus Startseite">
      <span className="logo__word">ORBIQUS</span>
      <Mark size={20} />
    </a>
  );
}
