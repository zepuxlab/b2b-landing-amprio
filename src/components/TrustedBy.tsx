import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  { name: "BITOSSI HOME", exclusive: true },
  { name: "Broggi", exclusive: false, script: true },
  { name: "chilewich", exclusive: false },
  { name: "COSINI", exclusive: true },
  { name: "Cutipol", exclusive: false, script: true },
  { name: "ZAFFERANO", exclusive: false },
];

const TrustedBy = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-10 gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4 uppercase tracking-wide">
              Только проверенные бренды<br />
              премиального качества
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              Мы знаем всё о производителях, с которыми сотрудничаем, и гарантируем 
              безукоризненное качество и функциональность продукции.
            </p>
          </div>
          <a href="#" className="text-primary underline hover:no-underline text-sm whitespace-nowrap">
            Смотреть все бренды
          </a>
        </div>

        {/* Brands Slider */}
        <div className="relative">
          {/* Navigation */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm transition-all ${
              canScrollLeft ? "opacity-100 hover:bg-muted" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm transition-all ${
              canScrollRight ? "opacity-100 hover:bg-muted" : "opacity-0 pointer-events-none"
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
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[200px] md:w-[240px] h-[120px] bg-background rounded-lg flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className={`text-primary text-xl md:text-2xl ${brand.script ? 'font-serif italic' : 'font-semibold tracking-wide'}`}>
                  {brand.name}
                </span>
                {brand.exclusive && (
                  <span className="mt-2 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider rounded-sm">
                    Exclusive
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
