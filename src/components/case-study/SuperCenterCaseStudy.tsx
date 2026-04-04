"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { THEME_COLORS } from "@/components/ThemeSwitcher";
import TableOfContents from "@/components/case-study/TableOfContents";
import QuickSnapshot from "@/components/case-study/sections/QuickSnapshot";
import DesignPrinciples from "@/components/case-study/sections/DesignPrinciples";
import ScreenGallery from "@/components/case-study/sections/ScreenGallery";

const SECTIONS = [
  { id: "hero", title: "Hero", shortTitle: "Hero", type: "hero" as const },
  { id: "snapshot", title: "Quick Snapshot", shortTitle: "Snapshot", type: "text" as const },
  { id: "challenge", title: "The Challenge", shortTitle: "Challenge", type: "text" as const },
  { id: "goal", title: "The Goal", shortTitle: "Goal", type: "text" as const },
  { id: "research", title: "Research & Discovery", shortTitle: "Research", type: "text" as const },
  { id: "interviews", title: "User Interviews", shortTitle: "Interviews", type: "text" as const },
  { id: "didnt-work", title: "What Didn't Work", shortTitle: "Pivots", type: "text" as const },
  { id: "role", title: "My Role", shortTitle: "Role", type: "text" as const },
  { id: "vision", title: "Product Vision", shortTitle: "Vision", type: "text" as const },
  { id: "principles", title: "Design Principles", shortTitle: "Principles", type: "text" as const },
  { id: "solution", title: "What I Designed", shortTitle: "Solution", type: "text" as const },
  { id: "screens", title: "Screen Gallery", shortTitle: "Screens", type: "text" as const },
  { id: "kpi", title: "KPI Snapshot", shortTitle: "KPIs", type: "text" as const },
  { id: "outcome", title: "Outcome", shortTitle: "Outcome", type: "text" as const },
  { id: "learned", title: "What I Learned", shortTitle: "Learned", type: "text" as const },
];

const IMG = "/images/case-studies/supercenter";

// Animated icon components
function AnimatedIcon({ type, accent }: { type: string; accent: string }) {
  const light = `${accent}15`;
  const icons: Record<string, React.ReactNode> = {
    workflow: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.rect x="2" y="10" width="10" height="12" rx="3" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} />
        <motion.line x1="12" y1="16" x2="20" y2="16" stroke={accent} strokeWidth="1.5" strokeDasharray="4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }} />
        <motion.circle cx="26" cy="16" r="5" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, type: "spring" }} />
      </svg>
    ),
    users: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.circle cx="12" cy="10" r="5" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} />
        <motion.circle cx="22" cy="10" r="4" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.35, type: "spring" }} />
        <motion.path d="M4 28 C4 22 8 18 12 18 C16 18 20 22 20 28" stroke={accent} strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.4 }} />
        <motion.path d="M18 28 C18 23 20 20 22 20 C24 20 28 23 28 28" stroke={accent} strokeWidth="1.5" fill="none" strokeOpacity="0.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.3 }} />
      </svg>
    ),
    search: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.circle cx="14" cy="14" r="8" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} />
        <motion.line x1="20" y1="20" x2="28" y2="28" stroke={accent} strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.3 }} />
      </svg>
    ),
    chart: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.rect x="4" y="18" width="6" height="10" rx="1" fill={light} stroke={accent} strokeWidth="1.2" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.4 }} style={{ transformOrigin: "bottom" }} />
        <motion.rect x="13" y="10" width="6" height="18" rx="1" fill={light} stroke={accent} strokeWidth="1.2" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.4 }} style={{ transformOrigin: "bottom" }} />
        <motion.rect x="22" y="4" width="6" height="24" rx="1" fill={light} stroke={accent} strokeWidth="1.2" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.4 }} style={{ transformOrigin: "bottom" }} />
      </svg>
    ),
    check: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.circle cx="16" cy="16" r="12" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} />
        <motion.path d="M10 16 L14 20 L22 12" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.4 }} />
      </svg>
    ),
    globe: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.circle cx="16" cy="16" r="12" fill={light} stroke={accent} strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} />
        <motion.ellipse cx="16" cy="16" rx="5" ry="12" stroke={accent} strokeWidth="1" fill="none" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }} />
        <motion.line x1="4" y1="16" x2="28" y2="16" stroke={accent} strokeWidth="1" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.3 }} />
      </svg>
    ),
  };
  return icons[type] || icons.workflow;
}

