import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import TrustedBy from "@/components/TrustedBy";
import Benefits from "@/components/Benefits";
import ProductCollections from "@/components/ProductCollections";
import Team from "@/components/Team";
import GetOfferForm from "@/components/GetOfferForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Amprio Milano | Italian Unbreakable Tableware for Hotels & Restaurants in Dubai</title>
        <meta name="description" content="Premium Italian unbreakable glassware and tableware available in Dubai warehouse. Up to 60% off on stock liquidation. Perfect for hotels, restaurants & events." />
      </Helmet>
      <Header />
      <main className="min-h-screen">
        {/* Hero - base layer */}
        <div className="relative z-0">
          <HeroSlider />
        </div>
        
        {/* Scrolling sections that overlay hero */}
        <div className="relative z-10">
          <TrustedBy />
        </div>
        
        <div className="relative z-20">
          <Benefits />
        </div>
        
        <div className="relative z-30">
          <ProductCollections />
        </div>
        
        <div className="relative z-40">
          <Team />
        </div>
        
        <div className="relative z-50">
          <GetOfferForm />
        </div>
      </main>
      
      <div className="relative z-[60]">
        <Footer />
      </div>
    </>
  );
};

export default Index;
