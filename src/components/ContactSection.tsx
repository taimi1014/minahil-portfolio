"use client";

import { useMemo } from "react";
import { THEME_COLORS } from "./ThemeSwitcher";

interface ContactSectionProps {
  themeColor: string;
}

export default function ContactSection({ themeColor }: ContactSectionProps) {
  const theme = useMemo(() => THEME_COLORS.find(t => t.value === themeColor), [themeColor]);
  const accent = theme?.accent || "#1A1A1A";
  const muted = theme?.dot || "#666666";

  return (
    <section>
      <h2 className="text-[12px] font-semibold mb-1.5" style={{ color: accent }}>
        Contact
      </h2>
      <div className="space-y-[4px]">
        {[
          { label: "Email", value: "minahilawan@gmail.com", href: "mailto:minahilawan@gmail.com" },
          { label: "Call", value: "+971561861243", href: "tel:+971561861243" },
          { label: "LinkedIn", value: "@minahilawan", href: "https://www.linkedin.com/in/minahil-awan/", external: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center group">
            <span className="text-[11px] w-[55px] shrink-0" style={{ color: muted, opacity: 0.7 }}>
              {item.label}
            </span>
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-[11px] transition-all duration-200 hover:opacity-70 hover:translate-x-[2px]"
              style={{ color: accent }}
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
