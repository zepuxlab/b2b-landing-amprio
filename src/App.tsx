import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import { Loading } from "@/components/ui/loading";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load pages that are not immediately needed
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

// Configure QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/b2b">
          <Routes>
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
