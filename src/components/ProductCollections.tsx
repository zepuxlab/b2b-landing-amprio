import { useRef, useState } from "react";
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
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-10 gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4 uppercase tracking-wide">
              Коллекции в наличии
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              Итальянская небьющаяся посуда доступна на складе в Дубае. 
              Доставка образцов на следующий день.
            </p>
          </div>
          <a href="#" className="text-primary underline hover:no-underline text-sm whitespace-nowrap">
            Смотреть все коллекции
          </a>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Navigation */}
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm transition-all ${
              canScrollLeft ? "opacity-100 hover:bg-muted" : "opacity-40"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>

          <button
            onClick={() => scroll("right")}
            className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm transition-all ${
              canScrollRight ? "opacity-100 hover:bg-muted" : "opacity-40"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections.map((collection, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[240px] md:w-[280px] bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="h-[160px] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={`${collection.name} collection`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-primary text-base mb-2 tracking-wide">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="btn-primary w-full text-xs py-2"
                  >
                    Get Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollections;
