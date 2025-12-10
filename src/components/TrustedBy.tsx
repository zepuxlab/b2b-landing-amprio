const partners = [
  { name: "Nobu Dubai", logo: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=200&h=100&fit=crop&q=80" },
  { name: "Zuma", logo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=100&fit=crop&q=80" },
  { name: "Atlantis", logo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=100&fit=crop&q=80" },
];

const TrustedBy = () => {
  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground text-center mb-16">
          Trusted by:
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-6 md:p-8 transition-transform hover:scale-105"
            >
              <div className="text-primary-foreground font-serif text-2xl md:text-3xl text-center">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
