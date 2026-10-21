import { useState } from 'react';

const initial = { name: '', email: '', interest: 'Terminbuchungssoftware', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // TODO: an Backend / Formular-Dienst anbinden
    setSent(true);
    setForm(initial);
  };

  return (
    <section className="section" id="kontakt">
      <div className="container contact">
        <div className="contact__info">
          <span className="eyebrow">Kontakt</span>
          <h2>Lassen Sie uns sprechen</h2>
          <p>
            Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden mit
            einem unverbindlichen Angebot.
          </p>
          <ul className="contact__list">
            <li>✉️ <a href="mailto:info@orbiqus.de">info@orbiqus.de</a></li>
            <li>📞 <a href="tel:+490000000000">+49 000 000 0000</a></li>
            <li>📍 Deutschland</li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={submit}>
          {sent && <p className="form__success">Danke! Wir melden uns in Kürze bei Ihnen.</p>}
          <label>
            Name
            <input name="name" value={form.name} onChange={update} required />
          </label>
          <label>
            E-Mail
            <input type="email" name="email" value={form.email} onChange={update} required />
          </label>
          <label>
            Interesse
            <select name="interest" value={form.interest} onChange={update}>
              <option>Terminbuchungssoftware</option>
              <option>Website</option>
              <option>Website + Terminbuchung</option>
              <option>Individuelle Software</option>
            </select>
          </label>
          <label>
            Nachricht
            <textarea name="message" rows="4" value={form.message} onChange={update} />
          </label>
          <button type="submit" className="btn btn--primary btn--block btn--lg">
            Anfrage senden
          </button>
        </form>
      </div>
    </section>
  );
}
