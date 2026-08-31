import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import WhySection from '../components/landing/WhySection';
import TrainingsSection from '../components/landing/TrainingsSection';
import WebinarsSection from '../components/landing/WebinarsSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import AudienceSection from '../components/landing/AudienceSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhySection />
      <TrainingsSection />
      <WebinarsSection />
      <BenefitsSection />
      <AudienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
