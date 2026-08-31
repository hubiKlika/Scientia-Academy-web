import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll-to-section';

const trainings = [
  {
    number: '01',
    title: 'Certyfikowane ICH-GCP E6(R3)',
    subtitle: 'Nowa Perspektywa Zarządzania Badaniami Klinicznymi',
    desc: 'Obowiązkowa aktualizacja wiedzy dla każdego profesjonalisty. Skupiamy się na kluczowych zmianach standardu R3, nowoczesnym podejściu do dokumentacji i nowych definicjach odpowiedzialności.',
    audience: 'Doświadczone zespoły (re-certyfikacja) oraz osoby debiutujące',
    duration: '6-8h (1 dzień)',
    format: 'Stacjonarna lub online (live)',
  },
  {
    number: '02',
    title: 'Interdyscyplinarna Akademia',
    subtitle: 'Zarządzanie Ośrodkiem i Zespołem (PI, SN & Farmaceuta)',
    desc: 'Pierwszy w Polsce program oparty na symulatorze Ośrodka Badawczego. Kluczowe spotkania i symulacje audytu prowadzone w języku angielskim.',
    audience: 'Lekarze (aspirujący PI), Pielęgniarki (Study Nurse), Farmaceuci',
    duration: '30h (3,5 tygodnia)',
    format: 'Stacjonarnie (warsztaty) + Online (wykłady)',
  },
  {
    number: '03',
    title: 'Akademia Kariery',
    subtitle: 'Profesjonalny Program CRA & Site Coordinator',
    desc: 'Intensywny program przygotowujący do profesjonalnej pracy w badaniach klinicznych. Zajęcia teoretyczne prowadzone są w trybie wieczorowym, a warsztaty praktyczne odbywają się w weekend - w pełni stacjonarnie.',
    audience: 'Osoby przebranżawiające się do badań klinicznych',
    duration: '48h (6 tygodni)',
    format: 'Stacjonarnie (warsztaty) + Online (wykłady)',
  },
  {
    number: '04',
    title: 'Ekspert CWBK',
    subtitle: 'Operacyjna Precyzja i Efektywność Biznesowa (GCP R3 & EU CTR)',
    desc: 'Program integrujący wymogi regulacyjne GCP R3 i EU CTR z zarządzaniem finansowym ośrodka. Uczymy wyceny kosztów utrzymania gotowości ośrodka i nakładów pracy nieklinicznej.',
    audience: 'Dyrekcja, kadra zarządzająca CWBK, właściciele sieci SMO',
    duration: 'Sprint: 3 dni / Akademia: 12 mies.',
    format: 'Stacjonarna + Online (Mentoring)',
  },
  {
    number: '05',
    title: 'POZ jako partner badań klinicznych',
    subtitle: 'Praktyczny webinar dla przychodni',
    desc: 'Skoncentrowane szkolenie, które przekształca przychodnię w świadomego uczestnika ekosystemu badań klinicznych.',
    audience: 'Lekarze POZ, pielęgniarki, koordynatorzy',
    duration: '2h (webinar live)',
    format: 'Online + Pakiet Edukacyjny POZ',
  },
];

export default function TrainingsSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="trainings" className="scroll-mt-16 sm:scroll-mt-20 py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Portfolio</span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl text-foreground tracking-tight">
            Nasze <span className="italic text-primary">szkolenia</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Kompleksowa oferta szkoleniowa dopasowana do każdego poziomu doświadczenia i roli w badaniach klinicznych.
          </p>
        </motion.div>

        <div className="space-y-6">
          {trainings.map((t) => (
            <div
              key={t.number}
              id={`training-${t.number}`}
              className="group bg-card rounded-2xl border border-border/50 p-8 md:p-10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                <div className="flex-shrink-0">
                  <span className="text-5xl md:text-6xl font-heading font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {t.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">{t.title}</h3>
                  <p className="text-primary font-medium mt-1 text-sm">{t.subtitle}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{t.desc}</p>
                  <p className="mt-3 text-sm text-foreground/70">
                    <span className="font-medium text-foreground">Dla kogo: </span>
                    {t.audience}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {t.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {t.format}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start lg:self-center">
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === t.number ? null : t.number)}
                    className="inline-flex w-[116px] justify-center items-center gap-2 px-6 py-3 bg-foreground text-white text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    {expanded === t.number ? 'Zwiń' : 'Agenda'}
                    {expanded === t.number ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {expanded === t.number && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Pełna agenda, szczegółowy program i cennik dostępne po kontakcie z nami.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:brightness-110 transition-all"
                  >
                    Zapytaj o szczegóły i cennik
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
