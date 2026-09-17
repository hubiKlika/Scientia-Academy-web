const webinarSignupUrl = 'https://forms.gle/D5daj4JNS1smzBqH9';

export const webinars = [
  {
    dateISO: '2026-09-21',
    month: 'WRZESIEŃ',
    date: '21.09.2026',
    role: 'CTA & SC',
    title: 'Od tego wszystko się zaczyna: Rola CTA i Site Coordinatora jako fundament kariery.',
    description: 'Pierwszy krok do branży – dla osób bez doświadczenia w badaniach klinicznych',
    registrationUrl: webinarSignupUrl,
  },
  {
    dateISO: '2026-10-27',
    month: 'PAŹDZIERNIK',
    date: '27.10.2026',
    role: 'CRA',
    title: 'W trasie i przed monitorem: Blaski i cienie pracy Monitora Badań Klinicznych.',
    registrationUrl: null,
  },
  {
    dateISO: '2026-11-30',
    month: 'LISTOPAD',
    date: '30.11.2026',
    role: 'Data Management & Biostats',
    title: 'Władcy danych i liczb: Jak DM i Biostatystyka kształtują wyniki badań?',
    registrationUrl: null,
  },
  {
    dateISO: '2026-12-14',
    month: 'GRUDZIEŃ',
    date: '14.12.2026',
    role: 'Regulatory Affairs & QA',
    title: 'Strażnicy procedur: Praca w Regulatory i Quality Assurance (QA) od kulis.',
    registrationUrl: null,
  },
  {
    dateISO: '2027-01-25',
    month: 'STYCZEŃ',
    date: '25.01.2027',
    role: 'SEKTOR PUBLICZNY',
    title: 'Po drugiej stronie lustra: Kariera i rozwój w publicznym sektorze badań klinicznych (URPL i ABM).',
    registrationUrl: null,
  },
  {
    dateISO: '2027-02-22',
    month: 'LUTY',
    date: '22.02.2027',
    role: 'Project Management & Global Study Management',
    title: 'Widok z lotu ptaka: Jak zarządzać projektami w badaniach klinicznych (niekomercyjnych i komercyjnych)',
    registrationUrl: null,
  },
  {
    dateISO: '2027-03-29',
    month: 'MARZEC',
    date: '29.03.2027',
    role: 'lekarz POZ',
    title: 'Pierwsze ogniwo systemu: Jak lekarz POZ otwiera pacjentom drzwi do nowoczesnych terapii.',
    registrationUrl: null,
  },
];

export function getPolandCalendarDateISO(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const dateParts = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

export function getUpcomingWebinars(currentDateISO = getPolandCalendarDateISO()) {
  return webinars
    .filter((webinar) => webinar.dateISO >= currentDateISO)
    .sort((first, second) => first.dateISO.localeCompare(second.dateISO));
}
