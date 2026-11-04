import { Mark } from './Logo.jsx';
import { Arrow } from './Icons.jsx';
import { Reveal, TextReveal } from './motion.jsx';

// Abschluss-Block auf der Startseite: führt zu Kontakt und Preisen
export default function CtaBand() {
  return (
    <section className="section cta">
      <div className="wrap">
        <Reveal className="cta__card">
          <div className="cta__text">
            <p className="kicker">Nächster Schritt</p>
            <TextReveal className="h-section" text="Lust auf eine *Demo*?" />
            <p className="lede">Wir zeigen Ihnen Orbiqus in 20 Minuten – kostenlos und unverbindlich.</p>
          </div>
          <div className="cta__actions">
            <a href="/kontakt" className="btn btn--navy btn--lg">Demo anfragen <Arrow width="18" height="18" /></a>
            <a href="/preise" className="link">Preise ansehen</a>
          </div>
          <Mark size={180} className="cta__mark" />
        </Reveal>
      </div>
    </section>
  );
}
