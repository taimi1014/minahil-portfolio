"use client";

import { motion } from "motion/react";

interface CompetitiveGridProps {
  edge: {
    badge?: string;
    heading?: string;
    body?: string;
    numberedItems?: { title: string; description: string }[];
  };
  accent: string;
  themeColor: string;
}

export default function CompetitiveGrid({ edge, accent, themeColor }: CompetitiveGridProps) {
  return (
    <div>
      {edge.badge && (
        <motion.span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-4"
          style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {edge.badge}
        </motion.span>
      )}

      {edge.heading && (
        <motion.h2
          className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {edge.heading}
        </motion.h2>
      )}

      {edge.body && (
        <motion.p
          className="text-[15px] text-[#666] mb-8 max-w-[600px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {edge.body}
        </motion.p>
      )}

      {/* 2-column grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {edge.numberedItems?.map((item, i) => (
          <motion.div
            key={i}
            className="p-5 rounded-xl border border-[#E8E8E8] bg-white hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start gap-3">
              <span
                className="text-[12px] font-bold flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: themeColor, color: accent }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-[14px] text-[#1A1A1A] mb-1">{item.title}</h3>
                <p className="text-[13px] text-[#777] leading-relaxed">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
