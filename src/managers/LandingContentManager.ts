import { BaseManager } from './BaseManager';
 
export type FeaturedIntervention = {
  id: string;
  name: string;
  evidenceLevel: string;
  safetyRating: string;
  summary: string;
  icon: string;
};

export type AudienceSegment = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type MethodologyStep = {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: string;
};

export type CtaContent = {
  headline: string;
  subhead: string;
  buttonLabel: string;
  socialProof: string;
};

export type RoutingMapping = {
  primaryDomain: string;
  appDomain: string;
  alternateDomain: string;
  targetDomain: string;
};

export type SectionCopy = {
  interventions: {
    accent: string;
    title: string;
    subtitle: string;
    evidenceLabel: string;
    safetyLabel: string;
  };
  audience: {
    title: string;
    subtitle: string;
  };
  methodology: {
    accent: string;
    title: string;
    subtitle: string;
  };
};

export type LandingContentState = {
  interventions: FeaturedIntervention[];
  audiences: AudienceSegment[];
  methodology: MethodologyStep[];
  cta: CtaContent;
  routing: RoutingMapping;
  copy: SectionCopy;
};

class LandingContentManagerClass extends BaseManager {
  private readonly state: LandingContentState;

  constructor() {
    super();
    this.state = {
      interventions: [
        { id: 'prp', name: 'Platelet-rich plasma', evidenceLevel: 'Emerging clinical consensus', safetyRating: 'Moderate with expert protocols', summary: 'Autologous platelet concentrates for tissue regeneration and joint health.', icon: 'Syringe' },
        { id: 'plasmapheresis', name: 'Plasmapheresis', evidenceLevel: 'Limited randomized data', safetyRating: 'High complexity', summary: 'Extracorporeal plasma exchange investigating rejuvenation markers.', icon: 'Droplets' },
        { id: 'peptides', name: 'Longevity peptides', evidenceLevel: 'Mixed preclinical', safetyRating: 'Requires specialist oversight', summary: 'Targeted peptide stacks modulating cellular signaling pathways.', icon: 'Activity' },
        { id: 'redLight', name: 'Red light therapy', evidenceLevel: 'Growing human trials', safetyRating: 'Generally well tolerated', summary: 'Photobiomodulation for mitochondrial resilience and skin health.', icon: 'SunMedium' },
        { id: 'hbot', name: 'Hyperbaric oxygen', evidenceLevel: 'Strong niche studies', safetyRating: 'Medical supervision needed', summary: 'Pressurized oxygen protocols for recovery and neuroplasticity.', icon: 'Waveform' },
        { id: 'tert', name: 'TERT modulation', evidenceLevel: 'Speculative early-stage', safetyRating: 'Investigational only', summary: 'Telomerase activation strategies exploring cellular age reversal.', icon: 'Dna' }
      ],
      audiences: [
        { id: 'coaches', name: 'Performance coaches', description: 'Translate research into client-ready interventions without losing nuance.', icon: 'UserRoundCheck' },
        { id: 'clinicians', name: 'Longevity clinicians', description: 'Track safety signals and mechanistic rationale before integrating protocols.', icon: 'Stethoscope' },
        { id: 'nutritionists', name: 'Nutrition strategists', description: 'Align nutraceutical stacks with biomarker-backed outcomes.', icon: 'Apple' },
        { id: 'researchers', name: 'Medical researchers', description: 'Survey consolidated trial data and methodology critiques in one workspace.', icon: 'FlaskConical' },
        { id: 'prosumers', name: 'Informed prosumers', description: 'Understand where hype ends and validated gains begin.', icon: 'Sparkles' },
        { id: 'patients', name: 'Concerned patients', description: 'Decide with your care team using transparent risk/benefit breakdowns.', icon: 'HeartPulse' }
      ],
      methodology: [
        { id: 'curate', title: 'Curate the frontier', description: 'Screen journals, registries, and private datasets with PhD-level analysts.', metric: '150+ sources monitored', icon: 'Search' },
        { id: 'evaluate', title: 'Evaluate rigor', description: 'Grade study quality, effect sizes, and reproducibility with transparent scoring.', metric: '9-dimension rubric', icon: 'Scale' },
        { id: 'monitor', title: 'Monitor outcomes', description: 'Synthesize practitioner reported outcomes and adverse event logs in real time.', metric: 'Live safety bulletins', icon: 'Radar' }
      ],
      cta: {
        headline: 'Ready to Transform Your Research?',
        subhead: 'Join thousands of researchers who are already using our platform',
        buttonLabel: 'Start Free Trial',
        socialProof: 'Join 10,000+ researchers'
      },
      routing: {
        primaryDomain: 'longevidence.org',
        appDomain: 'app.longevidence.org',
        alternateDomain: 'longevidence.app',
        targetDomain: 'the.longevidence.app'
      },
      copy: {
        interventions: {
          accent: 'Solutions',
          title: 'Featured Interventions',
          subtitle: 'Powerful tools designed for modern research workflows',
          evidenceLabel: 'Evidence Level',
          safetyLabel: 'Safety Rating'
        },
        audience: {
          title: 'Built for Every Researcher',
          subtitle: 'Tailored solutions for different research needs and workflows'
        },
        methodology: {
          accent: 'Process',
          title: 'Our Methodology',
          subtitle: 'A systematic approach to research excellence'
        }
      }
    };
  }

  getState(): LandingContentState {
    return this.state;
  }


  getFeaturedInterventions(): FeaturedIntervention[] {
    return this.state.interventions;
  }

  getAudienceSegments(): AudienceSegment[] {
    return this.state.audiences;
  }

  getMethodologySteps(): MethodologyStep[] {
    return this.state.methodology;
  }

  getCtaContent(): CtaContent {
    return this.state.cta;
  }

  getRoutingMapping(): RoutingMapping {
    return this.state.routing;
  }

  getCopy(): SectionCopy {
    return this.state.copy;
  }
}


export const LandingContentManager = new LandingContentManagerClass();
