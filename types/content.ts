// 포트폴리오 콘텐츠 도메인 타입

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  role: string;
  years: number;
  email: string;
  github: string;
  /** 전화번호는 레포에 두지 않고 환경변수(NEXT_PUBLIC_PHONE)에서 주입 */
  phone: string;
  intro: string;
  stack: string[];
  skillGroups: SkillGroup[];
}

/** 프로젝트 핵심 경험 (문제 → 해결 → 결과) */
export interface Highlight {
  title: string;
  problem?: string;
  solution: string;
  result?: string;
}

export interface ExperienceItem {
  company: string;
  team?: string;
  period: string;
  role: string;
  summary: string;
  bullets: string[];
}

export interface EducationItem {
  name: string;
  period: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export type ProjectStatus = "운영" | "종료";

export interface Project {
  id: string;
  name: string;
  org: string;
  tagline: string;
  period: string;
  role: string;
  team: string;
  status: ProjectStatus;
  stack: string[];
  /** 아키텍처 한 줄 요약 */
  summary: string;
  highlights: Highlight[];
  retrospective?: string;
  links: ProjectLink[];
}

export type FileKind = "tsx" | "md" | "json" | "ts";

export interface FileEntry {
  id: string;
  name: string;
  /** @iconify 아이콘 이름 (vscode-icons 세트) */
  icon: string;
  kind: FileKind;
}
