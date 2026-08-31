import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll-to-section';

const LOGO_URL = "/images/logoscientiaacademy.jpeg";

const navLinks = [
  { label: 'Dlaczego my', href: '#why' },
  { label: 'Szkolenia', href: '#trainings' },
  { label: 'Korzyści', href: '#benefits' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const topBarRef = useRef(null);

  const scrollTo = (href) => {
    setOpen(false);
    scrollToSection(href, { offset: topBarRef.current?.offsetHeight ?? 64 });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-border/50">
      <div ref={topBarRef} className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <img
          src={LOGO_URL}
          alt="Scientia Academy"
          style={{height: '44px', width: 'auto', maxWidth: '180px', objectFit: 'contain'}}
        />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="px-6 py-2.5 bg-foreground text-white text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
          >
            Zapytaj o szkolenie
          </button>
        </div>

        {/* Mobile toggle */}
        <button type="button" onClick={() => setOpen((currentOpen) => !currentOpen)} className="md:hidden p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-sm"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="mt-2 px-6 py-3 bg-foreground text-white text-sm font-medium rounded-full"
              >
                Zapytaj o szkolenie
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
