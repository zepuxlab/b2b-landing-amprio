import { Phone, MessageCircle } from "lucide-react";

const Header = () => {
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary h-16 md:h-[72px]">
      <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex flex-col">
          <span className="text-primary-foreground font-serif text-xl md:text-2xl font-semibold tracking-wide">
            AMPRIO MILANO
          </span>
          <span className="text-primary-foreground/70 text-[10px] md:text-xs tracking-[0.2em] uppercase">
            Gourmet Tableware & Décor
          </span>
        </div>

        {/* Right side - Contact & CTA */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Phone - hidden on very small screens */}
          <a
            href="tel:+971501234567"
            className="hidden sm:flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline text-sm">+971 50 123 4567</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="btn-outline text-sm md:text-base px-4 md:px-6 py-2"
          >
            Request presentation
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
