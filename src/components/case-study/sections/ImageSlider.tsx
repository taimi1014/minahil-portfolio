"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface ImageSliderProps {
  flows: {
    heading: string;
    badge?: string;
    description: string;
    slides: { src: string; alt: string; caption?: string }[];
  };
  accent: string;
  themeColor: string;
}

export default function ImageSlider({ flows, accent, themeColor }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = flows.slides.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(4);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(4);
  }, [total]);

  return (
    <div>
      {flows.badge && (
        <motion.span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-4"
          style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {flows.badge}
        </motion.span>
      )}

      <motion.h2
        className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {flows.heading}
      </motion.h2>

      <motion.p
        className="text-[15px] text-[#666] mb-8"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {flows.description}
      </motion.p>

      <motion.div
        className="relative rounded-xl overflow-hidden"
        style={{ backgroundColor: "#F0F0F0", border: "1px solid #E5E5E5" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {/* Slide content — real images */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={flows.slides[current].src}
                alt={flows.slides[current].alt}
                width={2400}
                height={1400}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 95vw, 800px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#E5E5E5]">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#999]">
              {flows.slides[current].caption || `Slide ${current + 1}`}
            </span>
            <div className="flex gap-1.5">
              {flows.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(4); }}
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: i === current ? accent : `${accent}25`,
                    transform: i === current ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
