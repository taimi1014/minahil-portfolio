"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { THEME_COLORS } from "@/components/ThemeSwitcher";
import TableOfContents from "@/components/case-study/TableOfContents";
import TextSection from "@/components/case-study/sections/TextSection";
import QuickSnapshot from "@/components/case-study/sections/QuickSnapshot";
import DesignPrinciples from "@/components/case-study/sections/DesignPrinciples";
import ScreenGallery from "@/components/case-study/sections/ScreenGallery";

const SECTIONS = [
  { id: "hero", title: "Hero", shortTitle: "Hero", type: "hero" as const },
  { id: "snapshot", title: "Quick Snapshot", shortTitle: "Snapshot", type: "text" as const },
  { id: "challenge", title: "The Challenge", shortTitle: "Challenge", type: "text" as const },
  { id: "goal", title: "The Goal", shortTitle: "Goal", type: "text" as const },
  { id: "role", title: "My Role", shortTitle: "Role", type: "text" as const },
  { id: "vision", title: "Product Vision", shortTitle: "Vision", type: "text" as const },
  { id: "principles", title: "Design Principles", shortTitle: "Principles", type: "text" as const },
  { id: "solution", title: "What I Designed", shortTitle: "Solution", type: "text" as const },
  { id: "screens", title: "Screen Gallery", shortTitle: "Screens", type: "text" as const },
  { id: "outcome", title: "Outcome", shortTitle: "Outcome", type: "text" as const },
  { id: "learned", title: "What I Learned", shortTitle: "Learned", type: "text" as const },
];

const IMG = "/images/case-studies/supercenter";

// Solution sub-sections with images
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
    body: "Knowledge was designed as more than file storage. Users can add documents, text, websites, and videos, attach them to agents, and test retrieval inside a knowledge playground before deployment. This makes the knowledge layer practical, not passive.",
    images: [
      { src: `${IMG}/knowledge-base-1.webp`, alt: "Knowledge base management" },
      { src: `${IMG}/knowledge-base-2.webp`, alt: "Knowledge base details" },
    ],
  },
  {
    title: "Voice workflow",
    body: "The voices experience supports trending voices, default libraries, custom voices, voice design from prompts, audio upload, and voice cloning. By giving voice its own dedicated workflow, SuperCenter makes it feel like a meaningful product decision rather than a buried setting.",
    images: [
      { src: `${IMG}/voices-library.webp`, alt: "Voice library browser" },
    ],
  },
  {
    title: "Conversational pathways",
    body: "The platform includes a dedicated pathway builder with templates, marketplace workflows, and generated structures from use cases or examples. This helps teams design branching conversational logic inside the same ecosystem as the agent itself.",
    images: [
      { src: `${IMG}/pathways.webp`, alt: "Conversational pathway builder" },
    ],
  },
  {
    title: "Telephony and launch operations",
    body: "Phone number purchase and import, routing setup, and batch calling turn SuperCenter from a builder into a deployment platform. The system supports not only configuration, but real outbound operations.",
    images: [
      { src: `${IMG}/phone-buy.webp`, alt: "Phone number purchase" },
      { src: `${IMG}/phone-options.webp`, alt: "Phone number configuration" },
    ],
  },
  {
    title: "Monitoring and business visibility",
    body: "Once agents are live, analytics dashboards, call logs, summaries, filters, and billing controls help teams understand performance, usage, and cost from the same platform where the agents are built.",
    images: [
      { src: `${IMG}/analytics.webp`, alt: "Analytics dashboard" },
    ],
  },
];

