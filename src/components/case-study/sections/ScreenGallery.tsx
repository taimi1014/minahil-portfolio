"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface ScreenEntry {
  captionTitle: string;
  captionCopy: string;
  images: { src: string; alt: string }[];
}

interface ScreenGalleryProps {
  badge: string;
  heading: string;
  screens: ScreenEntry[];
  accent: string;
}

export default function ScreenGallery({ badge, heading, screens, accent }: ScreenGalleryProps) {
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
        className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        {heading}
      </motion.h2>

      <div className="space-y-16">
        {screens.map((screen, i) => (
          <motion.div
            key={i}
            className="border-t border-[#E8E8E8] pt-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Caption */}
            <div className="mb-6 max-w-[600px]">
              <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-1.5">
                {screen.captionTitle}
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.65]">
                {screen.captionCopy}
              </p>
            </div>

            {/* Images — single or 2-up row */}
            {screen.images.length === 1 ? (
              <div className="rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#EBEBEB]">
                <Image
                  src={screen.images[0].src}
                  alt={screen.images[0].alt}
                  width={2400}
                  height={1500}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 95vw, 800px"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screen.images.map((img, j) => (
                  <div
                    key={j}
                    className="rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#EBEBEB]"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 95vw, 400px"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
