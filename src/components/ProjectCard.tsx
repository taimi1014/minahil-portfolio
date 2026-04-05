"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Project } from "@/types";
import { THEME_COLORS } from "./ThemeSwitcher";
import { blurPlaceholders } from "@/data/placeholders";

interface ProjectCardProps {
  project: Project;
  index: number;
  themeColor: string;
  layout?: "grid" | "list";
}

export default function ProjectCard({ project, index, themeColor, layout = "list" }: ProjectCardProps) {
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isGrid = layout === "grid";

  // Mouse-following cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const blurDataURL = useMemo(() => {
    const slug = project.imageSrc.split("/").pop()?.replace(/\.\w+$/, "") || "";
    return blurPlaceholders[slug];
  }, [project.imageSrc]);

  const hasCaseStudy = ["supercenter", "crediblex", "crediblex-drawdowns", "tranxpay", "tmc", "fams", "jetclass"].includes(project.slug);

  const card = (
    <motion.article
      ref={cardRef}
      layout
      className={`group relative bg-[#F5F5F5] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] border border-[#E8E8E8] ${
        hasCaseStudy ? "cursor-none" : "cursor-default"
      } ${isGrid ? "" : "max-w-[85%] lg:max-w-[72%] mx-auto"}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index === 0 ? 0.2 : 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { type: "spring", stiffness: 300, damping: 30 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Custom cursor pill */}
      <motion.div
        className={`pointer-events-none absolute z-40 flex items-center gap-1.5 rounded-full font-semibold tracking-wide whitespace-nowrap ${
          isGrid ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-[12px]"
        }`}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: hasCaseStudy ? accent : "#888",
          color: "#fff",
          boxShadow: hasCaseStudy
            ? `0 4px 20px ${accent}40, 0 2px 8px rgba(0,0,0,0.15)`
            : "0 4px 16px rgba(0,0,0,0.12)",
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
          transition: "opacity 0.2s, scale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {hasCaseStudy ? (
          <>
            <svg width={isGrid ? "11" : "13"} height={isGrid ? "11" : "13"} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
            View Project
          </>
        ) : (
          "Coming Soon"
        )}
      </motion.div>

      {/* Image container */}
      <div className={`relative overflow-hidden bg-[#F5F5F5] flex items-center justify-center ${
        isGrid ? "p-2.5 lg:p-3" : "p-4 lg:p-6"
      }`}>
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={1200}
          height={800}
          className={`w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] ${
            isGrid ? "rounded-[10px]" : "rounded-[16px]"
          }`}
          loading={index < 2 ? "eager" : "lazy"}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          sizes={isGrid ? "(max-width: 768px) 90vw, 45vw" : "(max-width: 768px) 90vw, (max-width: 1200px) 55vw, 600px"}
        />

        {hasCaseStudy && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
            style={{ backgroundColor: `${themeColor}cc` }}
          />
        )}

        {project.tags && project.tags.length > 0 && (
          <div className={`absolute flex flex-wrap gap-1 z-30 ${
            isGrid ? "top-2 left-2 lg:top-3 lg:left-3" : "top-3 left-3 lg:top-4 lg:left-4 gap-1.5"
          }`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full font-semibold tracking-wide backdrop-blur-sm ${
                  isGrid ? "px-2 py-[2px] text-[8px] lg:text-[9px]" : "px-2.5 py-[4px] text-[10px] lg:text-[11px]"
                }`}
                style={{
                  backgroundColor: themeColor,
                  color: accent,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)",
                  border: `1px solid ${accent}20`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Text content */}
      <div className={`bg-white ${isGrid ? "px-3 py-2.5 space-y-0.5" : "px-4 py-3 space-y-1"}`}>
        <h3 className={`font-semibold text-text-primary leading-snug ${
          isGrid ? "text-[13px] lg:text-[14px]" : "text-[16px]"
        }`}>
          {project.title}
        </h3>
        <p className={`text-text-secondary leading-[1.6] ${
          isGrid ? "text-[11px] lg:text-[11.5px] line-clamp-2" : "text-[12.5px]"
        }`}>
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

  if (hasCaseStudy) {
    return <Link href={`/projects/${project.slug}`}>{card}</Link>;
  }
  return card;
}
