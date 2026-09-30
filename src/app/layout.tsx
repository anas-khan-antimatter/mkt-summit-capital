import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  description:
    "Capital guided with calm conviction. Summit Capital partners with discerning families to preserve wealth and compound thoughtfully.",
  keywords: [
    "private wealth",
    "investment management",
    "family office",
    "portfolio management",
    "estate planning",
    "Summit Capital",
  ],
  openGraph: {
    title: "Summit Capital — Private Wealth",
    description:
      "Capital guided with calm conviction. Summit Capital partners with discerning families to preserve wealth and compound thoughtfully.",
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
      <body className="min-h-full flex flex-col bg-[#0b1220] text-slate-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}