"use client";

import { motion } from "motion/react";

interface ComparisonTableProps {
  research: {
    heading: string;
    badge?: string;
    description: string;
    competitors: { company: string; invoiceDetails: string; pricing: string; regulated: string; otherProducts: string }[];
  };
  accent: string;
  themeColor: string;
}

export default function ComparisonTable({ research, accent, themeColor }: ComparisonTableProps) {
  return (
    <div>
      {research.badge && (
        <motion.span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-4"
          style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {research.badge}
        </motion.span>
      )}

      <motion.p
        className="text-xl lg:text-2xl font-light text-[#555] leading-[1.6] mb-8 max-w-[720px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {research.description}
      </motion.p>

      <motion.div
        className="rounded-xl border border-[#E5E5E5] overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ backgroundColor: `${accent}08` }}>
                <th className="text-left px-4 py-3 font-semibold text-[#666] sticky top-0 bg-white" style={{ backgroundColor: `${accent}08` }}>Company</th>
                <th className="text-left px-4 py-3 font-semibold text-[#666] sticky top-0" style={{ backgroundColor: `${accent}08` }}>Invoice Financing Details</th>
                <th className="text-left px-4 py-3 font-semibold text-[#666] sticky top-0" style={{ backgroundColor: `${accent}08` }}>Pricing</th>
                <th className="text-left px-4 py-3 font-semibold text-[#666] sticky top-0" style={{ backgroundColor: `${accent}08` }}>Regulated?</th>
                <th className="text-left px-4 py-3 font-semibold text-[#666] sticky top-0" style={{ backgroundColor: `${accent}08` }}>Other Products</th>
              </tr>
            </thead>
            <tbody>
              {research.competitors.map((row, i) => (
                <motion.tr
                  key={row.company}
                  className="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  <td className="px-4 py-3 font-semibold text-[#1A1A1A]">{row.company}</td>
                  <td className="px-4 py-3 text-[#555]">{row.invoiceDetails}</td>
                  <td className="px-4 py-3 text-[#555]">{row.pricing}</td>
                  <td className="px-4 py-3 text-[#555]">{row.regulated}</td>
                  <td className="px-4 py-3 text-[#555]">{row.otherProducts}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
