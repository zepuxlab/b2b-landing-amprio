import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import type { Request, Response } from "express";

export async function render(url: string, req: Request, res: Response) {
  // Create a new QueryClient for each request
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

  const helmetContext: { helmet?: any } = {};

  // Normalize URL - remove base path if present
  let normalizedUrl = url;
  if (normalizedUrl.startsWith('/b2b')) {
    normalizedUrl = normalizedUrl.replace('/b2b', '') || '/';
  }
  if (!normalizedUrl.startsWith('/')) {
    normalizedUrl = '/' + normalizedUrl;
  }

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={normalizedUrl} basename="/b2b">
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  // Get helmet data for head
  const helmet = helmetContext.helmet;

  return {
    html,
    helmet,
  };
}
