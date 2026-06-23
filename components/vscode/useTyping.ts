"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 항목 배열을 시간에 따라 한 개씩 점진 노출한다(타이핑/리빌 연출).
 * - prefers-reduced-motion이면 즉시 전체 반환.
 * - `items.length`에만 의존해, 인라인 배열을 넘겨도 매 렌더마다 리셋되지 않는다.
 */
export function useTyping<T>(items: T[], speed = 130): T[] {
  const reduced =
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const [count, setCount] = useState(reduced ? items.length : Math.min(1, items.length));

  useEffect(() => {
    const total = itemsRef.current.length;
    if (reduced) {
      setCount(total);
      return;
    }
    setCount(Math.min(1, total));
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= total) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [items.length, speed, reduced]);

  return items.slice(0, count);
}
