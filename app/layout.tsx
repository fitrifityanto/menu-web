// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import MobileSearch from "@/components/MobileSearch";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gudeg Tradisional | Kehangatan Rasa Otentik",
  description: "Menyajikan Gudeg legendaris dengan resep turun temurun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${lora.variable} font-sans bg-santan text-gula-jawa antialiased`}
      >
        <Navbar />
        <MobileSearch />
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>

        {/* Navigation Mobile */}
        <BottomNav />
      </body>
    </html>
  );
}
