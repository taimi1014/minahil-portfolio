"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ScreenSection } from "@/types/case-study";

interface SmeJourneySectionProps {
  data: ScreenSection;
  accent: string;
  themeColor: string;
}

export default function SmeJourneySection({ data, accent }: SmeJourneySectionProps) {
  return (
    <div>
      {data.badge && (
        <motion.span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-4"
          style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {data.badge}
        </motion.span>
      )}

      <motion.h2
        className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {data.heading}
      </motion.h2>

      <motion.p
        className="text-[15px] text-[#666] mb-10 max-w-[600px]"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {data.description}
      </motion.p>

      {/* Horizontal scrolling gallery */}
      <div className="overflow-x-auto hide-scrollbar -mx-6 lg:-mx-16 px-6 lg:px-16 pb-4">
        <div className="flex gap-5" style={{ width: "max-content" }}>
          {data.screens.map((screen, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[280px] lg:w-[340px] rounded-xl overflow-hidden bg-white border border-[#E8E8E8] shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <div className="bg-[#F5F5F5] p-2">
                <Image
                  src={screen.imageSrc}
                  alt={screen.imageAlt}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  sizes="340px"
                />
              </div>
              <div className="px-4 py-3">
                <h4 className="text-[13px] font-semibold text-[#1A1A1A] mb-0.5">
                  {screen.title}
                </h4>
                <p className="text-[11px] text-[#888] leading-relaxed line-clamp-2">
                  {screen.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
