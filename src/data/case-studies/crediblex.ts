import { CaseStudy } from "@/types/case-study";

export const crediblexCaseStudy: CaseStudy = {
  slug: "crediblex",
  title: "CredibleX",

  sections: [
    { id: "hero", title: "Overview", shortTitle: "Overview", type: "hero" },
    { id: "problem", title: "Problem Statement", shortTitle: "Problem", type: "text" },
    { id: "approach", title: "Design Approach", shortTitle: "Approach", type: "diagram" },
    { id: "research", title: "Research & Discovery", shortTitle: "Research", type: "table" },
    { id: "solution", title: "Our Solution", shortTitle: "Solution", type: "text" },
    { id: "lending-model", title: "Lending Model", shortTitle: "Lending Model", type: "diagram" },
    { id: "competitive-edge", title: "Competitive Edge", shortTitle: "Edge", type: "competitive-grid" },
    { id: "user-flows", title: "User Flows & Journeys", shortTitle: "User Flows", type: "slider" },
    { id: "dashboard", title: "High-Fidelity Dashboard", shortTitle: "Dashboard", type: "text" },
    { id: "mission-control", title: "Mission Control", shortTitle: "Mission Control", type: "text" },
    { id: "embedded", title: "Embedded Journeys", shortTitle: "Embedded", type: "diagram" },
    { id: "impact", title: "Partners & Impact", shortTitle: "Impact", type: "marquee" },
  ],

  hero: {
    logo: "/images/case-studies/crediblex/style-04.webp",
    tagline: "Powering the SME economy through",
    subtitle: "Embedded Financing",
    mockupImages: [
      "/images/case-studies/crediblex/slide-02.webp",
    ],
    gradientFrom: "#7C3AED",
    gradientTo: "#2563EB",
  },

  problemStatement: {
    badge: "Problem Statement",
    body: "Despite contributing 65% to the UAE\u2019s non-oil GDP, small and medium-sized enterprises (SMEs) receive only 10% of total loans. This credit gap significantly hinders their ability to grow, especially as the SME sector is expected to expand to 1 million businesses by 2030, demanding up to $390 billion in financing.",
  },

  problemChallenge: {
    heading: "Problem / Challenge (Key Facts)",
    bullets: [
      { title: "Significant Credit Gap for SMEs", description: "Despite SMEs contributing over 60% to the UAE\u2019s non-oil GDP, they receive only 10% of total loans, highlighting a substantial financing gap." },
      { title: "Inefficiencies in Traditional Lending Processes", description: "Traditional lending involves complex paperwork and long approval times, causing frustration and delays for SMEs needing quick capital." },
      { title: "Poor Credit Data", description: "Many SMEs lack formal credit history or clean financial records." },
      { title: "Integration and Usability Issues", description: "The integration of financing solutions into partner platforms may not be seamless, leading to usability challenges for SMEs." },
      { title: "Need for Enhanced Data Utilization", description: "There is a necessity to leverage advanced data analytics and AI-driven tools to better assess SME financial health." },
      { title: "Regulatory Compliance", description: "SMEs may hesitate to adopt non-traditional financing without clear regulation, transparent terms, and a trustworthy digital experience." },
    ],
  },

  designApproach: {
    heading: "Design Approach",
    badge: "Design approach",
    description: "The design process I followed to build this product",
    imageSrc: "/images/case-studies/crediblex/frame-25836.webp",
    imageAlt: "Double Diamond design process — Discover, Define, Develop, Deliver",
  },

  research: {
    heading: "Research & Discovery",
    badge: "Research & Discovery",
    description: "CredibleX operates in a highly competitive landscape with multiple players. To position it effectively, we conducted an in-depth competitor analysis.",
    competitors: [
      { company: "Beehive", invoiceDetails: "30\u2013150 day invoices, up to 80% of receivables", pricing: "From 0.8% per month", regulated: "DFSA", otherProducts: "Crowdfunding / P2P loans" },
      { company: "Invoice Bazaar", invoiceDetails: "Limited info; acquired by Talabat", pricing: "\u2013", regulated: "No, not even Cat.4", otherProducts: "Inventory finance, eComm revenue-based finance" },
      { company: "Flow4S", invoiceDetails: "30\u201390 day invoices with credit limit", pricing: "1.5\u20133% per month", regulated: "\u2013", otherProducts: "Revenue-based financing (5\u201320% of monthly revenue)" },
      { company: "TCP", invoiceDetails: "Invoice finance only for known companies", pricing: "1\u20131.5% per month", regulated: "RegLab or equivalent, Hub71", otherProducts: "\u2013" },
      { company: "DP World", invoiceDetails: "Invoice factoring, discounting, supply chain financing", pricing: "\u2013", regulated: "DFSA", otherProducts: "Reverse factoring, trade payables financing" },
      { company: "Tradewind", invoiceDetails: "Up to 95% invoice value, 24\u201348h turnaround", pricing: "\u2013", regulated: "\u2013", otherProducts: "Trade finance, supply chain finance" },
      { company: "HSBC", invoiceDetails: "Invoice financing through HSBCnet (limited to clients)", pricing: "Up to 90% of invoice", regulated: "Yes (bank)", otherProducts: "\u2013" },
    ],
  },

  solution: {
    badge: "Our Solution",
    heading: "CredibleX is a licensed lending-as-a-service platform",
    body: "By integrating directly into platforms such as ERPs, eCommerce, and POS systems, CredibleX enables seamless and native access to financing for SMEs, eliminating the need for external applications. Leveraging real-time and alternative data, it offers faster, AI-driven credit decisions that are more inclusive of younger or thin file businesses. With a modular API-first architecture, CredibleX supports a wide range of credit products such as invoice, inventory, revenue-based, and working capital loans while empowering partners to launch white-labeled financing solutions.",
  },

  lendingModel: {
    heading: "Lending Model",
    badge: "Lending model",
    imageSrc: "/images/case-studies/crediblex/slide-23.webp",
    imageAlt: "CredibleX lending architecture — Liquidity Partner, LOS/LMS, Embedded White Label, Distribution Partner, SME",
    gradientBg: true,
    gradientFrom: "#7C3AED",
    gradientTo: "#2563EB",
  },

  competitiveEdge: {
    badge: "Competitive Edge",
    heading: "What sets CredibleX apart",
    body: "Our deep commitment to real-time monitoring and advanced analytics will ensure that our products and services remain unparalleled.",
    numberedItems: [
      { title: "Embedded at the Source", description: "CredibleX meets SMEs where they already work inside accounting, inventory, or eCommerce platforms unlike others that require external applications." },
      { title: "Smarter Credit Decisions", description: "Real-time, alternative data (sales, platform activity) enables fairer credit for younger or underbanked businesses." },
      { title: "Faster, Seamless Approvals", description: "With pre-integrated risk models and partner APIs, we offer faster decisions compared to weeks-long manual processes." },
      { title: "Regulated & Trusted", description: "ADGM license ensures regulatory compliance, improving trust for SMEs and partners." },
      { title: "Wider Use Cases", description: "Beyond invoice financing, CredibleX offers inventory, revenue-based, and working capital loans creating a holistic financing ecosystem." },
      { title: "Superior UX", description: "Our partner white-label approach gives SMEs a native experience, not a redirection to an external site or form-heavy portal." },
      { title: "Platform Leverage", description: "CredibleX doesn\u2019t just offer loans \u2014 it enables ecosystem partners to become financing enablers." },
    ],
  },

  userFlows: {
    heading: "User Flows & Journeys",
    badge: "User flows and journeys",
    description: "To grasp the requirements and challenges I designed UX flows",
    slides: [
      { src: "/images/case-studies/crediblex/image-9.webp", alt: "Payable Financing user flow", caption: "Payable Financing" },
      { src: "/images/case-studies/crediblex/image-10.webp", alt: "BNPL user flow", caption: "BNPL" },
      { src: "/images/case-studies/crediblex/image-11.webp", alt: "Revenue Based Financing user flow", caption: "Revenue Based Financing" },
    ],
  },

  dashboard: {
    heading: "High-Fidelity Dashboard",
    badge: "Dashboard",
    description: "The internal admin panel for managing loan applications, reviewing SME data, and making underwriting decisions.",
    screens: [
      { imageSrc: "/images/case-studies/crediblex/group-1261154758.webp", imageAlt: "LOS - All Loan Applications", title: "Loan Applications", description: "Complete backoffice view with filters, application status tracking, and loan management." },
      { imageSrc: "/images/case-studies/crediblex/group-1261154764.webp", imageAlt: "VAT Statements screen", title: "VAT Statements & Financial Data", description: "Automated VAT data analysis with improvement/deterioration trends and income vs expense tracking." },
      { imageSrc: "/images/case-studies/crediblex/group-1000002543.webp", imageAlt: "Rule Engine screen", title: "Rule Engine", description: "Automated compliance checks — 8 out of 9 rules executed successfully with pass/fail status for each." },
      { imageSrc: "/images/case-studies/crediblex/group-1000002543-1.webp", imageAlt: "SME Overview screen", title: "SME Overview", description: "Complete view of SME details including trade license, industry, AECB score, and financial overview." },
    ],
  },

  missionControl: {
    heading: "Mission Control",
    badge: "Mission Control",
    description: "As we are embedded finance, our main goal is to build widgets and products that can be easily customised according to our different partners\u2019 needs.",
    screens: [
      { imageSrc: "/images/case-studies/crediblex/image-15.webp", imageAlt: "Mission Control Configuration", title: "Partner Configuration", description: "Configure DP flags, theme colors, logo, favicon — fully customizable white-label settings." },
      { imageSrc: "/images/case-studies/crediblex/image-16.webp", imageAlt: "Active Loans List", title: "Loans Management", description: "List of all active loans with filtering by distribution partner, loan funding date, and SME details." },
      { imageSrc: "/images/case-studies/crediblex/image-23742.webp", imageAlt: "Create New DP", title: "Product Configuration", description: "Create new distribution partners with custom product settings — loan duration, amount ranges, and commission." },
    ],
  },

  embeddedJourneys: {
    heading: "Embedded Journeys",
    badge: "Embedded Journeys",
    description: "We can now activate CredibleX credit modules in just a few steps \u2014 without heavy dev lift. The white-label design system allows us to quickly skin the UI to match partner branding.",
    screens: [
      { imageSrc: "/images/case-studies/crediblex/group-1261154769.webp", imageAlt: "Talabat Advance landing page", title: "Talabat Advance", description: "White-labeled landing page with Talabat\u2019s branding \u2014 loans to support your business." },
      { imageSrc: "/images/case-studies/crediblex/group-1261154772.webp", imageAlt: "Talabat Advance app screens", title: "Loan Summary & Payment History", description: "Complete loan management with payment history charts, outstanding balance, and loan duration tracking." },
      { imageSrc: "/images/case-studies/crediblex/group-1261154773.webp", imageAlt: "Embedded Calculator", title: "Loan Calculator", description: "Customizable loan calculator with amount slider, terms acceptance, and required documents checklist." },
    ],
  },

  partnersImpact: {
    heading: "Partners & Impact",
    partners: [
      { name: "Mastercard" }, { name: "Talabat" }, { name: "Network" },
      { name: "Sukoon Insurance" }, { name: "Klub" }, { name: "ODeX" },
      { name: "NGI" }, { name: "Qashio" }, { name: "Finanshels" },
      { name: "FracXn" }, { name: "Conektr" }, { name: "Trevex" },
      { name: "Mamo" }, { name: "Aghia" }, { name: "Silai" },
      { name: "ADGM" }, { name: "DMCC" }, { name: "Watermelon" },
    ],
    stats: [
      { value: "40+", numericValue: 40, suffix: "+", label: "Partners onboarded" },
      { value: "100K+", numericValue: 100, suffix: "K+", label: "SMEs served" },
    ],
  },
};
