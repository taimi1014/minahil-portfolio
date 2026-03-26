"use client";

export default function ContactSection() {
  return (
    <section>
      <h2 className="text-[16px] font-semibold text-text-primary mb-3">
        Contact
      </h2>
      <p className="text-[13px] text-text-secondary leading-[1.65] mb-5">
        I&apos;m currently looking to join a cross-functional team that values
        improving people&apos;s lives through accessible design. or have a
        project in mind? Let&apos;s connect.
      </p>
      <div className="space-y-[10px]">
        {[
          {
            label: "Email",
            value: "Taimoornasir1014@gmail.com",
            href: "mailto:Taimoornasir1014@gmail.com",
          },
          {
            label: "Call",
            value: "+971563663761",
            href: "tel:+971563663761",
          },
          {
            label: "LinkedIn",
            value: "@taimoornasir",
            href: "https://www.linkedin.com/in/taimoornasir",
            external: true,
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center group">
            <span className="text-[13px] text-text-secondary w-[65px] shrink-0">
              {item.label}
            </span>
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-[13px] text-text-primary transition-all duration-200 hover:opacity-70 hover:translate-x-[2px]"
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
