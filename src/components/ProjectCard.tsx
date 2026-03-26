"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Project } from "@/types";
import { THEME_COLORS } from "./ThemeSwitcher";

interface ProjectCardProps {
  project: Project;
  index: number;
  themeColor: string;
}

export default function ProjectCard({ project, index, themeColor }: ProjectCardProps) {
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";

  return (
    <motion.article
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] max-w-[90%] lg:max-w-[85%] mx-auto border border-[#E8E8E8] cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index === 0 ? 0.3 : 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Image container with hover overlay */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={1200}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Accent color overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: `${themeColor}dd` }}
        >
          <span
            className="px-5 py-2.5 rounded-full text-[13px] font-medium"
            style={{
              backgroundColor: "#fff",
              color: accent,
              border: `1.5px solid ${accent}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            View Project
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="px-4 py-3 space-y-1">
        <h3 className="text-[16px] font-semibold text-text-primary leading-snug">
          {project.title}
        </h3>
        <p className="text-[12.5px] text-text-secondary leading-[1.6]">
          {project.description}
        </p>

        {project.companyLogo && (
          <div className="pt-1">
            <Image
              src={project.companyLogo}
              alt={project.companyLogoAlt || ""}
              width={80}
              height={24}
              className="h-5 w-auto"
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}
