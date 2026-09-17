// app/layout.tsx
//
// PERBAIKAN: sebelumnya file ini berisi markup dashboard (sidebar, welcome
// message, dst). Itu salah tempat — app/layout.tsx harus jadi root layout
// Next.js yang membungkus SEMUA halaman (termasuk /login yang tidak boleh
// punya sidebar dashboard). Markup dashboard yang lama sudah dipindah ke
// app/page.tsx.
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
  title: "PitchKu — Presentasi Bisnis dengan AI",
  description:
    "Buat presentasi bisnis profesional dalam hitungan menit, dibantu AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}