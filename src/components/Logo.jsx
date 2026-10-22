export default function Logo({ light = false }) {
  return (
    <a href="#top" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Orbiqus Startseite">
      <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true">
        <circle cx="32" cy="32" r="14" fill="var(--violet)" />
        <ellipse
          cx="32" cy="32" rx="28" ry="10"
          fill="none" stroke="currentColor" strokeWidth="4.5"
          transform="rotate(-25 32 32)"
        />
        <circle cx="55" cy="21" r="4.5" fill="var(--sun)" />
      </svg>
      <span>orbiqus</span>
    </a>
  );
}
