import CaseStudyClient from "@/components/case-study/CaseStudyClient";
import FigmaEmbed from "@/components/case-study/FigmaEmbed";
import { embedCaseStudies } from "@/data/case-studies/embeds";

export function generateStaticParams() {
  return [
    { slug: "crediblex" },
    ...embedCaseStudies.map((cs) => ({ slug: cs.slug })),
  ];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's an embedded case study
  const embed = embedCaseStudies.find((cs) => cs.slug === slug);
  if (embed) {
    return <FigmaEmbed title={embed.title} embedUrl={embed.embedUrl} />;
  }

  // Otherwise render the custom case study
  return <CaseStudyClient />;
}
