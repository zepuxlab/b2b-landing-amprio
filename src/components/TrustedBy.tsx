import { useEffect, useRef, useState } from "react";

const brands = [
  { logo: "/b2b/images/maison-revka-stacked.png", name: "Maison Revka" },
  { logo: "/b2b/images/gigi_1_1.png", name: "Gigi" },
  { logo: "/b2b/images/la_baia.png", name: "La Baia" },
];

const TrustedBy = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section 
      ref={sectionRef}
      id="brands" 
      className="py-16 md:py-24 relative overflow-hidden scroll-section-content"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/b2b/images/photo_2025-08-13_150.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/80" />
      
      <div className="container mx-auto max-w-[1440px] px-3 md:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-primary-foreground mb-4 uppercase tracking-wide leading-relaxed">
            Trusted by<br />
            Major Brands
          </h2>
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
              className="flex-shrink-0 w-[180px] md:w-[280px] h-[90px] md:h-[120px] flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
