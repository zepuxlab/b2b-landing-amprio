/**
 * Detect if the browser is Safari
 * More reliable detection that works across different Safari versions
 */
export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const ua = navigator.userAgent.toLowerCase();
  
  // Check for Safari (but not Chrome, Edge, or other Chromium-based browsers)
  const isSafariUA = /safari/.test(ua) && !/chrome/.test(ua) && !/chromium/.test(ua) && !/crios/.test(ua);
  
  // Also check for iOS Safari
  const isIOS = /iphone|ipad|ipod/.test(ua);
  
  // Check for Safari vendor
  const isSafariVendor = 'safari' in window && !('chrome' in window);
  
  return isSafariUA || (isIOS && !/chrome|crios/.test(ua)) || isSafariVendor;
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};
