"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index === 0 ? 0.3 : 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Image container */}
      <motion.div
        className="bg-surface overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.995 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Text content — inside the white card */}
      <div className="px-5 py-4 space-y-1.5">
        <h3 className="text-[17px] font-semibold text-text-primary leading-snug">
          {project.title}
        </h3>
        <p className="text-[13px] text-text-secondary leading-[1.6]">
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
