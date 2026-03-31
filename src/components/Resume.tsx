"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

interface RoleProps {
  title: string;
  company: string;
  period: string;
  projects?: string[];
  bullets: ReactNode[];
  delay: number;
}

function Role({ title, company, period, projects, bullets, delay }: RoleProps) {
  return (
    <motion.div
      className="pb-8 last:pb-0"
      {...fadeIn}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <h3 className="text-[15px] font-semibold text-text-primary">
          {title}{" "}
          <span className="font-normal text-text-secondary">— {company}</span>
        </h3>
        <span className="text-[12px] text-text-tertiary whitespace-nowrap shrink-0 pt-[2px]">
          {period}
        </span>
      </div>
      {projects && projects.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 mt-2">
          {projects.map((p) => (
            <span
              key={p}
              className="text-[11px] font-medium text-text-primary bg-white px-2.5 py-[3px] rounded-full border border-[#E0E0E0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
            >
              {p}
            </span>
          ))}
        </div>
      )}
      <ul className="space-y-2 mt-2">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="text-[13px] text-text-secondary leading-[1.6] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:bg-text-tertiary before:rounded-full"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SkillCategory({
  title,
  skills,
}: {
  title: string;
  skills: string;
}) {
  return (
    <div className="flex gap-2 text-[13px]">
      <span className="text-text-primary font-medium shrink-0">{title}:</span>
      <span className="text-text-secondary">{skills}</span>
    </div>
  );
}

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-text-primary">{children}</strong>
);

