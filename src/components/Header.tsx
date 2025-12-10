import { useState } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import logoSvg from "@/assets/AM_logo_b2b.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary bg-noise h-16 md:h-20">
        <div className="container mx-auto h-full flex items-center justify-between px-3 md:px-6">
          {/* Mobile: Burger Left */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-foreground"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop: Retail Link */}
          <a 
            href="#" 
            className="hidden md:inline-flex text-primary-foreground/80 hover:text-primary-foreground transition-colors text-[15px] underline underline-offset-4"
          >
            Go to Retail
          </a>

          {/* Center - Logo */}
          <div className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <img src={logoSvg} alt="Amprio Milano" className="h-10 md:h-14" />
          </div>

          {/* Right - Contact (Desktop) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Phone */}
            <a
              href="tel:+971501234567"
              className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-[15px]"
            >
              <Phone className="w-4 h-4" />
              <span>+971 50 123 4567</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* CTA Button */}
            <button
              onClick={scrollToForm}
              className="btn-partner text-[15px]"
            >
              Become Partner
            </button>
          </div>

          {/* Mobile: empty space for balance */}
          <div className="w-10 md:hidden" />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-primary/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
            <img src={logoSvg} alt="Amprio Milano" className="h-10" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-primary-foreground"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
            <button
              onClick={() => scrollToSection("collections")}
              className="text-primary-foreground text-[15px] font-sans tracking-wide hover:opacity-80 transition-opacity"
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection("brands")}
              className="text-primary-foreground text-[15px] font-sans tracking-wide hover:opacity-80 transition-opacity"
            >
              Brands
            </button>
            <a
              href="tel:+971501234567"
              className="flex items-center gap-2 text-primary-foreground/80 text-[15px]"
            >
              <Phone className="w-5 h-5" />
              +971 50 123 4567
            </a>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 text-[15px]"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 space-y-4 border-t border-primary-foreground/10">
            <button
              onClick={scrollToForm}
              className="btn-partner w-full text-[15px]"
            >
              Become Partner
            </button>
            <a
              href="#"
              className="block text-center text-primary-foreground/80 hover:text-primary-foreground transition-colors text-[15px] underline underline-offset-4"
            >
              Go to Retail
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
