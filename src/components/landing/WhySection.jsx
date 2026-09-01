import { motion } from 'framer-motion';
import { Users, ShieldCheck, Briefcase, Zap } from 'lucide-react';

const features = [
{
  icon: Users,
  title: 'Podejście Interdyscyplinarne',
  desc: 'Kładziemy nacisk na synergię między lekarzem, koordynatorem, pielęgniarką a farmaceutą. Uczymy „jak" współpracować, by eliminować błędy.'
},
{
  icon: ShieldCheck,
  title: 'Zgodność z ICH GCP E6 (R3)',
  desc: 'Nasze programy są w pełni dostosowane do najnowszej aktualizacji standardu ICH GCP E6(R3), dając przewagę regulacyjną i operacyjną.'
},
{
  icon: Briefcase,
  title: 'Eksperci dla Ekspertów',
  desc: 'Nasi trenerzy to praktycy badań klinicznych rozumiejący Twoją rolę. Dla lekarzy POZ — pokazujemy, jak badania kliniczne realnie zwiększają przychody i rozszerzają ofertę przychodni.'
},
{
  icon: Zap,
  title: 'Efektywność zamiast teorii',
  desc: 'Skondensowana wiedza przygotowująca do konkretnych ról w ekosystemie badań. Gotowa do użycia od razu po szkoleniu.'
}];


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' }
  })
};

export default function WhySection() {
  return (
    <section id="why" className="scroll-mt-16 sm:scroll-mt-20 py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">
          
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Dlaczego my</span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl text-foreground tracking-tight">
            Co nas <span className="italic text-primary">wyróżnia</span>?
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            W Scientia Academy wierzymy, że sukces badania klinicznego zależy od sprawnej współpracy całego zespołu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {features.map((f, i) =>
          <div
            key={f.title}
            className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
            
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}
