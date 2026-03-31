"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface FigmaEmbedProps {
  title: string;
  embedUrl: string;
}

export default function FigmaEmbed({ title, embedUrl }: FigmaEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fake progress bar that fills up while waiting for iframe
  useEffect(() => {
    if (loaded) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Cap at 90% until actually loaded
        // Fast start, slow finish
        const increment = prev < 30 ? 8 : prev < 60 ? 4 : prev < 80 ? 2 : 0.5;
        return Math.min(prev + increment, 90);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#111] border-b border-[#222]">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
          <div className="w-px h-4 bg-[#333]" />
          <h1 className="text-[14px] font-medium text-white/90">{title}</h1>
        </div>
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="h-[2px] bg-[#222] relative overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Figma embed */}
      <div className="flex-1 relative">
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-10 h-10 border-2 border-white/10 border-t-white/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-[13px] text-white/40">Loading case study...</p>
            </motion.div>
          )}
        </AnimatePresence>
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
      </div>
    </div>
  );
}
