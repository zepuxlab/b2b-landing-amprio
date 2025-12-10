import { useEffect, useRef, useState } from "react";

const brands = [
  { name: "BITOSSI HOME", exclusive: true },
  { name: "Broggi", exclusive: false },
  { name: "COSINI", exclusive: true },
];

const TrustedBy = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      
      if (relativeScroll > 0 && rect.bottom > 0) {
        setParallaxOffset(relativeScroll * 0.15);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section 
      ref={sectionRef}
      id="brands" 
      className="py-16 md:py-24 relative overflow-hidden scroll-section-content"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')",
          transform: `translateY(${parallaxOffset}px) scale(1.2)`,
          top: "-10%",
          height: "120%",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/80" />
      
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-primary-foreground mb-4 uppercase tracking-wide">
            Only Verified Premium<br />
            Quality Brands
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            We know everything about the manufacturers we work with and guarantee 
            impeccable quality and functionality of products.
          </p>
        </div>

        {/* Infinite scroll brands */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[180px] md:w-[280px] h-[90px] md:h-[120px] bg-primary-foreground/10 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center border border-primary-foreground/20"
            >
              <span className="text-primary-foreground text-base md:text-xl font-medium tracking-wide">
                {brand.name}
              </span>
              {brand.exclusive && (
                <span className="mt-2 px-3 py-0.5 bg-primary-foreground text-primary text-[10px] uppercase tracking-wider rounded-sm">
                  Exclusive
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
