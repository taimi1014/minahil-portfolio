"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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

function haptic(ms = 6) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(ms);
  }
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
  const isDragging = useRef(false);
  const lastDragY = useRef(0);
  const lastHapticSection = useRef(-1);
  const dragVelocity = useRef(0);

  // Track active section changes for haptic ticks during drag
  useEffect(() => {
    if (isDragging.current && activeIndex !== lastHapticSection.current) {
      lastHapticSection.current = activeIndex;
      haptic(8);
    }
  }, [activeIndex]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    lastDragY.current = y;
    dragVelocity.current = 0;
    lastHapticSection.current = -1;
    haptic(3);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = lastDragY.current - y;
    dragVelocity.current = delta;
    lastDragY.current = y;

    const contentArea = document.querySelector(".case-study-content");
    if (contentArea) {
      contentArea.scrollTop += delta * 4;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Momentum scroll
    const contentArea = document.querySelector(".case-study-content");
    if (contentArea && Math.abs(dragVelocity.current) > 2) {
      let velocity = dragVelocity.current * 3;
      const decay = () => {
        velocity *= 0.92;
        if (Math.abs(velocity) > 0.5) {
          contentArea.scrollTop += velocity;
          requestAnimationFrame(decay);
        }
      };
      requestAnimationFrame(decay);
    }
    haptic(4);
  }, []);

  return (
    <nav
      className="h-full flex flex-col px-3 py-4 sticky top-0 select-none"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      {/* Back button */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); onBack(); haptic(); }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium self-start mb-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          color: accent,
          border: `1px solid ${accent}18`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </motion.button>

      {/* TOC items — LEFT ALIGNED */}
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
              onClick={(e) => {
                e.stopPropagation();
                onSectionClick(section.id);
                haptic();
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full rounded-md transition-all duration-150 relative overflow-hidden"
              style={{
                padding: "5px 8px",
                backgroundColor: isActive
                  ? `${accent}10`
                  : isHovered
                    ? `${accent}05`
                    : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "6px",
              }}
            >
              {/* Section number — fixed width left */}
              <span
                className="font-mono tabular-nums flex-shrink-0"
                style={{
                  fontSize: "11px",
                  color: isActive ? accent : `${accent}25`,
                  width: "16px",
                  textAlign: "left",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Label — left aligned, takes remaining space */}
              <div className="flex-1 text-left">
                <motion.span
                  className="block truncate leading-tight"
                  style={{ fontSize: "14px", textAlign: "left" }}
                  animate={{
                    color: isActive ? accent : isPast ? `${accent}60` : "#aaa",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {section.shortTitle}
                </motion.span>

                {/* Scrubber track — active section only */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="mt-0.5 h-[2px] rounded-full overflow-hidden"
                      style={{ backgroundColor: `${accent}10` }}
                      initial={{ opacity: 0, scaleX: 0.7 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="h-full rounded-full origin-left"
                        style={{
                          backgroundColor: accent,
                          scaleX: sectionProgress,
                        }}
                        transition={{ duration: 0.08, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Active dot */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="flex-shrink-0"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: accent,
                    }}
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Progress */}
      <div className="px-1 pt-2">
        <div className="flex items-center justify-between mb-1">
          <span
            style={{ fontSize: "7px", color: `${accent}35`, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}
          >
            Progress
          </span>
          <span
            className="font-mono tabular-nums"
            style={{ fontSize: "8px", color: `${accent}45` }}
          >
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ backgroundColor: `${accent}08` }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              backgroundColor: accent,
              width: `${scrollProgress * 100}%`,
            }}
          />
        </div>
      </div>
    </nav>
  );
}
