export interface CaseStudySection {
  id: string;
  title: string;
  shortTitle: string; // for TOC
  type: "hero" | "text" | "diagram" | "table" | "slider" | "stats" | "marquee" | "competitive-grid" | "application-journey" | "impact-table";
}

export interface HeroData {
  logo: string;
  tagline: string;
  subtitle: string;
  mockupImages: string[];
  gradientFrom: string;
  gradientTo: string;
}

export interface TextBlock {
  heading?: string;
  badge?: string; // small label above heading like "Problem Statement"
  body?: string;
  bullets?: { title: string; description: string }[];
  numberedItems?: { title: string; description: string }[];
}

export interface DiagramData {
  heading: string;
  badge?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  gradientBg?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface CompetitorRow {
  logo?: string;
  company: string;
  invoiceDetails: string;
  pricing: string;
  regulated: string;
  otherProducts: string;
}

export interface SliderImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface StatItem {
  value: string; // e.g. "40+"
  numericValue: number; // e.g. 40
  suffix?: string; // e.g. "+"
  label: string; // e.g. "Partners onboarded"
}

export interface PartnerLogo {
  name: string;
  logoSrc?: string; // if we have the actual logo
}

export interface ImpactRow {
  area: string;
  metrics: string;
  achievedImpact: string;
}

export interface ImpactData {
  heading: string;
  badge?: string;
  rows: ImpactRow[];
}

export interface ScreenData {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface ScreenSection {
  heading: string;
  badge?: string;
  description: string;
  screens: ScreenData[];
  compositionImage?: string; // full composition hero image for the section
}

export interface CaseStudy {
  slug: string;
  title: string;
  sections: CaseStudySection[];
  hero: HeroData;
  problemStatement: TextBlock;
  problemChallenge: TextBlock;
  designApproach: DiagramData;
  research: { heading: string; badge?: string; description: string; competitors: CompetitorRow[] };
  solution: TextBlock;
  lendingModel: DiagramData;
  competitiveEdge: TextBlock;
  userFlows: { heading: string; badge?: string; description: string; slides: SliderImage[] };
  smeJourney: ScreenSection; // SME application journey screens
  dashboard: ScreenSection;
  missionControl: ScreenSection;
  embeddedJourneys: ScreenSection;
  myImpact: ImpactData;
  partnersImpact: { heading: string; partners: PartnerLogo[]; stats: StatItem[] };
}
