import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Summit Capital — Private Wealth",
  description: "Private wealth management with calm conviction.",
  keywords: [
    "wellness",
    "holistic health",
    "spa",
    "cryotherapy",
    "float tank",
    "sound healing",
    "aromatherapy",
    "meditation",
    "Aether Wellness",
  ],
  openGraph: {
    title: "Aether Wellness — Holistic Healing for Body & Mind",
    description:
      "Cutting-edge wellness therapies in a serene spa-like sanctuary.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <main className="flex-1">{children}</main>
        
      </body>
    </html>
  );
}
