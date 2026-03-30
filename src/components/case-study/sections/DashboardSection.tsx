"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface DashboardSectionProps {
  data: {
    heading: string;
    badge?: string;
    description: string;
    screens: { imageSrc: string; imageAlt: string; title: string; description: string }[];
    compositionImage?: string;
  };
  accent: string;
  themeColor: string;
  isMissionControl?: boolean;
}

export default function DashboardSection({ data, accent, themeColor, isMissionControl }: DashboardSectionProps) {
  return (
    <div>
      {/* Header — Mission Control uses split layout, Dashboard uses stacked */}
      {isMissionControl ? (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 mb-12">
          <div className="lg:w-[40%] flex-shrink-0">
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
              className="text-3xl lg:text-[42px] font-bold text-[#1A1A1A] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {data.heading}
            </motion.h2>
          </div>
          <div className="lg:flex-1 lg:pt-10">
            <motion.p
              className="text-[16px] lg:text-[18px] text-[#555] leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {data.description}
            </motion.p>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}

      {/* Composition hero image — if available */}
      {data.compositionImage && (
        <motion.div
          className="rounded-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={data.compositionImage}
            alt={`${data.heading} composition`}
            width={2400}
            height={1600}
            className="w-full h-auto"
            loading="lazy"
            sizes="(max-width: 768px) 95vw, 900px"
          />
        </motion.div>
      )}

      {/* Screen images — full width, stacked with spacing */}
      <div className="space-y-6">
        {data.screens.map((screen, i) => (
          <motion.div
            key={i}
            className="rounded-xl overflow-hidden bg-[#F8F8F8]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <Image
              src={screen.imageSrc}
              alt={screen.imageAlt}
              width={2400}
              height={1600}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 95vw, 900px"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
