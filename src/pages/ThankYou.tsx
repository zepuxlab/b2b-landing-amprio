import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
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
      <main className="min-h-screen pt-16 md:pt-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center animate-fade-in">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.2} />
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-in uppercase tracking-wide leading-tight">
              Thank You!
            </h1>

            <p className="text-foreground/80 text-lg md:text-xl mb-6 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Your request has been successfully submitted.
            </p>

            <p className="text-foreground/70 text-base md:text-lg mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.4s" }}>
              Our team will contact you within 24 hours to discuss your exclusive offer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <button
                onClick={() => navigate("/")}
                className="relative text-base px-8 py-3 text-primary-foreground font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg overflow-hidden rounded-lg"
                style={{
                  height: '48px',
                  minHeight: '48px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: 'url(/b2b/images/CHICZEN-BACI-MILANO.jpg.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.50), rgba(0,0,0,0.50))" }}
                />
                <span className="relative z-10">Back to Home</span>
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors px-8 py-3"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={1.2} />
                <span>Go Back</span>
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

