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
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground selection:bg-primary/20`}>
        <div className="fixed inset-0 z-0 bg-grid pointer-events-none opacity-[0.4]" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
