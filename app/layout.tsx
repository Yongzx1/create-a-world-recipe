import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Craft a World Recipe",
  description: "developed by fielzxc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-900">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}