import { describe, it, expect } from "vitest";
import { DOCK_APPS } from "@/components/desktop/dockApps";

describe("dockApps", () => {
  it("앱 7개 정의", () => {
    expect(DOCK_APPS.length).toBe(7);
  });

  it("VS Code는 활성이고 home 파일과 연결", () => {
    const vs = DOCK_APPS.find((a) => a.id === "vscode");
    expect(vs?.enabled).toBe(true);
    expect(vs?.file).toBe("home");
  });

  it("터미널은 Phase 2(비활성)", () => {
    const t = DOCK_APPS.find((a) => a.id === "terminal");
    expect(t?.enabled).toBe(false);
  });

  it("활성 앱은 모두 여는 파일이 지정돼 있다", () => {
    for (const a of DOCK_APPS.filter((x) => x.enabled)) {
      expect(a.file).toBeTruthy();
    }
  });
});
