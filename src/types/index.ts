export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  dateRange: string;
  location: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  companyLogo?: string;
  companyLogoAlt?: string;
  caseStudyUrl?: string;
}
