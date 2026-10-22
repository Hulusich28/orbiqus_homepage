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
        <h2 className="h2 center">Die Gründer</h2>
        <p className="sub center">Drei Studenten, ein Ziel: Termine sollen kein Papierkram mehr sein.</p>

        <div className="team__faces">
          {founders.map((f) => (
            <figure key={f.name} className="face">
              <span className={`face__img tone-bg--${f.tone}`} aria-hidden="true">{f.initial}</span>
              <figcaption>
                <strong>{f.name}</strong>
                <span>{f.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="team__story sketch">
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
        </div>
      </div>
    </section>
  );
}
