// API Configuration
// TODO: Replace with actual API endpoint when provided
export const API_CONFIG = {
  // Form submission endpoint
  FORM_SUBMIT_URL: process.env.VITE_API_FORM_SUBMIT_URL || 'https://office.ampriomilano.com/api/b2b/form',
  
  // Countries endpoint (already in use)
  COUNTRIES_URL: 'https://office.ampriomilano.com/forms/country',
};

// Form data interface for API submission
export interface FormSubmissionData {
  name: string;
  phone: string;
  company?: string;
  email: string;
  countryCode: string;
  countryName: string;
  privacyAccepted: boolean;
  timestamp?: string;
}
