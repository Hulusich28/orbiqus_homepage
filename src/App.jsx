import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Features from './components/Features.jsx';
import Process from './components/Process.jsx';
import Pricing from './components/Pricing.jsx';
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
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
