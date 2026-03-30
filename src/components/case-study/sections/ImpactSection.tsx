"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ImpactData } from "@/types/case-study";

interface ImpactSectionProps {
  data: ImpactData;
  accent: string;
  themeColor: string;
  logoSrc?: string;
}

export default function ImpactSection({ data, accent, logoSrc }: ImpactSectionProps) {
  return (
    <section className="px-6 lg:px-16 py-16 lg:py-24">
      {/* Heading with inline logo */}
      <motion.h2
        className="text-3xl lg:text-[44px] font-bold text-[#1A1A1A] leading-tight text-center mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The Impact I had at{" "}
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt="CredibleX"
            width={240}
            height={60}
            className="inline-block h-[1em] w-auto align-baseline ml-1"
          />
        ) : (
          "CredibleX"
        )}
      </motion.h2>

      {/* Table */}
      <motion.div
        className="w-full overflow-x-auto rounded-xl border border-[#E8E8E8]"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          {/* Header */}
          <thead>
            <tr
              style={{ backgroundColor: `${accent}08` }}
            >
              <th className="px-6 py-4 text-[13px] font-medium text-[#666] border-b border-[#E8E8E8] w-[25%]">
                Area
              </th>
              <th className="px-6 py-4 text-[13px] font-medium text-[#666] border-b border-[#E8E8E8] w-[40%]">
                Metrics
              </th>
              <th className="px-6 py-4 text-[13px] font-medium text-[#666] border-b border-[#E8E8E8] w-[35%]">
                Achieved Impact
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors"
              >
                {/* Area — bold, accent-tinted */}
                <td className="px-6 py-5 align-top">
                  <div
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-[3px] h-8 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span
                      className="text-[15px] font-semibold"
                      style={{ color: "#1A1A1A" }}
                    >
                      {row.area}
                    </span>
                  </div>
                </td>

                {/* Metrics */}
                <td className="px-6 py-5 text-[14px] text-[#555] leading-relaxed align-top">
                  {row.metrics}
                </td>

                {/* Achieved Impact */}
                <td className="px-6 py-5 text-[14px] text-[#1A1A1A] font-medium leading-relaxed align-top">
                  {row.achievedImpact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
