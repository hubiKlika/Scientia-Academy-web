import { motion } from 'framer-motion';
import { ArrowRight, Clock3, BriefcaseBusiness, Video } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll-to-section';

const webinars = [
  {
    month: 'WRZESIEŃ',
    date: '07.09.2026',
    badge: 'NAJBLIŻSZY',
    title: 'Study Coordinator i CTA',
    description: 'Pierwszy krok do branży – dla osób bez doświadczenia w badaniach klinicznych',
    featured: true,
  },
  {
    month: 'WRZESIEŃ',
    date: '21.09.2026',
    title: 'CRA bez mitów',
    description: 'Monitor badań klinicznych – dla myślących o zmianie z ośrodka',
  },
  { month: 'PAŹDZIERNIK' },
  { month: 'LISTOPAD' },
  { month: 'GRUDZIEŃ' },
  { month: 'LUTY' },
];

const details = [
  { icon: Clock3, text: '60 minut · zawsze bezpłatnie' },
  { icon: BriefcaseBusiness, text: 'Jedna rola = konkretne wymagania, realne zadania i widełki' },
  { icon: Video, text: 'Nagranie i materiały dla wszystkich zapisanych' },
];

export default function WebinarsSection() {
  const handleSignupClick = () => {
    scrollToSection('#contact');

    const messageField = document.querySelector('#contact textarea[name="message"]');
    if (messageField && !messageField.value.trim()) {
      messageField.value = 'Chcę zapisać się na bezpłatny webinar: ';
      messageField.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <section className="py-20 md:py-28 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">BEZPŁATNE WEBINARY</span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl text-foreground tracking-tight">Twój Kompas</h2>
          <p className="mt-4 text-lg md:text-xl text-foreground/80">Cykl bezpłatnych webinarów Scientia Academy</p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Sześć spotkań. Konkretne role. Praktyczna wiedza o pracy w badaniach klinicznych.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {webinars.map((webinar, index) => (
            <motion.article
              key={`${webinar.month}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`relative min-h-64 rounded-2xl border p-5 flex flex-col ${
                webinar.featured
                  ? 'bg-primary/10 border-primary shadow-sm'
                  : 'bg-secondary/40 border-border/60'
              }`}
            >
              <div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-primary">{webinar.month}</p>
                  {webinar.date && <p className="mt-1 text-sm font-medium text-foreground">{webinar.date}</p>}
                </div>
                {webinar.badge && (
                  <span className="absolute -top-3 right-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary-foreground shadow-sm">
                    {webinar.badge}
                  </span>
                )}
              </div>

              {webinar.title ? (
                <div className="mt-auto pt-10">
                  <h3 className="font-heading text-xl text-foreground leading-snug">{webinar.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{webinar.description}</p>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center" aria-label="Temat do ogłoszenia">
                  <span className="font-heading text-7xl text-foreground/25">?</span>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl bg-secondary/50 p-6">
          {details.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-foreground/80">
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div className="max-w-3xl">
            <h3 className="font-heading text-2xl text-foreground">
              Chcesz wziąć udział w bezpłatnym webinarze?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Wypełnij formularz kontaktowy i wskaż interesujący Cię webinar. Skontaktujemy się z Tobą i przekażemy szczegóły dotyczące udziału.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignupClick}
            className="flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:self-center"
          >
            Zapisz się na webinar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
