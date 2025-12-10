import { Phone, MessageCircle } from "lucide-react";

const Header = () => {
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary h-14 md:h-16">
      <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-6">
        {/* Left - Retail Button */}
        <a href="#" className="px-4 py-1.5 border border-primary-foreground/40 text-primary-foreground text-sm rounded-sm hover:bg-primary-foreground/10 transition-colors">
          Retail
        </a>

        {/* Center - Logo */}
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <span className="text-primary-foreground font-serif text-xl md:text-2xl tracking-wide">
            AMPRIO MILANO
          </span>
          <span className="hidden md:block text-primary-foreground/60 text-[9px] tracking-[0.25em] uppercase font-sans">
            Gourmet Tableware & Décor
          </span>
        </div>

        {/* Right - Contact */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Phone */}
          <a
            href="tel:+971501234567"
            className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline">+971 50 123 4567</span>
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
            className="btn-outline text-xs md:text-sm px-4"
          >
            Become Partner
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
