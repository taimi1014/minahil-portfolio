import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ibmSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-serif",
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
      <head>
        {/* Preload critical above-fold images */}
        <link rel="preload" href="/images/profile.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/projects/crediblex.webp" as="image" type="image/webp" />
        {/* DNS prefetch for fonts */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${ibmSerif.variable} ${inter.className} bg-white text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
