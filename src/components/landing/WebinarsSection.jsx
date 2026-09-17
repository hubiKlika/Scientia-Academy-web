import { motion } from 'framer-motion';
import { ArrowRight, Clock3, BriefcaseBusiness, Video } from 'lucide-react';
import { getUpcomingWebinars } from '@/data/webinars';
import WebinarPopup from './WebinarPopup';

const details = [
  { icon: Clock3, text: '60 minut · zawsze bezpłatnie' },
  { icon: BriefcaseBusiness, text: 'Jedna rola = konkretne wymagania, realne zadania i widełki' },
  { icon: Video, text: 'Nagranie i materiały dla wszystkich zapisanych' },
];

export default function WebinarsSection() {
  const upcomingWebinars = getUpcomingWebinars();
  const nearestWebinar = upcomingWebinars[0] ?? null;

  return (
    <>
      <section id="webinars" className="scroll-mt-16 sm:scroll-mt-20 py-16 md:py-24 bg-card overflow-hidden">
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
              Siedem spotkań. Konkretne role. Praktyczna wiedza o pracy w badaniach klinicznych.
            </p>
          </motion.div>

          {upcomingWebinars.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingWebinars.map((webinar, index) => {
                const isNearest = index === 0;

                return (
                  <motion.article
              key={webinar.date}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                isNearest
                  ? 'bg-primary/10 border-primary shadow-sm'
                  : 'bg-secondary/40 border-border/60'
              }`}
            >
              <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${isNearest ? 'pr-16' : ''}`}>
                <span className="text-[11px] font-semibold tracking-[0.14em] text-primary">{webinar.month}</span>
                <span className="text-xs text-muted-foreground" aria-hidden="true">·</span>
                <span className="text-sm font-semibold tabular-nums text-foreground">{webinar.date}</span>
              </div>
              {isNearest && (
                <span className="absolute -top-3 right-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary-foreground shadow-sm">
                  NAJBLIŻSZY
                </span>
              )}

              <div className="flex flex-1 flex-col pt-6">
                <p className="max-w-full self-start rounded-md bg-primary/[0.08] px-2.5 py-1 text-[10px] font-medium leading-relaxed text-primary">
                  {webinar.role}
                </p>
                <h3 className="mt-4 font-heading text-xl font-medium leading-[1.3] text-foreground">{webinar.title}</h3>
                {webinar.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{webinar.description}</p>
                )}

                <div className="mt-auto pt-6">
                  {webinar.registrationUrl ? (
                    <a
                      href={webinar.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Zapisz się na webinar
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden="true" />
                      Zapisy wkrótce
                    </span>
                  )}
                </div>
              </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-border/60 bg-secondary/40 px-6 py-12 text-center">
              <p className="font-heading text-xl text-foreground">Nowe terminy webinarów już wkrótce.</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl bg-secondary/50 p-6">
            {details.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-foreground/80">
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WebinarPopup webinar={nearestWebinar} />
    </>
  );
}
