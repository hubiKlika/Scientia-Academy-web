import { motion } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll-to-section';

const WORKSHOP_IMG = "/images/zdjaiscientiaacademy.png";

const roles = [
  {
    category: 'Sponsor & CRO',
    trainingId: '01',
    items: ['Monitor Badań Klinicznych (CRA)', 'Clinical Trial Assistant (CTA)', 'Start-up Specialist', 'Quality Assurance (QA)'],
  },
  {
    category: 'Ośrodek Badawczy & CWBK',
    trainingId: '02',
    items: ['Główny Badacz (PI)', 'Koordynator Badań (SC)', 'Pielęgniarka Badawcza (SN)', 'Farmaceuta'],
  },
  {
    category: 'Dla aspirujących',
    trainingId: '03',
    items: ['Specjaliści z branży medycznej', 'Osoby z branży farmaceutycznej', 'Osoby przebranżawiające się'],
  },
];

export default function AudienceSection() {
  return (
    <section id="audience" className="scroll-mt-16 bg-foreground py-12 text-white sm:scroll-mt-20 md:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-medium text-primary tracking-widest uppercase">Dla kogo</span>
            <h2 className="mt-4 font-heading text-2xl sm:text-4xl md:text-5xl tracking-tight leading-snug">
              Szkolenia dla <span className="italic text-primary">każdej roli</span>
            </h2>
            <p className="mt-3 max-w-2xl text-white/60 text-base sm:text-lg leading-relaxed">
              Nasze programy to skondensowana wiedza przygotowująca do konkretnych ról w ekosystemie badań klinicznych.
            </p>

            <div className="mt-7 grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((r) => (
                <div key={r.category} className="border-t border-white/10 pt-3.5">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {r.category}
                  </h4>
                  <ul className="space-y-0.5">
                    {r.items.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            scrollToSection(`#training-${r.trainingId}`);
                          }}
                          className="group/item flex min-h-9 w-full items-start gap-2.5 py-1.5 text-left text-sm leading-5 text-white/65 transition-colors hover:text-white"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80 transition-transform group-hover/item:scale-125" aria-hidden="true" />
                          <span>{item}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-1 border-t border-primary/20 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <p className="text-sm text-white/60">Potrzebujesz indywidualnego szkolenia dla swojego zespołu?</p>
              <a href="mailto:academy@scientiacro.com" className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-primary transition-all hover:brightness-125">
                academy@scientiacro.com
              </a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
            className="relative lg:self-stretch lg:min-h-[380px]"
          >
            <div className="relative overflow-hidden rounded-2xl lg:h-full">
              <img
                src={WORKSHOP_IMG}
                alt="Warsztat szkoleniowy Scientia Academy"
                className="aspect-[16/10] w-full object-cover lg:h-full lg:aspect-auto"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/15 bg-foreground/85 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5">
                <div className="text-2xl font-heading font-bold text-primary">5+</div>
                <div className="text-xs leading-tight text-white/75">Programów<br />szkoleniowych</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
