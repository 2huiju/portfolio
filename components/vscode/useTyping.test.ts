import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTyping } from "@/components/vscode/useTyping";

describe("useTyping", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("시간이 지나면 항목이 점진적으로 늘어난다", () => {
    const { result } = renderHook(() => useTyping(["a", "b", "c"], 100));
    expect(result.current.length).toBe(1);
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current.length).toBe(3);
  });

  it("전부 노출되면 더 늘지 않는다", () => {
    const { result } = renderHook(() => useTyping(["a", "b"], 100));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.length).toBe(2);
  });
});