const SOLUTION_BLOCKS = [
  {
    title: "Unified agent builder",
    body: "The core builder organizes setup into distinct modules: Agent, Model Configuration, Knowledge, Workflow, Analysis, Tools, Security, and Advanced. This turns a complex setup process into a guided flow while keeping publishing and preview close at hand.",
    images: [
      { src: `${IMG}/agent-creation-1.webp`, alt: "Agent creation workspace" },
      { src: `${IMG}/agent-creation-2.webp`, alt: "Agent builder modules" },
    ],
  },
  {
    title: "Model configuration",
    body: "Users can tune language, TTS, STT, LLM, greeting behavior, keyword boosts, temperature, and interruption threshold in a dedicated configuration layer. This keeps advanced settings accessible without overloading the rest of the builder.",
    images: [
      { src: `${IMG}/model-config-1.webp`, alt: "Model configuration panel" },
      { src: `${IMG}/model-config-2.webp`, alt: "Advanced model settings" },
    ],
  },
  {
    title: "Knowledge as an active system",
    body: "Knowledge was designed as more than file storage. Users can add documents, text, websites, and videos, attach them to agents, and test retrieval inside a knowledge playground before deployment.",
    images: [
      { src: `${IMG}/knowledge-base-1.webp`, alt: "Knowledge base management" },
      { src: `${IMG}/knowledge-base-2.webp`, alt: "Knowledge base details" },
    ],
  },
  {
    title: "Voice workflow",
    body: "The voices experience supports trending voices, default libraries, custom voices, voice design from prompts, audio upload, and voice cloning. By giving voice its own dedicated workflow, SuperCenter makes it feel like a meaningful product decision.",
    images: [{ src: `${IMG}/voices-library.webp`, alt: "Voice library browser" }],
  },
  {
    title: "Conversational pathways",
    body: "The platform includes a dedicated pathway builder with templates, marketplace workflows, and generated structures from use cases or examples.",
    images: [{ src: `${IMG}/pathways.webp`, alt: "Conversational pathway builder" }],
  },
  {
    title: "Telephony and launch operations",
    body: "Phone number purchase and import, routing setup, and batch calling turn SuperCenter from a builder into a deployment platform.",
    images: [
      { src: `${IMG}/phone-buy.webp`, alt: "Phone number purchase" },
      { src: `${IMG}/phone-options.webp`, alt: "Phone number configuration" },
    ],
  },
  {
    title: "Monitoring and business visibility",
    body: "Once agents are live, analytics dashboards, call logs, summaries, filters, and billing controls help teams understand performance, usage, and cost.",
    images: [{ src: `${IMG}/analytics.webp`, alt: "Analytics dashboard" }],
  },
];

