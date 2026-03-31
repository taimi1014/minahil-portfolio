"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { THEME_COLORS } from "./ThemeSwitcher";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  themeColor: string;
}

export default function TabSwitcher({
  tabs,
  activeTab,
  onTabChange,
  themeColor,
}: TabSwitcherProps) {
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";
  const accentLight = theme?.accentLight || "rgba(243,244,246,0.5)";
  const border = theme?.border || "#9CA3AF";

  return (
    <div className="inline-flex items-center gap-1">
      {tabs.map((tab, index) => {
        const isActive = activeTab === index;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(index)}
            className={`relative px-5 py-2 text-[13px] font-medium cursor-pointer transition-colors duration-150 rounded-[14px] ${
              isActive
                ? ""
                : "text-text-secondary hover:text-text-primary"
            }`}
            style={{
              backgroundColor: "transparent",
              color: isActive ? accent : undefined,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-[14px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: `1.5px solid ${border}40`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
