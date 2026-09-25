const webinarSignupUrl = 'https://forms.gle/D5daj4JNS1smzBqH9';
const mainWebinarLimit = 7;
const maxTestWebinars = 200;
const testWebinarMonths = [
  'STYCZEŃ',
  'LUTY',
  'MARZEC',
  'KWIECIEŃ',
  'MAJ',
  'CZERWIEC',
  'LIPIEC',
  'SIERPIEŃ',
  'WRZESIEŃ',
  'PAŹDZIERNIK',
  'LISTOPAD',
  'GRUDZIEŃ',
];

export const webinars = [
  {
    dateISO: '2026-09-21',
    month: 'WRZESIEŃ',
    date: '21.09.2026',
    role: 'CTA & SC',
    title: 'Od tego wszystko się zaczyna: Rola CTA i Koordynatora Ośrodka jako fundament kariery.',
    description: 'Pierwszy krok do branży – dla osób bez doświadczenia w badaniach klinicznych',
    registrationUrl: webinarSignupUrl,
  },
  {
    dateISO: '2026-10-27',
    month: 'PAŹDZIERNIK',
    date: '27.10.2026',
    role: 'CRA',
    title: 'W trasie i przed monitorem: Blaski i cienie pracy Monitora Badań Klinicznych.',
    registrationUrl: 'https://forms.gle/hSukxsVuff7KFnNn7',
  },
  {
    dateISO: '2026-11-30',
    month: 'LISTOPAD',
    date: '30.11.2026',
    role: 'Data Management & Biostats',
    title: 'Władcy danych i liczb: Jak DM i Biostatystyka kształtują wyniki badań?',
    registrationUrl: 'https://forms.gle/Mp2ufvWmJYZ4DZZo7',
  },
  {
    dateISO: '2026-12-14',
    month: 'GRUDZIEŃ',
    date: '14.12.2026',
    role: 'Regulatory Affairs & QA',
    title: 'Strażnicy procedur: Praca w Regulatory i Quality Assurance (QA) od kulis.',
    registrationUrl: 'https://forms.gle/C6W7xoRSbDLs5aGW7',
  },
  {
    dateISO: '2027-01-25',
    month: 'STYCZEŃ',
    date: '25.01.2027',
    role: 'SEKTOR PUBLICZNY',
    title: 'Po drugiej stronie lustra: Kariera i rozwój w publicznym sektorze badań klinicznych (URPL i ABM).',
    registrationUrl: 'https://forms.gle/jce7YA2FWWTodKLy6',
  },
  {
    dateISO: '2027-02-22',
    month: 'LUTY',
    date: '22.02.2027',
    role: 'Project Management & Global Study Management',
    title: 'Widok z lotu ptaka: Jak zarządzać projektami w badaniach klinicznych (niekomercyjnych i komercyjnych)',
    registrationUrl: 'https://forms.gle/tcaYz4N3aDYh3kY1A',
  },
  {
    dateISO: '2027-03-29',
    month: 'MARZEC',
    date: '29.03.2027',
    role: 'lekarz POZ',
    title: 'Pierwsze ogniwo systemu: Jak lekarz POZ otwiera pacjentom drzwi do nowoczesnych terapii.',
    registrationUrl: 'https://forms.gle/SBTDjp7uJHFGJS7V7',
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

function isValidDateISO(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
}

function getDevSearchParams() {
  if (import.meta.env?.DEV !== true || typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search);
}

export function getCurrentWebinarDateISO() {
  const testDate = getDevSearchParams()?.get('testDate');

  return testDate && isValidDateISO(testDate) ? testDate : getPolandCalendarDateISO();
}

function getTimelineWebinars() {
  const testWebinars = getDevSearchParams()?.get('testWebinars');

  if (!/^[1-9]\d*$/.test(testWebinars ?? '')) return webinars;

  const targetCount = Number(testWebinars);
  if (!Number.isSafeInteger(targetCount) || targetCount > maxTestWebinars || targetCount <= webinars.length) {
    return webinars;
  }

  const latestDateISO = webinars.reduce(
    (latestDate, webinar) => webinar.dateISO > latestDate ? webinar.dateISO : latestDate,
    webinars[0].dateISO,
  );
  const [latestYear, latestMonth] = latestDateISO.split('-').map(Number);
  const latestMonthIndex = latestYear * 12 + latestMonth - 1;

  const generatedWebinars = Array.from({ length: targetCount - webinars.length }, (_, index) => {
    const monthIndex = latestMonthIndex + index + 1;
    const year = Math.floor(monthIndex / 12);
    const month = monthIndex % 12 + 1;
    const monthPadded = String(month).padStart(2, '0');
    const testNumber = webinars.length + index + 1;

    return {
      dateISO: `${year}-${monthPadded}-15`,
      month: testWebinarMonths[month - 1],
      date: `15.${monthPadded}.${year}`,
      role: 'WEBINAR TESTOWY',
      title: `Testowy webinar ${String(testNumber).padStart(2, '0')}`,
      description: 'Dane testowe DEV-only do weryfikacji Kompasu Webinarów.',
      registrationUrl: null,
    };
  });

  return [...webinars, ...generatedWebinars];
}

function getWebinarDisplayGroups(upcoming, past) {
  const pastSlots = Math.max(mainWebinarLimit - upcoming.length, 0);
  const mainPastStart = Math.max(past.length - pastSlots, 0);
  const mainPast = past.slice(mainPastStart);

  return {
    mainWebinars: [...upcoming, ...mainPast],
    archivedWebinars: past.slice(0, mainPastStart).reverse(),
  };
}

export function getWebinarTimeline(currentDateISO = getCurrentWebinarDateISO()) {
  const sortByDate = (first, second) => first.dateISO.localeCompare(second.dateISO);
  const timelineWebinars = getTimelineWebinars();
  const upcoming = timelineWebinars.filter((webinar) => webinar.dateISO >= currentDateISO).sort(sortByDate);
  const past = timelineWebinars.filter((webinar) => webinar.dateISO < currentDateISO).sort(sortByDate);
  const { mainWebinars, archivedWebinars } = getWebinarDisplayGroups(upcoming, past);

  return {
    currentDateISO,
    mainWebinars,
    archivedWebinars,
    nearestWebinar: upcoming[0] ?? null,
  };
}
