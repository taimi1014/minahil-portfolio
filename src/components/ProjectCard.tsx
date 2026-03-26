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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index === 0 ? 0.3 : 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Image container with elastic hover */}
      <motion.div
        className="bg-surface rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
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
          className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="mt-4 space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index === 0 ? 0.5 : 0.25 }}
      >
        <h3 className="text-[20px] font-semibold text-text-primary leading-snug">
          {project.title}
        </h3>
        <p className="text-[14px] text-text-secondary leading-[1.6]">
          {project.description}
        </p>

        {/* Company logo */}
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
      </motion.div>
    </motion.article>
  );
}
