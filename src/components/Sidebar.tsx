"use client";

import { experience } from "@/data/experience";
import { motion } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import ExperienceItem from "./ExperienceItem";
import ContactSection from "./ContactSection";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-[38%] lg:max-w-[530px] lg:sticky lg:top-0 lg:h-screen hide-scrollbar overflow-y-auto">
      <div className="px-8 pt-10 pb-12 lg:px-12 lg:pt-14 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ProfilePhoto />
        </motion.div>

        <motion.h1
          className="text-[28px] lg:text-[30px] font-semibold leading-[1.2] mt-5 text-text-primary tracking-[-0.01em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Hi there I am Taimoor
          <br />
          Product Designer @ Revolut
        </motion.h1>

        {/* About */}
        <motion.section
          className="mt-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-[16px] font-semibold text-text-primary mb-2">
            About
          </h2>
          <p className="text-[13.5px] text-text-secondary leading-[1.65]">
            I am a Product Designer with 6+ years of experience, crafting
            consumer-facing products for startups and large tech companies.
          </p>
        </motion.section>

        {/* Work Experience */}
        <motion.section
          className="mt-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-[16px] font-semibold text-text-primary mb-1">
            Work Experience
          </h2>
          <div>
            {experience.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.35 + index * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ExperienceItem entry={entry} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ContactSection />
        </motion.div>
      </div>
    </aside>
  );
}
