import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { ArrowUpRight } from './Icons.jsx';

const links = [
  { href: '/produkte', label: 'Produkte' },
  { href: '/preise', label: 'Preise' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navbar({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Beim Runterscrollen ausblenden, beim Hochscrollen wieder zeigen
      if (y > 500 && y > last + 4) setHidden(true);
      if (y < last - 4 || y < 500) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Seitenwechsel: Menü schließen, Leiste zeigen
  useEffect(() => { setOpen(false); setHidden(false); }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''} ${hidden && !open ? 'nav--hidden' : ''}`}>
      <div className="nav__bar">
        <Logo />

        <nav className="nav__links" aria-label="Hauptnavigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav__link ${path === l.href ? 'is-active' : ''}`}
              aria-current={path === l.href ? 'page' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="/kontakt" className="btn btn--light btn--sm nav__cta">
          Demo anfragen <ArrowUpRight width="15" height="15" />
        </a>

        <button
          className="nav__burger"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </div>

      <div className={`nav__sheet ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <p className="kicker">Navigation</p>
        {[{ href: '/', label: 'Start' }, ...links].map((l, i) => (
          <a key={l.href} href={l.href} tabIndex={open ? 0 : -1} style={{ '--i': i }}>
            <span className="meta">0{i + 1}</span>{l.label}
          </a>
        ))}
        <a href="/kontakt" className="btn btn--light btn--lg" tabIndex={open ? 0 : -1} style={{ '--i': links.length + 1 }}>
          Demo anfragen
        </a>
      </div>
    </header>
  );
}
