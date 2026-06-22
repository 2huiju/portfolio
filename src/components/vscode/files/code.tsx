import type { ReactNode } from "react";

// 신택스 컬러 헬퍼 (Catppuccin) — 코드형 파일에서 재사용
export const K = ({ children }: { children: ReactNode }) => <span className="text-ctp-mauve">{children}</span>; // 키워드
export const S = ({ children }: { children: ReactNode }) => <span className="text-ctp-green">{children}</span>; // 문자열
export const F = ({ children }: { children: ReactNode }) => <span className="text-ctp-blue">{children}</span>; // 함수/타입
export const P = ({ children }: { children: ReactNode }) => <span className="text-ctp-red">{children}</span>; // 프로퍼티/태그
export const N = ({ children }: { children: ReactNode }) => <span className="text-ctp-peach">{children}</span>; // 숫자
export const V = ({ children }: { children: ReactNode }) => <span className="text-ctp-yellow">{children}</span>; // 변수
export const C = ({ children }: { children: ReactNode }) => <span className="text-ctp-overlay italic">{children}</span>; // 주석

/** 라인넘버 거터 + 코드 라인. 마지막 줄에 선택적 캐럿. */
export function CodeView({ lines, cursor = false }: { lines: ReactNode[]; cursor?: boolean }) {
  return (
    <div className="font-mono text-[13px] leading-7">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-12 shrink-0 select-none pr-4 text-right text-ctp-overlay/50">{i + 1}</span>
          <span className="whitespace-pre-wrap break-words">
            {line}
            {cursor && i === lines.length - 1 ? <span className="caret" /> : null}
          </span>
        </div>
      ))}
    </div>
  );
}
