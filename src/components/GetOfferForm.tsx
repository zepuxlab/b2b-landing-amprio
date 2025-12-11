import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";
import { FormSubmissionData } from "@/config/api";
import { useCountriesQuery, useCountryDetectionQuery, useSubmitFormMutation, type CountryData } from "@/hooks/use-api";
import { Loading, ButtonLoading } from "@/components/ui/loading";

const GetOfferForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    privacy: false,
  });

  // Fetch countries list using TanStack Query
  const { 
    data: countriesData, 
    isLoading: isLoadingCountries, 
    error: countriesError 
  } = useCountriesQuery();

  // Lazy country detection - only enabled when countries are loaded
  const { 
    data: detectedCountryCode,
    isLoading: isLoadingDetection 
  } = useCountryDetectionQuery(!!countriesData?.countries);

  // Form submission mutation
  const submitMutation = useSubmitFormMutation();

  // Set default country when data is loaded
  useEffect(() => {
    if (countriesData?.countries && countriesData.countries.length > 0 && !selectedCountry) {
      // Use detected country from IP, or from API response defaultCountry, or fallback to AE
      const countryCodeToUse = detectedCountryCode || countriesData.defaultCountry || "AE";
      
      // Normalize country code to uppercase for comparison
      const normalizedCode = countryCodeToUse.toUpperCase();
      const detected = countriesData.countries.find(c => c.code.toUpperCase() === normalizedCode);
      
      if (detected) {
        setSelectedCountry(detected);
      } else {
        // Default to UAE if detected country not in list
        const uae = countriesData.countries.find(c => c.code === "AE");
        setSelectedCountry(uae || countriesData.countries[0]);
      }
    }
  }, [countriesData, detectedCountryCode, selectedCountry]);

  // Fallback country on error
  useEffect(() => {
    if (countriesError && !selectedCountry) {
      const fallbackCountry: CountryData = {
        code: "AE",
        name: "UAE",
        dialCode: "+971",
        format: "00-000-0000",
        placeholder: "00-000-0000",
        flag: "🇦🇪"
      };
      setSelectedCountry(fallbackCountry);
    }
  }, [countriesError, selectedCountry]);

  const isLoading = isLoadingCountries || isLoadingDetection;
  const countries = countriesData?.countries || [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Please accept the privacy policy",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCountry) {
      toast({
        title: "Please select a country",
        variant: "destructive",
      });
      return;
    }

    // Prepare phone number with country code prefix
    const phoneWithCode = selectedCountry.dialCode + formData.phone.trim().replace(/^\+/, '');
    
    // Prepare data for API submission
    const submissionData: FormSubmissionData = {
      name: formData.name.trim(),
      phone: phoneWithCode, // Phone number with country code prefix (e.g., +971501234567)
      company: formData.company?.trim() || undefined,
      email: formData.email.trim(),
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name,
      privacyAccepted: formData.privacy,
      timestamp: new Date().toISOString(),
    };

    // Submit using mutation
    submitMutation.mutate(submissionData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          name: "",
          phone: "",
          company: "",
          email: "",
          privacy: false,
        });
        
        // Show success message
        toast({
          title: "Request submitted successfully!",
          description: "We will contact you within 24 hours.",
        });
        
        // Redirect to thank you page
        navigate("/thank-you");
      },
      onError: (error) => {
        console.error("Form submission error:", error);
        toast({
          title: "Submission failed",
          description: error.message || "Please try again later or contact us directly.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section ref={sectionRef} id="get-offer" className="relative min-h-[600px] overflow-hidden scroll-section-content bg-black" style={{ scrollMarginTop: '65px' }}>
      {/* Common Parallax Background for entire section - Fixed background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/b2b/images/CHICZEN_bicchieri_10_form.jpg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Blur overlay with darkening - extends to cover form area + 20px */}
      <div 
        className="absolute inset-0 md:inset-y-0 md:left-0 z-[2] form-blur-overlay"
        style={{
          backgroundColor: 'hsla(220, 50%, 22%, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />
      
      <div className="container mx-auto max-w-[1440px] px-3 md:px-4 relative z-10">
        <div className="grid md:grid-cols-[40%_60%] min-h-[600px] relative">
          
          {/* Form Side */}
          <div className="relative flex items-center justify-center z-10 w-full h-full">
            <div className="relative z-10 w-full flex flex-col justify-center py-8 md:py-12">
              <div className="w-full max-w-[600px] mx-auto">
            <h2 className="font-serif text-primary-foreground mb-2 text-center uppercase tracking-wide leading-relaxed">
            Get Your Exclusive Offer
          </h2>
          <p className="text-primary-foreground/80 text-center mb-8">
            Fill in the form and we will contact you within 24 hours
          </p>
          
          {isLoading ? (
            <Loading text="Loading form..." className="py-8" />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            {/* Phone with country selector */}
            <div className="flex gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-colors min-w-[110px] disabled:opacity-50"
                >
                  {selectedCountry ? (
                    <>
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="text-sm">{selectedCountry.dialCode}</span>
                    </>
                  ) : (
                    <span className="text-sm">Loading...</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-primary-foreground/60 ml-auto" strokeWidth={1.2} />
                </button>
                
                {isCountryOpen && countries.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto bg-primary border border-primary-foreground/20 rounded-lg shadow-xl z-50">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-left text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                        <span className="text-primary-foreground/60 ml-auto shrink-0">{country.dialCode}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <input
                type="tel"
                name="phone"
                placeholder={selectedCountry?.placeholder || "Phone Number"}
                value={formData.phone}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
              />
            </div>
            
            <input
              type="text"
              name="company"
              placeholder="Company / Restaurant Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            
            <label className="flex items-center gap-3 cursor-pointer py-2">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                className="w-5 h-5 rounded border-primary-foreground/30 bg-transparent text-accent focus:ring-accent shrink-0"
              />
              <span className="text-primary-foreground/80 text-sm leading-tight">
                I agree to the{" "}
                <a href="/privacy-policy" className="underline hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </span>
            </label>
            
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="btn-light w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? (
                <ButtonLoading className="justify-center" />
              ) : (
                "Get Exclusive Offer"
              )}
            </button>
          </form>
          )}
              </div>
            </div>
          </div>
          
          {/* Image Side - empty, uses common background */}
          <div className="hidden md:block relative overflow-hidden z-10">
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetOfferForm;