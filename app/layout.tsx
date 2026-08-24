import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trenutki za dva - 100 nepozabnih trenutkov",
  description: "Knjiga s 100 idejami za zmenke in doživetja, ki vaju spodbuja, da preizkusita nekaj novega in ustvarita spomine.",
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" className={`${inter.variable} ${playfair.variable} ${script.variable} scroll-smooth`}>
      <body className="font-sans bg-cream text-espresso antialiased flex flex-col min-h-screen font-light tracking-wide leading-relaxed">
        <Header />
        <main className="flex-grow pt-[72px]">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
