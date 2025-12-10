import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const collections = [
  {
    name: "Aqua",
    description: "Crystal-clear unbreakable glasses perfect for poolside and outdoor dining.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
  },
  {
    name: "Cosmopolitan",
    description: "Sophisticated cocktail glasses for upscale bars and lounges.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
  },
  {
    name: "Breeze",
    description: "Lightweight and elegant designs for casual fine dining.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
  },
  {
    name: "Avant Guard",
    description: "Modern geometric shapes for contemporary venues.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  },
  {
    name: "Classico",
    description: "Timeless Italian designs for traditional hospitality.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "Prestige",
    description: "Premium collection for five-star hotels and fine dining.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
  },
];

const ProductCollections = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          {/* Left side - Title & Description */}
          <div className="flex-shrink-0 md:w-[280px] flex flex-col">
            <h2 className="font-serif text-primary mb-4 uppercase tracking-wide">
              Collections<br />In Stock
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Italian unbreakable tableware available in Dubai warehouse. 
              Next day sample delivery.
            </p>
          </div>

          {/* Right side - Slider */}
          <div className="flex-1 relative min-w-0 w-full">
            {/* Navigation - Hidden on mobile */}
            <button
              onClick={() => scroll("left")}
              className={`hidden md:flex absolute -left-5 top-[140px] z-10 w-10 h-10 rounded-lg bg-background border border-border items-center justify-center shadow-sm transition-all ${
                canScrollLeft ? "opacity-100 hover:bg-muted" : "opacity-40 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            <button
              onClick={() => scroll("right")}
              className={`hidden md:flex absolute -right-5 top-[140px] z-10 w-10 h-10 rounded-lg bg-background border border-border items-center justify-center shadow-sm transition-all ${
                canScrollRight ? "opacity-100 hover:bg-muted" : "opacity-40 pointer-events-none"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            {/* Cards */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 md:gap-5 overflow-x-auto pb-2 scroll-smooth -mx-3 px-3 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {collections.map((collection, index) => (
                <article
                  key={index}
                  className="flex-shrink-0 w-[200px] md:w-[260px] group"
                >
                  {/* Tall Image */}
                  <div className="h-[260px] md:h-[320px] rounded-lg overflow-hidden mb-4">
                    <img
                      src={collection.image}
                      alt={`${collection.name} - Italian unbreakable tableware collection`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content below image */}
                  <h3 className="text-primary mb-2 tracking-wide font-medium font-sans">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="btn-primary w-full text-sm"
                  >
                    Get Offer
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollections;