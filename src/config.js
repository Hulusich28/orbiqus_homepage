// Zentrale Einstellungen der Website

export const CONTACT_MAIL = 'info@orbiqus.de';

/*
  Kontaktformular → E-Mail an info@orbiqus.de über Web3Forms (https://web3forms.com).
  Access Key holen: auf web3forms.com „Create your Access Key“ → info@orbiqus.de eintragen →
  der Schlüssel kommt per Mail. Ihn hier eintragen (oder als Umgebungsvariable VITE_WEB3FORMS_KEY setzen).
  Der Schlüssel darf öffentlich im Code stehen – er erlaubt nur das Senden an info@orbiqus.de.
*/
export const WEB3FORMS_KEY = import.meta.env?.VITE_WEB3FORMS_KEY || 'e8882f23-f352-410a-97e7-eb81893f7293';
