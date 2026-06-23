import type { ExperienceItem, EducationItem } from "@/types/content";

export const experience: ExperienceItem[] = [
  {
    company: "(주)크레버스",
    team: "AI Dev Team",
    period: "2024.04 – 재직중",
    role: "Frontend Engineer",
    summary: "AI 영어교육 플랫폼 HUMMINGo의 프론트엔드 개발 및 팀 개발 환경 설계.",
    bullets: [
      "Next.js App Router 기반 프로덕션 서비스 개발 (교사·학생 웹).",
      "BFF로 외부 연계(마이크로소프트 마켓플레이스 구독·온보딩) 구현.",
      "다국어(i18n) 구조·번역 파이프라인, E2E 테스트 전략 등 팀 개발 환경 개선.",
    ],
  },
  {
    company: "크립티드",
    period: "2023.04 – 2024.03",
    role: "Frontend Engineer",
    summary: "블록체인 서비스 KStadium 프론트엔드. 기존 Ionic 기반을 React로 재구성.",
    bullets: [
      "Ionic → React 재구성으로 구조·유지보수성 개선.",
      "React로 개발한 웹을 React Native 셸로 패키징해 앱 배포.",
      "관리자(Admin) 화면 등 운영 도구 개발.",
    ],
  },
  {
    company: "바오밥파트너즈",
    period: "2022.09 – 2023.04",
    role: "Frontend Engineer",
    summary: "Flutter 기반 모바일 앱 3 Seconds Club 개발 (첫 프로젝트).",
    bullets: [
      "Flutter로 크로스플랫폼 앱 화면·기능 구현.",
      "코드에 대한 책임을 처음으로 체감한 커리어 출발점.",
    ],
  },
];

export const education: EducationItem[] = [
  { name: "code.camp", period: "2022.05 – 2022.08" },
  { name: "스마트인재개발원", period: "2021.10 – 2021.11" },
  { name: "CSLEE (AI개발자양성 4기)", period: "2021.05 – 2021.09" },
];
