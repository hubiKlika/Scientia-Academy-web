import { motion } from 'framer-motion';
import { Building2, User, Shield, TrendingDown, FileText, Award, Wrench, Rocket } from 'lucide-react';

const b2b = [
  { icon: Shield, title: 'Bezpieczeństwo Regulacyjne', desc: 'Twój zespół pracuje zgodnie z ICH GCP R3 – minimalne ryzyko przy audytach i inspekcjach.' },
  { icon: TrendingDown, title: 'Optymalizacja Kosztów', desc: 'Szkolenia "w pigułce" zastępują długotrwałe kursy, dostarczając operacyjną wiedzę.' },
  { icon: FileText, title: 'Gotowe Standardy (SOP)', desc: 'Pomagamy przełożyć teorię na gotowe ścieżki postępowania w Twojej organizacji.' },
];

const b2c = [
  { icon: Award, title: 'Przewaga na rynku pracy', desc: 'Certyfikat Scientia Academy to znak jakości rozpoznawalny przez Sponsorów i CRO.' },
  { icon: Wrench, title: 'Praktyka zamiast slajdów', desc: 'Uczymy na realnych case-studies i narzędziach (jak CTIS), nie na suchych aktach prawnych.' },
  { icon: Rocket, title: 'Szybkie przebranżowienie', desc: 'Skutecznie przygotowujemy do wejścia w świat badań klinicznych.' },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="scroll-mt-16 sm:scroll-mt-20 py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Korzyści</span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl text-foreground tracking-tight">
            Co <span className="italic text-primary">zyskujesz</span>?
          </h2>
        </motion.div>



        {/* B2B */}
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-semibold text-foreground">Dla Instytucji i Sponsorów</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2b.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <b.icon className="w-8 h-8 text-primary mb-5" />
                <h4 className="text-lg font-semibold text-foreground mb-2">{b.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* B2C */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-semibold text-foreground">Dla Uczestników Indywidualnych</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2c.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <b.icon className="w-8 h-8 text-primary mb-5" />
                <h4 className="text-lg font-semibold text-foreground mb-2">{b.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
