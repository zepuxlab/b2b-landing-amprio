import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Amprio Milano</title>
        <meta name="description" content="Privacy Policy for Amprio Milano B2B platform. Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://office.ampriomilano.com/b2b/privacy-policy" />
      </Helmet>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg border border-border/50">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 uppercase tracking-wide">
              Privacy Policy
            </h1>
            
            <p className="text-foreground/60 mb-8" style={{ fontSize: '16.5px' }}>
              Last updated: January 2025
            </p>
            
            <div className="space-y-8" style={{ fontSize: '16.5px' }}>
              <section>
                <h2 className="text-foreground text-xl md:text-2xl font-medium mb-4 mt-8">
                  Introduction
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  At Amprio Milano, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our B2B platform.
                </p>
              </section>

              <section>
                <h2 className="text-foreground text-xl md:text-2xl font-medium mb-4 mt-8">
                  Information We Collect
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Company information (company name, business address)</li>
                  <li>Usage data and analytics information</li>
                  <li>Device information and IP address</li>
                </ul>
              </section>

              <section>
                <h2 className="text-foreground text-xl md:text-2xl font-medium mb-4 mt-8">
                  How We Use Your Information
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Process and respond to your inquiries and requests</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-foreground text-xl md:text-2xl font-medium mb-4 mt-8">
                  Data Security
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-foreground text-xl md:text-2xl font-medium mb-4 mt-8">
                  Your Rights
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-foreground text-xl md:text-2xl font-medium mb-4 mt-8">
                  Contact Us
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  Email: <a href="mailto:info@amprio.ae" className="underline hover:text-primary transition-colors">info@amprio.ae</a>
                  <br />
                  Phone: <a href="tel:+971501234567" className="underline hover:text-primary transition-colors">+971 50 123 4567</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

