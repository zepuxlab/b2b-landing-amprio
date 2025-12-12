import { Phone, MessageCircle, X, Mail, MapPin } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToTop: () => void;
  scrollToSection: (id: string) => void;
  scrollToForm: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  scrollToTop,
  scrollToSection,
  scrollToForm,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} dismissible={true} direction="left">
      <DrawerContent 
        className="md:hidden no-handle !z-[10000] !bg-primary/95 !backdrop-blur-md bg-noise !w-full !border-0 !rounded-none !top-0 !bottom-0 !left-0 !right-0"
        style={{ 
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <div className="flex flex-col h-full relative">
          {/* Pattern background */}
          <div
            className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
            style={{
              backgroundImage: `url('/b2b/images/pattern-brand.svg')`,
              backgroundSize: '555px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '0 0'
            }}
          />
          {/* Menu Header */}
          <div className="flex items-center justify-between px-3 py-4 border-b border-primary-foreground/10 relative flex-shrink-0 z-10">
            <DrawerClose className="-ml-3 p-2 text-primary-foreground">
              <X className="w-6 h-6" strokeWidth={1.2} />
            </DrawerClose>
            <button
              onClick={() => {
                scrollToTop();
                onClose();
              }}
              className="absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go to top"
            >
              <img 
                src="/b2b/images/logo_am_b2b.svg" 
                alt="Amprio Milano" 
                className="h-[36px] brightness-0 invert" 
                loading="eager"
                decoding="async"
              />
            </button>
            <div className="w-10" />
          </div>

          {/* Menu Links */}
          <nav className="flex-1 flex flex-col gap-8 px-3 py-6 overflow-y-auto relative z-10">
            {/* Quick Links */}
            <div>
              <h4 className="text-primary-foreground mb-4 font-medium uppercase tracking-wider" style={{ fontSize: '16px' }}>
                Quick Links
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    scrollToSection("collections");
                    onClose();
                  }}
                  className="block text-left text-primary-foreground/70 hover:text-primary-foreground transition-colors w-full"
                  style={{ fontSize: '16.5px' }}
                >
                  Collections
                </button>
                <button
                  onClick={() => {
                    scrollToSection("brands");
                    onClose();
                  }}
                  className="block text-left text-primary-foreground/70 hover:text-primary-foreground transition-colors w-full"
                  style={{ fontSize: '16.5px' }}
                >
                  Brands
                </button>
                <a
                  href="https://ampriomilano.com/s/fromb2b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  style={{ fontSize: '16.5px' }}
                  onClick={() => onClose()}
                >
                  Go to Shopping
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-primary-foreground mb-4 font-medium uppercase tracking-wider" style={{ fontSize: '16px' }}>
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@amprio.ae"
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                  style={{ fontSize: '16.5px' }}
                  onClick={() => onClose()}
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                  <span>info@amprio.ae</span>
                </a>
                <a
                  href="tel:+971501234567"
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                  style={{ fontSize: '16.5px' }}
                  onClick={() => onClose()}
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                  <span>+971 50 123 4567</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/MCUfFhKLmUyveiVcA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                  style={{ fontSize: '16.5px' }}
                  onClick={() => onClose()}
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                  <span>Goshi Warehouse City, Al Quoz</span>
                </a>
              </div>
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="px-3 py-6 space-y-4 border-t border-primary-foreground/10 flex-shrink-0 relative z-10">
            <button
              onClick={() => {
                scrollToForm();
                onClose();
              }}
              className="btn-partner w-full text-[15px]"
            >
              Request presentation
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
