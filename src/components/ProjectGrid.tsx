"use client";

import { useState, lazy, Suspense, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import TabSwitcher from "./TabSwitcher";
import { THEME_COLORS } from "./ThemeSwitcher";

const Resume = lazy(() => import("./Resume"));

const TABS = ["Case Studies", "My Resume"];

interface ProjectGridProps {
  themeColor: string;
}

function LayoutToggle({
  layout,
  onLayoutChange,
  accent,
}: {
  layout: "grid" | "list";
  onLayoutChange: (l: "grid" | "list") => void;
  accent: string;
}) {
  return (
    <div
      className="relative flex items-center gap-0.5 rounded-full p-[3px]"
      style={{
        backgroundColor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1.5px solid rgba(0,0,0,0.06)",
      }}
    >
      {(["grid", "list"] as const).map((mode) => {
        const isActive = layout === mode;
        return (
          <button
            key={mode}
            onClick={() => onLayoutChange(mode)}
            className="relative w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors z-10"
            style={{ color: isActive ? accent : "#AAA" }}
            aria-label={mode === "grid" ? "Grid view" : "List view"}
          >
            {isActive && (
              <motion.div
                layoutId="layoutIndicator"
                className="absolute inset-0 bg-white rounded-full"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
            <span className="relative z-10">
              {mode === "grid" ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" />
                  <rect x="9" y="1" width="6" height="6" rx="1.5" />
                  <rect x="1" y="9" width="6" height="6" rx="1.5" />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="14" height="3" rx="1.5" />
                  <rect x="1" y="7" width="14" height="3" rx="1.5" />
                  <rect x="1" y="12" width="14" height="3" rx="1.5" />
                </svg>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ProjectGrid({ themeColor }: ProjectGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";

  return (
    <>
      {/* Tabs row — tabs left, controls right */}
      <div className="flex items-center justify-between mb-3">
        <TabSwitcher
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          themeColor={themeColor}
        />
        <div className="flex items-center gap-2.5">
          {activeTab === 0 && (
            <LayoutToggle layout={layout} onLayoutChange={setLayout} accent={accent} />
          )}
          <a
            href="/Minahil_Awan_Resume.pdf"
            download
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: accent,
              border: `1.5px solid ${accent}25`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Frosted glass content box */}
      <div
        className="flex-1 overflow-hidden shadow-sm"
        style={{
          borderRadius: "12px",
          backgroundColor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <div className="h-full overflow-y-auto px-4 py-5 lg:px-6 lg:py-6">
          <AnimatePresence mode="wait">
            {activeTab === 0 ? (
              <motion.div
                key="case-studies"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={
                  layout === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "flex flex-col gap-6"
                }
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    themeColor={themeColor}
                    layout={layout}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />}>
                  <Resume />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
