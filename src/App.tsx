import { HeroSection } from './components/sections/HeroSection';
import { ContentMapSection } from './components/sections/ContentMapSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { CtaSection } from './components/sections/CtaSection';
import { FooterSection } from './components/sections/FooterSection';

const App: React.FC = () => {

  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <ContentMapSection />
      <HowItWorksSection />
      {/* <FeaturedInterventionsSection interventions={interventions} /> */}
      <CtaSection />
      <FooterSection />
      {/* <MethodologySection steps={methodology} /> */}
    </main>
  );
};

export default App;
