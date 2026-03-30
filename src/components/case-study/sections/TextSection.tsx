"use client";

import { motion } from "motion/react";

interface TextSectionProps {
  badge?: string;
  heading?: string;
  body?: string;
  bullets?: { title: string; description: string }[];
  numberedItems?: { title: string; description: string }[];
  accent: string;
  themeColor: string;
  isLargeQuote?: boolean;
}

export default function TextSection({
  badge,
  heading,
  body,
  bullets,
  numberedItems,
  accent,
  themeColor,
  isLargeQuote,
}: TextSectionProps) {
  return (
    <div>
      {badge && (
        <motion.span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-6"
          style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {badge}
        </motion.span>
      )}

      {heading && (
        <motion.h2
          className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {heading}
        </motion.h2>
      )}

      {body && (
        <motion.p
          className={`text-[#555] leading-relaxed ${isLargeQuote ? "text-xl lg:text-2xl font-light leading-[1.6]" : "text-[15px]"}`}
          style={{ maxWidth: 720 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {body}
        </motion.p>
      )}

      {bullets && bullets.length > 0 && (
        <div className="grid gap-4 mt-6">
          {bullets.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-3 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: accent }}
              />
              <div>
                <span className="font-semibold text-[#1A1A1A] text-[15px]">{item.title}: </span>
                <span className="text-[#666] text-[14px]">{item.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {numberedItems && numberedItems.length > 0 && (
        <div className="grid gap-5 mt-6">
          {numberedItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span
                className="text-[13px] font-bold flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accent}12`, color: accent }}
              >
                {i + 1}
              </span>
              <div>
                <span className="font-semibold text-[#1A1A1A] text-[15px]">{item.title}: </span>
                <span className="text-[#666] text-[14px]">{item.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
