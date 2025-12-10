import { useState, useRef } from "react";
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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          In Stock Collections
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all -translate-x-4 ${
              canScrollLeft ? "opacity-100 hover:bg-primary/90" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all translate-x-4 ${
              canScrollRight ? "opacity-100 hover:bg-primary/90" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Swiper Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections.map((collection, index) => (
              <article
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[320px] bg-card rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 snap-start"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={`${collection.name} collection - Italian unbreakable glassware`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-primary mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="btn-primary w-full text-sm py-2.5"
                  >
                    Get Offer
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollections;
