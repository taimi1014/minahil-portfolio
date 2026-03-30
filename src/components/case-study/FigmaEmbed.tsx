"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface FigmaEmbedProps {
  title: string;
  embedUrl: string;
}

export default function FigmaEmbed({ title, embedUrl }: FigmaEmbedProps) {
  const [loaded, setLoaded] = useState(false);

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

      {/* Figma embed */}
      <div className="flex-1 relative">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
        />
      </div>
    </div>
  );
}
