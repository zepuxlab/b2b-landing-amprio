import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Create QueryClient for client-side
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Hydrate the app
hydrateRoot(
  document.getElementById("root")!,
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/b2b">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);
