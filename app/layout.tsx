import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Finance Tracker",
  description: "Track your income, expenses, and budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          src="https://francocdev-voiceloop.vercel.app/widget.js"
          strategy="afterInteractive"
          data-api-key="vl_Mnl2AZZHfios9nPiqMXK6DHEgtlR4e8vl8msXICeKiY"
          data-site-url="https://francocdev-finance-tracker-ai.vercel.app/"
        />
        {children}
      </body>
    </html>
  );
}
