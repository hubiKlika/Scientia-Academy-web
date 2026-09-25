import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, BriefcaseBusiness, Video } from 'lucide-react';
import { getWebinarTimeline } from '@/data/webinars';
import WebinarPopup from './WebinarPopup';

const details = [
  { icon: Clock3, text: '60 minut · zawsze bezpłatnie' },
  { icon: BriefcaseBusiness, text: 'Jedna rola = konkretne wymagania, realne zadania i widełki' },
  { icon: Video, text: 'Nagranie i materiały dla wszystkich zapisanych' },
];

function WebinarCard({ webinar, currentDateISO, nearestWebinar, animationDelay }) {
  const isPast = webinar.dateISO < currentDateISO;
  const isNearest = webinar.dateISO === nearestWebinar?.dateISO;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: animationDelay }}
      className={`relative flex flex-col rounded-2xl border p-6 ${
        isNearest
          ? 'bg-primary/10 border-primary shadow-sm'
          : isPast
            ? 'bg-muted/45 border-border/60'
            : 'bg-secondary/40 border-border/60'
      }`}
    >
      <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${isNearest ? 'pr-16' : ''}`}>
        <span className={`text-[11px] font-semibold tracking-[0.14em] ${isPast ? 'text-muted-foreground' : 'text-primary'}`}>{webinar.month}</span>
        <span className="text-xs text-muted-foreground" aria-hidden="true">·</span>
        <span className={`text-sm font-semibold tabular-nums ${isPast ? 'text-foreground/65' : 'text-foreground'}`}>{webinar.date}</span>
      </div>
      {isNearest && (
        <span className="absolute -top-3 right-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary-foreground shadow-sm">
          NAJBLIŻSZY
        </span>
      )}
      {isPast && (
        <span className="absolute -top-3 right-3 rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-bold tracking-wider text-muted-foreground">
          ZAKOŃCZONY
        </span>
      )}

      <div className="flex flex-1 flex-col pt-6">
        <p className={`max-w-full self-start rounded-md px-2.5 py-1 text-[10px] font-medium leading-relaxed ${
          isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/[0.08] text-primary'
        }`}>
          {webinar.role}
        </p>
        <h3 className={`mt-4 font-heading text-xl font-medium leading-[1.3] ${isPast ? 'text-foreground/75' : 'text-foreground'}`}>{webinar.title}</h3>
        {webinar.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{webinar.description}</p>
        )}

        <div className="mt-auto pt-6">
          {isPast ? (
            <span className="text-xs font-medium text-muted-foreground">Webinar zakończony</span>
          ) : webinar.registrationUrl ? (
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
}

export default function WebinarsSection() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const { currentDateISO, mainWebinars, archivedWebinars, nearestWebinar } = getWebinarTimeline();

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

          {mainWebinars.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mainWebinars.map((webinar, index) => (
                <WebinarCard
                  key={webinar.dateISO}
                  webinar={webinar}
                  currentDateISO={currentDateISO}
                  nearestWebinar={nearestWebinar}
                  animationDelay={index * 0.06}
                />
              ))}
            </div>
          )}

          {archivedWebinars.length > 0 && (
            <div className="mt-7">
              <div className="flex justify-center">
                <button
                  type="button"
                  aria-expanded={isArchiveOpen}
                  aria-controls="webinar-archive"
                  onClick={() => setIsArchiveOpen((isOpen) => !isOpen)}
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  {isArchiveOpen
                    ? 'Ukryj poprzednie webinary'
                    : `Poprzednie webinary · ${archivedWebinars.length}`}
                  <span aria-hidden="true">{isArchiveOpen ? '↑' : '↓'}</span>
                </button>
              </div>

              {isArchiveOpen && (
                <motion.div
                  id="webinar-archive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {archivedWebinars.map((webinar, index) => (
                    <WebinarCard
                      key={webinar.dateISO}
                      webinar={webinar}
                      currentDateISO={currentDateISO}
                      nearestWebinar={nearestWebinar}
                      animationDelay={Math.min(index, 6) * 0.04}
                    />
                  ))}
                </motion.div>
              )}
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
