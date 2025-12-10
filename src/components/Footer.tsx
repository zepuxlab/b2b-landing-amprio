import { Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12 md:py-16 scroll-section-content relative overflow-hidden">
      {/* Pattern background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-primary-foreground mb-4 font-medium font-sans leading-relaxed">
              Contact Us
            </h4>
            <a
              href="tel:+971501234567"
              className="flex items-center justify-center md:justify-start gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              +971 50 123 4567
            </a>
          </div>
          
          {/* Social */}
          <div className="text-center">
            <h4 className="text-primary-foreground mb-4 font-medium font-sans leading-relaxed">
              Follow Us
            </h4>
            <div className="flex items-center justify-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* B2C Link */}
          <div className="text-center md:text-right">
            <h4 className="text-primary-foreground mb-4 font-medium font-sans leading-relaxed">
              For Retail Customers
            </h4>
            <a
              href="#"
              className="btn-outline inline-block"
            >
              Go to B2C Website
            </a>
          </div>
        </div>
        
        {/* Big Email */}
        <div className="text-center mb-8">
          <a
            href="mailto:INFO@AMPRIO.AE"
            className="flex items-center justify-center gap-3 text-primary-foreground text-xl md:text-4xl font-serif hover:opacity-80 transition-opacity"
          >
            <Mail className="w-6 h-6 md:w-8 md:h-8" />
            INFO@AMPRIO.AE
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-primary-foreground/60 text-sm border-t border-primary-foreground/10 pt-8">
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
