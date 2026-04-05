"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";
import { THEME_COLORS } from "@/components/ThemeSwitcher";

interface RippleState {
  x: number;
  y: number;
  color: string;
  id: number;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
}

function getPatternCSS(pattern: string, color: string): React.CSSProperties | null {
  const match = THEME_COLORS.find((t) => t.value === color);
  const patternColor = match ? match.accent : "#4338CA";
  const { r, g, b } = hexToRgb(patternColor);

  switch (pattern) {
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, rgba(${r},${g},${b},0.18) 1.5px, transparent 1.5px)`,
        backgroundSize: "20px 20px",
      };
    case "grid":
      return {
        backgroundImage: `linear-gradient(rgba(${r},${g},${b},0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(${r},${g},${b},0.12) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      };
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, rgba(${r},${g},${b},0.1), rgba(${r},${g},${b},0.1) 1px, transparent 1px, transparent 12px)`,
      };
    case "cross":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, rgba(${r},${g},${b},0.08), rgba(${r},${g},${b},0.08) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, rgba(${r},${g},${b},0.08), rgba(${r},${g},${b},0.08) 1px, transparent 1px, transparent 12px)`,
      };
    case "waves":
      return {
        backgroundImage: `repeating-linear-gradient(0deg, rgba(${r},${g},${b},0.08) 0px, rgba(${r},${g},${b},0.08) 1px, transparent 1px, transparent 6px, rgba(${r},${g},${b},0.06) 6px, rgba(${r},${g},${b},0.06) 7px, transparent 7px, transparent 12px)`,
        backgroundSize: "100% 12px",
      };
    case "hex":
      return {
        backgroundImage: `radial-gradient(circle at 0 0, transparent 8px, rgba(${r},${g},${b},0.06) 8px, rgba(${r},${g},${b},0.06) 9px, transparent 9px), radial-gradient(circle at 10px 6px, transparent 8px, rgba(${r},${g},${b},0.06) 8px, rgba(${r},${g},${b},0.06) 9px, transparent 9px)`,
        backgroundSize: "20px 12px",
      };
    default:
      return null;
  }
}

// SVG turbulence noise — produces organic film-grain effect
function NoiseOverlay({ opacity }: { opacity: number }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity }}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="1" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [themeColor, setThemeColor] = useState("#FDE8EC");
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [pattern, setPattern] = useState("none");
  const [patternOpacity, setPatternOpacity] = useState(1);

  const patternStyles = useMemo(() => getPatternCSS(pattern, themeColor), [pattern, themeColor]);
  const [ripple, setRipple] = useState<RippleState | null>(null);

  // Color change with ripple animation
  const handleThemeChangeWithRipple = useCallback((newColor: string, x?: number, y?: number) => {
    if (newColor === themeColor) {
      setThemeColor(newColor);
      return;
    }
    if (x !== undefined && y !== undefined) {
      setRipple({ x, y, color: newColor, id: Date.now() });
      // Swap the actual bg color after the ripple covers the screen
      setTimeout(() => {
        setThemeColor(newColor);
      }, 700);
      // Remove ripple after animation completes
      setTimeout(() => {
        setRipple(null);
      }, 1400);
    } else {
      setThemeColor(newColor);
    }
  }, [themeColor]);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem("portfolio-theme", themeColor);
  }, [themeColor]);

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden transition-colors duration-500 relative"
      style={{ backgroundColor: themeColor }}
    >
      {/* Ink drop ripple overlay */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none"
            style={{
              top: ripple.y,
              left: ripple.x,
              x: "-50%",
              y: "-50%",
              backgroundColor: ripple.color === "#FFFFFF" ? "#F5F5F5" : ripple.color,
              borderRadius: "50%",
              zIndex: 50,
            }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{
              width: "300vmax",
              height: "300vmax",
              opacity: [0.9, 0.95, 0.9, 0],
              transition: {
                width: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                height: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 1.4, times: [0, 0.3, 0.7, 1], ease: "easeOut" },
              },
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* SVG noise texture overlay */}
      {noiseLevel > 0 && <NoiseOverlay opacity={noiseLevel * 0.3} />}

      {/* Pattern overlay */}
      {patternStyles && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ ...patternStyles, opacity: patternOpacity }}
        />
      )}

      <div className="flex flex-col lg:flex-row lg:h-full relative z-10">
        <Sidebar
          themeColor={themeColor}
          onThemeChange={handleThemeChangeWithRipple}
          noiseLevel={noiseLevel}
          onNoiseChange={setNoiseLevel}
          pattern={pattern}
          onPatternChange={setPattern}
          patternOpacity={patternOpacity}
          onPatternOpacityChange={setPatternOpacity}
        />

        {/* Right column — tabs on colored bg, content in white box */}
        <div className="flex-1 flex flex-col lg:h-full px-3 pt-3 pb-3 lg:pl-0 lg:pr-4 lg:pt-4 lg:pb-4">
          <ProjectGrid themeColor={themeColor} />
        </div>
      </div>

    </div>
  );
}
