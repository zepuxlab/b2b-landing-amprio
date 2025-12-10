import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";

interface CountryData {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

const popularCountries: CountryData[] = [
  { code: "AE", name: "UAE", dial_code: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", dial_code: "+974", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", dial_code: "+965", flag: "🇰🇼" },
  { code: "BH", name: "Bahrain", dial_code: "+973", flag: "🇧🇭" },
  { code: "OM", name: "Oman", dial_code: "+968", flag: "🇴🇲" },
  { code: "GB", name: "UK", dial_code: "+44", flag: "🇬🇧" },
  { code: "US", name: "USA", dial_code: "+1", flag: "🇺🇸" },
  { code: "RU", name: "Russia", dial_code: "+7", flag: "🇷🇺" },
  { code: "DE", name: "Germany", dial_code: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial_code: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dial_code: "+39", flag: "🇮🇹" },
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", dial_code: "+92", flag: "🇵🇰" },
  { code: "PH", name: "Philippines", dial_code: "+63", flag: "🇵🇭" },
];

const GetOfferForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(popularCountries[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    privacy: false,
  });

  // Fetch country from IP
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://office.ampriomilano.com/forms/country");
        const data = await response.json();
        if (data?.country_code) {
          const found = popularCountries.find(c => c.code === data.country_code);
          if (found) {
            setSelectedCountry(found);
          }
        }
      } catch (error) {
        console.log("Could not detect country, using default");
      }
    };
    fetchCountry();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <h2 className="font-serif text-primary-foreground mb-2 text-center uppercase tracking-wide leading-relaxed">
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
            
            {/* Phone with country selector */}
            <div className="flex gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-colors min-w-[100px]"
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm">{selectedCountry.dial_code}</span>
                  <ChevronDown className="w-4 h-4 text-primary-foreground/60" />
                </button>
                
                {isCountryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 max-h-60 overflow-y-auto bg-primary border border-primary-foreground/20 rounded-lg shadow-xl z-50">
                    {popularCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="text-primary-foreground/60 ml-auto">{country.dial_code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
              />
            </div>
            
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
            
            <label className="flex items-center gap-3 cursor-pointer py-2">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                className="w-5 h-5 rounded border-primary-foreground/30 bg-transparent text-accent focus:ring-accent shrink-0"
              />
              <span className="text-primary-foreground/80 text-sm leading-tight">
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