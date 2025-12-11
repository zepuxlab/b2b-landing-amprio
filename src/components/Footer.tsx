import { Phone, Mail, Instagram, Facebook, Linkedin, MapPin, Youtube } from "lucide-react";

const Footer = () => {
  // Функция для плавной прокрутки с easing
  const smoothScrollTo = (target: number, duration: number) => {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("get-offer");
    if (formElement) {
      const headerHeight = 65; // Высота header (h-18 = 72px + padding) + дополнительный offset
      const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      // Плавная прокрутка с easing функцией
      smoothScrollTo(offsetPosition, 400);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 65; // Высота header (h-18 = 72px + padding) + дополнительный offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      // Плавная прокрутка с easing функцией
      smoothScrollTo(offsetPosition, 400);
    }
  };

  return (
    <footer className="bg-primary scroll-section-content relative overflow-hidden">
      {/* Pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
        style={{
          backgroundImage: `url('/b2b/images/pattern-brand.svg')`,
          backgroundSize: '865px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0'
        }}
      />
      
      <div className="container mx-auto max-w-[1440px] px-3 md:px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20">
            {/* Left - Logo & Description */}
            <div className="md:w-[320px] lg:w-[380px]">
              <img 
                src="/b2b/images/AM_logo_mini.svg" 
                alt="Amprio Milano" 
                className="h-14 md:h-18 w-auto mb-5 brightness-0 invert" 
              />
              <p className="text-primary-foreground/70 leading-relaxed mb-5" style={{ fontSize: '16.5px' }}>
                Premium Italian tableware and décor for hotels, restaurants, and hospitality venues.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:scale-110 transition-all"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-primary-foreground">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/horeca_amprio?igsh=ZjVrcWRieTN4bHB1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" strokeWidth={1.2} />
                </a>
                <a
                  href="https://www.facebook.com/p/Amprio-Milano-61568074090059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" strokeWidth={1.2} />
                </a>
                <a
                  href="https://www.linkedin.com/company/amprio-milano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:scale-110 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" strokeWidth={1.2} />
                </a>
                <a
                  href="https://www.youtube.com/@Amprio_Milano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:scale-110 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" strokeWidth={1.2} />
                </a>
              </div>
            </div>
            
            {/* Right Side - Links, Contact, Partnership */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              {/* Quick Links */}
              <div>
                <h4 className="text-primary-foreground mb-5 font-medium uppercase tracking-wider" style={{ fontSize: '16px' }}>
                  Quick Links
                </h4>
                <nav className="space-y-3">
                  <button
                    onClick={() => scrollToSection("collections")}
                    className="block text-left text-primary-foreground/70 hover:text-primary-foreground transition-colors w-full"
                    style={{ fontSize: '16.5px' }}
                  >
                    Collections
                  </button>
                  <button
                    onClick={() => scrollToSection("brands")}
                    className="block text-left text-primary-foreground/70 hover:text-primary-foreground transition-colors w-full"
                    style={{ fontSize: '16.5px' }}
                  >
                    Brands
                  </button>
                  <a
                    href="https://ampriomilano.com/s/fromb2b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    style={{ fontSize: '16.5px' }}
                  >
                    Go to Shopping
                  </a>
                </nav>
              </div>
              
              {/* Contact Info */}
              <div>
                <h4 className="text-primary-foreground mb-5 font-medium uppercase tracking-wider" style={{ fontSize: '16px' }}>
                  Contact Us
                </h4>
                <div className="space-y-3">
                  <a
                    href="mailto:info@amprio.ae"
                    className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                    style={{ fontSize: '16.5px' }}
                  >
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                    <span>info@amprio.ae</span>
                  </a>
                  <a
                    href="tel:+971501234567"
                    className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                    style={{ fontSize: '16.5px' }}
                  >
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                    <span>+971 50 123 4567</span>
                  </a>
                  <a
                    href="https://maps.app.goo.gl/MCUfFhKLmUyveiVcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                    style={{ fontSize: '16.5px' }}
                  >
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                    <span>Goshi Warehouse City, Al Quoz</span>
                  </a>
                </div>
              </div>
              
              {/* Shop */}
              <div>
                <h4 className="text-primary-foreground mb-5 font-medium uppercase tracking-wider" style={{ fontSize: '16px' }}>
                  Shop Now
                </h4>
                <a
                  href="https://ampriomilano.com/s/fromb2b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-partner"
                  style={{ fontSize: '16.5px' }}
                >
                  Go to Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-xs text-center md:text-left">
              © 2025 Amprio Milano. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="/privacy-policy" 
                className="text-primary-foreground/50 hover:text-primary-foreground transition-colors text-xs"
              >
                Privacy Policy
              </a>
              <span className="text-primary-foreground/30">|</span>
              <a 
                href="#" 
                className="text-primary-foreground/50 hover:text-primary-foreground transition-colors text-xs"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