export default function Resume() {
  return (
    <div className="space-y-8">
      {/* Summary */}
      <motion.section
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-[16px] font-semibold text-text-primary mb-3">
          Summary
        </h2>
        <p className="text-[13.5px] text-text-secondary leading-[1.7]">
          Creative and results-driven Product Designer with <B>7+ years</B> of
          experience shaping intuitive, high-impact experiences across AI, SaaS,
          fintech, identity-tech, and healthcare platforms. Expert at driving
          end-to-end design — from user research through visual design and
          prototyping — while collaborating seamlessly with cross-functional
          teams to launch products that delight users and support business
          growth. Proven track record helping early-stage startups scale, secure
          funding, and deliver measurable results.
        </p>
      </motion.section>

      {/* Experience */}
      <motion.section
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-[16px] font-semibold text-text-primary mb-5">
          Experience
        </h2>
        <div className="space-y-0 divide-y divide-border">
          <div className="pb-6">
            <Role
              title="Lead Product Designer"
              company="CNTXT (Contract)"
              period="2025 — Present"
              projects={[
                "SuperChat.ai",
                "Voice AI Platform",
              ]}
              bullets={[
                <>Led product design for SuperChat.ai, a conversational AI platform — designing voice-first interaction patterns, multi-turn dialogue flows, and real-time transcription interfaces that <B>reduced agent handle time by 35%</B>.</>,
                <>Shaped the Voice AI product end-to-end, from discovery research to high-fidelity prototypes — establishing the design language for voice-driven user experiences across <B>3 product surfaces</B>.</>,
                <>Collaborated with ML engineers to design intuitive interfaces for complex AI outputs — making voice analytics, sentiment detection, and call insights accessible to non-technical users.</>,
                <>Built and maintained a scalable component library for the AI product suite, ensuring consistency across voice, chat, and analytics surfaces — <B>cutting design-to-dev handoff time by 40%</B>.</>,
              ]}
              delay={0.2}
            />
          </div>

          <div className="py-6">
            <Role
              title="Lead Product Designer"
              company="CredibleX"
              period="Apr 2024 — Present"
              projects={[
                "Loan Management Admin Portal",
                "Credit Mission Control Web App",
                "Website",
              ]}
              bullets={[
                <>Led end-to-end design for core borrower and lender experiences, producing wireframes, interactive prototypes, and high-fidelity UI assets — contributing to a <B>17% increase in user engagement</B> across the platform.</>,
                <>Collaborated with product and engineering teams to design AI-enabled credit assessment features, ensuring explainability and trust in automated decisions — laid the UX foundation for smart loan matching and fraud detection modules.</>,
                <>Oversaw the design lifecycle for new credit and lending features, from ideation to final implementation — collaborated with developers to ensure <B>100% design-to-dev accuracy</B> and timely delivery.</>,
                <>Standardized platform visuals and UX patterns by enforcing brand-consistent design systems, increasing design efficiency and <B>reducing UI inconsistencies by over 40%</B>.</>,
                <>Partnered with product managers to conduct usability tests and user feedback sessions, leading to the optimization of the loan application process and a <B>12% increase in completion rates</B>.</>,
                <>Introduced scalable design documentation and component libraries in Figma, <B>cutting onboarding time for new designers by 50%</B>.</>,
              ]}
              delay={0.25}
            />
          </div>

          <div className="py-6">
            <Role
              title="Senior Product Designer"
              company="TranxPay Fintech (Contract)"
              period="Feb 2022 — Apr 2023"
              projects={[
                "Wallets",
                "Fund Transfer",
                "Fintech Ecosystem",
                "Cheque Draft",
                "KYC",
                "QR Payments",
                "Card Issuing",
                "Payment Links",
              ]}
              bullets={[
                <>Designed an AI-powered neo banking app with cash in/out, bill pay, bill split, QR payments, card issuing and freezing, savings and financial literacy tools — <B>improving user onboarding by 40%</B>.</>,
                <>Built core fintech flows (B2B, B2C) including QR payments, card issuing, and comprehensive fund transfer experiences.</>,
                <>Ran comprehensive user research and usability tests for a frictionless, data-informed payment experience.</>,
                <>Enhanced financial literacy tools, driving a <B>5x increase in user engagement</B>.</>,
              ]}
              delay={0.25}
            />
          </div>

          <div className="py-6">
            <Role
              title="Senior Product Designer"
              company="Voltro by Falkenherz"
              period="Mar 2022 — Apr 2024"
              projects={[
                "TMC (Abu Dhabi Gov)",
                "QATAR MME",
                "FAMS",
                "Jetclass",
                "Originals4fan",
              ]}
              bullets={[
                <>Designed TMC Trucking SaaS platform from the ground up, covering user flows, personas, wireframes, and usability testing — resulting in a <B>40% reduction in operational bottlenecks</B> across logistics teams.</>,
                <>Led UX strategy for Tadweer, a BI platform handling complex data — enabled leadership to make faster decisions and <B>reduced data risk exposure by 28%</B> through structured data visibility.</>,
                <>Conducted over <B>25 user interviews</B>, UAT cycles, and AOI tests, directly influencing feature prioritization and <B>increasing customer satisfaction by 18%</B>.</>,
                <>Built validated prototypes for early-stage products like JetClass and FAMS, helping teams secure stakeholder buy-in and <B>save ~20% development rework</B>.</>,
                <>Collaborated with developers to break complex features into shippable increments, resulting in <B>15% faster sprint velocity</B> and improved design-dev alignment.</>,
              ]}
              delay={0.3}
            />
          </div>

          <div className="py-6">
            <Role
              title="Product Designer"
              company="Logicon"
              period="Mar 2021 — Mar 2022"
              projects={[
                "Onyx NFT",
                "AxeHedge",
                "Stage.io",
                "Ecseba Ecommerce",
                "Party Starter",
                "Legacy Suit",
              ]}
              bullets={[
                <>Designed the OnyxNFT marketplace builder tool from scratch — developed flows for minting, storefront creation, smart contract integration, and asset trading.</>,
                <>Supported company's fundraising efforts by delivering a polished MVP, helping close initial investor rounds.</>,
                <><B>Improved user acquisition by 22.1%</B> through continuous iteration, A/B testing, and UX enhancements.</>,
                <>Architected scalable information structures for complex fintech tools like AxeHedge and marketplace experiences like Stage, <B>reducing feature abandonment by over 25%</B>.</>,
                <>Delivered custom UX solutions for external client projects including Escaba and LegacySuit, helping extend product value into legal and B2C verticals.</>,
              ]}
              delay={0.35}
            />
          </div>

          <div className="pt-6">
            <Role
              title="UI/UX Designer"
              company="Programmers Force"
              period="Mar 2020 — Mar 2021"
              projects={[
                "Shufti Pro",
                "StaffTimer",
                "Moody",
                "GigsTimer",
              ]}
              bullets={[
                <>Designed and launched the Shufti Pro Design System, improving visual consistency and <B>reducing frontend development time by ~30%</B> across teams.</>,
                <>Led usability testing workshops and design sprints for web and mobile apps, <B>increasing overall system usability by 35%</B> through iterative design improvements.</>,
                <>Conducted user interviews, UAT, and AOI testing to validate features and reduce friction points across Shufti Pro, StaffTimer, Moody, and GigsTimer.</>,
                <>Redesigned core information architecture across products, streamlining navigation and improving task success rates for end-users.</>,
                <>Created comprehensive UX artifacts including personas, empathy maps, customer journeys, and low-to-high fidelity prototypes — ensuring solutions were user-centered and scalable.</>,
              ]}
              delay={0.4}
            />
          </div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-[16px] font-semibold text-text-primary mb-4">
          Skills
        </h2>
        <div className="space-y-2.5">
          <SkillCategory
            title="AI & Human-Interaction Design"
            skills="LLM interface design, agentic UX, AI-native product design, fallback & error states for AI systems"
          />
          <SkillCategory
            title="Research & Testing"
            skills="Usability testing, onsite field research, A/B testing, heuristic evaluation, analytics (GA, Hotjar, Crazy Egg)"
          />
          <SkillCategory
            title="Design Systems & Strategy"
            skills="Scalable UI components, style guides, accessibility, iterative design"
          />
          <SkillCategory
            title="Enterprise & Government"
            skills="Regulatory compliance UX, bilingual (AR/EN) design, accessibility, localization"
          />
          <SkillCategory
            title="Leadership"
            skills="Cross-functional teams (up to 13 reports), stakeholder management, design mentoring"
          />
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-[16px] font-semibold text-text-primary mb-3">
          Education
        </h2>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] text-text-primary font-medium">
              Bachelor of Computer Science
            </p>
            <p className="text-[13px] text-text-secondary">ITU, University</p>
          </div>
          <span className="text-[12px] text-text-tertiary">2016 — 2020</span>
        </div>
      </motion.section>
    </div>
  );
}
