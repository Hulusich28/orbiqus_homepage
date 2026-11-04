import Logo, { Mark } from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer dark">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>
              Orbiqus ist ein junges Software-Team aus Rostock. Wir machen Online-Terminbuchung
              einfach, bauen moderne Websites und betreiben die Server dahinter.
            </p>
            <p className="meta">Orbiqus eGbR · Heinrich-Vogeler-Weg 18 · 18055 Rostock</p>
          </div>

          <nav aria-label="Produkte">
            <p className="kicker">Produkte</p>
            <a href="/produkte">Terminsoftware</a>
            <a href="/produkte">Websites</a>
            <a href="/produkte">Server-Hosting</a>
            <a href="/preise">Preise</a>
          </nav>
          <nav aria-label="Orbiqus">
            <p className="kicker">Orbiqus</p>
            <a href="/produkte#ablauf">Ablauf</a>
            <a href="/preise#faq">FAQ</a>
            <a href="/ueber-uns">Über uns</a>
            <a href="/kontakt">Kontakt</a>
          </nav>
          <nav aria-label="Rechtliches">
            <p className="kicker">Rechtliches</p>
            <a href="/impressum">Impressum</a>
            {/* TODO: Datenschutzerklärung und AGB als eigene Seiten ergänzen */}
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
          </nav>
        </div>

        <div className="footer__word" aria-hidden="true">
          <span>ORBIQUS</span>
          <Mark size={120} />
        </div>

        <div className="footer__bottom meta">
          <span>© {year} Orbiqus eGbR. Alle Rechte vorbehalten.</span>
          <span>Termine · Websites · Hosting</span>
          <a href="mailto:info@orbiqus.de">info@orbiqus.de</a>
        </div>
      </div>
    </footer>
  );
}
