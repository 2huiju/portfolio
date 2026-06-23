import { describe, it, expect } from "vitest";
import { formatClock } from "@/lib/formatClock";

describe("formatClock", () => {
  it("오후 시간 포맷", () => {
    const d = new Date(2026, 5, 22, 14, 5); // 2026-06-22 월요일 14:05
    expect(formatClock(d)).toBe("월 2:05 PM");
  });

  it("자정은 12 AM", () => {
    const d = new Date(2026, 5, 22, 0, 0);
    expect(formatClock(d)).toBe("월 12:00 AM");
  });

  it("정오는 12 PM", () => {
    const d = new Date(2026, 5, 22, 12, 30);
    expect(formatClock(d)).toBe("월 12:30 PM");
  });
});
