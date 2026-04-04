"use client";

import { motion } from "motion/react";

interface Principle {
  title: string;
  description: string;
}

interface DesignPrinciplesProps {
  badge: string;
  heading: string;
  principles: Principle[];
  accent: string;
}

export default function DesignPrinciples({ badge, heading, principles, accent }: DesignPrinciplesProps) {
  return (
    <div>
      <motion.span
        className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4"
        style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {badge}
      </motion.span>

      <motion.h2
        className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        {heading}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {principles.map((p, i) => (
          <motion.div
            key={i}
            className="rounded-xl border border-[#E8E8E8] bg-white px-6 py-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <span
              className="text-[28px] font-bold leading-none"
              style={{ color: `${accent}30` }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[15px] font-semibold text-[#1A1A1A] mt-2 mb-2">
              {p.title}
            </h3>
            <p className="text-[13px] text-[#666] leading-[1.65]">
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
