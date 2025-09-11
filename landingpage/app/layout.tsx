import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Hotjar } from "./components/Hotjar";
import { Clarity } from "./components/Clarity";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MakeReels - AI-Powered Video Automation",
  description: "Turn your long-form videos into multiple viral shorts with AI. Get early access to our beta and enjoy 2 months free usage after launch.",
  keywords: "AI video automation, viral shorts, video editing, content creation, social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hotjar will be loaded via the Hotjar component */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* <WhatsAppButton /> */}
        <Analytics />
        <Hotjar id="6475950" sv={6} />
        <Clarity id="sy5bqnel6l" />
      </body>
    </html>
  );
}
