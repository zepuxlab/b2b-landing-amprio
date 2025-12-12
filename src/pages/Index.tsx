import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import TrustedBy from "@/components/TrustedBy";
import Benefits from "@/components/Benefits";
import ProductCollections from "@/components/ProductCollections";
import Team from "@/components/Team";
import GetOfferForm from "@/components/GetOfferForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Premium Italian Tableware - Dubai & UAE</title>
        <meta name="description" content="Amprio Milano offers premium Italian tableware and décor, blending elegance, durability" />
        <meta property="og:title" content="Premium Italian Tableware - Dubai & UAE" />
        <meta property="og:description" content="Amprio Milano offers premium Italian tableware and décor, blending elegance, durability" />
        <meta property="og:url" content="https://office.ampriomilano.com/b2b" />
        <meta property="og:image" content="https://office.ampriomilano.com/b2b/images/Baci_Milano_chiczen_.jpg" />
        
        {/* Preload critical resources for LCP */}
        <link rel="preload" href="/b2b/images/brezee_1.jpg.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="https://office.ampriomilano.com/cdn/fonts/CabinetGrotesk-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://office.ampriomilano.com/cdn/fonts/SangBleuSunrise.ttf" as="font" type="font/truetype" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://office.ampriomilano.com" />
        <link rel="dns-prefetch" href="https://office.ampriomilano.com" />
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
      
      <WhatsAppButton />
    </>
  );
};

export default Index;
