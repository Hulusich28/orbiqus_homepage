import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

const links = [
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#funktionen', label: 'Funktionen' },
  { href: '#ablauf', label: 'Ablauf' },
  { href: '#preise', label: 'Preise' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Logo />
        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#kontakt" className="btn btn--primary" onClick={() => setOpen(false)}>
            Kontakt
          </a>
        </nav>
        <button
          className="navbar__toggle"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
