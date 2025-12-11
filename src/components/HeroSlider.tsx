import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

const slides = [
  {
    image: "/b2b/images/brezee_1.jpg.webp",
    title: "Unbreakable glassware stock Liquidation Sale",
    discount: "-60%",
    description: "Italian unbreakable tableware available in Dubai",
  },
  {
    image: "/b2b/images/COSMOPOLITAN_2_hero.jpg",
    title: "Unbreakable plates: cosmopolitan collection stock liquidation sale",
    discount: "-60%",
    description: "Italian unbreakable tableware available in Dubai",
  },
  {
    image: "/b2b/images/LUNA-CHICZEN_-_tavol.jpg.webp",
    title: "Avant-guard collection sale",
    discount: "-30%",
    description: "Italian unbreakable tableware available in Dubai",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    const sideZoneWidth = screenWidth * 0.2; // 20% с каждой стороны
    
    // Разрешаем свайп только если он начался в боковых зонах
    if (touchX <= sideZoneWidth || touchX >= screenWidth - sideZoneWidth) {
      touchStartX.current = touchX;
    } else {
      // Если touch начался в центральной зоне, блокируем свайп
      touchStartX.current = -1;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== -1) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    // Проверяем, что свайп был начат в боковой зоне
    if (touchStartX.current === -1) {
      return;
    }
    
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    // Сброс значений
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setParallaxOffset(scrolled * 0.4);
      // Show scroll to top button when scrolled down more than 300px
      setShowScrollTop(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ minHeight: '100vh', height: '100vh' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides with Parallax */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            }}
          />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.50), rgba(0,0,0,0.50))" }} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-3 md:px-4 py-8 md:py-12 min-h-0 overflow-visible max-w-[1440px] mx-auto w-full">
        <h1 className="font-serif text-[32px] md:text-[48px] lg:text-[52px] text-primary-foreground mb-4 animate-fade-in max-w-5xl leading-[1.4] md:leading-[1.55] uppercase tracking-wide whitespace-normal break-words">
          {slides[currentSlide].title}{" "}
          <u className="underline">{slides[currentSlide].discount}</u>
        </h1>
        <p className="text-primary-foreground/90 mb-6 animate-fade-in text-base md:text-lg" style={{ animationDelay: "0.1s" }}>
          Italian unbreakable tableware available in Dubai
        </p>
        <button
          onClick={scrollToForm}
          className="btn-partner text-[15px] animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Get Offer
        </button>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-primary-foreground/30 bg-transparent flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.2} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-primary-foreground/30 bg-transparent flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.2} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-foreground w-6"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll to Top Button - Show only when scrolled */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-3 md:right-6 z-[9999] w-9 h-9 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:scale-110 transition-all"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" strokeWidth={1.2} />
        </button>
      )}

    </section>
  );
};

export default HeroSlider;
