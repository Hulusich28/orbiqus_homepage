import { Reveal, TextReveal } from './motion.jsx';

// TODO: Namen, Rollen und Fotos der Gründer eintragen (Fotos z. B. nach public/team/ legen)
const founders = [
  { initial: 'A', name: 'Gründer 1', role: 'Produkt & Entwicklung', tone: 'violet' },
  { initial: 'B', name: 'Gründer 2', role: 'Websites & Design', tone: 'cyan' },
  { initial: 'C', name: 'Gründer 3', role: 'Server & Infrastruktur', tone: 'sun' },
];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="wrap">
        <TextReveal className="h2 center" text="Die Gründer" />
        <p className="sub center">Drei Studenten, ein Ziel: Termine sollen kein Papierkram mehr sein.</p>

        <Reveal className="team__faces">
          {founders.map((f, i) => (
            <figure key={f.name} className="face" style={{ '--s': i }} data-stagger>
              <span className={`face__img tone-bg--${f.tone}`} aria-hidden="true">{f.initial}</span>
              <figcaption>
                <strong>{f.name}</strong>
                <span>{f.role}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <Reveal className="team__story sketch">
          <p className="team__quote">
            Wir haben gesehen, wie viel Zeit kleine Betriebe am Telefon verlieren, nur um Termine
            hin- und herzuschieben. Das wollten wir ändern.
          </p>
          <p>
            Orbiqus ist neben dem Studium entstanden. Wir entwickeln die Terminsoftware selbst,
            bauen Websites für unsere Kunden und betreiben die Server, auf denen alles läuft.
            Deshalb wissen wir bei jeder Frage, wo wir hinschauen müssen.
          </p>
          <p>
            Sie sprechen bei uns immer direkt mit einem von uns dreien. Kein Callcenter,
            keine Warteschleife.
          </p>
          <div className="team__links">
            <a href="#kontakt" className="link link--violet">Lernen Sie uns kennen</a>
            <a href="#produkte" className="link">Produkte ansehen</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
