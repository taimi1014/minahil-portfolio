"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const THEME_COLORS = [
  { name: "Default", value: "#FFFFFF", dot: "#D0D0D0", accent: "#1A1A1A", accentLight: "rgba(243,244,246,0.5)", border: "#9CA3AF" },
  { name: "Ice", value: "#EEF2FF", dot: "#93A3F8", accent: "#4338CA", accentLight: "rgba(224,231,255,0.5)", border: "#818CF8" },
  { name: "Sky", value: "#E8F4FD", dot: "#6DB6E3", accent: "#0369A1", accentLight: "rgba(224,242,254,0.5)", border: "#7DD3FC" },
  { name: "Mint", value: "#E6F7F0", dot: "#5CC9A0", accent: "#047857", accentLight: "rgba(209,250,229,0.5)", border: "#34D399" },
  { name: "Sage", value: "#EEF4E5", dot: "#8FBF6A", accent: "#3F6212", accentLight: "rgba(228,240,212,0.5)", border: "#A3E635" },
  { name: "Sand", value: "#FDF6E3", dot: "#D4B656", accent: "#92400E", accentLight: "rgba(254,243,199,0.5)", border: "#FBBF24" },
  { name: "Peach", value: "#FEF0E6", dot: "#EFA06A", accent: "#C2410C", accentLight: "rgba(255,237,213,0.5)", border: "#FB923C" },
  { name: "Rose", value: "#FDE8EC", dot: "#E8819A", accent: "#BE123C", accentLight: "rgba(255,228,230,0.45)", border: "#FB7185" },
  { name: "Lavender", value: "#F3EAFA", dot: "#B08FDA", accent: "#6D28D9", accentLight: "rgba(237,233,254,0.5)", border: "#A78BFA" },
  { name: "Mauve", value: "#F8E8F4", dot: "#CC7EBF", accent: "#A21CAF", accentLight: "rgba(250,232,255,0.5)", border: "#E879F9" },
];

export const PATTERNS = [
  { name: "None", value: "none" },
  { name: "Dots", value: "dots" },
  { name: "Grid", value: "grid" },
  { name: "Diagonal", value: "diagonal" },
  { name: "Cross", value: "cross" },
  { name: "Waves", value: "waves" },
  { name: "Hex", value: "hex" },
];

function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(8);
  }
}

interface ThemeSwitcherProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  noiseLevel: number;
  onNoiseChange: (level: number) => void;
  pattern: string;
  onPatternChange: (pattern: string) => void;
  patternOpacity: number;
  onPatternOpacityChange: (opacity: number) => void;
}

export default function ThemeSwitcher({
  currentColor,
  onColorChange,
  noiseLevel,
  onNoiseChange,
  pattern,
  onPatternChange,
  patternOpacity,
  onPatternOpacityChange,
}: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dotColor = THEME_COLORS.find(t => t.value === currentColor)?.dot || "#D0D0D0";

  return (
    <div className="relative">
      {/* Color trigger */}
      <button
        onClick={() => { haptic(); setIsOpen(!isOpen); }}
        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
        title="Change theme color"
      >
        <div
          className="w-[18px] h-[18px] rounded-full border border-black/10"
          style={{ backgroundColor: dotColor }}
        />
      </button>

      {/* Color picker popup — opens DOWNWARD */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute top-10 left-0 z-50 bg-white rounded-xl shadow-lg border border-border p-3 w-[260px]"
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Color dots */}
              <div className="flex gap-1.5 justify-start flex-wrap">
                {THEME_COLORS.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => { haptic(); onColorChange(theme.value); }}
                    className="relative w-[19px] h-[19px] rounded-full transition-transform duration-150 hover:scale-125 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: theme.name === "Default" ? "#E8E8E8" : theme.dot }}
                    title={theme.name}
                  >
                    {currentColor === theme.value && (
                      <motion.div
                        layoutId="selectedDot"
                        className="absolute inset-[-3px] rounded-full border-2 border-text-primary"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Noise slider */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-text-secondary">Texture</span>
                  <span className="text-[10px] text-text-tertiary tabular-nums">
                    {Math.round(noiseLevel * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={noiseLevel}
                  onChange={(e) => onNoiseChange(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${dotColor} ${noiseLevel * 100}%, #E5E5E5 ${noiseLevel * 100}%)`,
                  }}
                />
              </div>

              {/* Pattern selector */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-text-secondary">Pattern</span>
                  {pattern !== "none" && (
                    <span className="text-[10px] text-text-tertiary tabular-nums">
                      {Math.round(patternOpacity * 100)}%
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {PATTERNS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => { haptic(); onPatternChange(p.value); }}
                      className={`relative h-7 rounded-md border text-[9px] font-medium transition-all duration-150 cursor-pointer ${
                        pattern === p.value
                          ? "border-text-primary bg-surface text-text-primary"
                          : "border-border text-text-tertiary hover:border-text-secondary/30"
                      }`}
                      title={p.name}
                    >
                      <PatternPreview type={p.value} active={pattern === p.value} />
                    </button>
                  ))}
                </div>
                {pattern !== "none" && (
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={patternOpacity}
                    onChange={(e) => onPatternOpacityChange(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer mt-2"
                    style={{
                      background: `linear-gradient(to right, ${dotColor} ${patternOpacity * 100}%, #E5E5E5 ${patternOpacity * 100}%)`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PatternPreview({ type, active }: { type: string; active: boolean }) {
  const color = active ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)";

  if (type === "none") {
    return <span className="absolute inset-0 flex items-center justify-center text-[9px]">Off</span>;
  }
  if (type === "dots") {
    return (
      <span className="absolute inset-1 rounded-sm" style={{ backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`, backgroundSize: "6px 6px" }} />
    );
  }
  if (type === "grid") {
    return (
      <span className="absolute inset-1 rounded-sm" style={{ backgroundImage: `linear-gradient(${color} 0.5px, transparent 0.5px), linear-gradient(90deg, ${color} 0.5px, transparent 0.5px)`, backgroundSize: "6px 6px" }} />
    );
  }
  if (type === "diagonal") {
    return (
      <span className="absolute inset-1 rounded-sm" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${color}, ${color} 0.5px, transparent 0.5px, transparent 5px)` }} />
    );
  }
  if (type === "cross") {
    return (
      <span className="absolute inset-1 rounded-sm" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${color}, ${color} 0.5px, transparent 0.5px, transparent 5px), repeating-linear-gradient(-45deg, ${color}, ${color} 0.5px, transparent 0.5px, transparent 5px)` }} />
    );
  }
  if (type === "waves") {
    return (
      <span className="absolute inset-1 rounded-sm" style={{ backgroundImage: `repeating-linear-gradient(0deg, ${color} 0px, ${color} 0.5px, transparent 0.5px, transparent 3px, ${color} 3px, ${color} 3.5px, transparent 3.5px, transparent 6px)`, backgroundSize: "8px 6px" }} />
    );
  }
  if (type === "hex") {
    return (
      <span className="absolute inset-1 rounded-sm" style={{ backgroundImage: `radial-gradient(circle at 0 0, transparent 4px, ${color} 4px, ${color} 4.5px, transparent 4.5px), radial-gradient(circle at 5px 3px, transparent 4px, ${color} 4px, ${color} 4.5px, transparent 4.5px)`, backgroundSize: "10px 6px" }} />
    );
  }
  return null;
}
