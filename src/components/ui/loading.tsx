import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export const Loading = ({ 
  className, 
  size = "md", 
  text,
  fullScreen = false 
}: LoadingProps) => {
  const spinner = (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
      {text && (
        <p className="text-sm text-primary-foreground/70">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Spinner only variant
export const Spinner = ({ className, size = "md" }: Omit<LoadingProps, "text" | "fullScreen">) => {
  return (
    <Loader2 className={cn("animate-spin text-primary", sizeMap[size], className)} />
  );
};

// Skeleton loader for content placeholders
export const SkeletonLoader = ({ 
  className,
  lines = 3,
  showAvatar = false 
}: { 
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {showAvatar && (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-foreground/10 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 rounded bg-primary-foreground/10 animate-pulse" />
            <div className="h-3 w-32 rounded bg-primary-foreground/10 animate-pulse" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 rounded bg-primary-foreground/10 animate-pulse",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
};

// Button loading state
export const ButtonLoading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Spinner size="sm" />
      <span>Sending...</span>
    </div>
  );
};
