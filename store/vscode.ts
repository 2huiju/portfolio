import { create } from "zustand";

const DEFAULT_FILE = "home";

interface VscodeStore {
  /** 열린 탭(파일 id) */
  openIds: string[];
  /** 활성 파일 id */
  activeId: string;
  /** 파일 열기(없으면 탭 추가) + 활성화 — Explorer·Dock에서 사용 */
  openFile: (id: string) => void;
  /** 활성 탭만 전환 — Tabs에서 사용 */
  setActive: (id: string) => void;
  /** 탭 닫기 */
  closeFile: (id: string) => void;
  reset: () => void;
}

export const useVscode = create<VscodeStore>((set) => ({
  openIds: [DEFAULT_FILE],
  activeId: DEFAULT_FILE,

  openFile: (id) =>
    set((s) => ({
      openIds: s.openIds.includes(id) ? s.openIds : [...s.openIds, id],
      activeId: id,
    })),

  setActive: (id) => set({ activeId: id }),

  closeFile: (id) =>
    set((s) => {
      const idx = s.openIds.indexOf(id);
      const remaining = s.openIds.filter((x) => x !== id);
      const activeId =
        s.activeId === id ? (remaining[idx - 1] ?? remaining[0] ?? "") : s.activeId;
      return { openIds: remaining, activeId };
    }),

  reset: () => set({ openIds: [DEFAULT_FILE], activeId: DEFAULT_FILE }),
}));
