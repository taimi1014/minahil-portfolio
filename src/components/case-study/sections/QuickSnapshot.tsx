"use client";

import { motion } from "motion/react";

interface InfoBlock {
  label: string;
  value: string;
}

interface QuickSnapshotProps {
  badge: string;
  body: string;
  infoBlocks: InfoBlock[];
  accent: string;
}

export default function QuickSnapshot({ badge, body, infoBlocks, accent }: QuickSnapshotProps) {
  return (
    <div>
      <motion.span
        className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
        style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {badge}
      </motion.span>

      <motion.p
        className="text-[16px] lg:text-[18px] text-[#444] leading-[1.75] max-w-[720px] mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {body}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infoBlocks.map((block, i) => (
          <motion.div
            key={block.label}
            className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-5 py-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <p
              className="text-[11px] font-semibold tracking-wide uppercase mb-1.5"
              style={{ color: accent }}
            >
              {block.label}
            </p>
            <p className="text-[13px] text-[#555] leading-relaxed">{block.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
