// Weicher Wellen-Übergang zwischen zwei Hintergrundfarben
export default function Wave({ color = 'var(--mist)', flip = false }) {
  return (
    <div className={`wave ${flip ? 'wave--flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path d="M0 62C240 18 480 0 720 22s480 66 720 40v28H0z" fill={color} />
      </svg>
    </div>
  );
}
