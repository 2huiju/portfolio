import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "이희주",
  role: "Frontend Developer",
  years: 4,
  email: "heejoo45890@gmail.com",
  github: "https://github.com/2huiju",
  // 전화번호는 레포에 커밋하지 않음 — .env.local / Vercel 환경변수에서 주입
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  intro:
    "기능 구현을 넘어 팀의 개발 환경과 구조를 설계하는 프론트엔드 개발자입니다. 사용자가 머무는 화면과, 팀이 빠르게 일할 수 있는 토대를 함께 만듭니다.",
  stack: ["React", "Next.js", "TypeScript"],
};
