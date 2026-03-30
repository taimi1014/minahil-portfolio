"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface EmbeddedSectionProps {
  data: {
    heading: string;
    badge?: string;
    description: string;
    screens: { imageSrc: string; imageAlt: string; title: string; description: string }[];
  };
  accent: string;
  themeColor: string;
}

export default function EmbeddedSection({ data, accent, themeColor }: EmbeddedSectionProps) {
  return (
    <section
      className="py-16 lg:py-24"
      style={{
        background: "linear-gradient(135deg, #7C3AED20, #2563EB15)",
      }}
    >
      <div className="px-6 lg:px-16">
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
          className="text-[15px] text-[#555] mb-10 max-w-[600px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {data.description}
        </motion.p>

        <div className="space-y-8">
          {data.screens.map((screen, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden bg-white shadow-sm border border-[#E8E8E8]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
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
    </section>
  );
}
