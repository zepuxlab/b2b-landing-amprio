import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";

const collections = [
  {
    name: "MЕРСО",
    location: "Хабаровск, Россия",
    isNew: true,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    name: "CHERCHEZ BISTROT",
    location: "Санкт-Петербург, Россия",
    isNew: true,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    featured: true,
  },
  {
    name: "COPEN 57",
    location: "Москва, Россия",
    isNew: true,
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80",
  },
  {
    name: "PALOMA",
    location: "Санкт-Петербург, Россия",
    isNew: false,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
  },
  {
    name: "AQUA",
    location: "Дубай, ОАЭ",
    isNew: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
  },
  {
    name: "PRESTIGE",
    location: "Дубай, ОАЭ",
    isNew: true,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
  },
];

const ProductCollections = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">
          In Stock Collections
        </h2>

        <div className="relative flex items-center gap-6">
          {/* Cards Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto flex-1 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections.map((collection, index) => (
              <article
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[320px] group cursor-pointer"
              >
                {/* Image */}
                <div className={`overflow-hidden rounded-lg mb-4 ${collection.featured ? 'h-[380px]' : 'h-[280px]'}`}>
                  <img
                    src={collection.image}
                    alt={`${collection.name} - Italian unbreakable glassware`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Info */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-primary text-lg tracking-wide">
                    {collection.name}
                  </h3>
                  {collection.isNew && (
                    <span className="px-2 py-0.5 border border-primary text-primary text-[10px] uppercase tracking-wider rounded-sm">
                      New
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {collection.location}
                </p>
              </article>
            ))}
          </div>

          {/* Navigation Arrow - Outside */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`flex-shrink-0 w-12 h-12 rounded-full border border-primary flex items-center justify-center transition-all ${
              canScrollRight 
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground text-primary" 
                : "opacity-30 cursor-not-allowed text-muted-foreground border-muted"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCollections;
