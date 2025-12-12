import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loading } from "@/components/ui/loading";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load pages that are not immediately needed
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

const App = () => {
  const location = useLocation();
  
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<Loading fullScreen text="Loading..." />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/thank-you"
          element={
            <Suspense fallback={<Loading fullScreen text="Loading..." />}>
              <ThankYou />
            </Suspense>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
};

export default App;
