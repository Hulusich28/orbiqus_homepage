import { Mark } from './Logo.jsx';
import { Reveal, SectionHead } from './motion.jsx';

// TODO: Fotos der Gründer ergänzen (z. B. nach public/team/ legen)
const founders = [
  { initial: 'E', name: 'Eric Buthmann', role: 'Gründer & Geschäftsführer' },
  { initial: 'Y', name: 'Yanik Buthmann', role: 'Gründer & Geschäftsführer' },
  { initial: 'M', name: 'Mathis Behrendt', role: 'Gründer & Geschäftsführer' },
];

export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="wrap">
        <SectionHead
          kicker="Die Gründer"
          title="Drei Studenten, *ein* Ziel"
          lede="Termine sollen kein Papierkram mehr sein."
          meta="Persönlich erreichbar"
        />

        <div className="team__grid">
          <Reveal className="team__faces">
            {founders.map((f, i) => (
              <figure key={f.name} className="face" style={{ '--s': i }} data-stagger>
                <span className="face__img" aria-hidden="true">
                  <span>{f.initial}</span>
                  <Mark size={22} />
                </span>
                <figcaption>
                  <strong>{f.name}</strong>
                  <span className="meta">{f.role}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <Reveal className="team__story">
            <p className="team__quote">
              „Wir haben gesehen, wie viel Zeit kleine Betriebe am Telefon verlieren, nur um Termine
              hin- und herzuschieben. Das wollen wir <em>ändern</em>.“
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
            <a href="/kontakt" className="link">Lernen Sie uns kennen</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
