"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaseStudySection } from "@/types/case-study";

interface TOCProps {
  sections: CaseStudySection[];
  activeSection: string;
  scrollProgress: number;
  accent: string;
  themeColor: string;
  onSectionClick: (id: string) => void;
  onBack: () => void;
}

export default function TableOfContents({
  sections,
  activeSection,
  scrollProgress,
  accent,
  themeColor,
  onSectionClick,
  onBack,
}: TOCProps) {
  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="h-full flex flex-col px-5 py-5 sticky top-0">
      {/* Back button — compact, aligned with TOC */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium self-start mb-4 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          color: accent,
          border: `1px solid ${accent}20`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </motion.button>

      {/* Section title */}
      <div className="mb-3">
        <span
          className="text-[9px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: `${accent}50` }}
        >
          Contents
        </span>
      </div>

      {/* TOC items — scrubber style, centered vertically in remaining space */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-0.5">
          {sections.map((section, index) => {
            const isActive = section.id === activeSection;
            const isPast = index <= activeIndex;
            const isHovered = hoveredIndex === index;

            const sectionStart = index / sections.length;
            const sectionEnd = (index + 1) / sections.length;
            const sectionProgress = Math.min(
              1,
              Math.max(0, (scrollProgress - sectionStart) / (sectionEnd - sectionStart))
            );

            return (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center w-full rounded-lg transition-all duration-200 relative overflow-hidden"
                style={{
                  padding: "6px 8px",
                  backgroundColor: isActive
                    ? `${accent}10`
                    : isHovered
                      ? `${accent}06`
                      : "transparent",
                }}
              >
                {/* Section number */}
                <span
                  className="text-[9px] font-mono tabular-nums flex-shrink-0 w-4"
                  style={{ color: isActive ? accent : `${accent}30` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Label + track */}
                <div className="flex-1 min-w-0 ml-1.5">
                  <motion.span
                    className="block text-[11px] truncate leading-tight"
                    animate={{
                      color: isActive ? accent : isPast ? `${accent}70` : "#aaa",
                      fontWeight: isActive ? 600 : 400,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.shortTitle}
                  </motion.span>

                  {/* Scrubber track — only active section */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="mt-1 h-[2px] rounded-full overflow-hidden"
                        style={{ backgroundColor: `${accent}12` }}
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <motion.div
                          className="h-full rounded-full origin-left"
                          style={{
                            backgroundColor: accent,
                            scaleX: sectionProgress,
                          }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Active dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="w-[5px] h-[5px] rounded-full flex-shrink-0 ml-1.5"
                      style={{ backgroundColor: accent }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overall progress */}
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[8px] font-medium uppercase tracking-[0.12em]"
            style={{ color: `${accent}40` }}
          >
            Progress
          </span>
          <span
            className="text-[9px] font-mono tabular-nums"
            style={{ color: `${accent}50` }}
          >
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ backgroundColor: `${accent}10` }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: accent,
              width: `${scrollProgress * 100}%`,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </nav>
  );
}
