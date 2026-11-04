import { useEffect } from 'react';
import { usePath } from './router.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Features from './components/Features.jsx';
import Process from './components/Process.jsx';
import Industries from './components/Industries.jsx';
import Pricing from './components/Pricing.jsx';
import Team from './components/Team.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import PageHero from './components/PageHero.jsx';
import CtaBand from './components/CtaBand.jsx';
import Impressum from './components/Impressum.jsx';

const pages = {
  '/': {
    title: 'Orbiqus – Terminsoftware, Websites & Hosting',
    render: () => (<><Hero /><Features /><Industries /><CtaBand /></>),
  },
  '/produkte': {
    title: 'Produkte – Orbiqus',
    render: () => (
      <>
        <PageHero
          kicker="Produkte"
          title={['Drei Produkte.', '*Ein* Team.']}
          lede="Terminsoftware, Websites und Server-Hosting – einzeln oder kombiniert, immer mit einem Ansprechpartner."
          meta="01 — 03"
        />
        <Services />
        <Process />
        <CtaBand />
      </>
    ),
  },
  '/preise': {
    title: 'Preise – Orbiqus',
    render: () => (
      <>
        <PageHero
          kicker="Preise"
          title={['Klare Preise,', '*keine* Überraschungen']}
          lede="14 Tage kostenlos testen. Monatlich kündbar."
          meta="Alle Preise zzgl. MwSt."
        />
        <Pricing />
        <Faq />
      </>
    ),
  },
  '/ueber-uns': {
    title: 'Über uns – Orbiqus',
    render: () => (
      <>
        <PageHero
          kicker="Über uns"
          title={['Drei Gründer', 'aus *Rostock*']}
          lede="Wir entwickeln die Terminsoftware selbst, bauen Websites und betreiben die Server dahinter."
          meta="Orbiqus eGbR"
        />
        <Team />
        <CtaBand />
      </>
    ),
  },
  '/kontakt': { title: 'Kontakt – Orbiqus', render: () => <Contact /> },
  '/impressum': { title: 'Impressum – Orbiqus', render: () => <Impressum /> },
};

function NotFound() {
  return (
    <PageHero kicker="Fehler 404" title={['Diese Seite', 'gibt es *nicht*.']} lede="Vielleicht hilft Ihnen die Startseite weiter." />
  );
}

export default function App() {
  const raw = usePath();
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw;
  const page = pages[path];

  useEffect(() => {
    document.title = page ? page.title : 'Seite nicht gefunden – Orbiqus';
  }, [page]);

  return (
    <>
      <Navbar path={path} />
      <main key={path}>{page ? page.render() : <NotFound />}</main>
      <Footer />
    </>
  );
}