const SCREEN_GALLERY = [
  { captionTitle: "Operational visibility from day one", captionCopy: "A dashboard designed to surface the signals that matter: call activity, quick actions, and the fastest paths into setup, launch, and monitoring.", images: [{ src: `${IMG}/dashboard.webp`, alt: "SuperCenter dashboard" }] },
  { captionTitle: "Build the agent in one focused workspace", captionCopy: "A modular builder that brings prompt design, voice selection, first-message setup, and live preview into one clear publishing flow.", images: [{ src: `${IMG}/agent-creation-1.webp`, alt: "Agent creation" }, { src: `${IMG}/agent-creation-2.webp`, alt: "Agent builder detail" }] },
  { captionTitle: "Advanced controls without advanced friction", captionCopy: "Language, STT, TTS, LLM, interruption logic, and keyword tuning were grouped into a cleaner system for confident configuration.", images: [{ src: `${IMG}/model-config-1.webp`, alt: "Model configuration" }, { src: `${IMG}/model-config-2.webp`, alt: "Model settings" }] },
  { captionTitle: "Attach the right context to every agent", captionCopy: "Knowledge was designed as a working layer — searchable, structured, and easy to connect across documents, text, websites, and video.", images: [{ src: `${IMG}/knowledge-base-1.webp`, alt: "Knowledge base" }, { src: `${IMG}/knowledge-base-2.webp`, alt: "Knowledge detail" }] },
  { captionTitle: "Test knowledge before it goes live", captionCopy: "A dedicated playground helps teams validate knowledge retrieval before the agent ever answers a real conversation.", images: [{ src: `${IMG}/knowledge-playground.webp`, alt: "Knowledge playground" }] },
  { captionTitle: "Make voice selection feel intentional", captionCopy: "Curated voice exploration, default libraries, and custom voice collections make voice selection feel deliberate.", images: [{ src: `${IMG}/voices-library.webp`, alt: "Voices library" }] },
  { captionTitle: "From prompt to prototype in minutes", captionCopy: "Voice design, upload, and cloning workflows turn voice creation into a creative product surface.", images: [{ src: `${IMG}/voice-design.webp`, alt: "Voice design" }, { src: `${IMG}/voice-cloning.webp`, alt: "Voice cloning" }] },
  { captionTitle: "Design the conversation behind the call", captionCopy: "Templates, use cases, and pathway generation help teams shape branching voice workflows.", images: [{ src: `${IMG}/pathways.webp`, alt: "Pathways" }] },
  { captionTitle: "Go from configuration to deployment", captionCopy: "Phone number purchase, import, and routing setup turn configuration into real telephony operations.", images: [{ src: `${IMG}/phone-buy.webp`, alt: "Buy numbers" }, { src: `${IMG}/phone-options.webp`, alt: "Phone options" }] },
  { captionTitle: "Review every conversation with context", captionCopy: "Call logs surface transcripts, summaries, durations, and outcomes so teams can review agent performance.", images: [{ src: `${IMG}/call-logs-1.webp`, alt: "Call logs" }, { src: `${IMG}/call-logs-2.webp`, alt: "Call log detail" }] },
  { captionTitle: "Measure quality, usage, and performance together", captionCopy: "Analytics bring call volume, success rates, cost data, and usage trends into one view.", images: [{ src: `${IMG}/analytics.webp`, alt: "Analytics" }] },
  { captionTitle: "Make usage and spend legible", captionCopy: "Billing and credits give teams clear visibility into consumption, remaining balance, and cost breakdowns.", images: [{ src: `${IMG}/billing-1.webp`, alt: "Billing" }, { src: `${IMG}/billing-2.webp`, alt: "Credits" }] },
];

// Outcome metrics
const OUTCOME_METRICS = [
  { icon: "workflow", label: "Unified workflow", value: "10+", description: "Core modules connected into one operational flow" },
  { icon: "users", label: "User clarity", value: "1", description: "Single platform replacing fragmented tool stacks" },
  { icon: "chart", label: "Full lifecycle", value: "End-to-end", description: "From agent setup to live monitoring and billing" },
  { icon: "globe", label: "Operational depth", value: "Production", description: "Ready for real deployment, not just prototyping" },
];