const SCREEN_GALLERY = [
  {
    captionTitle: "Operational visibility from day one",
    captionCopy: "A dashboard designed to surface the signals that matter: call activity, quick actions, and the fastest paths into setup, launch, and monitoring.",
    images: [{ src: `${IMG}/dashboard.webp`, alt: "SuperCenter dashboard" }],
  },
  {
    captionTitle: "Build the agent in one focused workspace",
    captionCopy: "A modular builder that brings prompt design, voice selection, first-message setup, and live preview into one clear publishing flow.",
    images: [
      { src: `${IMG}/agent-creation-1.webp`, alt: "Agent creation workspace" },
      { src: `${IMG}/agent-creation-2.webp`, alt: "Agent builder detail" },
    ],
  },
  {
    captionTitle: "Advanced controls without advanced friction",
    captionCopy: "Language, STT, TTS, LLM, interruption logic, and keyword tuning were grouped into a cleaner system for confident configuration.",
    images: [
      { src: `${IMG}/model-config-1.webp`, alt: "Model configuration" },
      { src: `${IMG}/model-config-2.webp`, alt: "Model settings detail" },
    ],
  },
  {
    captionTitle: "Attach the right context to every agent",
    captionCopy: "Knowledge was designed as a working layer — searchable, structured, and easy to connect across documents, text, websites, and video.",
    images: [
      { src: `${IMG}/knowledge-base-1.webp`, alt: "Knowledge base" },
      { src: `${IMG}/knowledge-base-2.webp`, alt: "Knowledge detail" },
    ],
  },
  {
    captionTitle: "Test knowledge before it goes live",
    captionCopy: "A dedicated playground helps teams validate knowledge retrieval before the agent ever answers a real conversation.",
    images: [{ src: `${IMG}/knowledge-playground.webp`, alt: "Knowledge playground" }],
  },
  {
    captionTitle: "Make voice selection feel intentional",
    captionCopy: "Curated voice exploration, default libraries, and custom voice collections make voice selection feel deliberate, not incidental.",
    images: [{ src: `${IMG}/voices-library.webp`, alt: "Voices library" }],
  },
  {
    captionTitle: "From prompt to prototype in minutes",
    captionCopy: "Voice design, upload, and cloning workflows turn voice creation into a creative product surface instead of a hidden technical step.",
    images: [
      { src: `${IMG}/voice-design.webp`, alt: "Voice design" },
      { src: `${IMG}/voice-cloning.webp`, alt: "Voice cloning upload" },
    ],
  },
  {
    captionTitle: "Design the conversation behind the call",
    captionCopy: "Templates, use cases, and pathway generation help teams shape branching voice workflows with more structure and less manual setup.",
    images: [{ src: `${IMG}/pathways.webp`, alt: "Conversational pathways" }],
  },
  {
    captionTitle: "Go from configuration to deployment",
    captionCopy: "Phone number purchase, import, and routing setup turn configuration into real telephony operations — ready for outbound calls.",
    images: [
      { src: `${IMG}/phone-buy.webp`, alt: "Buy phone numbers" },
      { src: `${IMG}/phone-options.webp`, alt: "Phone number options" },
    ],
  },
  {
    captionTitle: "Review every conversation with context",
    captionCopy: "Call logs surface transcripts, summaries, durations, and outcomes so teams can review agent performance conversation by conversation.",
    images: [
      { src: `${IMG}/call-logs-1.webp`, alt: "Call logs overview" },
      { src: `${IMG}/call-logs-2.webp`, alt: "Call log detail" },
    ],
  },
  {
    captionTitle: "Measure quality, usage, and performance together",
    captionCopy: "Analytics bring call volume, success rates, cost data, and usage trends into one view — connected to the agents that generated them.",
    images: [{ src: `${IMG}/analytics.webp`, alt: "Analytics dashboard" }],
  },
  {
    captionTitle: "Make usage and spend legible",
    captionCopy: "Billing and credits surfaces give teams clear visibility into consumption, remaining balance, and cost breakdowns across the platform.",
    images: [
      { src: `${IMG}/billing-1.webp`, alt: "Billing overview" },
      { src: `${IMG}/billing-2.webp`, alt: "Credits detail" },
    ],
  },
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

  // Scroll tracking
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
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(6);
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 transition-all duration-75"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(90deg, ${accent}80, ${accent})`,
        }}
      />

      <div className="flex h-full">
        {/* TOC */}
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <TableOfContents
            sections={SECTIONS}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
            accent={accent}
            themeColor={themeColor}
            onSectionClick={handleTOCClick}
            onBack={() => router.push("/")}
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto hide-scrollbar"
        >
          {/* 1. HERO */}
          <div data-section="hero">
            <div
              className="relative px-6 lg:px-16 pt-20 lg:pt-28 pb-12 lg:pb-16"
              style={{
                background: "linear-gradient(135deg, #0A0A14, #1A1A2E, #0F0F1A)",
              }}
            >
              <motion.p
                className="text-[12px] font-medium tracking-widest uppercase text-white/40 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Product Design &middot; SaaS &middot; Voice AI Platform
              </motion.p>

              <motion.h1
                className="text-3xl lg:text-[48px] font-bold text-white leading-[1.15] mb-4 max-w-[700px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Designing the operating system for Voice AI
              </motion.h1>

              <motion.p
                className="text-[16px] lg:text-[18px] text-white/60 max-w-[580px] leading-relaxed mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                A unified platform for creating, deploying, and managing conversational agents at scale.
              </motion.p>

              {/* Hero product screenshot */}
              <motion.div
                className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <Image
                  src={`${IMG}/hero.webp`}
                  alt="SuperCenter dashboard overview"
                  width={2400}
                  height={1500}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 95vw, 900px"
                />
              </motion.div>
            </div>

            {/* Intro paragraph */}
            <div className="px-6 lg:px-16 py-12 lg:py-16">
              <motion.p
                className="text-[16px] lg:text-[18px] text-[#444] leading-[1.75] max-w-[720px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                SuperCenter is a Voice AI platform built for teams creating and operating conversational agents. I designed the product across the full lifecycle — from agent setup and model configuration to knowledge, phone numbers, live calls, analytics, and billing. The goal was to turn a technically complex system into a product that feels structured, usable, and ready for real operations.
              </motion.p>
            </div>
          </div>

          {/* 2. QUICK SNAPSHOT */}
          <div data-section="snapshot" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <QuickSnapshot
              badge="At a glance"
              body="SuperCenter brings together the core systems needed to run Voice AI in production: agent creation, voice selection and cloning, knowledge management, conversational pathways, telephony, batch calling, analytics, call review, and billing. Instead of treating these as separate tools, the product connects them into one operational workflow."
              infoBlocks={[
                { label: "Role", value: "Product Designer" },
                { label: "Platform", value: "Web app" },
                { label: "Scope", value: "Agent builder, model settings, knowledge base, voice library, pathways, phone numbers, batches, analytics, call logs, billing" },
              ]}
              accent={accent}
            />
          </div>

          {/* 3. THE CHALLENGE */}
          <div data-section="challenge" className="px-6 lg:px-16 py-16 lg:py-24">
            <TextSection
              badge="The problem"
              heading="Voice AI tools were powerful, but operationally fragmented"
              body="Launching a production-ready voice agent requires many connected decisions: prompt design, model tuning, knowledge attachment, voice selection, number setup, call workflows, reporting, and spend management. In most products, those steps feel scattered or overly technical. SuperCenter needed to support real product depth without overwhelming users on day one. The challenge was not designing a single feature. It was designing clarity across an entire system."
              accent={accent}
              themeColor={themeColor}
            />
          </div>

          {/* 4. THE GOAL */}
          <div data-section="goal" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <TextSection
              badge="Design objective"
              heading="Make Voice AI feel deployable, not experimental"
              body="The goal was to design a platform that felt structured enough for complex setup, approachable enough for non-technical teams, flexible enough for different use cases, and operational enough to support deployment, monitoring, and scale. The product needed to guide users from first setup to live operations inside one coherent experience."
              accent={accent}
              themeColor={themeColor}
            />
          </div>

          {/* 5. MY ROLE */}
          <div data-section="role" className="px-6 lg:px-16 py-16 lg:py-24">
            <TextSection
              badge="What I owned"
              heading="End-to-end product design across the core platform"
              body="I led the product design across SuperCenter's main workflows, shaping the experience for agent creation, model configuration, knowledge management, voice browsing and cloning, conversational pathways, phone number setup, batch calling, analytics, call logs, and billing and credits. My focus was turning a dense technical product into a guided, modular, and scalable system."
              accent={accent}
              themeColor={themeColor}
            />
          </div>

          {/* 6. PRODUCT VISION */}
          <div data-section="vision" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <TextSection
              badge="North star"
              heading="One system for the full lifecycle of a voice agent"
              body="SuperCenter was designed as an end-to-end Voice AI platform. Users can create an agent, define its behavior, tune the model, attach knowledge, assign a voice, connect a number, send calls, review outcomes, and manage spend from the same system. That shift — from isolated setup screens to one operational layer — is what gives the product its value."
              accent={accent}
              themeColor={themeColor}
            />
          </div>

          {/* 7. DESIGN PRINCIPLES */}
          <div data-section="principles" className="px-6 lg:px-16 py-16 lg:py-24">
            <DesignPrinciples
              badge="Principles"
              heading="Four decisions shaped the product"
              principles={[
                {
                  title: "Design around workflows, not features",
                  description: "Users are not trying to \"configure AI.\" They are trying to complete tasks: create an agent, attach knowledge, launch calls, and review results. The platform had to reflect that job flow.",
                },
                {
                  title: "Reveal complexity progressively",
                  description: "The platform includes deep controls across LLM, STT, TTS, prompting, interruption logic, routing, transcripts, and credits. The experience needed to expose essential decisions first, then reveal advanced depth when needed.",
                },
                {
                  title: "Treat voice as a primary product surface",
                  description: "Voice is not a cosmetic setting in SuperCenter. It shapes the quality and realism of the agent experience. That is why the product gives voice its own workflow through browsing, custom libraries, prompt-based generation, upload, and cloning.",
                },
                {
                  title: "Extend trust beyond setup",
                  description: "A strong AI product should not stop at configuration. Users also need confidence after launch. Analytics, call logs, summaries, transcripts, and billing controls are what make the platform feel operational and trustworthy.",
                },
              ]}
              accent={accent}
            />
          </div>

          {/* 8. SOLUTION — What I Designed */}
          <div data-section="solution" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <motion.span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4"
              style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              The system
            </motion.span>

            <motion.h2
              className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              A modular platform for building and operating Voice AI
            </motion.h2>

            <div className="space-y-16">
              {SOLUTION_BLOCKS.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-2">
                    {block.title}
                  </h3>
                  <p className="text-[14px] text-[#555] leading-[1.7] mb-6 max-w-[640px]">
                    {block.body}
                  </p>

                  {block.images.length === 1 ? (
                    <div className="rounded-xl overflow-hidden bg-[#F0F0F0] border border-[#E8E8E8]">
                      <Image
                        src={block.images[0].src}
                        alt={block.images[0].alt}
                        width={2400}
                        height={1500}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 95vw, 800px"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.images.map((img, j) => (
                        <div key={j} className="rounded-xl overflow-hidden bg-[#F0F0F0] border border-[#E8E8E8]">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                            loading="lazy"
                            sizes="(max-width: 768px) 95vw, 400px"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 9. SCREEN GALLERY */}
          <div data-section="screens" className="px-6 lg:px-16 py-16 lg:py-24">
            <ScreenGallery
              badge="Product screens"
              heading="The system in detail"
              screens={SCREEN_GALLERY}
              accent={accent}
            />
          </div>

          {/* 10. OUTCOME */}
          <div data-section="outcome" className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F8FAFF]">
            <TextSection
              badge="Outcome"
              heading="A more complete and credible Voice AI platform"
              body="SuperCenter reframes Voice AI from disconnected controls into a clear operational product workflow. The platform connects agent creation, model tuning, knowledge, voice, telephony, analytics, and billing into one system — giving teams the confidence to move from prototype to production inside a single product."
              accent={accent}
              themeColor={themeColor}
            />
          </div>

          {/* 11. WHAT I LEARNED */}
          <div data-section="learned" className="px-6 lg:px-16 py-16 lg:py-24">
            <TextSection
              badge="Reflection"
              heading="The hardest part of AI product design is coherence"
              body="The challenge was to make prompts, voices, knowledge, telephony, workflows, analytics, and billing feel like one product — not a collection of admin panels. Every design decision had to serve both technical depth and operational clarity. That tension between power and simplicity is what made this project meaningful."
              accent={accent}
              themeColor={themeColor}
            />

            {/* Footer spacing */}
            <div className="h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
