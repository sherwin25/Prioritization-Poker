import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prioritization Poker",
  description: "Real-time consensus tool for product teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-[#0F172A] text-slate-100 selection:bg-indigo-500/30`}>
        {/* Animated Background Mesh */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px] animate-pulse" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse delay-700" />
          <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-pink-600/20 blur-[100px] animate-pulse delay-1000" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
