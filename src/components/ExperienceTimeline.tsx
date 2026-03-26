"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experience } from "@/data/experience";
import ExperienceItem from "./ExperienceItem";
import { THEME_COLORS } from "./ThemeSwitcher";

interface ExperienceTimelineProps {
  themeColor: string;
}

export default function ExperienceTimeline({ themeColor }: ExperienceTimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const current = experience[0];
  const rest = experience.slice(1);

  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#374151";

  return (
    <div>
      {/* Current role — always visible */}
      <ExperienceItem
        entry={current}
        isFirst={true}
        isLast={!showAll}
        themeColor={themeColor}
      />

      {/* View all toggle — frosted glass pill */}
      {!showAll && (
        <div className="ml-5 -mt-2">
          <button
            onClick={() => { if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(8); setShowAll(true); }}
            className="text-[11.5px] font-medium px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95"
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.5)",
              color: accent,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            Show More
          </button>
        </div>
      )}

      {/* Past roles — animated in/out */}
      <AnimatePresence>
        {showAll && rest.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="overflow-hidden"
          >
            <ExperienceItem
              entry={entry}
              isFirst={false}
              isLast={index === rest.length - 1}
              themeColor={themeColor}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Collapse button */}
      {showAll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-5 mt-1"
        >
          <button
            onClick={() => setShowAll(false)}
            className="text-[11.5px] font-medium px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95"
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.5)",
              color: accent,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            Show Less
          </button>
        </motion.div>
      )}
    </div>
  );
}
