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

export default function ProjectGrid({ themeColor }: ProjectGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";

  return (
    <>
      {/* Tabs row — tabs left, download button right */}
      <div className="flex items-center justify-between mb-3">
        <TabSwitcher
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          themeColor={themeColor}
        />
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
        <div className="h-full overflow-y-auto px-4 py-5 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait">
            {activeTab === 0 ? (
              <motion.div
                key="case-studies"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex flex-col gap-6"
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    themeColor={themeColor}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
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
