import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { ContentMapSection } from '../sections/ContentMapSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { CtaSection } from '../sections/CtaSection';
import { FooterSection } from '../sections/FooterSection';

export const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ContentMapSection />
      <HowItWorksSection />
      <CtaSection />
      <FooterSection />
    </>
  );
};

