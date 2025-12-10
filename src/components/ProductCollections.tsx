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
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          In Stock Collections
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {collections.map((collection, index) => (
            <article
              key={index}
              className="card-product"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={collection.image}
                  alt={`${collection.name} collection - Italian unbreakable glassware`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-primary mb-2">
                  {collection.name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {collection.description}
                </p>
                <button
                  onClick={scrollToForm}
                  className="btn-primary w-full text-base"
                >
                  Get Offer
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCollections;
