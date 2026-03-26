import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minahil Awan — Lead Product Designer",
  description:
    "Creative and results-driven Product Designer with 6+ years of experience shaping intuitive, high-impact experiences across AI, SaaS, fintech, and healthcare platforms.",
  openGraph: {
    title: "Minahil Awan — Lead Product Designer",
    description:
      "Creative and results-driven Product Designer with 6+ years of experience shaping intuitive, high-impact experiences across AI, SaaS, fintech, and healthcare platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
