const Team = () => {
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-24 bg-background bg-noise-light relative overflow-hidden">
      {/* Grid pattern with top-to-bottom gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("https://office.ampriomilano.com/cdn/images/AM_pattern.svg")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          opacity: 0.03,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)'
        }}
      />
      
      {/* Background marquee text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[120px] md:text-[200px] font-serif text-primary/[0.03] uppercase tracking-wider mx-8"
            >
              AMPRIO MILANO
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 text-center relative z-10">
        <h2 className="font-serif text-primary mb-12 uppercase tracking-wide leading-relaxed">
          Meet Our Team
        </h2>
        
        <div className="max-w-md mx-auto">
          <div className="relative mb-6 inline-block">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-primary overflow-hidden mx-auto">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                alt="Tatyana Ibragimova - Senior Sales Manager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h3 className="text-xl md:text-2xl text-primary mb-2 font-medium font-sans">
            Tatyana Ibragimova
          </h3>
          <p className="text-muted-foreground mb-4">
            Senior Sales Manager
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-2xl" role="img" aria-label="English">🇬🇧</span>
            <span className="text-2xl" role="img" aria-label="Russian">🇷🇺</span>
          </div>
          
          <button
            onClick={scrollToForm}
            className="btn-dark"
          >
            Contact Manager
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
