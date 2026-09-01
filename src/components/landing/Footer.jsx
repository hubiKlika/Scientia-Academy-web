const LOGO_URL = "/images/logoscientiaacademy.jpeg";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Scientia Academy" style={{height: '50px', width: 'auto', maxWidth: '200px', objectFit: 'contain'}} />
          </div>
          <p className="text-sm text-center md:text-right leading-relaxed">
            Scientia Academy - Twój partner w świecie nowoczesnych badań klinicznych.
            <br />
            <span className="text-white/30">academy@scientiacro.com</span>
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Scientia Academy. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
