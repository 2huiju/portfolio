import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useIsMobile } from "@/lib/useIsMobile";

function mockWidth(w: number) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: w <= 820,
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));
}

describe("useIsMobile", () => {
  beforeEach(() => mockWidth(390));

  it("좁은 폭이면 true", () => {
    mockWidth(390);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("넓은 폭이면 false", () => {
    mockWidth(1440);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
