"use client";

import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { useTyping } from "@/components/vscode/useTyping";
import { CodeView, K, S, F, P, N, V, C } from "./code";

const NBSP = " ";
const indent = (n: number) => NBSP.repeat(n);

const LINES: ReactNode[] = [
  <C key="c">{"// 안녕하세요 👋 이희주의 포트폴리오입니다."}</C>,
  <>{NBSP}</>,
  <>
    <K>const</K> <V>heejoo</V> = {"{"}
  </>,
  <>
    {indent(2)}
    <P>name</P>: <S>&quot;{profile.name}&quot;</S>,
  </>,
  <>
    {indent(2)}
    <P>role</P>: <S>&quot;{profile.role}&quot;</S>,
  </>,
  <>
    {indent(2)}
    <P>years</P>: <N>{profile.years}</N>,
  </>,
  <>
    {indent(2)}
    <P>stack</P>: [<S>{profile.stack.map((s) => `"${s}"`).join(", ")}</S>],
  </>,
  <>
    {indent(2)}
    <P>focus</P>: <S>&quot;기능을 넘어 팀의 개발 환경까지 설계&quot;</S>,
  </>,
  <>{"};"}</>,
  <>{NBSP}</>,
  <>
    <K>export default function</K> <F>Home</F>() {"{"}
  </>,
  <>
    {indent(2)}
    <K>return</K> <P>&lt;Portfolio</P> <V>dev</V>={"{heejoo}"} <P>/&gt;</P>;
  </>,
  <>{"}"}</>,
];

export function HomeFile() {
  const visible = useTyping(LINES, 120);
  const done = visible.length === LINES.length;
  return (
    <div className="px-4 py-4">
      <CodeView lines={visible} cursor={!done} />
    </div>
  );
}
