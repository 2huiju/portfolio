"use client";
import { useEffect, useState } from "react";

/**
 * 데스크톱/모바일 분기 훅.
 * SSR 안전: 초기값 null(미정) → 마운트 후 matchMedia로 판정.
 * null인 동안 호출부는 데스크톱 셸을 기본 렌더(레이아웃 시프트 최소화).
 */
export function useIsMobile(breakpoint = 820): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
