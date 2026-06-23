import type { FileEntry } from "@/types/content";

// VS Code Explorer에 표시되는 파일들(= 포트폴리오 섹션). icon은 @iconify의 vscode-icons 세트 이름.
export const FILES: FileEntry[] = [
  { id: "home", name: "home.tsx", icon: "vscode-icons:file-type-reactts", kind: "tsx" },
  { id: "about", name: "about.md", icon: "vscode-icons:file-type-markdown", kind: "md" },
  { id: "projects", name: "projects.json", icon: "vscode-icons:file-type-json", kind: "json" },
  { id: "experience", name: "experience.ts", icon: "vscode-icons:file-type-typescript", kind: "ts" },
  { id: "contact", name: "contact.tsx", icon: "vscode-icons:file-type-reactts", kind: "tsx" },
  { id: "github", name: "github.md", icon: "vscode-icons:file-type-markdown", kind: "md" },
];
