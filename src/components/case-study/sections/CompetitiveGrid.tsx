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

      {edge.body && (
        <motion.p
          className="text-[17px] lg:text-[20px] text-[#555] mb-10 max-w-[800px] leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {edge.body}
        </motion.p>
      )}

      {/* Simple numbered list — matches Figma prototype */}
      <div className="space-y-8 max-w-[900px]">
        {edge.numberedItems?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1A1A1A] mb-1">
              {i + 1}. {item.title}:
            </h3>
            <p className="text-[14px] lg:text-[15px] text-[#555] leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
