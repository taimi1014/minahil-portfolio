"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface DashboardSectionProps {
  data: {
    heading: string;
    badge?: string;
    description: string;
    screens: { imageSrc: string; imageAlt: string; title: string; description: string }[];
  };
  accent: string;
  themeColor: string;
}

export default function DashboardSection({ data, accent, themeColor }: DashboardSectionProps) {
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

      <div className="space-y-10">
        {data.screens.map((screen, i) => (
          <motion.div
            key={i}
            className="rounded-xl overflow-hidden border border-[#E8E8E8] bg-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Image
              src={screen.imageSrc}
              alt={screen.imageAlt}
              width={2400}
              height={1600}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 95vw, 800px"
            />
            <div className="px-5 py-4">
              <h3 className="font-semibold text-[15px] text-[#1A1A1A] mb-1">{screen.title}</h3>
              <p className="text-[13px] text-[#777] leading-relaxed">{screen.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
