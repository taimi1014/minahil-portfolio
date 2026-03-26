"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import TabSwitcher from "./TabSwitcher";
import Resume from "./Resume";

const TABS = ["Case Studies", "My Resume"];

interface ProjectGridProps {
  themeColor: string;
}

export default function ProjectGrid({ themeColor }: ProjectGridProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Tabs — directly above frosted glass box */}
      <TabSwitcher
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        themeColor={themeColor}
      />

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
        <div className="h-full overflow-y-auto px-6 py-6 lg:px-8 lg:py-8">
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
                className="space-y-6"
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
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
                <Resume />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
