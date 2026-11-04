import Contours from './Contours.jsx';
import { Arrow, Bell, Layers, People, Shield, Sync } from './Icons.jsx';
import { Reveal, SectionHead } from './motion.jsx';

const week = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];

export default function Features() {
  return (
    <section className="section diff" id="vorteile">
      <div className="wrap">
        <SectionHead
          kicker="Der Unterschied"
          title="Warum *Orbiqus*"
          lede="Kein Baukasten von der Stange: Software, Website und Server kommen vom selben kleinen Team."
          meta="05 Gründe"
        />

        <Reveal className="bento">
          {/* Große Karte: Wochenansicht + Preis */}
          <article className="bento__card bento__card--hero dark" style={{ '--s': 0 }} data-stagger>
            <Contours className="bento__lines" levels={5} cell={18} alpha={0.28} speed={0.6} />
            <div className="bento__top">
              <span className="chip chip--gold">ab 29 € im Monat</span>
              <a href="/preise" className="round" aria-label="Zu den Preisen"><Arrow width="18" height="18" /></a>
            </div>
            <div className="week" aria-hidden="true">
              {week.map((d, i) => (
                <div key={d} className="week__day">
                  <span className="meta">{d}</span>
                  {[0, 1, 2].map((r) => (
                    <i
                      key={r}
                      className={`week__b ${(i * 3 + r) % 4 === 0 ? 'is-tall' : ''} ${(i * 3 + r) % 5 === 2 ? 'is-gold' : ''}`}
                      style={{ '--d': `${(i * 3 + r) * 60}ms` }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div>
              <h3>Ein voller Kalender, ohne ein einziges Telefonat.</h3>
              <p>14 Tage kostenlos testen. Monatlich kündbar.</p>
            </div>
          </article>

          <article className="bento__card" style={{ '--s': 1 }} data-stagger>
            <span className="bento__icon"><Shield /></span>
            <h3>DSGVO-konform, gehostet in Deutschland</h3>
            <p>Alle Kundendaten liegen auf Servern in Deutschland. Keine Weitergabe, keine Werbe-Tracker.</p>
            <span className="meta bento__foot">Serverstandort · DE</span>
          </article>

          <article className="bento__card" style={{ '--s': 2 }} data-stagger>
            <span className="bento__icon"><Bell /></span>
            <h3>Weniger vergessene Termine</h3>
            <p>Automatische Erinnerungen per SMS und E-Mail. Absagen und Verschieben geht mit einem Klick.</p>
            <div className="notes" aria-hidden="true">
              <span><b>SMS</b> Erinnerung: morgen 10:15</span>
              <span><b>Mail</b> Termin bestätigt</span>
            </div>
          </article>

          <article className="bento__card" style={{ '--s': 3 }} data-stagger>
            <span className="bento__icon"><Sync /></span>
            <h3>Ihr Kalender bleibt Ihr Kalender</h3>
            <p>Termine landen sofort in Google, Outlook oder Apple Kalender. In beide Richtungen.</p>
            <div className="syncs" aria-hidden="true"><span>Google</span><i /><span>Outlook</span><i /><span>Apple</span></div>
          </article>

          <article className="bento__card" style={{ '--s': 4 }} data-stagger>
            <span className="bento__icon"><Layers /></span>
            <h3>Software, Website und Server aus einer Hand</h3>
            <p>Kein Abstimmen zwischen drei Dienstleistern. Wenn etwas nicht läuft, wissen wir sofort, wo.</p>
          </article>

          <article className="bento__card bento__card--sand" style={{ '--s': 5 }} data-stagger>
            <span className="bento__icon"><People /></span>
            <h3>Persönlicher Support von den Gründern</h3>
            <p>Sie schreiben nicht mit einem Ticketsystem, sondern direkt mit den Leuten, die Orbiqus bauen.</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
