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
    "사용자의 문제를 정의하고 끝까지 해결하는 과정에서 재미를 느끼는 4년차 프론트엔드 개발자입니다. 빠르게 성장하는 팀에서 초기 세팅부터 개발·배포까지 주도적으로 수행했고, 기획자·디자이너·개발자와 적극적으로 소통하며 효과적인 해결책을 도출하는 것을 좋아합니다. 최근에는 AI 도구를 개발 워크플로우에 적극 도입해 협업 효율과 생산성을 크게 높였으며, 변화에 유연하게 대응하고 트렌디한 개발 환경을 지향합니다.",
  stack: ["React", "Next.js", "TypeScript"],
  skillGroups: [
    { label: "Core", items: ["Next.js", "React", "TypeScript", "JavaScript"] },
    { label: "Styling", items: ["Tailwind CSS", "styled-components", "Style Dictionary"] },
    { label: "State / Data", items: ["TanStack Query", "Jotai", "Zustand", "Redux"] },
    { label: "Tooling", items: ["Yarn Berry", "Playwright", "Git", "Fastlane"] },
    { label: "Collab", items: ["Figma", "JIRA", "Notion", "Slack"] },
    { label: "AI Workflow", items: ["Claude Code", "Figma MCP"] },
  ],
};
