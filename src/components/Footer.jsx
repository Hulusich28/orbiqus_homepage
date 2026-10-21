import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Logo />
          <p className="footer__claim">Softwarelösungen für Terminbuchung & Websites.</p>
        </div>
        <nav className="footer__links">
          <a href="#leistungen">Leistungen</a>
          <a href="#preise">Preise</a>
          <a href="#kontakt">Kontakt</a>
          <a href="#">Impressum</a>
          <a href="#">Datenschutz</a>
        </nav>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Orbiqus. Alle Rechte vorbehalten.</p>
    </footer>
  );
}
