import CaseStudyClient from "@/components/case-study/CaseStudyClient";
import SuperCenterCaseStudy from "@/components/case-study/SuperCenterCaseStudy";
import FigmaEmbed from "@/components/case-study/FigmaEmbed";
import { embedCaseStudies } from "@/data/case-studies/embeds";

const CUSTOM_CASE_STUDIES = ["supercenter", "crediblex"];

export function generateStaticParams() {
  const embedSlugs = embedCaseStudies.map((cs) => ({ slug: cs.slug }));
  const customSlugs = CUSTOM_CASE_STUDIES.map((slug) => ({ slug }));
  // Deduplicate
  const seen = new Set<string>();
  return [...customSlugs, ...embedSlugs].filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Custom case study pages
  if (slug === "supercenter") {
    return <SuperCenterCaseStudy />;
  }

  // Check if it's an embedded case study (Figma prototype)
  const embed = embedCaseStudies.find((cs) => cs.slug === slug);
  if (embed) {
    return <FigmaEmbed title={embed.title} embedUrl={embed.embedUrl} />;
  }

  // Fallback to custom CredibleX-style case study
  return <CaseStudyClient />;
}
