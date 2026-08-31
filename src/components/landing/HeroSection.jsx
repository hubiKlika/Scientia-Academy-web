import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll-to-section';

const HERO_BG = "/images/tloscientia.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, rgba(30,80,140,0.72) 0%, rgba(20,60,110,0.65) 50%, rgba(15,45,90,0.82) 100%)'}} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <p className="text-sm text-white/60 tracking-widest uppercase">
            Zgodność z ICH GCP E6 (R3) · Gotowi na zmiany
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-tight tracking-tight"
        >
          Łączymy role,{' '}
          <span className="italic text-primary">budujemy</span>{' '}
          standardy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Sukces badania klinicznego zależy od sprawnej współpracy całego zespołu. 
          Dostarczamy wiedzę gotową do użycia od razu po wyjściu z sali szkoleniowej.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection('#trainings')}
            className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full text-base hover:brightness-110 transition-all shadow-lg shadow-primary/30"
          >
            Poznaj ofertę szkoleń
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full text-base border border-white/20 hover:bg-white/20 transition-all"
          >
            Zapytaj o szczegóły
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#why')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
