"use client";

import { useEffect, useRef } from "react";

interface AnimatedBlobProps {
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
}

export default function AnimatedBlob({
  color = "255,255,255",
  opacity = 0.12,
  speed = 0.002,
  className = "",
}: AnimatedBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Simple 2D noise function (value noise)
    const noise = (x: number, y: number) => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      const sx = fx * fx * (3 - 2 * fx);
      const sy = fy * fy * (3 - 2 * fy);

      const hash = (n: number) => {
        let h = n;
        h = ((h >> 13) ^ h) * 1274126177;
        return ((h >> 16) ^ h) & 0xff;
      };

      const h00 = hash(ix * 7 + iy * 131) / 255;
      const h10 = hash((ix + 1) * 7 + iy * 131) / 255;
      const h01 = hash(ix * 7 + (iy + 1) * 131) / 255;
      const h11 = hash((ix + 1) * 7 + (iy + 1) * 131) / 255;

      return h00 + sx * (h10 - h00) + sy * (h01 - h00) + sx * sy * (h00 - h10 - h01 + h11);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Draw 2 organic blobs
      for (let b = 0; b < 2; b++) {
        const cx = w * (0.3 + b * 0.4) + Math.sin(time * (0.8 + b * 0.3)) * w * 0.15;
        const cy = h * 0.5 + Math.cos(time * (0.6 + b * 0.2)) * h * 0.2;
        const baseRadius = Math.min(w, h) * (0.25 + b * 0.05);

        ctx.beginPath();
        const points = 64;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const noiseVal = noise(
            Math.cos(angle) * 2 + time * (1 + b * 0.5),
            Math.sin(angle) * 2 + time * (0.8 + b * 0.3) + b * 10
          );
          const r = baseRadius * (0.7 + noiseVal * 0.6);
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 1.2);
        const blobOpacity = opacity * (b === 0 ? 1 : 0.6);
        gradient.addColorStop(0, `rgba(${color},${blobOpacity})`);
        gradient.addColorStop(0.5, `rgba(${color},${blobOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color},0)`);

        ctx.fillStyle = gradient;
        ctx.filter = "blur(30px)";
        ctx.fill();
        ctx.filter = "none";
      }

      time += speed;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [color, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
