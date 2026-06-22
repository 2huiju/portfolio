"use client";

import { useWindows } from "@/store/windows";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { VSCodeApp } from "@/components/vscode/VSCodeApp";

// macOS Sequoia 느낌의 그라데이션 바탕화면
const WALLPAPER: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(60% 50% at 18% 18%, rgba(124,92,255,0.40) 0%, transparent 60%)",
    "radial-gradient(55% 55% at 85% 22%, rgba(34,211,238,0.33) 0%, transparent 60%)",
    "radial-gradient(60% 60% at 75% 92%, rgba(255,106,213,0.33) 0%, transparent 60%)",
    "linear-gradient(160deg, #1b1033 0%, #0f1230 45%, #07111f 100%)",
  ].join(","),
};

export function Desktop() {
  const open = useWindows((s) => s.open);
  const z = useWindows((s) => s.z);
  const openApp = useWindows((s) => s.openApp);
  const closeApp = useWindows((s) => s.closeApp);
  const minimize = useWindows((s) => s.minimize);
  const focusApp = useWindows((s) => s.focusApp);

  const vscodeVisible = open.vscode && !open.vscode.minimized;

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={WALLPAPER}>
      <MenuBar appName="VS Code" />

      {vscodeVisible && (
        <Window
          title="home.tsx — heejoo.dev"
          z={z.vscode ?? 1}
          onFocus={() => focusApp("vscode")}
          onClose={() => closeApp("vscode")}
          onMinimize={() => minimize("vscode")}
        >
          <VSCodeApp />
        </Window>
      )}

      <Dock onOpen={openApp} runningIds={Object.keys(open)} />
    </div>
  );
}
