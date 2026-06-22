import { describe, it, expect, beforeEach } from "vitest";
import { useWindows } from "@/store/windows";

beforeEach(() => useWindows.getState().reset());

describe("windows store", () => {
  it("초기엔 vscode가 열려 있고 포커스됨", () => {
    const s = useWindows.getState();
    expect(s.open.vscode).toBeTruthy();
    expect(s.focus).toBe("vscode");
  });

  it("openApp은 추가하고 포커스한다", () => {
    useWindows.getState().openApp("terminal");
    const s = useWindows.getState();
    expect(s.open.terminal).toBeTruthy();
    expect(s.focus).toBe("terminal");
  });

  it("closeApp은 제거한다", () => {
    useWindows.getState().closeApp("vscode");
    expect(useWindows.getState().open.vscode).toBeUndefined();
  });

  it("minimize는 유지하되 최소화 표시", () => {
    useWindows.getState().minimize("vscode");
    expect(useWindows.getState().open.vscode.minimized).toBe(true);
  });

  it("focusApp은 z를 올린다", () => {
    const before = useWindows.getState().z.vscode;
    useWindows.getState().openApp("terminal");
    useWindows.getState().focusApp("vscode");
    expect(useWindows.getState().z.vscode).toBeGreaterThan(before);
    expect(useWindows.getState().focus).toBe("vscode");
  });
});
