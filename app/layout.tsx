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
  title: {
    default: "이희주 — Frontend Developer",
    template: "%s · 이희주",
  },
  description:
    "기능 구현을 넘어 팀의 개발 환경까지 설계하는 4년차 프론트엔드 개발자 이희주의 포트폴리오. macOS 데스크톱처럼 둘러보세요.",
  keywords: ["이희주", "프론트엔드 개발자", "Frontend Developer", "React", "Next.js", "포트폴리오"],
  authors: [{ name: "이희주" }],
  openGraph: {
    title: "이희주 — Frontend Developer",
    description:
      "기능 구현을 넘어 팀의 개발 환경까지 설계하는 4년차 프론트엔드 개발자. macOS 데스크톱 컨셉 포트폴리오.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
