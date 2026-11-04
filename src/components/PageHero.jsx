import Contours from './Contours.jsx';
import { TextReveal } from './motion.jsx';

// Dunkler Seitenkopf für Unterseiten
export default function PageHero({ kicker, title, lede, meta }) {
  return (
    <section className="phero dark">
      <Contours className="phero__lines" levels={7} cell={18} alpha={0.32} />
      <div className="wrap phero__inner">
        <div className="phero__main">
          {kicker && <p className="kicker">{kicker}</p>}
          <TextReveal as="h1" className="h-display" text={title} onLoad delay={80} />
        </div>
        {(lede || meta) && (
          <div className="phero__side">
            {lede && <p className="lede">{lede}</p>}
            {meta && <p className="meta">{meta}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
