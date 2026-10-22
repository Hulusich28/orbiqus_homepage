import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { Chevron } from './Icons.jsx';

const products = [
  { href: '#produkte', label: 'Terminsoftware', note: 'Online-Buchung für Ihr Team' },
  { href: '#produkte', label: 'Websites', note: 'Modern, schnell, mit Buchung' },
  { href: '#produkte', label: 'Server-Hosting', note: 'Eingerichtet und betreut' },
];

const links = [
  { href: '#ablauf', label: 'Ablauf' },
  { href: '#preise', label: 'Preise' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const close = () => { setOpen(false); setDrop(false); };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__pill">
        <Logo />

        <nav className="nav__links" aria-label="Hauptnavigation">
          <div
            className={`nav__drop ${drop ? 'is-open' : ''}`}
            onMouseEnter={() => setDrop(true)}
            onMouseLeave={() => setDrop(false)}
          >
            <button
              className="nav__link"
              aria-expanded={drop}
              onClick={() => setDrop(!drop)}
            >
              Produkte <Chevron />
            </button>
            <div className="nav__menu">
              {products.map((p) => (
                <a key={p.label} href={p.href} onClick={close}>
                  <strong>{p.label}</strong>
                  <span>{p.note}</span>
                </a>
              ))}
            </div>
          </div>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link" onClick={close}>{l.label}</a>
          ))}
        </nav>

        <a href="#kontakt" className="btn btn--ink nav__cta" onClick={close}>Demo anfragen</a>

        <button
          className="nav__burger"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </div>

      <div className="nav__sheet" hidden={!open}>
        {[...products.map((p) => ({ href: p.href, label: p.label })), ...links].map((l) => (
          <a key={l.label} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href="#kontakt" className="btn btn--ink btn--lg" onClick={close}>Demo anfragen</a>
      </div>
    </header>
  );
}
