import { Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary bg-pattern py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg text-primary-foreground mb-4 font-medium">
              Contact Us
            </h4>
            <a
              href="tel:+971501234567"
              className="flex items-center justify-center md:justify-start gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +971 50 123 4567
            </a>
          </div>
          
          {/* Social */}
          <div className="text-center">
            <h4 className="text-lg text-primary-foreground mb-4 font-medium">
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
            <h4 className="text-lg text-primary-foreground mb-4 font-medium">
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
            className="flex items-center justify-center gap-3 text-primary-foreground text-2xl md:text-4xl font-serif hover:opacity-80 transition-opacity"
          >
            <Mail className="w-8 h-8" />
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
