import CaseStudyClient from "@/components/case-study/CaseStudyClient";

export function generateStaticParams() {
  return [{ slug: "crediblex" }];
}

export default function CaseStudyPage() {
  return <CaseStudyClient />;
}
