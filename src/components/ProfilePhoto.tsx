"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { blurPlaceholders } from "@/data/placeholders";

export default function ProfilePhoto() {
  return (
    <motion.div
      className="w-[80px] h-[80px] rounded-[16px] overflow-hidden bg-surface cursor-pointer"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Image
        src="/images/profile.webp"
        alt="Minahil Awan"
        width={80}
        height={80}
        className="w-full h-full object-cover"
        priority
        placeholder="blur"
        blurDataURL={blurPlaceholders.profile}
      />
    </motion.div>
  );
}
