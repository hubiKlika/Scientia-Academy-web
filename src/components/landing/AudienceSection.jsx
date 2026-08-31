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
    <section className="py-20 md:py-28 bg-foreground text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
            <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed">
              Nasze programy to skondensowana wiedza przygotowująca do konkretnych ról w ekosystemie badań klinicznych.
            </p>

            <div className="mt-12 space-y-8">
              {roles.map((r) => (
                <div key={r.category}>
                  <h4 className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
                    {r.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {r.items.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => {
                          scrollToSection(`#training-${r.trainingId}`);
                        }}
                        className="px-4 py-2 rounded-full text-sm border border-white/15 text-white/70 bg-white/5 hover:border-primary/60 hover:text-white hover:bg-primary/20 transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5">
              <p className="text-sm text-white/60 mb-2">Potrzebujesz indywidualnego szkolenia dla swojego zespołu?</p>
              <a href="mailto:academy@scientiacro.com" className="text-primary font-semibold hover:brightness-125 transition-all text-lg">
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
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden">
              <img
                src={WORKSHOP_IMG}
                alt="Warsztat szkoleniowy Scientia Academy"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="mt-6 inline-flex bg-primary text-primary-foreground rounded-2xl p-6 shadow-2xl">
              <div className="text-3xl font-heading font-bold">5+</div>
              <div className="text-sm text-white/80 mt-1">Programów<br />szkoleniowych</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
