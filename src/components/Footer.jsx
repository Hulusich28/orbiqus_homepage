import Logo from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__card">
          <div className="footer__top">
            <Logo />
            <p className="footer__claim">Termine, Websites und Server aus einer Hand.</p>
            <p className="footer__text">
              Orbiqus ist ein junges Software-Team aus Deutschland. Wir machen Online-Terminbuchung
              einfach, bauen moderne Websites und betreiben die Server dahinter.
            </p>
          </div>

          <div className="footer__cols">
            <nav aria-label="Produkte">
              <h4>Produkte</h4>
              <a href="#produkte">Terminsoftware</a>
              <a href="#produkte">Websites</a>
              <a href="#produkte">Server-Hosting</a>
            </nav>
            <nav aria-label="Orbiqus">
              <h4>Orbiqus</h4>
              <a href="#ablauf">Ablauf</a>
              <a href="#preise">Preise</a>
              <a href="#team">Gründer</a>
              <a href="#kontakt">Kontakt</a>
            </nav>
            <nav aria-label="Rechtliches">
              <h4>Rechtliches</h4>
              {/* TODO: Impressum- und Datenschutzseite verlinken (in DE Pflicht) */}
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <a href="#">AGB</a>
            </nav>
          </div>

          <div className="footer__bottom">
            <span>© {year} Orbiqus. Alle Rechte vorbehalten.</span>
            <a href="mailto:info@orbiqus.de">info@orbiqus.de</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
