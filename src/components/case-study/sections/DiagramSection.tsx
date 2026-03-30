"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { DiagramData } from "@/types/case-study";

interface DiagramProps {
  diagram: DiagramData;
  accent: string;
  themeColor: string;
}

export default function DiagramSection({ diagram, accent, themeColor }: DiagramProps) {
  const hasGradient = diagram.gradientBg;

  return (
    <section
      className={`${hasGradient ? "py-16 lg:py-24" : ""}`}
      style={
        hasGradient
          ? {
              background: `linear-gradient(135deg, ${diagram.gradientFrom || "#7C3AED"}, ${diagram.gradientTo || "#2563EB"})`,
            }
          : {}
      }
    >
      <div className={hasGradient ? "px-6 lg:px-16" : ""}>
        {diagram.badge && (
          <motion.span
            className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-4"
            style={
              hasGradient
                ? { backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }
                : { backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }
            }
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {diagram.badge}
          </motion.span>
        )}

        {diagram.heading && (
          <motion.h2
            className={`text-2xl lg:text-3xl font-bold mb-2 ${hasGradient ? "text-white" : "text-[#1A1A1A]"}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {diagram.heading}
          </motion.h2>
        )}

        {diagram.description && (
          <motion.p
            className={`text-[15px] mb-8 ${hasGradient ? "text-white/70" : "text-[#666]"}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {diagram.description}
          </motion.p>
        )}

        {/* Real image */}
        <motion.div
          className="rounded-xl overflow-hidden mx-auto"
          style={{ maxWidth: 1000 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Image
            src={diagram.imageSrc}
            alt={diagram.imageAlt}
            width={2400}
            height={1600}
            className="w-full h-auto rounded-xl"
            loading="lazy"
            sizes="(max-width: 768px) 95vw, 900px"
          />
        </motion.div>
      </div>
    </section>
  );
}
