const Team = () => {
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="section-title">
          Meet our team
        </h2>
        
        <div className="max-w-md mx-auto">
          <div className="relative mb-6 inline-block">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-primary overflow-hidden mx-auto">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                alt="Tatyana Ibragimova - Senior Sales Manager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2">
            Ibragimova Tatyana
          </h3>
          <p className="text-muted-foreground text-lg mb-4">
            Senior Sales Manager
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-2xl" role="img" aria-label="English">🇬🇧</span>
            <span className="text-2xl" role="img" aria-label="Russian">🇷🇺</span>
          </div>
          
          <button
            onClick={scrollToForm}
            className="btn-primary"
          >
            Contact Manager
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
