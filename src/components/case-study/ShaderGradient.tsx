// ShaderGradient — uses huegrid.app runtime
"use client";

import { useEffect, useRef } from "react";

const REFLECTION_CONFIG = {
  mode: "aurora",
  colors: [
    ["#023e8a", 0],
    ["#90e0ef", 0.25],
    ["#0077b6", 0.5],
    ["#caf0f8", 0.75],
    ["#00b4d8", 1],
  ],
  direction: 145,
  animated: true,
  speed: 0.74,
  grain: 0,
  params: {
    waveSpeed: 1,
    waveFrequency: 3.5,
    sharpness: 4.78,
    amplitude: 0.39,
    waveWidth: 0.05,
    offsetX: -0.18,
    warpIntensity: 0.31,
    warpFreqX: 1.01,
    warpFreqY: 1.51,
    directionX: 0.95,
    directionY: -0.46,
  },
};

const FOOTER_CONFIG = {
  mode: "aurora",
  colors: [
    ["#1a1a1a", 0],
    ["#404040", 0.33],
    ["#0a0a0a", 0.67],
    ["#2d2d2d", 1],
  ],
  direction: 329,
  animated: true,
  speed: 0.98,
  grain: 0,
  params: {
    waveSpeed: 0.5,
    waveFrequency: 4.7,
    sharpness: 5.77,
    amplitude: 0.33,
    waveWidth: 0.05,
    offsetX: -0.13,
    warpIntensity: 0.18,
    warpFreqX: 1.11,
    warpFreqY: 0.93,
    directionX: -0.43,
    directionY: 0.8,
  },
};

interface ShaderGradientProps {
  variant?: "reflection" | "footer";
  className?: string;
}

// Track script loading state globally
let scriptLoaded = false;
let scriptLoading = false;
const pendingCallbacks: (() => void)[] = [];

function loadRuntime(cb: () => void) {
  if (scriptLoaded) {
    cb();
    return;
  }
  pendingCallbacks.push(cb);
  if (scriptLoading) return;
  scriptLoading = true;

  const s = document.createElement("script");
  s.src = "https://huegrid.app/sg-runtime.min.js";
  s.onload = () => {
    scriptLoaded = true;
    pendingCallbacks.forEach((fn) => fn());
    pendingCallbacks.length = 0;
  };
  s.onerror = () => {
    scriptLoading = false;
    console.warn("HueGrid runtime failed to load");
  };
  document.head.appendChild(s);
}

export function ShaderGradient({ variant = "reflection", className = "" }: ShaderGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = variant === "footer" ? FOOTER_CONFIG : REFLECTION_CONFIG;

    loadRuntime(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SG = (window as any).ShaderGradient;
      if (SG && canvas) {
        try {
          cleanupRef.current = SG.render(canvas, config);
        } catch (e) {
          console.warn("ShaderGradient render error:", e);
        }
      }
    });

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
