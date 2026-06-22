// 포트폴리오 콘텐츠 도메인 타입

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
  description: string;
  role: string;
  stack: string[];
  period: string;
  links: ProjectLink[];
  status: ProjectStatus;
}

export type FileKind = "tsx" | "md" | "json" | "ts";

export interface FileEntry {
  id: string;
  name: string;
  /** @iconify 아이콘 이름 (vscode-icons 세트) */
  icon: string;
  kind: FileKind;
}
