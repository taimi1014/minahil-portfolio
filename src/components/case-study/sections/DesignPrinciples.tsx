"use client";

import { motion } from "motion/react";

interface Principle {
  title: string;
  description: string;
  icon?: string; // icon key
}

interface DesignPrinciplesProps {
  badge: string;
  heading: string;
  principles: Principle[];
  accent: string;
}

// Animated SVG icons for each principle
function PrincipleIcon({ index, accent }: { index: number; accent: string }) {
  const iconColor = accent;
  const lightColor = `${accent}20`;

  const icons = [
    // 01: Workflow — connected nodes flowing left to right
    <svg key="workflow" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <motion.circle
        cx="8" cy="20" r="4"
        fill={lightColor}
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      />
      <motion.line
        x1="12" y1="20" x2="18" y2="20"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeDasharray="6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      <motion.rect
        x="18" y="14" width="12" height="12" rx="3"
        fill={lightColor}
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
      />
      <motion.line
        x1="30" y1="20" x2="36" y2="20"
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.circle
        cx="36" cy="20" r="2"
        fill={iconColor}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.95, type: "spring" }}
      />
    </svg>,

    // 02: Progressive disclosure — layered rectangles revealing
    <svg key="layers" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <motion.rect
        x="6" y="22" width="28" height="14" rx="3"
        fill={lightColor}
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 22, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      <motion.rect
        x="10" y="14" width="20" height="12" rx="3"
        fill="white"
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ y: 22, opacity: 0 }}
        whileInView={{ y: 14, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      <motion.rect
        x="14" y="6" width="12" height="12" rx="3"
        fill={lightColor}
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ y: 14, opacity: 0 }}
        whileInView={{ y: 6, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.4 }}
      />
    </svg>,

    // 03: Voice — sound wave / speaker
    <svg key="voice" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <motion.rect
        x="8" y="14" width="8" height="12" rx="4"
        fill={lightColor}
        stroke={iconColor}
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring" }}
      />
      <motion.path
        d="M20 12 C24 12 26 16 26 20 C26 24 24 28 20 28"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.path
        d="M24 8 C30 8 34 14 34 20 C34 26 30 32 24 32"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />
    </svg>,

    // 04: Trust / shield — shield with checkmark
    <svg key="trust" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <motion.path
        d="M20 4 L32 10 L32 22 C32 30 26 35 20 37 C14 35 8 30 8 22 L8 10 Z"
        fill={lightColor}
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      />
      <motion.path
        d="M14 20 L18 24 L26 16"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.4 }}
      />
    </svg>,
  ];

  return icons[index] || icons[0];
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
            className="group relative rounded-2xl border border-[#E0E0E0] bg-white px-6 py-6 transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]"
            style={{
              boxShadow: "0 1px_6px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.02)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          >
            {/* Animated icon */}
            <div className="mb-4">
              <PrincipleIcon index={i} accent={accent} />
            </div>

            {/* Number badge */}
            <span
              className="inline-block text-[11px] font-bold tracking-widest uppercase mb-3 px-2 py-0.5 rounded"
              style={{ backgroundColor: `${accent}08`, color: `${accent}90` }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2 leading-snug">
              {p.title}
            </h3>
            <p className="text-[13.5px] text-[#666] leading-[1.7]">
              {p.description}
            </p>

            {/* Subtle accent line at bottom */}
            <motion.div
              className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
              style={{ backgroundColor: `${accent}15` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
