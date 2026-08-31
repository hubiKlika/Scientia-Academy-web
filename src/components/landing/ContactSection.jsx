import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, ArrowRight, ChevronDown } from 'lucide-react';

export default function ContactSection() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        alert("Formularz został wysłany. Dziękujemy za kontakt — odezwiemy się wkrótce.");
        form.reset();
      })
      .catch((error) => alert("Błąd: " + error));
  };

  return (
    <section id="contact" className="scroll-mt-16 sm:scroll-mt-20 py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary tracking-widest uppercase">Kontakt</span>
            <h2 className="mt-4 font-heading text-3xl md:text-5xl text-foreground tracking-tight">
              Chcesz poznać <span className="italic text-primary">szczegóły</span>?
            </h2>

            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Zostaw kontakt, a prześlemy Ci szczegółową ofertę i cennik.
            </p>

            <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground/70 leading-relaxed italic">
                Po otrzymaniu wiadomości skontaktujemy się z Tobą i prześlemy szczegóły oferty.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:academy@scientiacro.com" className="hover:text-primary transition-colors">
                academy@scientiacro.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <form
              name="kontakt"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl border border-border/50 p-8 md:p-10 shadow-sm space-y-6"
            >
              <input type="hidden" name="form-name" value="kontakt" />
              <input type="hidden" name="bot-field" />

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Imię i nazwisko
                </label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                  placeholder="Jan Kowalski"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Adres e-mail
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                  placeholder="jan@firma.pl"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Reprezentuję
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                >
                  <option value="">Wybierz...</option>
                  <option value="Ośrodek Badawczy">Ośrodek Badawczy</option>
                  <option value="CWBK">CWBK</option>
                  <option value="Firma Farmaceutyczna / CRO">Firma Farmaceutyczna / CRO</option>
                  <option value="Osoba Indywidualna">Osoba Indywidualna</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Wiadomość
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                  placeholder="Napisz, o jakie szkolenie chcesz zapytać"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full"
              >
                Poproś o ofertę
                <ArrowRight className="w-5 h-5" />
              </button>

            </form>

            <div className="mt-5 rounded-2xl border border-border/60 bg-card/60 p-5 text-xs leading-relaxed text-muted-foreground">
              <h3 className="font-semibold text-foreground">Informacja o przetwarzaniu danych osobowych</h3>
              <p className="mt-3">
                Administratorem Państwa danych osobowych jest SCIENTIA CRO Sp. z o.o., ul. Michała Kleofasa Ogińskiego 2, 85-092 Bydgoszcz. Dane podane w formularzu (imię i nazwisko, adres e-mail oraz treść wiadomości) będą przetwarzane w celu udzielenia odpowiedzi na przesłane zapytanie oraz obsługi zgłoszenia dotyczącego szkoleń lub webinarów, zgodnie z art. 6 ust. 1 lit. b lub lit. f RODO. Podanie danych jest dobrowolne, lecz niezbędne do udzielenia odpowiedzi. Przysługuje Państwu prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu oraz skargi do Prezesa UODO. W sprawach dotyczących przetwarzania danych można skontaktować się z Inspektorem Ochrony Danych pod adresem: kopacki@partnersystem.info.
              </p>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen((isOpen) => !isOpen)}
                aria-expanded={isPrivacyOpen}
                aria-controls="full-privacy-information"
                className="mt-3 flex items-center gap-1.5 text-left font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                {isPrivacyOpen ? 'Ukryj pełną klauzulę informacyjną' : 'Pokaż pełną klauzulę informacyjną'}
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${isPrivacyOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isPrivacyOpen && (
                  <motion.div
                    id="full-privacy-information"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 border-t border-border/60 pt-5">
                      <h4 className="font-heading text-base text-foreground">
                        Klauzula informacyjna RODO – formularz kontaktowy dotyczący szkoleń i webinarów
                      </h4>
                      <p className="mt-4">Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. („RODO”) informujemy, że:</p>
                      <ol className="mt-4 list-decimal space-y-3 pl-5 marker:font-medium marker:text-foreground">
                        <li>Administratorem Państwa danych osobowych jest SCIENTIA CRO Sp. z o.o., ul. Michała Kleofasa Ogińskiego 2, 85-092 Bydgoszcz.</li>
                        <li>Administrator wyznaczył Inspektora Ochrony Danych, z którym można skontaktować się pod adresem e-mail: kopacki@partnersystem.info.</li>
                        <li>
                          Dane osobowe podane w formularzu kontaktowym (imię i nazwisko, adres e-mail oraz treść wiadomości) będą przetwarzane:
                          <ul className="mt-2 space-y-2 pl-1">
                            <li>– w celu udzielenia odpowiedzi na przesłane zapytanie oraz prowadzenia korespondencji – na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora polegający na obsłudze korespondencji);</li>
                            <li>– jeżeli zapytanie dotyczy udziału w szkoleniu lub webinarze albo zmierza do zawarcia umowy – również na podstawie art. 6 ust. 1 lit. b RODO.</li>
                          </ul>
                        </li>
                        <li>Podanie danych jest dobrowolne, jednak ich niepodanie uniemożliwi udzielenie odpowiedzi lub kontakt.</li>
                        <li>Dane mogą być przekazywane podmiotom świadczącym na rzecz Administratora usługi informatyczne, hostingowe, pocztowe oraz inne usługi wspierające działalność Administratora, wyłącznie na podstawie zawartych umów powierzenia przetwarzania danych.</li>
                        <li>Dane będą przechowywane przez okres niezbędny do prowadzenia korespondencji, a następnie przez okres wynikający z przepisów prawa lub do czasu przedawnienia ewentualnych roszczeń.</li>
                        <li>
                          Przysługuje Państwu prawo:
                          <ul className="mt-2 space-y-1 pl-1">
                            <li>– dostępu do danych,</li>
                            <li>– ich sprostowania,</li>
                            <li>– usunięcia,</li>
                            <li>– ograniczenia przetwarzania,</li>
                            <li>– wniesienia sprzeciwu wobec przetwarzania opartego na art. 6 ust. 1 lit. f RODO,</li>
                            <li>– przenoszenia danych – w przypadkach przewidzianych przepisami.</li>
                          </ul>
                        </li>
                        <li>Przysługuje również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
                        <li>Dane nie będą wykorzystywane do podejmowania decyzji w sposób zautomatyzowany ani do profilowania.</li>
                      </ol>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
