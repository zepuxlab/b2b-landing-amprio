import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);

  const scrollToForm = () => {
    const formElement = document.getElementById("get-offer");
    if (formElement) {
      const headerHeight = 65; // Высота header (h-18 = 72px + padding) + дополнительный offset
      const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      // Плавная прокрутка с easing функцией
      smoothScrollTo(offsetPosition, 400);
    }
    setIsMenuOpen(false);
  };

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 65; // Высота header (h-18 = 72px + padding) + дополнительный offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      // Плавная прокрутка с easing функцией
      smoothScrollTo(offsetPosition, 400);
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    smoothScrollTo(0, 400);
    setIsMenuOpen(false);
  };

  // Определяем, находится ли меню на светлом фоне
  useEffect(() => {
    const checkBackground = () => {
      const header = document.querySelector('header');
      if (!header) return;

      const headerRect = header.getBoundingClientRect();
      const headerCenter = headerRect.top + headerRect.height / 2;
      
      // Темные секции (меню темное): Hero, Brands и Form
      const darkSections = [
        document.querySelector('section[class*="h-screen"]'), // Hero
        document.getElementById('brands'), // TrustedBy
        document.getElementById('get-offer'), // GetOfferForm
      ].filter(Boolean);

      // Светлые секции (меню белое): Collections, Benefits, Team, Privacy Policy
      const lightSections = [
        document.getElementById('collections'), // ProductCollections
        document.querySelector('section[class*="bg-background"]'), // Benefits
        document.querySelector('section[class*="bg-noise-light"]'), // Team
        document.querySelector('main[class*="bg-background"]'), // Privacy Policy, Thank You
      ].filter(Boolean);

      // Проверяем, находится ли центр header в темной секции
      let isOnDark = false;
      for (const section of darkSections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (headerCenter >= rect.top && headerCenter <= rect.bottom) {
            isOnDark = true;
            break;
          }
        }
      }

      // Если не в темной секции, проверяем светлые
      if (!isOnDark) {
        for (const section of lightSections) {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (headerCenter >= rect.top && headerCenter <= rect.bottom) {
              setIsLightBackground(true);
              return;
            }
          }
        }
      }

      setIsLightBackground(!isOnDark);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground, { passive: true });
    window.addEventListener('resize', checkBackground, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[9999] h-16 md:h-18 relative overflow-hidden transition-colors duration-300 ${isLightBackground ? 'bg-background bg-noise-light' : 'bg-primary bg-noise'}`} style={{ position: 'fixed', paddingBottom: '4px' }}>
        {/* Pattern background */}
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
          style={{
            backgroundImage: `url('/images/pattern-brand.svg')`,
            backgroundSize: '555px',
            backgroundRepeat: 'repeat',
            backgroundPosition: '0 0'
          }}
        />
        <div className="container mx-auto max-w-[1440px] h-full flex items-center justify-between px-3 md:px-4 relative z-10">
          {/* Mobile: Burger Left */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden -ml-3 p-2 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              width="38" 
              height="38" 
              viewBox="0 0 38 38" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`w-7 h-7 ${isLightBackground ? 'text-primary' : '!text-white opacity-100'}`}
            >
              <path 
                d="M5 15H33" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              <path 
                d="M5 23H33" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
            </svg>
          </button>

          {/* Left - Contact (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
                isLightBackground 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                  : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
              }`}
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className={`w-4 h-4 ${isLightBackground ? 'fill-primary' : 'fill-primary-foreground'}`}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            {/* Phone */}
            <a
              href="tel:+971501234567"
              className={`flex items-center gap-2 transition-colors ${isLightBackground ? 'text-primary hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground'}`}
              aria-label="Phone"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
                isLightBackground 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                  : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
              }`}>
                <Phone className={`w-4 h-4 ${isLightBackground ? 'text-primary' : 'text-primary-foreground'}`} strokeWidth={1.5} />
              </div>
              <span className={`hidden xl:inline-block text-[15px] ${isLightBackground ? 'text-primary' : 'text-primary-foreground'}`}>+971 50 123 4567</span>
            </a>
          </div>

          {/* Center - Logo */}
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to top"
          >
            <img 
              src={isLightBackground ? "/images/logo_am_b2b_dark.svg" : "/images/logo_am_b2b.svg"} 
              alt="Amprio Milano" 
              className={`h-[36px] md:h-[44px] transition-all duration-300 ${isLightBackground ? '' : 'brightness-0 invert'}`}
            />
          </button>

          {/* Right - CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={scrollToForm}
              className={`text-[15px] px-8 font-medium transition-all duration-300 hover:shadow-lg border-radius: 50px ${
                isLightBackground 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'btn-partner'
              }`}
              style={isLightBackground ? { height: '42px', minHeight: '42px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } : {}}
            >
              Request presentation
            </button>
          </div>

          {/* Mobile: empty space for balance */}
          <div className="w-10 md:hidden" />
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        scrollToTop={scrollToTop}
        scrollToSection={scrollToSection}
        scrollToForm={scrollToForm}
      />
    </>
  );
};

export default Header;
