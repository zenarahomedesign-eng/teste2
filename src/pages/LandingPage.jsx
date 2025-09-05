import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="bg-[#F4F7F9]">
      <Helmet>
        <title>Móveis Gestão Empresarial - Transforme sua Loja</title>
        <meta name="description" content="A plataforma completa para transformar a gestão da sua loja de móveis planejados. CRM, projetos, finanças e muito mais." />
      </Helmet>
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;