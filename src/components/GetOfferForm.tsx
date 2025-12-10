import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const GetOfferForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    privacy: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      
      if (relativeScroll > 0 && rect.bottom > 0) {
        setParallaxOffset(relativeScroll * 0.1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Please accept the privacy policy",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Request sent successfully!",
      description: "Our team will contact you shortly.",
    });
    
    setFormData({
      name: "",
      phone: "",
      company: "",
      email: "",
      privacy: false,
    });
    
    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} id="get-offer" className="relative min-h-[600px] grid md:grid-cols-2 overflow-hidden scroll-section-content">
      {/* Form Side */}
      <div className="relative flex items-center justify-center p-6 md:p-12">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80')",
            transform: `translateY(${parallaxOffset}px) scale(1.2)`,
            top: "-10%",
            height: "120%",
          }}
        />
        <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />
        
        <div className="relative z-10 w-full max-w-md py-8 md:py-0">
          <h2 className="font-serif text-primary-foreground mb-2 text-center uppercase tracking-wide">
            Get Your Exclusive Offer
          </h2>
          <p className="text-primary-foreground/80 text-center mb-8">
            Fill in the form and we will contact you within 24 hours
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="WhatsApp / Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            <input
              type="text"
              name="company"
              placeholder="Company / Restaurant Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-primary-foreground/30 bg-transparent text-accent focus:ring-accent"
              />
              <span className="text-primary-foreground/80 text-xs">
                I agree to the{" "}
                <a href="#" className="underline hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </span>
            </label>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-light w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Get Exclusive Offer"}
            </button>
          </form>
        </div>
      </div>
      
      {/* Image Side with Parallax */}
      <div className="hidden md:block relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80')",
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            top: "-5%",
            height: "110%",
          }}
        />
      </div>
    </section>
  );
};

export default GetOfferForm;
