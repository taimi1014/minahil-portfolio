"use client";

import { useMemo } from "react";
import { ExperienceEntry } from "@/types";
import { THEME_COLORS } from "./ThemeSwitcher";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  isFirst: boolean;
  isLast: boolean;
  themeColor: string;
}

export default function ExperienceItem({ entry, isFirst, isLast, themeColor }: ExperienceItemProps) {
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";
  const muted = theme?.dot || "#666666";

  return (
    <div className="flex gap-3">
      {/* Timeline track */}
      <div className="flex flex-col items-center pt-[6px]">
        <div
          className="w-[8px] h-[8px] rounded-full shrink-0"
          style={{
            backgroundColor: isFirst ? accent : "transparent",
            border: isFirst ? "none" : `1.5px solid ${muted}`,
            opacity: isFirst ? 1 : 0.5,
          }}
        />
        {!isLast && (
          <div className="w-[1.5px] flex-1 mt-1" style={{ backgroundColor: isFirst ? `${muted}40` : `${muted}25` }} />
        )}
      </div>

      {/* Content */}
      <div className={`pb-5 min-w-0 flex-1 ${isFirst ? "" : "opacity-50"}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div
              className={`text-[13px] leading-snug ${isFirst ? "font-semibold" : ""}`}
              style={{ color: isFirst ? accent : muted }}
            >
              {entry.role}
            </div>
            <div className="text-[12.5px] mt-[1px]" style={{ color: isFirst ? accent : muted }}>
              {entry.companyUrl ? (
                <a
                  href={entry.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:opacity-70 transition-opacity duration-200 inline-flex items-baseline gap-[2px]"
                >
                  {entry.company}
                  <svg width="7" height="7" viewBox="0 0 8 8" fill="none" className="inline relative top-[-1px]">
                    <path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <span className="font-medium">{entry.company}</span>
              )}
            </div>
            <span className="text-[11px] mt-[2px] block" style={{ color: muted, opacity: 0.7 }}>
              {entry.location}
            </span>
          </div>
          <span className="text-[11.5px] whitespace-nowrap shrink-0 pt-[1px]" style={{ color: muted, opacity: isFirst ? 0.8 : 0.6 }}>
            {entry.dateRange}
          </span>
        </div>
      </div>
    </div>
  );
}
