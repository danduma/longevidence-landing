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

export type ContentMapIntervention = {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  url?: string;
};

export type ContentMapCategory = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  interventions: ContentMapIntervention[];
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
  interventions: Record<string, string>;
  contentMap: Record<string, string>;
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

export type LandingContentState = {
  interventions: FeaturedIntervention[];
  contentMap: ContentMapCategory[];
  audiences: AudienceSegment[];
  methodology: MethodologyStep[];
  cta: CtaContent;
  routing: RoutingMapping;
  socials: SocialLink[];
  siteMeta: SiteMeta;
};

class LandingContentManagerClass extends BaseManager {
  private state: LandingContentState;

  constructor() {
    super();
    this.state = this.buildState();
  }

  private buildState(): LandingContentState {
    return {
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
          id: 'lifestyleWellness',
          name: 'Lifestyle & Wellness',
          icon: 'HeartPulse',
          summary: 'Foundational behaviors aligning recovery, purpose, and resilience.',
          interventions: [
            { id: 'sleep', label: 'Sleep', subtitle: 'Restorative rest, circadian rhythm', icon: 'Moon', url: 'https://app.longevidence.org/pages/sleep' },
            { id: 'nutrition', label: 'Nutrition', subtitle: 'Diet, fasting, supplements', icon: 'Apple' },
            { id: 'exercise', label: 'Exercise', subtitle: 'Strength, cardio, flexibility', icon: 'Dumbbell', url: 'https://app.longevidence.org/pages/exercise' },
            { id: 'relationships', label: 'Relationships', subtitle: 'Social connections, community', icon: 'Users', url: 'https://app.longevidence.org/pages/relationships' },
            { id: 'purpose', label: 'Purpose', subtitle: 'Meaning, goals, contribution', icon: 'Compass' },
            { id: 'stressManagement', label: 'Stress management', subtitle: 'Mindfulness, meditation, nature, sunlight, detox', icon: 'Sparkles' },
            { id: 'habits', label: 'Habits & routines', subtitle: 'Daily practices, behavior change', icon: 'Repeat' }
          ]
        },
        {
          id: 'biohacking',
          name: 'Biohacking',
          icon: 'Cpu',
          summary: 'Self-experimentation with data-rich tools and experimental compounds.',
          interventions: [
            { id: 'hormesis', label: 'Hormesis', subtitle: 'Fasting, sauna, ice baths', icon: 'Flame' },
            { id: 'supplements', label: 'Supplements', subtitle: 'Vitamins, minerals, botanicals', icon: 'Pill' },
            { id: 'nootropics', label: 'Nootropics', subtitle: 'Cognitive enhancers, smart drugs', icon: 'Brain' },
            { id: 'unapproved', label: 'Unapproved drugs', subtitle: 'Off-label, experimental compounds', icon: 'FlaskRound' },
            { id: 'peptides', label: 'Peptides', subtitle: 'BPC-157, TB-500, GHK-Cu', icon: 'Atom' },
            { id: 'wearables', label: 'Wearables', subtitle: 'SpO2, CGM, fitness trackers', icon: 'Watch' },
            { id: 'omics', label: 'Consumer OMICS tests', subtitle: 'Genomics, proteomics, microbiome', icon: 'ScanEye' }
          ]
        },
        {
          id: 'longevityClinics',
          name: 'Longevity Clinics',
          icon: 'Building',
          summary: 'Integrated programs delivering advanced protocols under expert supervision.',
          interventions: [
            { id: 'plasmapheresis', label: 'Blood therapies', subtitle: 'Plasmapheresis, TPE, PRP, IV infusions', icon: 'Droplets', url: 'https://app.longevidence.org/en/pages/prp-platelet-rich-plasma' },
            { id: 'stemCell', label: 'Stem cell therapies', subtitle: 'Regenerative medicine, MSCs', icon: 'TestTubeDiagonal', url: 'https://app.longevidence.org/en/pages/stem-cell-therapy' },
            { id: 'lightOxygen', label: 'Light & oxygen', subtitle: 'Red light therapy, HBOT', icon: 'SunMedium' },
            { id: 'bodyScans', label: 'Body scans', subtitle: 'MRI, DEXA, full-body imaging', icon: 'ScanLine' }
          ]
        },
        {
          id: 'esthetics',
          name: 'Esthetics',
          icon: 'Sparkles',
          summary: 'Aesthetic longevity treatments balancing appearance and cellular repair.',
          interventions: [
            { id: 'injectionsTopicals', label: 'Injectables & topicals', subtitle: 'Botox, fillers, creams, retinoids', icon: 'Syringe' },
            { id: 'bodyReshaping', label: 'Body reshaping', subtitle: 'Liposuction, cosmetic surgery', icon: 'ScissorsLineDashed' },
            { id: 'dermalLaser', label: 'Dermal treatments', subtitle: 'Lasers, peels, acne treatments', icon: 'Sparkle' },
            { id: 'restoration', label: 'Restoration', subtitle: 'Hair restoration, teeth whitening', icon: 'Smile' }
          ]
        },
        {
          id: 'biomedicalResearch',
          name: 'Biomedical Research',
          icon: 'FlaskConical',
          summary: 'Next-gen therapies emerging from labs and translational science.',
          interventions: [
            { id: 'agingClocks', label: 'Biomarkers & aging clocks', subtitle: 'Epigenetic, metabolomic testing', icon: 'Timer' },
            { id: 'geneticEngineering', label: 'Genetic engineering', subtitle: 'CRISPR, base editing, prime editing', icon: 'Dna' },
            { id: 'geroprotectiveDrugs', label: 'Geroprotective drugs', subtitle: 'Rapamycin, metformin, NAD+ boosters', icon: 'Tablets' },
            { id: 'senolytics', label: 'Senolytics', subtitle: 'Clearing senescent cells', icon: 'CircleX' },
            { id: 'geneTherapy', label: 'Gene therapy', subtitle: 'TERT, Klotho, Follistatin', icon: 'Syringe' },
            { id: 'cellReprogramming', label: 'Cell reprogramming', subtitle: 'Yamanaka factors, partial reprogramming', icon: 'RefreshCcw' },
            { id: 'artificialOrgans', label: 'Artificial organs', subtitle: 'Bioprinting, organoids', icon: 'Heart' },
            { id: 'cloning', label: 'Cloning', subtitle: 'Reproductive, therapeutic', icon: 'Copy' },
            { id: 'cryopreservation', label: 'Cryopreservation', subtitle: 'Whole-body, neuroscience', icon: 'Snowflake' }
          ]
        },
        {
          id: 'conventionalMedicine',
          name: 'Conventional Medicine',
          icon: 'Stethoscope',
          summary: 'Clinical-grade care for diagnostics, chronic disease, and acute response.',
          interventions: [
            { id: 'diagnosis', label: 'Diagnosis & triage', subtitle: 'Testing, screening, assessment', icon: 'Stethoscope' },
            { id: 'hospitalCare', label: 'Hospital care', subtitle: 'Inpatient, intensive care', icon: 'Hospital' },
            { id: 'approvedDrugs', label: 'Approved drugs', subtitle: 'FDA-approved medications', icon: 'Pill' },
            { id: 'emergencyResponse', label: 'Emergency response', subtitle: 'Trauma, acute care', icon: 'Siren' },
            { id: 'chronicManagement', label: 'Chronic disease management', subtitle: 'Diabetes, hypertension, heart disease', icon: 'ClipboardList' },
            { id: 'surgery', label: 'Surgery & procedures', subtitle: 'Operative interventions', icon: 'Activity' }
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
        interventions: {
          prp: 'https://app.longevidence.org/en/pages/prp-platelet-rich-plasma',
          plasmapheresis: 'https://app.longevidence.org/en/pages/plasmapheresis',
          peptides: 'https://app.longevidence.org/en/pages/peptides',
          redLight: 'https://app.longevidence.org/en/pages/red-light-therapy',
          hbot: 'https://app.longevidence.org/en/pages/hyperbaric-oxygen-therapy',
          tert: 'https://app.longevidence.org/en/pages/tert-modulation'
        },
        contentMap: {
          lifestyleWellness: 'https://app.longevidence.org/en/pages/lifestyle-wellness',
          biohacking: 'https://app.longevidence.org/en/pages/biohacking',
          longevityClinics: 'https://app.longevidence.org/en/pages/longevity-clinics',
          esthetics: 'https://app.longevidence.org/en/pages/esthetics',
          biomedicalResearch: 'https://app.longevidence.org/en/pages/biomedical-research',
          conventionalMedicine: 'https://app.longevidence.org/en/pages/conventional-medicine'
        },
        appDomain: getEnvVar('VITE_ROUTING_APP_DOMAIN'),
        alternateDomain: getEnvVar('VITE_ROUTING_ALT_DOMAIN'),
        targetDomain: getEnvVar('VITE_ROUTING_TARGET_DOMAIN')
      },
      socials: [
        { id: 'x', label: 'X', icon: 'XBrand', url: getEnvVar('VITE_SOCIAL_TWITTER_URL') },
        { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', url: getEnvVar('VITE_SOCIAL_LINKEDIN_URL') },
        { id: 'instagram', label: 'Instagram', icon: 'Instagram', url: getEnvVar('VITE_SOCIAL_INSTAGRAM_URL') },
        { id: 'youtube', label: 'YouTube', icon: 'Youtube', url: getEnvVar('VITE_SOCIAL_YOUTUBE_URL') },
        { id: 'substack', label: 'Substack', icon: 'Newspaper', url: getEnvVar('VITE_SOCIAL_SUBSTACK_URL') },
        { id: 'reddit', label: 'Reddit', icon: 'Reddit', url: getEnvVar('VITE_SOCIAL_REDDIT_URL') }
      ],
      siteMeta: {
        siteName: getEnvVar('VITE_SITE_NAME'),
        socialHandle: getEnvVar('VITE_SITE_TWITTER_HANDLE')
      }
    };
  }

  refreshState(): void {
    this.state = this.buildState();
    this.emitChange();
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

  getSocialLinks(): SocialLink[] {
    return this.state.socials;
  }

  getSiteMeta(): SiteMeta {
    return this.state.siteMeta;
  }
}

export const LandingContentManager = new LandingContentManagerClass();