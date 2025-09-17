import { HeroSection } from './components/sections/HeroSection';
import { FeaturedInterventionsSection } from './components/sections/FeaturedInterventionsSection';
import { AudienceSection } from './components/sections/AudienceSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { CtaSection } from './components/sections/CtaSection';
import { useManagerState } from './hooks/useManagerState';
import { LandingContentManager } from './managers/LandingContentManager';

const App: React.FC = () => {
  const interventions = useManagerState(LandingContentManager, () =>
    LandingContentManager.getFeaturedInterventions()
  );
  const audience = useManagerState(LandingContentManager, () =>
    LandingContentManager.getAudienceSegments()
  );
  const methodology = useManagerState(LandingContentManager, () =>
    LandingContentManager.getMethodologySteps()
  );
  const cta = useManagerState(LandingContentManager, () => LandingContentManager.getCtaContent());
  const routing = useManagerState(LandingContentManager, () =>
    LandingContentManager.getRoutingMapping()
  );
  const copy = useManagerState(LandingContentManager, () => LandingContentManager.getCopy());

  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <FeaturedInterventionsSection interventions={interventions} copy={copy.interventions} />
      <AudienceSection audience={audience} copy={copy.audience} />
      <MethodologySection steps={methodology} copy={copy.methodology} />
      <CtaSection cta={cta} routing={routing} />
    </main>
  );
};

export default App;
