import { useEffect, useRef, useState } from 'react';
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
  const [hidden, setHidden] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false });
  const navRef = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Beim Runterscrollen ausblenden, beim Hochscrollen wieder zeigen
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // Gleitender Hintergrund hinter dem Link unter der Maus
  const hover = (e) => {
    const nav = navRef.current.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    setPill({ x: r.left - nav.left, w: r.width, on: true });
  };

  const close = () => { setOpen(false); setDrop(false); };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''} ${hidden && !open ? 'nav--hidden' : ''}`}>
      <div className="nav__pill">
        <Logo />

        <nav
          className="nav__links"
          aria-label="Hauptnavigation"
          ref={navRef}
          onMouseLeave={() => setPill((p) => ({ ...p, on: false }))}
        >
          <span
            className={`nav__hover ${pill.on ? 'is-on' : ''}`}
            style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
            aria-hidden="true"
          />
          <div
            className={`nav__drop ${drop ? 'is-open' : ''}`}
            onMouseEnter={(e) => { setDrop(true); hover(e); }}
            onMouseLeave={() => setDrop(false)}
          >
            <button className="nav__link" aria-expanded={drop} onClick={() => setDrop(!drop)}>
              Produkte <Chevron />
            </button>
            <div className="nav__menu">
              {products.map((p, i) => (
                <a key={p.label} href={p.href} onClick={close} style={{ '--i': i }}>
                  <strong>{p.label}</strong>
                  <span>{p.note}</span>
                </a>
              ))}
            </div>
          </div>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link" onMouseEnter={hover} onClick={close}>{l.label}</a>
          ))}
        </nav>

        <a href="#kontakt" className="btn btn--ink nav__cta btn--shine" onClick={close}>Demo anfragen</a>

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
        {[...products.map((p) => ({ href: p.href, label: p.label })), ...links].map((l, i) => (
          <a key={l.label} href={l.href} onClick={close} tabIndex={open ? 0 : -1} style={{ '--i': i }}>{l.label}</a>
        ))}
        <a href="#kontakt" className="btn btn--ink btn--lg" onClick={close} tabIndex={open ? 0 : -1} style={{ '--i': 6 }}>Demo anfragen</a>
      </div>
    </header>
  );
}
