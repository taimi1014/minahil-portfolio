"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { THEME_COLORS } from "./ThemeSwitcher";

interface ScrambleTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  themeColor: string;
}

export default function ScrambleText({
  texts,
  interval = 4000,
  className = "",
  themeColor,
}: ScrambleTextProps) {
  const [index, setIndex] = useState(0);

  const accent = useMemo(() => {
    const match = THEME_COLORS.find((t) => t.value === themeColor);
    return match?.accent || "#1A1A1A";
  }, [themeColor]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className={`${className} relative inline-flex items-center`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.3 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
          transition={{
            clipPath: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.4, ease: "easeInOut" },
          }}
          className="inline-block font-semibold whitespace-nowrap"
          style={{ color: accent }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
