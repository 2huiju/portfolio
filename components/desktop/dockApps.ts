export interface DockApp {
  id: string;
  label: string;
  /** 실제 macOS 앱 아이콘 PNG 경로(public/icons). 있으면 우선 사용 */
  img?: string;
  /** img가 없을 때 @iconify 아이콘 + 타일 배경 */
  icon?: string;
  tile?: string;
  /** 클릭 시 VS Code에서 열 파일 id. 있으면 enabled */
  file?: string;
  enabled: boolean;
}

// 독 = 실제 macOS 앱 아이콘. 클릭 시 VS Code가 해당 파일을 연다(터미널만 Phase 2).
export const DOCK_APPS: DockApp[] = [
  { id: "finder", label: "Finder", img: "/icons/finder.png", file: "home", enabled: true },
  { id: "vscode", label: "VS Code", img: "/icons/vscode.png", file: "home", enabled: true },
  { id: "safari", label: "Links", icon: "logos:safari", tile: "bg-white", file: "github", enabled: true },
  { id: "notes", label: "About", img: "/icons/notes.png", file: "about", enabled: true },
  { id: "photos", label: "Projects", img: "/icons/photos.png", file: "projects", enabled: true },
  { id: "mail", label: "Contact", img: "/icons/mail.png", file: "contact", enabled: true },
  { id: "terminal", label: "Terminal", img: "/icons/terminal.png", enabled: false },
];
