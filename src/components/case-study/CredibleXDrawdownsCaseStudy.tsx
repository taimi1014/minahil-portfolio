"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { THEME_COLORS } from "@/components/ThemeSwitcher";
import TableOfContents from "@/components/case-study/TableOfContents";

const SECTIONS = [
  { id: "hero", title: "Hero", shortTitle: "Hero", type: "hero" as const },
  { id: "problem", title: "The Problem", shortTitle: "Problem", type: "text" as const },
  { id: "insight", title: "User Insight", shortTitle: "Insight", type: "text" as const },
  { id: "solution", title: "The Solution", shortTitle: "Solution", type: "text" as const },
  { id: "impact", title: "Impact", shortTitle: "Impact", type: "text" as const },
  { id: "closing", title: "Summary", shortTitle: "Summary", type: "text" as const },
];

const IMG = "/images/case-studies/crediblex-drawdowns";

export default function CredibleXDrawdownsCaseStudy() {
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
        {/* TOC */}
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <TableOfContents sections={SECTIONS} activeSection={activeSection} scrollProgress={scrollProgress} accent={accent} themeColor={themeColor} onSectionClick={handleTOCClick} onBack={() => router.push("/")} />
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto hide-scrollbar">

          {/* ── HERO ── */}
          <div data-section="hero" className="px-6 lg:px-16 xl:px-20 pt-12 lg:pt-16 pb-10 lg:pb-14 border-b border-[#F0F0F0]">
            <motion.div className="flex flex-wrap gap-2 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              {["Fintech", "SaaS", "B2B"].map(tag => (
                <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full border" style={{ color: accent, borderColor: `${accent}25`, backgroundColor: `${accent}06` }}>{tag}</span>
              ))}
            </motion.div>

            <motion.h1 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] leading-[1.2] mb-4 max-w-[640px]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
              Redesigning the SME Drawdown Experience
            </motion.h1>

            <motion.p className="text-[16px] lg:text-[17px] text-[#666] leading-[1.7] max-w-[600px] mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
              How we turned a fragile manual invoice flow into a scalable bulk-upload workflow — reducing friction in one of CredibleX&apos;s most critical financial journeys.
            </motion.p>

            <motion.div className="flex flex-wrap gap-6 text-[13px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <div><span className="text-[#BBB] mr-2">Role</span><span className="text-[#444] font-medium">Lead Product Designer</span></div>
              <div><span className="text-[#BBB] mr-2">Platform</span><span className="text-[#444] font-medium">Web (SME Dashboard)</span></div>
              <div><span className="text-[#BBB] mr-2">Company</span><span className="text-[#444] font-medium">CredibleX</span></div>
            </motion.div>
          </div>

          {/* ── THE PROBLEM ── */}
          <div data-section="problem" className="px-6 lg:px-16 xl:px-20 py-12 lg:py-16">
            <motion.span className="inline-block text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: accent }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Problem</motion.span>

            <motion.h2 className="text-[22px] lg:text-[26px] font-bold text-[#1A1A1A] leading-snug mb-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Manual invoice entry worked for 3 invoices. It broke at 50.
            </motion.h2>

            <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-8 max-w-[640px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              The original drawdown flow required SMEs to add each invoice individually — filling supplier details, amounts, dates, and uploading documents one by one. For small submissions this was fine. But for businesses submitting 10, 20, or 50 invoices, the experience became a bottleneck in a critical financial workflow.
            </motion.p>

            <motion.div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-5 lg:p-6 mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Long accordion sections overloaded the interface", "Repetitive data entry increased effort and frustration", "Users switched between spreadsheets and the platform", "Manual input mistakes grew with every invoice added"].map((pain, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#E53E3E" }} />
                    <p className="text-[13px] text-[#555] leading-[1.6]">{pain}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="rounded-xl overflow-hidden border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <Image src={`${IMG}/manual-entry.webp`} alt="Original manual invoice entry flow" width={2400} height={2800} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 800px" />
            </motion.div>
            <motion.p className="text-[12px] text-[#999] mt-3 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              The original flow — manual invoice-by-invoice entry with accordion sections
            </motion.p>
          </div>

          {/* ── USER INSIGHT — Split layout with visual cards ── */}
          <div data-section="insight" className="px-6 lg:px-16 xl:px-20 py-12 lg:py-16 bg-[#F8FAFF]">
            <motion.span className="inline-block text-[11px] font-semibold tracking-widest uppercase mb-6" style={{ color: accent }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>User Insight</motion.span>

            <motion.h2 className="text-[22px] lg:text-[26px] font-bold text-[#1A1A1A] leading-snug mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              The data already existed. The system just wasn&apos;t using it.
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left — What users were doing */}
              <motion.div className="rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-4 pb-3 border-b border-[#EBEBEB]">What SMEs were doing</h3>
                <ul className="space-y-3.5">
                  {[
                    "Managing invoice records in Excel spreadsheets as part of daily operations",
                    "Manually re-entering the same data into the drawdown form",
                    "Switching back and forth between their files and the platform",
                    "Spending 15–30 minutes on what should take seconds",
                  ].map((item, i) => (
                    <motion.li key={i} className="flex gap-2.5 items-start text-[13.5px] text-[#555] leading-[1.6]" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06 }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#E53E3E" }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right — The real opportunity */}
              <motion.div className="rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-4 pb-3 border-b border-[#EBEBEB]">The opportunity</h3>
                <div className="border-l-[3px] pl-5 mb-5" style={{ borderColor: accent }}>
                  <p className="text-[15px] text-[#333] leading-[1.7] font-medium">
                    The real opportunity was not to make manual entry slightly better. It was to remove manual entry altogether for high-volume users.
                  </p>
                </div>
                <div className="rounded-lg bg-[#F8FAFF] px-4 py-3 border border-[#E8E8E8]">
                  <p className="text-[12px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: accent }}>Core reframe</p>
                  <p className="text-[13px] text-[#666] leading-[1.6]">
                    Stop asking users to re-create data that already exists. Let them upload it.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── THE SOLUTION ── */}
          <div data-section="solution" className="px-6 lg:px-16 xl:px-20 py-12 lg:py-16">
            <motion.span className="inline-block text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: accent }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Solution</motion.span>

            <motion.h2 className="text-[22px] lg:text-[26px] font-bold text-[#1A1A1A] leading-snug mb-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Two paths: manual for small, bulk upload for scale
            </motion.h2>

            <motion.p className="text-[15px] text-[#555] leading-[1.75] mb-10 max-w-[640px]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              We redesigned the drawdown experience with two submission paths — preserving flexibility for small submissions while making high-volume flows efficient through Excel-based bulk upload.
            </motion.p>

            {/* Path 1 */}
            <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${accent}08`, color: `${accent}90` }}>01</span>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A]">Manual entry for small submissions</h3>
              </div>
              <p className="text-[14px] text-[#666] leading-[1.7] mb-5 max-w-[560px]">For SMEs with a few invoices, the manual flow remained available with improved form structure and validation.</p>
              <div className="rounded-xl overflow-hidden border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <Image src={`${IMG}/manual-filled.webp`} alt="Improved manual invoice entry" width={2400} height={3000} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 800px" />
              </div>
              <p className="text-[12px] text-[#999] mt-3 text-center">Improved manual entry with inline validation and document upload</p>
            </motion.div>

            {/* Path 2 — Bulk upload */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${accent}08`, color: `${accent}90` }}>02</span>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A]">Bulk upload for high-volume submissions</h3>
              </div>
              <p className="text-[14px] text-[#666] leading-[1.7] mb-6 max-w-[560px]">Upload invoice data in Excel. The system extracts, maps, validates, and presents records in a structured table.</p>

              <div className="space-y-8">
                {[
                  { label: "Upload", caption: "Download template, fill invoices in Excel, upload in one click", img: `${IMG}/bulk-upload-empty.webp` },
                  { label: "Processing", caption: "System extracts and maps invoice data automatically", img: `${IMG}/bulk-processing.webp` },
                  { label: "Validation", caption: "Row-level errors — users see exactly which row failed and why", img: `${IMG}/bulk-errors.webp` },
                  { label: "Review & Submit", caption: "All invoices in a structured table, ready for submission", img: `${IMG}/bulk-success.webp` },
                ].map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ backgroundColor: accent }}>{i + 1}</span>
                      <span className="text-[14px] font-semibold text-[#1A1A1A]">{step.label}</span>
                    </div>
                    <p className="text-[13px] text-[#888] mb-3 ml-8">{step.caption}</p>
                    <div className="rounded-xl overflow-hidden border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                      <Image src={step.img} alt={step.caption} width={1440} height={1600} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 800px" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Confirmation */}
            <motion.div className="mt-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${accent}08`, color: `${accent}90` }}>03</span>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A]">Submission confirmation</h3>
              </div>
              <p className="text-[14px] text-[#666] leading-[1.7] mb-5 max-w-[560px]">Clear next-step guidance — approval, review, and disbursement stages communicated upfront.</p>
              <div className="rounded-xl overflow-hidden border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <Image src={`${IMG}/confirmation.webp`} alt="Submission confirmation" width={1440} height={944} className="w-full h-auto" loading="lazy" sizes="(max-width: 768px) 95vw, 800px" />
              </div>
            </motion.div>
          </div>

          {/* ── IMPACT ── */}
          <div data-section="impact" className="px-6 lg:px-16 xl:px-20 py-12 lg:py-16 bg-[#F8FAFF]">
            <motion.span className="inline-block text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: accent }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Impact</motion.span>

            <motion.h2 className="text-[22px] lg:text-[26px] font-bold text-[#1A1A1A] leading-snug mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              From fragile to scalable
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { title: "Reduced operational friction", desc: "Removed repetitive manual effort from a high-frequency financial task." },
                { title: "Improved scalability", desc: "Now supports SMEs with 50+ invoice batches without breaking the experience." },
                { title: "Fewer input errors", desc: "Upload existing spreadsheet data instead of manual re-entry." },
                { title: "Faster task completion", desc: "Single upload-and-review flow replaces dozens of form fills." },
                { title: "Better user confidence", desc: "Row-level error reporting with precise, actionable guidance." },
                { title: "Aligned with real workflows", desc: "Product adapted to how SMEs already manage data — through Excel." },
              ].map((item, i) => (
                <motion.div key={i} className="rounded-xl border border-[#E8E8E8] bg-white px-5 py-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.04 }}>
                  <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-1.5">{item.title}</h3>
                  <p className="text-[13px] text-[#666] leading-[1.65]">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Before / After */}
            <motion.div className="rounded-xl border border-[#E8E8E8] overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div className="grid grid-cols-2 divide-x divide-[#E8E8E8]">
                <div className="px-5 py-5 bg-[#FFF5F5]">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#CC4444] mb-3">Before</p>
                  <ul className="space-y-2">
                    {["Experience scaled poorly", "Effort grew linearly with volume", "More invoices = more friction"].map((item, i) => (
                      <li key={i} className="text-[13px] text-[#666] flex gap-2 items-start"><span className="text-[#CC4444] mt-0.5">&#x2717;</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 py-5 bg-[#F0FFF4]">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#38A169] mb-3">After</p>
                  <ul className="space-y-2">
                    {["Workflow became scalable", "System handles complexity", "High-volume submissions efficient"].map((item, i) => (
                      <li key={i} className="text-[13px] text-[#666] flex gap-2 items-start"><span className="text-[#38A169] mt-0.5">&#x2713;</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── REFLECTION — Purple gradient + giant quote marks ── */}
          <div data-section="closing" className="relative overflow-hidden py-20 lg:py-28">
            {/* Purple gradient background */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7C3AED, #9333EA, #6D28D9)" }}>
              <div className="absolute inset-0 bg-black/5" />
              {/* Soft animated blob */}
              <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: "rgba(255,255,255,0.08)", top: "10%", left: "20%" }}
                animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative z-10 px-6 lg:px-16 flex flex-col items-center text-center">
              <motion.span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-8 border border-white/20 text-white/70 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Summary
              </motion.span>

              {/* Giant open quote */}
              <motion.span
                className="text-[100px] lg:text-[140px] font-serif leading-none select-none -mb-10 lg:-mb-14"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                &ldquo;
              </motion.span>

              <motion.p className="text-[15px] lg:text-[17px] text-white/85 leading-[1.8] max-w-[560px]" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                I identified that the drawdown request flow was breaking down for SMEs submitting high invoice volumes. I redesigned the journey by introducing a bulk upload flow — allowing SMEs to upload invoice data from Excel, automatically extract records, review them in a table, and resolve issues through row-level error handling. This shifted the experience from a repetitive manual task to a scalable workflow.
              </motion.p>

              {/* Giant close quote */}
              <motion.span
                className="text-[100px] lg:text-[140px] font-serif leading-none select-none -mt-6 lg:-mt-10"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                &rdquo;
              </motion.span>
            </div>
          </div>

          {/* ── THANK YOU FOOTER ── */}
          <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0A0A14, #08080F)", minHeight: "420px" }}>
            {/* Animated blob */}
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none"
              style={{ background: `${accent}`, opacity: 0.06, top: "15%", left: "15%" }}
              animate={{ x: [0, 100, 60, 0], y: [0, -20, 40, 0], scale: [1, 1.2, 1.1, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Large "Thank you" outline text */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-6">
              <motion.h2
                className="text-[90px] lg:text-[160px] xl:text-[200px] font-bold select-none leading-none whitespace-nowrap"
                style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.05)", letterSpacing: "-0.03em" }}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Thank you
              </motion.h2>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-14 lg:pt-18 pb-28 lg:pb-36">
              <motion.p className="text-[14px] text-white/40 mb-3" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                Thanks for reading
              </motion.p>
              <motion.p className="text-[18px] lg:text-[22px] text-white/80 font-medium mb-6 max-w-[400px]" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                Have a project in mind? Let&apos;s talk.
              </motion.p>
              <motion.a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white border border-white/20 hover:bg-white/10 transition-colors" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                Back to portfolio
              </motion.a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
