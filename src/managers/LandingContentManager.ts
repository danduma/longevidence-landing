import { BaseManager } from './BaseManager';
import { getEnvVar } from './env';

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

export type SocialLink = {
  id: string;
  label: string;
  icon: string;
  url: string;
};

export type SiteMeta = {
  siteName: string;
  socialHandle: string;
};

export type ContentMapIntervention = {
  id: string;
  label: string;
};

export type ContentMapCategory = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  interventions: ContentMapIntervention[];
};

export type SectionCopy = {
  interventions: {
    accent: string;
    title: string;
    subtitle: string;
    evidenceLabel: string;
    safetyLabel: string;
  };
  contentMap: {
    accent: string;
    title: string;
    subtitle: string;
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
  contentMap: ContentMapCategory[];
  audiences: AudienceSegment[];
  methodology: MethodologyStep[];
  cta: CtaContent;
  routing: RoutingMapping;
  copy: SectionCopy;
  socials: SocialLink[];
  siteMeta: SiteMeta;
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
      contentMap: [
        {
          id: 'cosmetics',
          name: 'Cosmetics',
          icon: 'Sparkles',
          summary: 'Aesthetic longevity treatments balancing appearance and cellular repair.',
          interventions: [
            { id: 'injectionsTopicals', label: 'Botox, fillers, creams, retinoids' },
            { id: 'bodyReshaping', label: 'Liposuction, cosmetic surgery' },
            { id: 'dermalLaser', label: 'Lasers, acne treatments' },
            { id: 'restoration', label: 'Hair restoration, teeth whitening' }
          ]
        },
        {
          id: 'conventionalMedicine',
          name: 'Conventional Medicine',
          icon: 'Stethoscope',
          summary: 'Clinical-grade care for diagnostics, chronic disease, and acute response.',
          interventions: [
            { id: 'diagnosis', label: 'Diagnosis & triage' },
            { id: 'hospitalCare', label: 'Hospital care' },
            { id: 'approvedDrugs', label: 'Approved drugs' },
            { id: 'emergencyResponse', label: 'Emergency response' },
            { id: 'chronicManagement', label: 'Chronic disease management' },
            { id: 'surgery', label: 'Surgery & procedures' }
          ]
        },
        {
          id: 'biomedicalResearch',
          name: 'Biomedical Research',
          icon: 'FlaskConical',
          summary: 'Next-gen therapies emerging from labs and translational science.',
          interventions: [
            { id: 'agingClocks', label: 'Biomarkers & aging clocks' },
            { id: 'geneticEngineering', label: 'Genetic engineering' },
            { id: 'geroprotectiveDrugs', label: 'Geroprotective drugs' },
            { id: 'senolytics', label: 'Senolytics' },
            { id: 'geneTherapy', label: 'Gene therapy: TERT, Klotho, Follistatin' },
            { id: 'cellReprogramming', label: 'Cell reprogramming' },
            { id: 'artificialOrgans', label: 'Artificial organs' },
            { id: 'cloning', label: 'Cloning' },
            { id: 'cryopreservation', label: 'Cryopreservation' }
          ]
        },
        {
          id: 'lifestyleWellness',
          name: 'Lifestyle & Wellness',
          icon: 'HeartPulse',
          summary: 'Foundational behaviors aligning recovery, purpose, and resilience.',
          interventions: [
            { id: 'sleep', label: 'Sleep' },
            { id: 'nutrition', label: 'Nutrition' },
            { id: 'exercise', label: 'Exercise' },
            { id: 'relationships', label: 'Relationships' },
            { id: 'purpose', label: 'Purpose' },
            { id: 'stressManagement', label: 'Stress management: mindfulness, meditation, nature, sunlight, detox' },
            { id: 'habits', label: 'Habits & routines' }
          ]
        },
        {
          id: 'biohacking',
          name: 'Biohacking',
          icon: 'Cpu',
          summary: 'Self-experimentation with data-rich tools and experimental compounds.',
          interventions: [
            { id: 'hormesis', label: 'Hormesis: Fasting, sauna, ice baths' },
            { id: 'supplements', label: 'Supplements' },
            { id: 'nootropics', label: 'Nootropics' },
            { id: 'unapproved', label: 'Unapproved drugs' },
            { id: 'peptides', label: 'Peptides' },
            { id: 'wearables', label: 'Wearables (SpO2, CGM)' },
            { id: 'omics', label: 'Consumer OMICS tests' }
          ]
        },
        {
          id: 'longevityClinics',
          name: 'Longevity Clinics',
          icon: 'Building',
          summary: 'Integrated programs delivering advanced protocols under expert supervision.',
          interventions: [
            { id: 'plasmapheresis', label: 'Plasmapheresis/TPE, PRP, IV infusions' },
            { id: 'stemCell', label: 'Stem cell therapies' },
            { id: 'lightOxygen', label: 'Red light therapy, HBOT' },
            { id: 'bodyScans', label: 'Body scans' }
          ]
        }
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
        headline: getEnvVar('VITE_CTA_HEADLINE'),
        subhead: getEnvVar('VITE_CTA_SUBHEAD'),
        buttonLabel: getEnvVar('VITE_CTA_BUTTON'),
        socialProof: getEnvVar('VITE_SOCIAL_PROOF')
      },
      routing: {
        primaryDomain: 'longevidence.org',
        appDomain: 'app.longevidence.org',
        alternateDomain: 'longevidence.app',
        targetDomain: 'the.longevidence.app'
      },
      socials: [
        { id: 'x', label: 'X', icon: 'XBrand', url: getEnvVar('VITE_SOCIAL_TWITTER_URL') },
        { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', url: getEnvVar('VITE_SOCIAL_LINKEDIN_URL') },
        { id: 'instagram', label: 'Instagram', icon: 'Instagram', url: getEnvVar('VITE_SOCIAL_INSTAGRAM_URL') },
        { id: 'youtube', label: 'YouTube', icon: 'Youtube', url: getEnvVar('VITE_SOCIAL_YOUTUBE_URL') },
        { id: 'substack', label: 'Substack', icon: 'Newspaper', url: getEnvVar('VITE_SOCIAL_SUBSTACK_URL') },
        { id: 'reddit', label: 'Reddit', icon: 'MessageCircle', url: getEnvVar('VITE_SOCIAL_REDDIT_URL') }
      ],
      siteMeta: {
        siteName: getEnvVar('VITE_SITE_NAME'),
        socialHandle: getEnvVar('VITE_SITE_TWITTER_HANDLE')
      },
      copy: {
        interventions: {
          accent: 'Solutions',
          title: 'Featured Pages',
          subtitle: 'Powerful tools designed for modern research workflows',
          evidenceLabel: 'Evidence Level',
          safetyLabel: 'Safety Rating'
        },
        contentMap: {
          accent: 'Landscape',
          title: 'Map of all longevity interventions',
          subtitle: 'Explore six domains shaping how interventions evolve from labs to lifestyle'
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

  getContentMap(): ContentMapCategory[] {
    return this.state.contentMap;
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

  getSocialLinks(): SocialLink[] {
    return this.state.socials;
  }

  getSiteMeta(): SiteMeta {
    return this.state.siteMeta;
  }
}


export const LandingContentManager = new LandingContentManagerClass();
