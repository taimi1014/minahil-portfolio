import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tranxpay",
    title: "Borderless Banking For Global Citizens",
    description:
      "TranxPay is your mobile banking buddy. We give you everything you need to transact - globally and locally - from a single simple app.",
    imageSrc: "/images/projects/tranxpay.png",
    imageAlt: "TranxPay mobile banking app screens showing account balance, crypto portfolio, and send money features",
  },
  {
    slug: "moodanalyzer",
    title: "MoodAnalyzer — Prompt Engineering Platform",
    description:
      "A comprehensive prompt engineering and model evaluation platform for testing and comparing LLM configurations side by side.",
    imageSrc: "/images/projects/moodanalyzer.png",
    imageAlt: "MoodAnalyzer dark dashboard showing prompt configuration and simulator interface",
  },
  {
    slug: "revolut-aiops",
    title: "LLM Model Online Evaluation-Revolut AIOps Platform",
    description:
      "Teams lacked an easy, safe way to validate LLMs in production. Existing processes were manual, error-prone, and slow, resulting in conservative rollouts and missed opportunities to ship better models faster.",
    imageSrc: "/images/projects/revolut-aiops.png",
    imageAlt: "Revolut AIOps evaluation dashboard with fluency charts and cluster analysis",
    companyLogo: "/images/logos/revolut.svg",
    companyLogoAlt: "Revolut",
  },
  {
    slug: "mira-ai71",
    title: "Enhancing Customer Experience Through Voice AI",
    description:
      "Despite MIRA's innovative AI-driven approach, early user feedback revealed critical gaps in the experience",
    imageSrc: "/images/projects/mira-ai71.png",
    imageAlt: "MIRA call analytics dashboard with donut charts showing inbound calls classification",
    companyLogo: "/images/logos/ai71.svg",
    companyLogoAlt: "AI71",
  },
  {
    slug: "desertcart",
    title: "Desertcart Mobile App",
    description:
      "Customers often struggle to navigate through over 700 categories to find the products that meet their needs.",
    imageSrc: "/images/projects/desertcart.png",
    imageAlt: "Desertcart mobile app showing product search and order tracking screens",
  },
];
