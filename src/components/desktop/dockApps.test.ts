import { describe, it, expect } from "vitest";
import { DOCK_APPS } from "@/components/desktop/dockApps";

describe("dockApps", () => {
  it("앱 7개 정의", () => {
    expect(DOCK_APPS.length).toBe(7);
  });

  it("VS Code는 활성, 첫 번째", () => {
    expect(DOCK_APPS[0].id).toBe("vscode");
    expect(DOCK_APPS[0].enabled).toBe(true);
  });

  it("나머지는 Phase 2(비활성)", () => {
    const enabled = DOCK_APPS.filter((a) => a.enabled);
    expect(enabled.length).toBe(1);
  });
});
