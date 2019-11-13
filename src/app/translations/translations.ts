import englishTranslations from '../translations/en.json'
import germanTranslations from '../translations/de.json'
import croatianTranslations from '../translations/hr.json'

export function translateFunction(key: string, language: string) {
  let translations = {};
  if (language === 'en') {
    translations = englishTranslations;
  }
  else if (language === 'de') {
    translations = germanTranslations;
  }
  else if (language === 'hr') {
    translations = croatianTranslations;
  }
  else {
    translations = englishTranslations;
  }
  return translations[key];
}

export const languages = [
  {
    'language': 'English',
    'langCode': 'en'
  },
  // {
  //   'language': 'German',
  //   'langCode': 'de'
  // },
  {
    'language': 'Croatian',
    'langCode': 'hr'
  }
];
// const translations = {
//   'Language': {
//     'en': 'Language',
//     'de': 'Die Sprache',
//     'hr': 'Jezik'
//   },
//   'Login': {
//     'en': 'Login',
//     'de': 'Anmeldung',
//     'hr': 'Prijava'
//   },
//   'Username': {
//     'en': 'Username',
//     'de': 'Nutzername',
//     'hr': 'Korisničko ime'
//   },
//   'Password': {
//     'en': 'Password',
//     'de': 'Passwort',
//     'hr': 'Lozinka'
//   },
//   'Sign in': {
//     'en': 'Sign in',
//     'de': 'Anmelden',
//     'hr': 'Prijava'
//   },
//   'Don\'t have an account?': {
//     'en': 'Don\'t have an account?',
//     'de': 'Sie haben noch keinen Account?',
//     'hr': 'Nemate račun?'
//   },
//   'Sign up': {
//     'en': 'Sign up',
//     'de': 'Anmelden',
//     'hr': 'Registrirajte se'
//   },
//   'Forgot your password': {
//     'en': 'Forgot your password',
//     'de': 'Passwort vergessen',
//     'hr': 'Zaboravili ste lozinku'
//   },
//   'Register': {
//     'en': 'Register',
//     'de': 'Registrieren',
//     'hr': 'Registracija'
//   },
//   'First name': {
//     'en': 'First name',
//     'de': 'Vorname',
//     'hr': 'Ime'
//   },
//   'Last name': {
//     'en': 'Last name',
//     'de': 'Nachname',
//     'hr': 'Prezime'
//   },
//   'Email': {
//     'en': 'Email',
//     'de': 'Email',
//     'hr': 'Email'
//   },
//   'Birth date': {
//     'en': 'Birth date',
//     'de': 'Geburtsdatum',
//     'hr': 'Datum rođenja'
//   },
//   'Country': {
//     'en': 'Country',
//     'de': 'Land',
//     'hr': 'Država'
//   },
//   'City': {
//     'en': 'City',
//     'de': 'Stadt',
//     'hr': 'Grad'
//   },
//   'Address': {
//     'en': 'Address',
//     'de': 'Adresse',
//     'hr': 'Adresa'
//   },
//   'Male': {
//     'en': 'Male',
//     'de': 'Männlich',
//     'hr': 'Muško'
//   },
//   'Female': {
//     'en': 'Female',
//     'de': 'Weiblich',
//     'hr': 'Žensko'
//   },
//   'Confirm password': {
//     'en': 'Confirm password',
//     'de': 'Passwort bestätigen',
//     'hr': 'Potvrdite lozinku'
//   }
// };
