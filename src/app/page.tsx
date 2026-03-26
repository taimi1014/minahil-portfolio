"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";
import { THEME_COLORS } from "@/components/ThemeSwitcher";

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

function useNoiseTexture() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(size, size);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const v = Math.random() * 255;
      pixels[i] = v;
      pixels[i + 1] = v;
      pixels[i + 2] = v;
      pixels[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    setDataUrl(canvas.toDataURL("image/png"));
  }, []);

  return dataUrl;
}

export default function Home() {
  const [themeColor, setThemeColor] = useState("#FDE8EC");
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [pattern, setPattern] = useState("none");
  const [patternOpacity, setPatternOpacity] = useState(1);

  const noiseUrl = useNoiseTexture();
  const patternStyles = getPatternCSS(pattern, themeColor);

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden transition-colors duration-500 relative"
      style={{ backgroundColor: themeColor }}
    >
      {/* Canvas-generated noise texture overlay */}
      {noiseLevel > 0 && noiseUrl && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            opacity: noiseLevel * 0.35,
            backgroundImage: `url(${noiseUrl})`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            mixBlendMode: "multiply",
          }}
        />
      )}

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
          onThemeChange={setThemeColor}
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
