import { useRef, useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";
import CollectionOfferModal from "./CollectionOfferModal";

const collections = [
  {
    name: "Aqua",
    description: "Crafted in premium acrylic, each wine glass, tumbler and pitcher radiates crystal clarity yet withstands lively",
    image: "/b2b/images/Aqua_1.jpg.webp",
    imageHover: "/b2b/images/Aqua_2.jpg.webp",
  },
  {
    name: "Cosmopolitan",
    description: "Lightweight yet durable melamine delivers Asian-inspired minimalism and practical elegance—perfect for modern city living",
    image: "/b2b/images/COSMOPOLITAN_9.jpg.webp",
    imageHover: "/b2b/images/COSMOPOLITAN_2.jpg.webp",
  },
  {
    name: "Breeze",
    description: "Unbreakable clarity meets Italian style, for indoor and poolside soirées. Glassware sets with sleek polycarbonate tumblers, wine, beer and cocktail glasses.",
    image: "/b2b/images/iPhone_16_Plus_-_1.jpg.webp",
    imageHover: "/b2b/images/Brreze_2.jpg.webp",
  },
  {
    name: "Avant Guard",
    description: "An exclusive collection of melamine plates and serving dishes designed to excel of the HORECA industry. Skillfully elegance of porcelain-like finishes with the practicality and distinctive lightness of melamine.",
    image: "/b2b/images/avant-guard_1.jpg.webp",
    imageHover: "/b2b/images/AVANT_GUARD_44.jpg.webp",
  },
  {
    name: "Baroque & Rock",
    description: "Premium acrylic glasses, jars and cake stands merge ornate crowns and rock-chic skulls with lightweight durability",
    image: "/b2b/images/baroque_rock_1.jpg.webp",
    imageHover: "/b2b/images/baroque_rock_2.jpg.webp",
  },
  {
    name: "Cheers",
    description: "Premium acrylic flutes, wine and water glasses, ready for yachts, poolsides or intimate dinners",
    image: "/b2b/images/CHEERS_4_1.jpg.webp",
    imageHover: "/b2b/images/cheers_2.jpg.webp",
  },
  {
    name: "Chic & Zen",
    description: "Crafted from shatter-resistant acrylic, each piece fuses refined lines with playful optical detail, delivering lightweight luxury",
    image: "/b2b/images/chic_Zen_1.jpg.webp",
    imageHover: "/b2b/images/chic_Zen_2.jpg.webp",
  },
];

const ProductCollections = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchScrollLeft, setTouchScrollLeft] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<{
    name: string;
    description: string;
    image: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleGetOffer = (collection: typeof collections[0]) => {
    setSelectedCollection({
      name: collection.name,
      description: collection.description,
      image: collection.image,
    });
    setIsModalOpen(true);
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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkScroll();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile snap-to-card scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsTouching(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching || !scrollRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX) * 1.5;
    scrollRef.current.scrollLeft = touchScrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (!scrollRef.current || !isTouching) return;
    setIsTouching(false);
    
    // Snap to nearest card
    const container = scrollRef.current;
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 200 + 16 : 260 + 20; // card width + gap
    const scrollPosition = container.scrollLeft;
    const nearestCardIndex = Math.round(scrollPosition / cardWidth);
    const targetScroll = nearestCardIndex * cardWidth;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    setTimeout(checkScroll, 300);
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-background bg-noise-light scroll-section-content">
      <div className="container mx-auto max-w-[1440px] px-3 md:px-4">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Title & Description - Top with Navigation */}
          <div className="flex flex-col text-center relative">
            <h2 className="font-serif text-primary mb-3 uppercase tracking-wide leading-relaxed">
              Collections In Stock
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-3" style={{ fontSize: '16.5px' }}>
              Italian unbreakable tableware available in Dubai warehouse.
            </p>
            
            <div className="hidden md:flex items-center justify-end gap-4 absolute right-0 top-[calc(50%-0.75rem)] -translate-y-1/2 pointer-events-none">
              <NavigationButtons
                onLeft={() => scroll("left")}
                onRight={() => scroll("right")}
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
                variant="primary"
              />
            </div>
          </div>

          {/* Slider - Below */}
          <div className="relative min-w-0 w-full">

            {/* Cards */}
            <div
              ref={scrollRef}
              data-collections-scroll
              onScroll={checkScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`flex items-stretch gap-4 md:gap-5 overflow-x-auto pb-2 scroll-smooth -mx-3 px-3 md:mx-0 md:px-0 ${
                isDragging ? "cursor-grabbing select-none" : "cursor-grab"
              }`}
              style={{ 
                scrollbarWidth: "none", 
                msOverflowStyle: "none", 
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
              }}
            >
              {collections.map((collection, index) => (
                <article
                  key={index}
                  className="flex-shrink-0 w-[200px] md:w-[260px] group text-center md:text-left flex flex-col"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Tall Image with Hover Effect */}
                  <div className="h-[260px] md:h-[320px] rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={collection.image}
                      alt={`${collection.name} - Italian unbreakable tableware collection`}
                      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
                      loading="lazy"
                      draggable={false}
                    />
                    <img
                      src={collection.imageHover}
                      alt={`${collection.name} - Italian unbreakable tableware collection`}
                      className="w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute inset-0"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  
                  {/* Content below image */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-primary mb-2 tracking-wide font-medium font-serif leading-relaxed">
                      {collection.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-grow">
                      {collection.description}
                    </p>
                    <button
                      onClick={() => handleGetOffer(collection)}
                      className="btn-dark w-full text-[15px] mt-auto"
                    >
                      Get Offer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collection Offer Modal */}
      <CollectionOfferModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        collection={selectedCollection}
      />
    </section>
  );
};

export default ProductCollections;
