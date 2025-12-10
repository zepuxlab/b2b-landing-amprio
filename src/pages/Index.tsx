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
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <TrustedBy />
      <Benefits />
      <ProductCollections />
      <Team />
      <GetOfferForm />
      <Footer />
    </main>
  );
};

export default Index;
