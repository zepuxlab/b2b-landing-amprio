import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_CONFIG, FormSubmissionData } from "@/config/api";

interface CountryData {
  code: string;
  name: string;
  dialCode: string;
  format: string;
  placeholder: string;
  flag: string;
}

interface CountryApiResponse {
  countries: CountryData[];
  defaultCountry?: string;
}

interface CountryDetectionResponse {
  country?: string;
  country_code?: string;
}

// Fetch countries list
export const useCountriesQuery = () => {
  return useQuery<CountryApiResponse, Error>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch(API_CONFIG.COUNTRIES_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.countries || !Array.isArray(data.countries) || data.countries.length === 0) {
        throw new Error("Invalid countries data");
      }

      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour - countries list doesn't change often
    gcTime: 1000 * 60 * 60 * 24, // 24 hours (formerly cacheTime)
  });
};

// Detect country by IP - lazy query (enabled: false by default)
export const useCountryDetectionQuery = (enabled: boolean = false) => {
  return useQuery<string | null, Error>({
    queryKey: ["country-detection"],
    queryFn: async () => {
      // Try service 1: api.country.is (simple and fast)
      try {
        const response1 = await fetch("https://api.country.is", {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        if (response1.ok) {
          const data1: CountryDetectionResponse = await response1.json();
          if (data1?.country) {
            return data1.country.toUpperCase();
          }
        }
      } catch (e) {
        // Try next service
      }

      // Try service 2: ipinfo.io (if first failed)
      try {
        const response2 = await fetch("https://ipinfo.io/json", {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        if (response2.ok) {
          const data2: CountryDetectionResponse = await response2.json();
          if (data2?.country) {
            return data2.country.toUpperCase();
          }
        }
      } catch (e) {
        // Try next service
      }

      // Try service 3: ipapi.co (fallback)
      try {
        const response3 = await fetch("https://ipapi.co/json/", {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        if (response3.ok) {
          const data3: CountryDetectionResponse = await response3.json();
          if (data3?.country_code) {
            return data3.country_code.toUpperCase();
          }
        }
      } catch (e) {
        // All IP detection services failed
      }

      return null;
    },
    enabled,
    retry: 2,
    staleTime: 1000 * 60 * 60, // 1 hour - user location doesn't change often
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Submit form mutation
export const useSubmitFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message?: string },
    Error,
    FormSubmissionData
  >({
    mutationFn: async (submissionData: FormSubmissionData) => {
      const response = await fetch(API_CONFIG.FORM_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      // Parse response
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        // If response is not JSON, check status
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        // If response is ok but not JSON, consider it success
        result = { success: true };
      }

      // Check if request was successful (either response.ok or result.success)
      if (!response.ok && !result.success) {
        throw new Error(`API error: ${response.status} - ${result.message || "Unknown error"}`);
      }

      return result;
    },
    onSuccess: () => {
      // Invalidate any related queries if needed
      queryClient.invalidateQueries({ queryKey: ["form-submissions"] });
    },
  });
};

// Export types for use in components
export type { CountryData, CountryApiResponse };
