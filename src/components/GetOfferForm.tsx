import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GetOfferForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    privacy: false,
  });

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
    <section id="get-offer" className="relative min-h-[600px] grid md:grid-cols-2">
      {/* Form Side */}
      <div 
        className="relative flex items-center justify-center p-8 md:p-12"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />
        
        <div className="relative z-10 w-full max-w-md">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-2 text-center uppercase tracking-wide">
            Get Your Exclusive Offer
          </h2>
          <p className="text-primary-foreground/80 text-center mb-8 text-sm">
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
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors text-sm"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="WhatsApp / Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors text-sm"
            />
            
            <input
              type="text"
              name="company"
              placeholder="Company / Restaurant Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors text-sm"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors text-sm"
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
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Get Exclusive Offer"}
            </button>
          </form>
        </div>
      </div>
      
      {/* Image Side */}
      <div 
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80')",
        }}
      />
    </section>
  );
};

export default GetOfferForm;
