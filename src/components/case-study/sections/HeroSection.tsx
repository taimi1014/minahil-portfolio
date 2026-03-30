"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HeroData } from "@/types/case-study";

interface HeroProps {
  hero: HeroData;
  accent: string;
}

export default function HeroSection({ hero, accent }: HeroProps) {
  const heroImage = hero.mockupImages?.[0];

  return (
    <section className="relative overflow-hidden">
      {heroImage ? (
        /* Full-bleed hero image */
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={heroImage}
            alt={`${hero.tagline} ${hero.subtitle}`}
            width={2400}
            height={1372}
            className="w-full h-auto"
            priority
            sizes="100vw"
          />
        </motion.div>
      ) : (
        /* Fallback gradient hero */
        <div
          className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20"
          style={{
            background: `linear-gradient(135deg, ${hero.gradientFrom}, ${hero.gradientTo})`,
          }}
        >
          <motion.div
            className="text-center z-10 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-2">
              {hero.tagline}
            </h1>
            <span className="text-white text-3xl lg:text-5xl font-bold">
              {hero.subtitle}
            </span>
          </motion.div>
        </div>
      )}
    </section>
  );
}
