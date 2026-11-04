import PageHero from './PageHero.jsx';

// TODO: Registernummer (Gesellschaftsregister) und ggf. USt-IdNr. eintragen, sobald vorhanden.
export default function Impressum() {
  return (
    <>
      <PageHero kicker="Rechtliches" title="Impressum" meta="Angaben gemäß § 5 DDG" />
      <section className="section legal">
        <div className="wrap legal__grid">
          <div className="legal__block">
            <p className="kicker">Anbieter</p>
            <p>
              <strong>Orbiqus eGbR</strong><br />
              Heinrich-Vogeler-Weg 18<br />
              18055 Rostock<br />
              Deutschland
            </p>
          </div>

          <div className="legal__block">
            <p className="kicker">Vertreten durch</p>
            <p>
              die Gesellschafter und Geschäftsführer<br />
              Eric Buthmann<br />
              Yanik Buthmann<br />
              Mathis Behrendt
            </p>
          </div>

          <div className="legal__block">
            <p className="kicker">Kontakt</p>
            <p>
              E-Mail: <a className="link" href="mailto:info@orbiqus.de">info@orbiqus.de</a><br />
              Kontaktformular: <a className="link" href="/kontakt">orbiqus.de/kontakt</a>
            </p>
          </div>

          <div className="legal__block">
            <p className="kicker">Registereintrag</p>
            <p>
              Eintragung im Gesellschaftsregister<br />
              Registergericht: Amtsgericht Rostock<br />
              Registernummer: GsR [wird ergänzt]
            </p>
          </div>

          <div className="legal__block">
            <p className="kicker">Umsatzsteuer-ID</p>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
              [wird ergänzt]
            </p>
          </div>

          <div className="legal__block">
            <p className="kicker">Verantwortlich für den Inhalt</p>
            <p>
              nach § 18 Abs. 2 MStV:<br />
              Eric Buthmann<br />
              Heinrich-Vogeler-Weg 18, 18055 Rostock
            </p>
          </div>

          <div className="legal__block legal__block--wide">
            <p className="kicker">Verbraucherstreitbeilegung</p>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="legal__block legal__block--wide">
            <p className="kicker">Haftung für Inhalte und Links</p>
            <p>
              Wir erstellen die Inhalte dieser Website mit größter Sorgfalt, können für Richtigkeit,
              Vollständigkeit und Aktualität jedoch keine Gewähr übernehmen. Unsere Website enthält
              gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
              haben. Für diese Inhalte ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden
              von Rechtsverletzungen entfernen wir derartige Inhalte bzw. Links umgehend.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
