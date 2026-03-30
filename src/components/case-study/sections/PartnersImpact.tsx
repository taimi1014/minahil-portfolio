"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface PartnersImpactProps {
  data: {
    heading: string;
    partners: { name: string; logoSrc?: string }[];
    stats: { value: string; numericValue: number; suffix?: string; label: string }[];
  };
  accent: string;
  themeColor: string;
}

function AnimatedCounter({ target, suffix, accent }: { target: number; suffix?: string; accent: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} style={{ color: accent }}>
      {count}{suffix}
    </span>
  );
}

export default function PartnersImpact({ data, accent, themeColor }: PartnersImpactProps) {
  // Double the partners list for infinite marquee
  const marqueePartners = [...data.partners, ...data.partners];

  return (
    <div>
      {/* Stats */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-16 px-6">
        {data.stats.map((stat, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-5xl lg:text-6xl font-bold mb-2">
              <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} accent={accent} />
            </div>
            <p className="text-[15px] text-[#777]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Logo marquee */}
      <div className="relative overflow-hidden py-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, -50 * data.partners.length] }}
          transition={{
            x: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
        >
          {marqueePartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 px-5 py-3 rounded-lg border border-[#E8E8E8] bg-white text-[13px] font-semibold text-[#555] whitespace-nowrap"
              style={{ minWidth: 120, textAlign: "center" }}
            >
              {partner.name}
            </div>
          ))}
        </motion.div>
      </div>

      {/* +25 more */}
      <motion.p
        className="text-center text-[13px] text-[#999] mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        +25 more partners
      </motion.p>
    </div>
  );
}
