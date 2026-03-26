import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taimoor Nasir — Product Designer",
  description:
    "Product Designer with 6+ years of experience, crafting consumer-facing products for startups and large tech companies.",
  openGraph: {
    title: "Taimoor Nasir — Product Designer",
    description:
      "Product Designer with 6+ years of experience, crafting consumer-facing products for startups and large tech companies.",
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
