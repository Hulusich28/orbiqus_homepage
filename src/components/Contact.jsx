import { useState } from 'react';

const initial = { name: '', email: '', interest: 'Terminsoftware', message: '' };
const MAIL = 'info@orbiqus.de';

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Solange kein Formular-Backend existiert, öffnet sich das E-Mail-Programm mit fertiger Anfrage.
  const submit = (e) => {
    e.preventDefault();
    const subject = `Anfrage: ${form.interest}`;
    const body = `Name: ${form.name}\nE-Mail: ${form.email}\nInteresse: ${form.interest}\n\n${form.message}`;
    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="contact" id="kontakt">
      <div className="wrap">
        <div className="contact__card">
          <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
          <div className="contact__info">
            <h2 className="h2">Lust auf eine Demo?</h2>
            <p>
              Erzählen Sie uns kurz von Ihrem Betrieb. Wir melden uns innerhalb von 24 Stunden
              und zeigen Ihnen Orbiqus in 20 Minuten.
            </p>
            <a className="contact__mail" href={`mailto:${MAIL}`}>{MAIL}</a>
          </div>

          <form className="form" onSubmit={submit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={update} autoComplete="name" required />
            </label>
            <label>
              E-Mail
              <input type="email" name="email" value={form.email} onChange={update} autoComplete="email" required />
            </label>
            <label>
              Ich interessiere mich für
              <select name="interest" value={form.interest} onChange={update}>
                <option>Terminsoftware</option>
                <option>Website</option>
                <option>Server-Hosting</option>
                <option>Mehrere Produkte</option>
              </select>
            </label>
            <label>
              Nachricht
              <textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Branche, Teamgröße, Wünsche" />
            </label>
            <button type="submit" className="btn btn--sun btn--lg btn--block">Anfrage senden</button>
            {sent && (
              <p className="form__note" role="status">
                Ihr E-Mail-Programm hat sich mit der fertigen Anfrage geöffnet. Sie müssen sie nur noch abschicken.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
