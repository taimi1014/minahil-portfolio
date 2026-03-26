"use client";

import { ExperienceEntry } from "@/types";

interface ExperienceItemProps {
  entry: ExperienceEntry;
}

export default function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div className="group flex items-start justify-between gap-4 py-[10px] rounded-lg transition-colors duration-200 -mx-2 px-2 hover:bg-surface/60">
      <div className="flex flex-col min-w-0">
        <div className="text-[13.5px] text-text-primary leading-snug">
          {entry.role} at{" "}
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:opacity-70 transition-all duration-200 inline-flex items-baseline gap-[2px]"
            >
              {entry.company}
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                className="inline relative top-[-1px] transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
              >
                <path
                  d="M1 7L7 1M7 1H2M7 1V6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : (
            <span className="font-bold">{entry.company}</span>
          )}
        </div>
        <span className="text-[12px] text-text-secondary mt-[2px]">
          {entry.location}
        </span>
      </div>
      <span className="text-[13px] text-text-secondary whitespace-nowrap shrink-0 pt-[1px]">
        {entry.dateRange}
      </span>
    </div>
  );
}
