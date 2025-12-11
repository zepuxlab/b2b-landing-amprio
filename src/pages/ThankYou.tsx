import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Thank You | Amprio Milano</title>
        <meta name="description" content="Thank you for your request. Our team will contact you within 24 hours to discuss your exclusive offer." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://office.ampriomilano.com/b2b/thank-you" />
      </Helmet>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/b2b/images/CHICZEN-BACI-MILANO.jpg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />
        
        {/* Darkening Overlay */}
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.50), rgba(0,0,0,0.50))" }}
        />
        
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 animate-fade-in uppercase tracking-wide leading-tight">
              Thank You!
            </h1>

            <p className="text-primary-foreground/80 text-lg md:text-xl mb-6 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Your request has been successfully submitted.
            </p>

            <p className="text-primary-foreground/70 text-base md:text-lg mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.4s" }}>
              Our team will contact you within 24 hours to discuss your exclusive offer.
            </p>

            <div className="flex justify-center items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <button
                onClick={() => navigate("/")}
                className="bg-primary-foreground text-primary px-8 py-3 font-medium transition-all duration-300 hover:bg-primary-foreground/90 hover:shadow-lg rounded-lg"
                style={{
                  height: '48px',
                  minHeight: '48px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou;

