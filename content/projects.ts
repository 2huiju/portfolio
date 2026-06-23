import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "hummingo",
    name: "HUMMINGo",
    description:
      "AI 기반 영어교육 플랫폼. 교사·학생용 웹 서비스로, Next.js App Router와 BFF로 외부 서비스를 연계한다.",
    role: "Frontend Developer",
    stack: ["Next.js", "React", "TypeScript", "BFF"],
    period: "2024 – 현재",
    links: [
      { label: "teacher", url: "https://tch.hummingo.ai" },
      { label: "student", url: "https://stu.hummingo.ai" },
    ],
    status: "운영",
  },
  {
    id: "hummingo-about",
    name: "HUMMINGo About",
    description:
      "HUMMINGo 소개 랜딩 페이지. 다국어 마이그레이션과 스크롤 모션 연출을 담당했다.",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "i18n", "Motion"],
    period: "2024 – 현재",
    links: [{ label: "landing", url: "https://hummingo.ai" }],
    status: "운영",
  },
  {
    id: "kstadium",
    name: "KStadium",
    description:
      "블록체인 서비스. 기존 Ionic 기반을 React로 재구성하고, 웹을 React Native 셸로 패키징해 앱으로 배포했다.",
    role: "Frontend Developer",
    stack: ["React", "React Native", "TypeScript"],
    period: "2023 – 2024",
    links: [],
    status: "종료",
  },
  {
    id: "kstadium-admin",
    name: "KStadium Admin",
    description: "KStadium 운영을 위한 관리자 어드민 화면. 데이터 관리·운영 도구를 개발했다.",
    role: "Frontend Developer",
    stack: ["React", "TypeScript"],
    period: "2023 – 2024",
    links: [],
    status: "종료",
  },
  {
    id: "3sc",
    name: "3 Seconds Club",
    description:
      "Flutter로 개발한 크로스플랫폼 모바일 앱. 커리어 첫 프로젝트로, 코드 책임을 처음 체감한 작업이다.",
    role: "Frontend Developer",
    stack: ["Flutter", "Dart"],
    period: "2022 – 2023",
    links: [],
    status: "종료",
  },
];