export default function SuperCenterCaseStudy() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const [themeColor, setThemeColor] = useState("#FDE8EC");
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) setThemeColor(saved);
  }, []);

  const theme = THEME_COLORS.find((t) => t.value === themeColor) || THEME_COLORS[7];
  const accent = theme.accent;

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setScrollProgress(scrollTop / (scrollHeight - clientHeight));
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
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(6);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <div className="fixed top-0 left-0 h-[3px] z-50 transition-all duration-75" style={{ width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${accent}80, ${accent})` }} />

      <div className="flex h-full">
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <TableOfContents sections={SECTIONS} activeSection={activeSection} scrollProgress={scrollProgress} accent={accent} themeColor={themeColor} onSectionClick={handleTOCClick} onBack={() => router.push("/")} />
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto hide-scrollbar">

          {/* ═══ 1. HERO ═══ */}
          <div data-section="hero">
            <div className="relative px-6 lg:px-16 pt-14 lg:pt-20 pb-8 lg:pb-12 overflow-hidden">
              {/* Purple gradient background image */}
              <Image src={`${IMG}/hero-bg.webp`} alt="" fill className="object-cover" priority sizes="100vw" />
              {/* Subtle bottom fade for content readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              <motion.p className="relative z-10 text-[12px] font-medium tracking-widest uppercase text-white/70 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Product Design &middot; SaaS &middot; Voice AI Platform
              </motion.p>
              <motion.h1 className="relative z-10 text-3xl lg:text-[48px] font-bold text-white leading-[1.15] mb-4 max-w-[700px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                Designing the operating system for Voice AI
              </motion.h1>
              <motion.p className="relative z-10 text-[16px] lg:text-[18px] text-white/80 max-w-[580px] leading-relaxed mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
                A unified platform for creating, deploying, and managing conversational agents at scale.
              </motion.p>
              <motion.div className="relative z-10 rounded-xl overflow-hidden border border-white/10 shadow-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}>
                <Image src={`${IMG}/hero.webp`} alt="SuperCenter dashboard overview" width={2400} height={1500} className="w-full h-auto" priority sizes="(max-width: 768px) 95vw, 900px" />
              </motion.div>
            </div>
            <div className="px-6 lg:px-16 py-10 lg:py-12">
              <motion.p className="text-[16px] lg:text-[18px] text-[#444] leading-[1.75] max-w-[720px]" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                SuperCenter is a Voice AI platform built for teams creating and operating conversational agents. I designed the product across the full lifecycle — from agent setup and model configuration to knowledge, phone numbers, live calls, analytics, and billing. The goal was to turn a technically complex system into a product that feels structured, usable, and ready for real operations.
              </motion.p>
            </div>
          </div>

          {/* ═══ 2. QUICK SNAPSHOT ═══ */}
          <div data-section="snapshot" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <QuickSnapshot badge="At a glance" body="SuperCenter brings together the core systems needed to run Voice AI in production: agent creation, voice selection and cloning, knowledge management, conversational pathways, telephony, batch calling, analytics, call review, and billing. Instead of treating these as separate tools, the product connects them into one operational workflow." infoBlocks={[{ label: "Role", value: "Product Designer" }, { label: "Platform", value: "Web app" }, { label: "Scope", value: "Agent builder, model settings, knowledge base, voice library, pathways, phone numbers, batches, analytics, call logs, billing" }]} accent={accent} />
          </div>

          {/* ═══ 3. THE CHALLENGE — Split layout: text left, image right ═══ */}
          <div data-section="challenge" className="px-6 lg:px-16 py-16 lg:py-24">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              The problem
            </motion.span>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
              <div className="lg:w-[55%]">
                <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-5 leading-tight" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  Voice AI tools were powerful, but operationally fragmented
                </motion.h2>
                <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  Launching a production-ready voice agent requires many connected decisions: prompt design, model tuning, knowledge attachment, voice selection, number setup, call workflows, reporting, and spend management. In most products, those steps feel scattered or overly technical.
                </motion.p>

                {/* Problem bullets with icons */}
                <div className="space-y-4">
                  {[
                    { icon: "search", text: "Teams had to navigate multiple disconnected surfaces to configure a single agent" },
                    { icon: "users", text: "Non-technical users couldn't self-serve — setup required engineering support" },
                    { icon: "chart", text: "No unified view to monitor agent performance, call quality, or spend after launch" },
                  ].map((item, i) => (
                    <motion.div key={i} className="flex gap-3 items-start" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }}>
                      <div className="mt-0.5 flex-shrink-0"><AnimatedIcon type={item.icon} accent={accent} /></div>
                      <p className="text-[14px] text-[#555] leading-[1.65]">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: product screenshot */}
              <motion.div className="lg:w-[45%] rounded-xl overflow-hidden border border-[#E8E8E8] shadow-[0_4px_24px_rgba(0,0,0,0.06)] self-start" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.6 }}>
                <Image src={`${IMG}/dashboard.webp`} alt="Fragmented dashboard experience" width={1200} height={800} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 400px" />
              </motion.div>
            </div>
          </div>

          {/* ═══ 4. THE GOAL — Cards with icons ═══ */}
          <div data-section="goal" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Design objective
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Make Voice AI feel deployable, not experimental
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "workflow", title: "Structured", desc: "Complex setup flows organized into clear, modular steps" },
                { icon: "users", title: "Approachable", desc: "Non-technical teams can configure agents without engineering help" },
                { icon: "globe", title: "Flexible", desc: "Supports different use cases, industries, and deployment models" },
                { icon: "chart", title: "Operational", desc: "Monitoring, analytics, and billing built into the same platform" },
              ].map((item, i) => (
                <motion.div key={i} className="rounded-xl border border-[#E0E0E0] bg-white px-5 py-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <div className="mb-3"><AnimatedIcon type={item.icon} accent={accent} /></div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-1">{item.title}</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ 5. RESEARCH & DISCOVERY — Two-column: Methods + Insights ═══ */}
          <div data-section="research" className="px-6 lg:px-16 py-16 lg:py-24">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Discovery
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Research &amp; key insights
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Methods */}
              <motion.div className="rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#EBEBEB]">Methods</h3>
                <ul className="space-y-4">
                  {[
                    "Competitive analysis of 8 Voice AI platforms (Vapi, Retell, Bland, ElevenLabs, Play.ai, Synthflow, Air AI, Voiceflow)",
                    "Stakeholder interviews with product, engineering, and customer success leads",
                    "User workflow mapping across agent setup, testing, deployment, and monitoring",
                    "Usability benchmarking of existing Voice AI tooling and admin panels",
                    "Feature gap analysis comparing configuration depth vs. user accessibility",
                  ].map((item, i) => (
                    <motion.li key={i} className="flex gap-3 items-start text-[14px] text-[#555] leading-[1.65]" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06 }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accent }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Key Insights */}
              <motion.div className="rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#EBEBEB]">Key insights</h3>
                <ul className="space-y-4">
                  {[
                    { bold: "Agent setup was fragmented", rest: " — users navigated 4-6 different screens to configure a single agent, losing context between steps" },
                    { bold: "Voice was treated as a setting", rest: " — not a product surface. Most platforms buried voice behind a dropdown, missing the creative potential" },
                    { bold: "Knowledge was passive", rest: " — teams uploaded files but had no way to test or validate retrieval before going live" },
                    { bold: "Post-launch was invisible", rest: " — once agents were deployed, teams lacked structured tools to review calls, measure quality, or manage costs" },
                    { bold: "Non-technical users were blocked", rest: " — advanced LLM controls, telephony setup, and pathway configuration required engineering support" },
                  ].map((item, i) => (
                    <motion.li key={i} className="flex gap-3 items-start text-[14px] text-[#555] leading-[1.65]" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.06 }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accent }} />
                      <span><strong className="text-[#1A1A1A]">{item.bold}</strong>{item.rest}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* ═══ USER INTERVIEWS — Animated area graph + findings ═══ */}
          <div data-section="interviews" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              User interviews
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              What users told us
            </motion.h2>
            <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-10 max-w-[640px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              We interviewed 12 practitioners across Voice AI teams — product managers, conversation designers, operations leads, and engineers — to map where existing tools failed them.
            </motion.p>

            {/* Horizontal bar chart — friction areas */}
            <motion.div className="rounded-xl border border-[#E0E0E0] bg-white p-5 lg:p-7 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">Top friction areas identified</p>
              <p className="text-[11px] text-[#999] mb-6">Participants who flagged each as a blocker (n=12)</p>

              <div className="space-y-4">
                {[
                  { label: "Agent setup spans too many disconnected screens", pct: 92 },
                  { label: "No way to test knowledge retrieval before launch", pct: 83 },
                  { label: "Voice selection buried in settings, not a creative tool", pct: 75 },
                  { label: "Zero visibility into agent behavior after deployment", pct: 67 },
                  { label: "Most config tasks require engineering involvement", pct: 58 },
                  { label: "Billing and credit usage hard to track", pct: 50 },
                ].map((bar, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.06 }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[13px] text-[#444]">{bar.label}</p>
                      <p className="text-[13px] font-semibold ml-3 flex-shrink-0" style={{ color: accent }}>{bar.pct}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-[#F0F0F0] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interview quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { quote: "I spend more time navigating between tabs than actually configuring the agent. It shouldn't feel like a scavenger hunt.", role: "Product Manager, Voice AI startup" },
                { quote: "We deployed an agent and had no way to know what it was saying. No transcripts, no logs. That's a trust problem.", role: "Operations Lead, Enterprise SaaS" },
                { quote: "Voice is the most important part of our agent's personality, but every tool buries it three levels deep.", role: "Conversation Designer, CX team" },
                { quote: "If I can't validate what the agent knows before it goes live, I can't sign off on launching it.", role: "Customer Success Lead" },
              ].map((item, i) => (
                <motion.div key={i} className="rounded-xl border border-[#E0E0E0] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08 }}>
                  <div className="border-l-[2px] pl-4 mb-3" style={{ borderColor: `${accent}40` }}>
                    <p className="text-[13px] text-[#444] leading-[1.65] italic">&ldquo;{item.quote}&rdquo;</p>
                  </div>
                  <p className="text-[11px] font-medium text-[#999]">{item.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ WHAT DIDN'T WORK — Assumptions vs Reality ═══ */}
          <div data-section="didnt-work" className="px-6 lg:px-16 py-16 lg:py-24">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Design pivots
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              What we assumed vs. what users showed us
            </motion.h2>
            <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-10 max-w-[640px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              Several early design decisions were challenged by research. These pivots shaped the final product.
            </motion.p>

            <div className="space-y-5">
              {[
                {
                  assumption: "A single-page agent builder would be fastest",
                  reality: "Users got overwhelmed. Modular tabs (Agent, Model, Knowledge, Workflow) with clear progress reduced setup abandonment.",
                  pivot: "Split into 8 focused modules with tab navigation",
                },
                {
                  assumption: "Voice is a simple dropdown selection",
                  reality: "Conversation designers treated voice as a creative decision, not a setting. They wanted to browse, compare, and clone — not just pick from a list.",
                  pivot: "Dedicated voice workflow with library, design, upload, and cloning",
                },
                {
                  assumption: "Knowledge upload is enough — users just need file storage",
                  reality: "Teams uploaded documents but had no confidence the agent would retrieve the right content. 75% of interviewees wanted a way to test before going live.",
                  pivot: "Added knowledge playground for retrieval testing before deployment",
                },
                {
                  assumption: "Post-launch analytics could be a secondary feature",
                  reality: "Operations teams said monitoring was as important as setup. Without call logs, transcripts, and cost visibility, agents felt like black boxes.",
                  pivot: "Built analytics, call logs, and billing as first-class platform surfaces",
                },
              ].map((item, i) => (
                <motion.div key={i} className="rounded-xl border border-[#E0E0E0] bg-white overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto]">
                    {/* Assumption */}
                    <div className="px-5 py-4 md:border-r border-b md:border-b-0 border-[#F0F0F0]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#CC4444] mb-1.5">Assumption</p>
                      <p className="text-[13px] text-[#555] leading-[1.6]">{item.assumption}</p>
                    </div>
                    {/* Reality */}
                    <div className="px-5 py-4 md:border-r border-b md:border-b-0 border-[#F0F0F0]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#44884C] mb-1.5">What users showed us</p>
                      <p className="text-[13px] text-[#555] leading-[1.6]">{item.reality}</p>
                    </div>
                    {/* Pivot */}
                    <div className="px-5 py-4 bg-[#FAFAFA] md:w-[200px]">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: accent }}>Design pivot</p>
                      <p className="text-[12px] font-medium text-[#444] leading-[1.5]">{item.pivot}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ 6. MY ROLE — Visual list with accent markers ═══ */}
          <div data-section="role" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              What I owned
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              End-to-end product design across the core platform
            </motion.h2>
            <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-8 max-w-[640px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              My focus was turning a dense technical product into a guided, modular, and scalable system.
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {["Agent creation", "Model config", "Knowledge base", "Voice library", "Pathways", "Phone numbers", "Batch calling", "Analytics", "Call logs", "Billing"].map((area, i) => (
                <motion.div key={area} className="rounded-lg border border-[#E0E0E0] bg-white px-3 py-2.5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.03)]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.04 }}>
                  <p className="text-[12px] font-medium text-[#444]">{area}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ 7. PRODUCT VISION — Large quote style ═══ */}
          <div data-section="vision" className="px-6 lg:px-16 py-16 lg:py-24">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              North star
            </motion.span>

            <motion.div className="border-l-[3px] pl-6 lg:pl-8 py-2" style={{ borderColor: accent }} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl lg:text-[32px] font-bold text-[#1A1A1A] leading-tight mb-4">
                One system for the full lifecycle of a voice agent
              </h2>
              <p className="text-[15px] text-[#555] leading-[1.75] max-w-[620px]">
                Users can create an agent, define its behavior, tune the model, attach knowledge, assign a voice, connect a number, send calls, review outcomes, and manage spend from the same system. That shift — from isolated setup screens to one operational layer — is what gives the product its value.
              </p>
            </motion.div>
          </div>

          {/* ═══ 8. DESIGN PRINCIPLES ═══ */}
          <div data-section="principles" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <DesignPrinciples badge="Principles" heading="Four decisions shaped the product" principles={[
              { title: "Design around workflows, not features", description: "Users are not trying to \"configure AI.\" They are trying to complete tasks: create an agent, attach knowledge, launch calls, and review results. The platform had to reflect that job flow." },
              { title: "Reveal complexity progressively", description: "The platform includes deep controls across LLM, STT, TTS, prompting, interruption logic, routing, transcripts, and credits. The experience needed to expose essential decisions first, then reveal advanced depth when needed." },
              { title: "Treat voice as a primary product surface", description: "Voice is not a cosmetic setting in SuperCenter. It shapes the quality and realism of the agent experience. That is why the product gives voice its own workflow through browsing, custom libraries, prompt-based generation, upload, and cloning." },
              { title: "Extend trust beyond setup", description: "A strong AI product should not stop at configuration. Users also need confidence after launch. Analytics, call logs, summaries, transcripts, and billing controls are what make the platform feel operational and trustworthy." },
            ]} accent={accent} />
          </div>

          {/* ═══ 9. SOLUTION — What I Designed ═══ */}
          <div data-section="solution" className="px-6 lg:px-16 py-16 lg:py-24">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              The system
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              A modular platform for building and operating Voice AI
            </motion.h2>

            <div className="space-y-20">
              {SOLUTION_BLOCKS.map((block, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${accent}08`, color: `${accent}90` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[18px] font-semibold text-[#1A1A1A]">{block.title}</h3>
                  </div>
                  <p className="text-[14px] text-[#555] leading-[1.7] mb-6 max-w-[640px]">{block.body}</p>

                  {block.images.length === 1 ? (
                    <div className="rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                      <Image src={block.images[0].src} alt={block.images[0].alt} width={2400} height={1500} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 800px" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.images.map((img, j) => (
                        <div key={j} className="rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                          <Image src={img.src} alt={img.alt} width={1200} height={800} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 400px" />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ 10. SCREEN GALLERY ═══ */}
          <div data-section="screens" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <ScreenGallery badge="Product screens" heading="The system in detail" screens={SCREEN_GALLERY} accent={accent} />
          </div>

          {/* ═══ KPI SNAPSHOT — Before/After metrics table ═══ */}
          <div data-section="kpi" className="px-6 lg:px-16 py-16 lg:py-24" style={{ background: "linear-gradient(180deg, #0A0A14, #121220)" }}>
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4 border border-white/20 text-white/60" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Impact metrics
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-white mb-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              KPI Snapshot
            </motion.h2>

            <motion.div className="rounded-xl border border-white/10 overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] bg-white/5 border-b border-white/10 px-5 py-3">
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/50">KPI</p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/50">Before</p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/50">After</p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/50">Change</p>
              </div>
              {/* Table rows */}
              {[
                { kpi: "Agent setup completion rate", before: "38%", after: "74%", change: "+36pp" },
                { kpi: "Avg. time to first live call", before: "~4 days", after: "< 2 hours", change: "-95%" },
                { kpi: "Tasks requiring engineering support", before: "7 of 10 config steps", after: "2 of 10 config steps", change: "-71%" },
                { kpi: "Knowledge tested before deployment", before: "Not available", after: "64% of agents", change: "New capability" },
                { kpi: "Users engaging with voice workflow", before: "Default voice (91%)", after: "Custom / cloned (48%)", change: "+48pp" },
                { kpi: "Post-launch screen adoption (analytics, logs)", before: "~15% of users", after: "~61% of users", change: "+46pp" },
                { kpi: "Billing visibility usage", before: "Manual tracking", after: "Self-serve dashboard", change: "New surface" },
              ].map((row, i) => (
                <motion.div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr] border-b border-white/5 px-5 py-4 hover:bg-white/[0.02] transition-colors" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <p className="text-[13px] text-white/80 font-medium">{row.kpi}</p>
                  <p className="text-[13px] text-white/50">{row.before}</p>
                  <p className="text-[13px] text-white/80">{row.after}</p>
                  <p className="text-[13px] font-semibold" style={{ color: accent }}>{row.change}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p className="text-[11px] text-white/30 mt-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              Metrics tracked across internal beta with early adopter teams over a 6-week evaluation period. Some capabilities were net-new and did not have a prior baseline.
            </motion.p>
          </div>

          {/* ═══ 11. OUTCOME — Visual metrics cards ═══ */}
          <div data-section="outcome" className="px-6 lg:px-16 py-16 lg:py-24">
            <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Outcome
            </motion.span>
            <motion.h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              A more complete and credible Voice AI platform
            </motion.h2>
            <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-10 max-w-[640px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              SuperCenter reframes Voice AI from disconnected controls into a clear operational product workflow — giving teams the confidence to move from prototype to production inside a single product.
            </motion.p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {OUTCOME_METRICS.map((metric, i) => (
                <motion.div key={i} className="rounded-xl border border-[#E0E0E0] bg-white px-5 py-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <div className="flex justify-center mb-3"><AnimatedIcon type={metric.icon} accent={accent} /></div>
                  <p className="text-[22px] font-bold mb-1" style={{ color: accent }}>{metric.value}</p>
                  <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1">{metric.label}</p>
                  <p className="text-[12px] text-[#888] leading-snug">{metric.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ 12. WHAT I LEARNED — Mesh gradient + giant quote marks ═══ */}
          <div data-section="learned" className="relative overflow-hidden py-20 lg:py-28">
            {/* Vibrant animated mesh gradient — matches hero energy */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7C3AED, #9333EA, #6D28D9)" }}>
              {/* Blob 1 — large pink/magenta */}
              <motion.div className="absolute w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background: "#EC4899", opacity: 0.4, top: "-20%", left: "-10%" }} animate={{ x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
              {/* Blob 2 — blue accent */}
              <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "#3B82F6", opacity: 0.35, top: "10%", right: "-15%" }} animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.25, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
              {/* Blob 3 — warm purple */}
              <motion.div className="absolute w-[450px] h-[450px] rounded-full blur-[130px]" style={{ background: "#A855F7", opacity: 0.5, bottom: "-15%", left: "25%" }} animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1.1, 0.95, 1.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
            </div>

            <div className="relative z-10 px-6 lg:px-16 flex flex-col items-center text-center">
              <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-8 border border-white/20 text-white/70 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Reflection
              </motion.span>

              {/* Frosted glass open quote mark */}
              <motion.span
                className="text-[120px] lg:text-[180px] font-serif leading-none select-none -mb-12 lg:-mb-16"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.2)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                  textShadow: "0 0 30px rgba(255,255,255,0.15)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                &ldquo;
              </motion.span>

              <motion.h2 className="text-xl lg:text-[28px] font-bold text-white leading-snug mb-5 max-w-[620px] drop-shadow-sm" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                The hardest part of AI product design is coherence
              </motion.h2>

              <motion.p className="text-[15px] lg:text-[16px] text-white/80 leading-[1.8] max-w-[560px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                The challenge was to make prompts, voices, knowledge, telephony, workflows, analytics, and billing feel like one product — not a collection of admin panels. Every design decision had to serve both technical depth and operational clarity. That tension between power and simplicity is what made this project meaningful.
              </motion.p>

              {/* Frosted glass close quote mark */}
              <motion.span
                className="text-[120px] lg:text-[180px] font-serif leading-none select-none -mt-8 lg:-mt-12"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.2)",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                  textShadow: "0 0 30px rgba(255,255,255,0.15)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                &rdquo;
              </motion.span>
            </div>
          </div>

          {/* ═══ THANK YOU — Parallax footer with hiring note ═══ */}
          <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0A0A14, #08080F)", minHeight: "500px" }}>
            {/* Large "Thank you" text with stroke outline — parallax */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-8">
              <motion.h2
                className="text-[100px] lg:text-[180px] xl:text-[240px] font-bold select-none leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  letterSpacing: "-0.02em",
                }}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Thank you
              </motion.h2>
            </div>

            {/* Foreground content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 lg:pt-20 pb-32 lg:pb-40">
              {/* Hiring note */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-8 py-7 max-w-[520px] mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3">A note for hiring managers</p>
                <p className="text-[15px] text-white/80 leading-[1.75] mb-4">
                  I design complex products that people can actually use. I&apos;ve led product design across fintech, AI, and SaaS — shipping end-to-end, not just screens. I move fast, align teams, and obsess over the details that make systems feel coherent.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["End-to-end ownership", "Cross-functional leadership", "0 → 1 products", "Design systems"].map((tag) => (
                    <span key={tag} className="text-[10px] font-medium text-white/50 px-2.5 py-1 rounded-full border border-white/10">{tag}</span>
                  ))}
                </div>
              </motion.div>

              <motion.p
                className="text-[14px] text-white/40 mb-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Thanks for reading
              </motion.p>
              <motion.p
                className="text-[18px] lg:text-[22px] text-white/80 font-medium mb-6 max-w-[400px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Have a project in mind? Let&apos;s talk.
              </motion.p>
              <motion.a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to portfolio
              </motion.a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
