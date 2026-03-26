"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { experience } from "@/data/experience";
import { AnimatePresence, motion } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import ExperienceTimeline from "./ExperienceTimeline";
import ContactSection from "./ContactSection";
import ScrambleText from "./ScrambleText";
import ThemeSwitcher, { THEME_COLORS } from "./ThemeSwitcher";

const ROLE_TITLES = [
  "Lead Product Designer",
  "Product Thinker",
  "Design Engineer",
  "UX Strategist",
  "Team Player",
];

interface SidebarProps {
  themeColor: string;
  onThemeChange: (color: string) => void;
  noiseLevel: number;
  onNoiseChange: (level: number) => void;
  pattern: string;
  onPatternChange: (pattern: string) => void;
}

export default function Sidebar({ themeColor, onThemeChange, noiseLevel, onNoiseChange, pattern, onPatternChange }: SidebarProps) {
  const [sunflowers, setSunflowers] = useState<{ id: number; x: number; r: number; s: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";
  const accentMuted = theme?.dot || "#666666";

  function haptic() {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(8);
    }
  }

  const spawnFlowers = useCallback(() => {
    const batch = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i + Math.random() * 1000,
      x: Math.random() * 85 + 5,
      r: Math.random() * 50 - 25,
      s: Math.random() * 0.5 + 0.6,
    }));
    setSunflowers(prev => [...prev, ...batch]);
    setTimeout(() => {
      setSunflowers(prev => prev.filter(f => !batch.find(b => b.id === f.id)));
    }, 3000);
  }, []);

  const startSunflowers = useCallback(() => {
    haptic();
    spawnFlowers();
    intervalRef.current = setInterval(() => {
      haptic();
      spawnFlowers();
    }, 250);
  }, [spawnFlowers]);

  const stopSunflowers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <aside
      className="w-full lg:w-[30%] lg:max-w-[420px] h-full hide-scrollbar overflow-y-auto relative"
    >
      {/* Falling sunflower stickers */}
      <AnimatePresence>
        {sunflowers.map((flower) => (
          <motion.div
            key={flower.id}
            className="absolute pointer-events-none z-20"
            style={{ left: `${flower.x}%`, fontSize: `${flower.s * 28}px` }}
            initial={{ y: -40, opacity: 1, rotate: flower.r }}
            animate={{ y: 700, opacity: 0, rotate: flower.r + 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 + Math.random(), ease: "easeIn" }}
          >
            🌻
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Top pill bar — sticky, doesn't scroll */}
      <div
        className="sticky top-0 z-30 px-8 pt-4 pb-2 lg:px-12"
        style={{
          backgroundColor: themeColor === "#FFFFFF" ? "rgba(255,255,255,0.85)" : `${themeColor}dd`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <motion.div
          className="inline-flex items-center gap-1.5 px-1 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          >
            <ThemeSwitcher
              currentColor={themeColor}
              onColorChange={onThemeChange}
              noiseLevel={noiseLevel}
              onNoiseChange={onNoiseChange}
              pattern={pattern}
              onPatternChange={onPatternChange}
            />
          </div>
          <button
            onPointerDown={startSunflowers}
            onPointerUp={stopSunflowers}
            onPointerLeave={stopSunflowers}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            title="Drop sunflowers"
          >
            <span className="text-[14px]">🌻</span>
          </button>
        </motion.div>
      </div>

      <div className="px-8 pt-4 pb-6 lg:px-12 lg:pt-6 lg:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ProfilePhoto />
        </motion.div>

        <motion.h1
          className="text-[28px] lg:text-[30px] font-semibold leading-[1.2] mt-5 tracking-[-0.01em]"
          style={{ color: accent }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Hi, I am Minahil
          <div className="mt-2" />
          <span className="whitespace-nowrap">
            <span style={{ color: accent }}>&ldquo;</span>
            <ScrambleText
              texts={ROLE_TITLES}
              interval={4500}
              className="inline"
              themeColor={themeColor}
            /><span style={{ color: accent }}>&rdquo;</span>
          </span>
        </motion.h1>

        {/* About */}
        <motion.section
          className="mt-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h2 className="text-[16px] font-semibold mb-2" style={{ color: accent }}>
            About
          </h2>
          <p className="text-[13.5px] leading-[1.65]" style={{ color: accentMuted }}>
            I've spent 7+ years designing products people actually use — from fintech platforms and government systems to SaaS tools and agency work. Most of that has been 0-to-1, taking ideas from whiteboard sketches to shipped products that move real metrics.
          </p>
        </motion.section>

        {/* Work Experience */}
        <motion.section
          className="mt-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h2 className="text-[16px] font-semibold mb-3" style={{ color: accent }}>
            Work Experience
          </h2>
          <ExperienceTimeline themeColor={themeColor} />
        </motion.section>

      </div>

      {/* Contact — sticky footer at bottom of sidebar */}
      <div
        className="sticky bottom-0 left-0 right-0 px-8 py-4 lg:px-12 lg:py-5 z-20"
        style={{
          backgroundColor: themeColor === "#FFFFFF" ? "rgba(255,255,255,0.9)" : `${themeColor}ee`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: `1px solid rgba(255,255,255,0.3)`,
        }}
      >
        <ContactSection themeColor={themeColor} />
      </div>
    </aside>
  );
}
