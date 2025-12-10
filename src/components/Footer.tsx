import { Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import logoSvg from "@/assets/AM_logo_b2b.svg";

const Footer = () => {
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary py-12 md:py-16 scroll-section-content relative overflow-hidden">
      {/* Pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("https://office.ampriomilano.com/cdn/images/AM_pattern.svg")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Left - Logo & Description */}
          <div className="text-left">
            <img src={logoSvg} alt="Amprio Milano" className="h-20 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-[280px]">
              Premium Italian tableware and décor for hotels, restaurants, and hospitality venues.
            </p>
          </div>
          
          {/* Center - Contact Us */}
          <div className="text-left">
            <h4 className="text-primary-foreground mb-4 font-medium font-sans text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2 mb-6">
              <a
                href="mailto:info@amprio.ae"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@amprio.ae
              </a>
              <a
                href="tel:+971501234567"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +971 50 123 4567
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Right - For Retail */}
          <div className="text-left md:text-right">
            <h4 className="text-primary-foreground mb-4 font-medium font-sans text-sm uppercase tracking-wider">
              For Retail
            </h4>
            <a
              href="#"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm underline underline-offset-4"
            >
              Go to Retail Store
            </a>
            
            <div className="mt-6">
              <button
                onClick={scrollToForm}
                className="btn-partner text-[15px]"
              >
                Become Partner
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-primary-foreground/50 text-xs border-t border-primary-foreground/10 pt-6">
          <p>© 2025 Amprio Milano. All rights reserved.</p>
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
