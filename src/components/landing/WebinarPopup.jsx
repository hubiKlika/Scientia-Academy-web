import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock3, X } from 'lucide-react';

const popupSessionKey = 'scientiaWebinarPopupShown';
const popupDelay = 1200;

export default function WebinarPopup({ webinar }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!webinar) return undefined;

    try {
      if (sessionStorage.getItem(popupSessionKey)) return undefined;
    } catch {
      // The popup can still work when browser storage is unavailable.
    }

    const timer = window.setTimeout(() => {
      previousFocusRef.current = document.activeElement;

      try {
        sessionStorage.setItem(popupSessionKey, 'true');
      } catch {
        // Storage restrictions must not prevent the popup from opening.
      }

      setIsOpen(true);
    }, popupDelay);

    return () => window.clearTimeout(timer);
  }, [webinar]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!webinar) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/25 p-5 backdrop-blur-[2px] sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="webinar-popup-title"
            aria-describedby="webinar-popup-description"
            className="relative w-full max-w-lg rounded-2xl border border-primary/20 bg-[#fffaf1] p-6 text-foreground shadow-2xl shadow-foreground/15 sm:p-8"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Zamknij popup webinaru"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="pr-10 text-xs font-semibold tracking-[0.16em] text-primary">BEZPŁATNY WEBINAR</p>
            <p className="mt-5 text-sm font-medium text-muted-foreground">Najbliższy webinar</p>
            <p className="mt-1 text-base font-semibold tabular-nums text-foreground">{webinar.date}</p>
            <h2 id="webinar-popup-title" className="mt-4 pr-2 font-heading text-2xl leading-snug text-foreground sm:text-3xl">
              {webinar.title}
            </h2>

            {webinar.registrationUrl ? (
              <div id="webinar-popup-description" className="mt-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Zarezerwuj swoje miejsce na najbliższe spotkanie.
                </p>
                <a
                  href={webinar.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Zapisz się na webinar
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <p id="webinar-popup-description" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock3 className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
                Zapisy wkrótce
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
