import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, X } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { useCountriesQuery, useCountryDetectionQuery, useSubmitFormMutation, type CountryData } from "@/hooks/use-api";
import { FormSubmissionData } from "@/config/api";
import { Loading, ButtonLoading } from "@/components/ui/loading";

interface CollectionOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: {
    name: string;
    description: string;
    image: string;
  } | null;
}

const CollectionOfferModal = ({ open, onOpenChange, collection }: CollectionOfferModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set default country when data is loaded
  useEffect(() => {
    if (countriesData?.countries && countriesData.countries.length > 0 && !selectedCountry) {
      const countryCodeToUse = detectedCountryCode || countriesData.defaultCountry || "AE";
      const normalizedCode = countryCodeToUse.toUpperCase();
      const detected = countriesData.countries.find(c => c.code.toUpperCase() === normalizedCode);
      setSelectedCountry(detected || countriesData.countries[0]);
    }
  }, [countriesData, detectedCountryCode, selectedCountry]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };

    if (isCountryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        phone: "",
        company: "",
        email: "",
        privacy: false,
      });
    }
  }, [open]);

  const countries = countriesData?.countries || [];
  const isLoading = isLoadingCountries || isLoadingDetection;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCountry) {
      toast({
        title: "Error",
        description: "Please select a country",
        variant: "destructive",
      });
      return;
    }

    if (!formData.privacy) {
      toast({
        title: "Error",
        description: "Please agree to the Privacy Policy",
        variant: "destructive",
      });
      return;
    }

    const phoneNumber = formData.phone.trim();
    const phoneWithCode = selectedCountry.dialCode + phoneNumber.replace(/^\+/, '');
    
    const submissionData: FormSubmissionData = {
      name: formData.name.trim(),
      phone: phoneWithCode,
      company: formData.company.trim() || undefined,
      email: formData.email.trim(),
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name,
      privacyAccepted: formData.privacy,
    };

    submitMutation.mutate(submissionData, {
      onSuccess: () => {
        toast({
          title: "Success!",
          description: "We'll contact you within 24 hours",
        });
        onOpenChange(false);
        setTimeout(() => {
          navigate("/thank-you");
        }, 500);
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error?.message || "Failed to submit form. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  if (!collection) return null;

  const FormContent = ({ showTitle = true, showDescription = true }: { showTitle?: boolean; showDescription?: boolean }) => (
    <div className="space-y-6">
      {showTitle && (
        <div>
          <h3 className="text-primary mb-2 font-serif text-2xl md:text-3xl uppercase tracking-wide">
            Interested?<br />
            {collection.name}
          </h3>
        </div>
      )}
      {showDescription && (
        <div>
          <p className="text-muted-foreground text-left leading-relaxed mb-6" style={{ fontSize: '16.5px' }}>
            {collection.description}
          </p>
          <p className="text-muted-foreground text-left text-sm mb-6">
            Fill in the form and we will contact you within 24 hours
          </p>
        </div>
      )}

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
            className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          
          {/* Phone with country selector */}
          <div className="flex gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-background border border-primary/20 text-foreground hover:bg-accent transition-colors min-w-[110px] disabled:opacity-50"
              >
                {selectedCountry ? (
                  <>
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm">{selectedCountry.dialCode}</span>
                  </>
                ) : (
                  <span className="text-sm">Loading...</span>
                )}
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" strokeWidth={1.2} />
              </button>
              
              {isCountryOpen && countries.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto bg-background border border-primary/20 rounded-lg shadow-xl z-50">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-left text-foreground hover:bg-accent transition-colors text-sm"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                      <span className="text-muted-foreground ml-auto shrink-0">{country.dialCode}</span>
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
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <input
            type="text"
            name="company"
            placeholder="Company / Restaurant Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          
          <label className="flex items-center gap-3 cursor-pointer py-2">
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              className="w-5 h-5 rounded border-primary/30 bg-transparent text-accent focus:ring-accent shrink-0"
            />
            <span className="text-muted-foreground text-sm leading-tight">
              I agree to the{" "}
              <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </span>
          </label>
          
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="btn-dark w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
  );

  // Mobile: Drawer (bottom sheet)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[100vh] !rounded-none !top-0 no-handle !z-[10000] !border-0">
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Image with close button overlay */}
            <div className="relative w-full h-[280px] flex-shrink-0">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover rounded-t-[16px]"
              />
              {/* Close button overlay */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Title */}
            <div className="px-4 pt-4 pb-2 flex-shrink-0">
              <h3 className="text-primary font-serif text-2xl uppercase tracking-wide">
                Interested?<br />
                {collection.name}
              </h3>
            </div>
            
            {/* Description */}
            <div className="px-4 pt-4 flex-shrink-0">
              <p className="text-muted-foreground text-left leading-relaxed mb-4" style={{ fontSize: '16.5px' }}>
                {collection.description}
              </p>
              <p className="text-muted-foreground text-left text-sm mb-4">
                Fill in the form and we will contact you within 24 hours
              </p>
            </div>
            
            {/* Form */}
            <div className="px-4 pb-4 flex-1">
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
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  
                  {/* Phone with country selector */}
                  <div className="flex gap-2">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-background border border-primary/20 text-foreground hover:bg-accent transition-colors min-w-[110px] disabled:opacity-50"
                      >
                        {selectedCountry ? (
                          <>
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span className="text-sm">{selectedCountry.dialCode}</span>
                          </>
                        ) : (
                          <span className="text-sm">Loading...</span>
                        )}
                        <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" strokeWidth={1.2} />
                      </button>
                      
                      {isCountryOpen && countries.length > 0 && (
                        <div className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto bg-background border border-primary/20 rounded-lg shadow-xl z-50">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setIsCountryOpen(false);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2.5 text-left text-foreground hover:bg-accent transition-colors text-sm"
                            >
                              <span className="text-lg">{country.flag}</span>
                              <span className="truncate">{country.name}</span>
                              <span className="text-muted-foreground ml-auto shrink-0">{country.dialCode}</span>
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
                      className="flex-1 px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  
                  <input
                    type="text"
                    name="company"
                    placeholder="Company / Restaurant Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  
                  <label className="flex items-center gap-3 cursor-pointer py-2">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-primary/30 bg-transparent text-accent focus:ring-accent shrink-0"
                    />
                    <span className="text-muted-foreground text-sm leading-tight">
                      I agree to the{" "}
                      <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="btn-dark w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Dialog (modal with image on left, form on right)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="max-w-5xl w-full p-0 gap-0 grid grid-cols-[1fr,1.2fr] overflow-hidden !border-0">
        {/* Left: Image */}
        <div className="relative w-full h-full min-h-[500px] overflow-hidden">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        
        {/* Right: Form */}
        <div className="p-8 overflow-y-auto max-h-[80vh]">
          <FormContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionOfferModal;
