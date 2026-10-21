export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Orbiqus Startseite">
      <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
        <circle cx="32" cy="32" r="14" fill="var(--primary)" />
        <ellipse
          cx="32" cy="32" rx="28" ry="10"
          fill="none" stroke="var(--accent)" strokeWidth="4"
          transform="rotate(-25 32 32)"
        />
      </svg>
      <span>Orbiqus</span>
    </a>
  );
}
