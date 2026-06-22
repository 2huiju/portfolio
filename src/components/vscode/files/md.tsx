import type { ReactNode } from "react";

// 렌더된 마크다운처럼 보이는 프레젠테이션 헬퍼 (.md 파일용)
export const MdDoc = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-2xl px-6 py-6 leading-7 text-ctp-subtext">{children}</div>
);
export const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="mb-4 border-b border-ctp-surface pb-2 text-2xl font-bold text-ctp-text">{children}</h1>
);
export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-2 mt-7 text-lg font-semibold text-ctp-text">{children}</h2>
);
export const Pp = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`mb-3 ${className}`}>{children}</p>
);
export const Ul = ({ children }: { children: ReactNode }) => (
  <ul className="mb-3 ml-5 list-disc space-y-1 marker:text-ctp-overlay">{children}</ul>
);
export const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-ctp-text">{children}</strong>
);
