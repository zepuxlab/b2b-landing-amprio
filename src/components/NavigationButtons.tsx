import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onLeft: () => void;
  onRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  variant?: "primary" | "white";
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onLeft,
  onRight,
  canScrollLeft,
  canScrollRight,
  variant = "primary",
}) => {
  const isWhite = variant === "white";
  const borderColor = isWhite ? "border-primary-foreground/30" : "border-primary/30";
  const textColor = isWhite ? "text-primary-foreground" : "text-primary";
  const hoverBg = isWhite ? "hover:bg-primary-foreground/10" : "hover:bg-primary/10";
  const hoverBorder = isWhite ? "hover:border-primary-foreground/50" : "hover:border-primary/50";

  return (
    <>
      <button
        onClick={onLeft}
        className={`w-10 h-10 rounded-full border ${borderColor} bg-transparent flex items-center justify-center ${textColor} ${hoverBg} ${hoverBorder} transition-all pointer-events-auto ${
          canScrollLeft ? "opacity-100" : "opacity-40 pointer-events-none"
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.2} />
      </button>
      
      <button
        onClick={onRight}
        className={`w-10 h-10 rounded-full border ${borderColor} bg-transparent flex items-center justify-center ${textColor} ${hoverBg} ${hoverBorder} transition-all pointer-events-auto ${
          canScrollRight ? "opacity-100" : "opacity-40 pointer-events-none"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.2} />
      </button>
    </>
  );
};

export default NavigationButtons;

