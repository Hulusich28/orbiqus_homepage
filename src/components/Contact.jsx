import { useState } from 'react';
import Contours from './Contours.jsx';
import { Arrow } from './Icons.jsx';
import { TextReveal } from './motion.jsx';
import { CONTACT_MAIL, WEB3FORMS_KEY } from '../config.js';

const MAIL = CONTACT_MAIL;
const OPTIONS = ['Terminsoftware', 'Website', 'Server-Hosting', 'Mehrere Produkte'];
const initial = { name: '', email: '', interest: OPTIONS[0], message: '', botcheck: '' };
const KEY_MISSING = !/^[0-9a-f-]{36}$/i.test(WEB3FORMS_KEY);

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    // Spam-Schutz: unsichtbares Feld wurde ausgefüllt → so tun, als wäre alles gut
    if (form.botcheck) { setStatus('sent'); return; }
    if (KEY_MISSING) {
      setError('Das Kontaktformular ist noch nicht eingerichtet (Access Key fehlt).');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      // Versand über Web3Forms → landet als E-Mail in info@orbiqus.de
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_KEY);
      fd.append('subject', `Neue Website-Anfrage: ${form.interest} (${form.name})`);
      fd.append('from_name', 'Orbiqus Website');
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('Interesse', form.interest);
      fd.append('message', form.message || '–');
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `Fehler ${res.status}`);
      setStatus('sent');
      setForm(initial);
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Keine Verbindung zum Versanddienst.' : err.message);
      setStatus('error');
    }
  };

  const mailto = `mailto:${MAIL}?subject=${encodeURIComponent(`Anfrage: ${form.interest}`)}&body=${encodeURIComponent(`Name: ${form.name}\nE-Mail: ${form.email}\nInteresse: ${form.interest}\n\n${form.message}`)}`;

  return (
    <section className="contact dark" id="kontakt">
      <Contours className="contact__lines" levels={8} cell={16} alpha={0.34} />
      <div className="wrap contact__grid">
        <div className="contact__info">
          <p className="kicker">Kontakt</p>
          <TextReveal as="h1" className="h-display" text={['Lust auf eine', '*Demo*?']} onLoad delay={80} />
          <p className="lede">
            Erzählen Sie uns kurz von Ihrem Betrieb. Wir melden uns innerhalb von 24 Stunden
            und zeigen Ihnen Orbiqus in 20 Minuten.
          </p>
          <a className="contact__mail" href={`mailto:${MAIL}`}>{MAIL} <Arrow width="18" height="18" /></a>
          <p className="meta">Orbiqus eGbR · Heinrich-Vogeler-Weg 18 · 18055 Rostock</p>
        </div>

        {status === 'sent' ? (
          <div className="form form--done" role="status">
            <span className="form__check" aria-hidden="true">✓</span>
            <h2>Danke für Ihre Anfrage!</h2>
            <p>Ihre Nachricht ist bei uns angekommen. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            <button type="button" className="link" onClick={() => setStatus('idle')}>Weitere Anfrage senden</button>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            <label>
              <span className="kicker">Name</span>
              <input name="name" value={form.name} onChange={update} autoComplete="name" required />
            </label>
            <label>
              <span className="kicker">E-Mail</span>
              <input type="email" name="email" value={form.email} onChange={update} autoComplete="email" required />
            </label>
            <fieldset className="form__choice">
              <legend className="kicker">Ich interessiere mich für</legend>
              {OPTIONS.map((o) => (
                <label key={o} className={`opt ${form.interest === o ? 'is-on' : ''}`}>
                  <input type="radio" name="interest" value={o} checked={form.interest === o} onChange={update} />
                  {o}
                </label>
              ))}
            </fieldset>
            <label>
              <span className="kicker">Nachricht</span>
              <textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Branche, Teamgröße, Wünsche" />
            </label>
            {/* Honigtopf gegen Spam-Bots, für Menschen unsichtbar */}
            <input className="form__hp" type="checkbox" name="botcheck" checked={!!form.botcheck} onChange={(e) => setForm({ ...form, botcheck: e.target.checked ? 'on' : '' })} tabIndex={-1} aria-hidden="true" />

            <button type="submit" className="btn btn--light btn--lg btn--block" disabled={status === 'sending'}>
              {status === 'sending' ? 'Wird gesendet …' : <>Anfrage senden <Arrow width="18" height="18" /></>}
            </button>
            {status === 'error' && (
              <p className="form__note form__note--error" role="alert">
                Das hat leider nicht geklappt{error ? ` (${error})` : ''}. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an{' '}
                <a className="link" href={mailto}>{MAIL}</a>.
              </p>
            )}
            <p className="form__legal">
              Mit dem Absenden werden Ihre Angaben zur Bearbeitung der Anfrage an uns übermittelt.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
