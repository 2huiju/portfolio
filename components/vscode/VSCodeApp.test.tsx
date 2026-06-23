import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VSCodeApp } from "@/components/vscode/VSCodeApp";

// 타이핑을 즉시 완료시키려 reduced-motion = true 로 목킹
beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: true,
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));
});

describe("VSCodeApp", () => {
  it("기본으로 home.tsx의 이름이 보인다", () => {
    render(<VSCodeApp />);
    expect(screen.getAllByText(/이희주/).length).toBeGreaterThan(0);
  });

  it("Explorer에 파일 6개가 있다", () => {
    render(<VSCodeApp />);
    expect(screen.getByText("projects.json")).toBeInTheDocument();
    expect(screen.getByText("about.md")).toBeInTheDocument();
  });

  it("Explorer에서 파일을 열면 탭이 추가된다", () => {
    render(<VSCodeApp />);
    fireEvent.click(screen.getByText("contact.tsx"));
    // 탭과 익스플로러 양쪽에 등장 → 2개 이상
    expect(screen.getAllByText("contact.tsx").length).toBeGreaterThan(1);
  });
});
