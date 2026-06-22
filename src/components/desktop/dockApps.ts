export interface DockApp {
  id: string;
  label: string;
  /** @iconify 아이콘 이름 */
  icon: string;
  /** 아이콘 타일 배경(Tailwind 클래스). 로고 자체가 색을 가지면 빈 문자열 */
  tile: string;
  /** MVP에서 실제 동작 여부. false면 Phase 2 (독에 보이되 비활성) */
  enabled: boolean;
}

// 독 앱 = 포트폴리오 진입점. MVP에선 VS Code만 동작, 나머지는 Phase 2.
export const DOCK_APPS: DockApp[] = [
  { id: "vscode", label: "VS Code", icon: "logos:visual-studio-code-icon", tile: "bg-[#1e1e2e]", enabled: true },
  { id: "terminal", label: "Terminal", icon: "ph:terminal-window-fill", tile: "bg-gradient-to-b from-neutral-700 to-neutral-900 text-white", enabled: false },
  { id: "notes", label: "About", icon: "ph:note-pencil-fill", tile: "bg-gradient-to-b from-amber-200 to-amber-400 text-neutral-700", enabled: false },
  { id: "photos", label: "Projects", icon: "ph:image-square-fill", tile: "bg-gradient-to-br from-fuchsia-500 via-rose-400 to-amber-300 text-white", enabled: false },
  { id: "mail", label: "Contact", icon: "ph:envelope-simple-fill", tile: "bg-gradient-to-b from-sky-400 to-blue-600 text-white", enabled: false },
  { id: "safari", label: "Links", icon: "logos:safari", tile: "bg-white", enabled: false },
  { id: "github", label: "GitHub", icon: "mdi:github", tile: "bg-gradient-to-b from-neutral-800 to-black text-white", enabled: false },
];
