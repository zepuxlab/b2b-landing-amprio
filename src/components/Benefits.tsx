import { Warehouse, Gift, BadgeDollarSign, UtensilsCrossed, Truck, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Warehouse,
    title: "Available in stock in Dubai warehouse",
  },
  {
    icon: Gift,
    title: "Free try-before-you-buy",
  },
  {
    icon: BadgeDollarSign,
    title: "Best prices direct from the factory",
  },
  {
    icon: UtensilsCrossed,
    title: "Wide selection of tableware for restaurants & hotels",
  },
  {
    icon: Truck,
    title: "Next day sample delivery",
  },
  {
    icon: Sparkles,
    title: "Exclusive collections for standout venues & events",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-background bg-noise-light scroll-section-content relative overflow-hidden">
      {/* Grid pattern with bottom-to-top gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("https://office.ampriomilano.com/cdn/images/AM_pattern.svg")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          opacity: 0.03,
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)'
        }}
      />
      
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <h2 className="font-serif text-primary text-center mb-12 uppercase tracking-wide leading-relaxed">
          Why Choose Amprio Milano?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground">
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
