import { Phone, Mail, ChevronDown } from "lucide-react";

const Header = () => {
  const scrollToForm = () => {
    document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary h-14 md:h-16">
      <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-6">
        {/* Left - Menu */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#" className="px-3 py-1.5 border border-primary-foreground/40 text-primary-foreground text-sm rounded-sm hover:bg-primary-foreground/10 transition-colors">
            Розница
          </a>
          <a href="#" className="flex items-center gap-1 px-3 py-1.5 text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
            Направления
            <ChevronDown className="w-4 h-4" />
          </a>
          <a href="#collections" className="px-3 py-1.5 text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
            Проекты
          </a>
          <a href="#brands" className="px-3 py-1.5 text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
            Бренды
          </a>
          <a href="#get-offer" className="px-3 py-1.5 text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
            Контакты
          </a>
        </nav>

        {/* Center - Logo */}
        <div className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">
          <span className="text-primary-foreground font-serif text-xl md:text-2xl font-semibold tracking-wide">
            AMPRIO MILANO
          </span>
          <span className="hidden md:block text-primary-foreground/60 text-[9px] tracking-[0.25em] uppercase">
            Gourmet Tableware & Décor
          </span>
        </div>

        {/* Right - Contact & CTA */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Phone */}
          <a
            href="tel:+971501234567"
            className="hidden lg:flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            +971 50 123 4567
          </a>

          {/* Email */}
          <a
            href="mailto:info@amprio.ae"
            className="hidden xl:flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            info@amprio.ae
          </a>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="btn-outline text-xs md:text-sm px-4 py-1.5"
          >
            Стать партнёром
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
