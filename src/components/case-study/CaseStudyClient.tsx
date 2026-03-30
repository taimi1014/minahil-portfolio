"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { crediblexCaseStudy } from "@/data/case-studies/crediblex";
import { THEME_COLORS } from "@/components/ThemeSwitcher";
import TableOfContents from "@/components/case-study/TableOfContents";
import HeroSection from "@/components/case-study/sections/HeroSection";
import TextSection from "@/components/case-study/sections/TextSection";
import DiagramSection from "@/components/case-study/sections/DiagramSection";
import ComparisonTable from "@/components/case-study/sections/ComparisonTable";
import ImageSlider from "@/components/case-study/sections/ImageSlider";
import CompetitiveGrid from "@/components/case-study/sections/CompetitiveGrid";
import DashboardSection from "@/components/case-study/sections/DashboardSection";
import EmbeddedSection from "@/components/case-study/sections/EmbeddedSection";
import PartnersImpact from "@/components/case-study/sections/PartnersImpact";

function getCaseStudy(slug: string) {
  if (slug === "crediblex") return crediblexCaseStudy;
  return null;
}

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const caseStudy = getCaseStudy(slug);

  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Read theme from localStorage
  const [themeColor, setThemeColor] = useState("#FDE8EC");
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) setThemeColor(saved);
  }, []);

  const theme = THEME_COLORS.find((t) => t.value === themeColor) || THEME_COLORS[7];
  const accent = theme.accent;

  // Scroll progress + active section tracking
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setScrollProgress(scrollTop / (scrollHeight - clientHeight));

      // Find active section
      const sections = container.querySelectorAll("[data-section]");
      let current = "hero";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.top - containerRect.top < containerRect.height * 0.4) {
          current = section.getAttribute("data-section") || current;
        }
      });
      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTOCClick = (sectionId: string) => {
    const container = contentRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-section="${sectionId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(6);
      }
    }
  };

  if (!caseStudy) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Case study not found.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 transition-all duration-75"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(90deg, ${accent}80, ${accent})`,
        }}
      />

      <div className="flex h-full">
        {/* Left TOC Timeline */}
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <TableOfContents
            sections={caseStudy.sections}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
            accent={accent}
            themeColor={themeColor}
            onSectionClick={handleTOCClick}
            onBack={() => router.push("/")}
          />
        </div>

        {/* Right Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto hide-scrollbar case-study-content"
        >
          {/* Hero */}
          <div data-section="hero">
            <HeroSection hero={caseStudy.hero} accent={accent} />
          </div>

          {/* Problem Statement + Key Facts (combined) */}
          <div data-section="problem" className="px-6 lg:px-16 py-16 lg:py-24">
            <TextSection
              badge={caseStudy.problemStatement.badge}
              body={caseStudy.problemStatement.body}
              accent={accent}
              themeColor={themeColor}
              isLargeQuote
            />
            <div className="mt-12">
              <TextSection
                heading={caseStudy.problemChallenge.heading}
                bullets={caseStudy.problemChallenge.bullets}
                accent={accent}
                themeColor={themeColor}
              />
            </div>
          </div>

          {/* Design Approach */}
          <div data-section="approach" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <DiagramSection diagram={caseStudy.designApproach} accent={accent} themeColor={themeColor} />
          </div>

          {/* Research & Discovery */}
          <div data-section="research" className="px-6 lg:px-16 py-16 lg:py-24">
            <ComparisonTable research={caseStudy.research} accent={accent} themeColor={themeColor} />
          </div>

          {/* Our Solution */}
          <div data-section="solution" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <TextSection
              badge={caseStudy.solution.badge}
              heading={caseStudy.solution.heading}
              body={caseStudy.solution.body}
              accent={accent}
              themeColor={themeColor}
            />
          </div>

          {/* Lending Model */}
          <div data-section="lending-model">
            <DiagramSection diagram={caseStudy.lendingModel} accent={accent} themeColor={themeColor} />
          </div>

          {/* Competitive Edge */}
          <div data-section="competitive-edge" className="px-6 lg:px-16 py-16 lg:py-24">
            <CompetitiveGrid edge={caseStudy.competitiveEdge} accent={accent} themeColor={themeColor} />
          </div>

          {/* User Flows */}
          <div data-section="user-flows" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <ImageSlider flows={caseStudy.userFlows} accent={accent} themeColor={themeColor} />
          </div>

          {/* Dashboard */}
          <div data-section="dashboard" className="px-6 lg:px-16 py-16 lg:py-24">
            <DashboardSection data={caseStudy.dashboard} accent={accent} themeColor={themeColor} />
          </div>

          {/* Mission Control */}
          <div data-section="mission-control" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <DashboardSection data={caseStudy.missionControl} accent={accent} themeColor={themeColor} />
          </div>

          {/* Embedded Journeys */}
          <div data-section="embedded">
            <EmbeddedSection data={caseStudy.embeddedJourneys} accent={accent} themeColor={themeColor} />
          </div>

          {/* Partners & Impact */}
          <div data-section="impact" className="py-16 lg:py-24">
            <PartnersImpact data={caseStudy.partnersImpact} accent={accent} themeColor={themeColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
