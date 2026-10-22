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

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
        <Process />
        <Industries />
        <Pricing />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
