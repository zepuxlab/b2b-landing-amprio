import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import { Loading } from "@/components/ui/loading";

// Lazy load components that are below the fold
const TrustedBy = lazy(() => import("@/components/TrustedBy"));
const Benefits = lazy(() => import("@/components/Benefits"));
const ProductCollections = lazy(() => import("@/components/ProductCollections"));
const Team = lazy(() => import("@/components/Team"));
const GetOfferForm = lazy(() => import("@/components/GetOfferForm"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

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
      </Helmet>
      <Header />
      <main className="min-h-screen">
        {/* Hero - base layer */}
        <div className="relative z-0">
          <HeroSlider />
        </div>
        
        {/* Scrolling sections that overlay hero - lazy loaded */}
        <div className="relative z-10">
          <Suspense fallback={<Loading className="py-20" />}>
            <TrustedBy />
          </Suspense>
        </div>
        
        <div className="relative z-20">
          <Suspense fallback={<Loading className="py-20" />}>
            <Benefits />
          </Suspense>
        </div>
        
        <div className="relative z-30">
          <Suspense fallback={<Loading className="py-20" />}>
            <ProductCollections />
          </Suspense>
        </div>
        
        <div className="relative z-40">
          <Suspense fallback={<Loading className="py-20" />}>
            <Team />
          </Suspense>
        </div>
        
        <div className="relative z-50">
          <Suspense fallback={<Loading className="py-20" />}>
            <GetOfferForm />
          </Suspense>
        </div>
      </main>
      
      <div className="relative z-[60]">
        <Suspense fallback={<Loading className="py-20" />}>
          <Footer />
        </Suspense>
      </div>
      
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </>
  );
};

export default Index;
