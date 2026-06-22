import { create } from "zustand";

interface WindowState {
  minimized: boolean;
}

interface WindowsStore {
  /** 열린 앱 id → 상태 */
  open: Record<string, WindowState>;
  /** 현재 포커스된 앱 id */
  focus: string | null;
  /** z-order 스택 값 */
  z: Record<string, number>;
  zCounter: number;

  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimize: (id: string) => void;
  focusApp: (id: string) => void;
  reset: () => void;
}

const initial = {
  open: { vscode: { minimized: false } } as Record<string, WindowState>,
  focus: "vscode" as string | null,
  z: { vscode: 1 } as Record<string, number>,
  zCounter: 1,
};

export const useWindows = create<WindowsStore>((set) => ({
  ...initial,

  openApp: (id) =>
    set((s) => {
      const zCounter = s.zCounter + 1;
      return {
        open: { ...s.open, [id]: { minimized: false } },
        focus: id,
        z: { ...s.z, [id]: zCounter },
        zCounter,
      };
    }),

  closeApp: (id) =>
    set((s) => {
      const open = { ...s.open };
      delete open[id];
      const focus = s.focus === id ? null : s.focus;
      return { open, focus };
    }),

  minimize: (id) =>
    set((s) => ({
      open: s.open[id] ? { ...s.open, [id]: { minimized: true } } : s.open,
      focus: s.focus === id ? null : s.focus,
    })),

  focusApp: (id) =>
    set((s) => {
      const zCounter = s.zCounter + 1;
      return { focus: id, z: { ...s.z, [id]: zCounter }, zCounter };
    }),

  reset: () => set({ ...initial, open: { vscode: { minimized: false } }, z: { vscode: 1 } }),
}));
