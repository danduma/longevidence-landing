import { HeroSection } from './components/sections/HeroSection';
import { FeaturedInterventionsSection } from './components/sections/FeaturedInterventionsSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { useManagerState } from './hooks/useManagerState';
import { LandingContentManager } from './managers/LandingContentManager';

const App: React.FC = () => {
  const interventions = useManagerState(LandingContentManager, () =>
    LandingContentManager.getFeaturedInterventions()
  );
  const methodology = useManagerState(LandingContentManager, () =>
    LandingContentManager.getMethodologySteps()
  );
  // Removed unused CTA and routing selections to satisfy lint rules
  const copy = useManagerState(LandingContentManager, () => LandingContentManager.getCopy());

  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <FeaturedInterventionsSection interventions={interventions} copy={copy.interventions} />
      <MethodologySection steps={methodology} copy={copy.methodology} />
    </main>
  );
};

export default App;
