import type { ReactNode } from "react";
import { experience, education } from "@/content/experience";
import { CodeView, K, S, P, V, C } from "./code";

const NBSP = " ";
const ind = (n: number) => NBSP.repeat(n);

function buildLines(): ReactNode[] {
  const lines: ReactNode[] = [
    <C key="c1">{"// 경력"}</C>,
    <>
      <K>const</K> <V>experience</V> = [
    </>,
  ];
  experience.forEach((e) => {
    lines.push(<>{ind(2)}{"{"}</>);
    lines.push(<>{ind(4)}<P>company</P>: <S>&quot;{e.company}{e.team ? ` · ${e.team}` : ""}&quot;</S>,</>);
    lines.push(<>{ind(4)}<P>period</P>: <S>&quot;{e.period}&quot;</S>,</>);
    lines.push(<>{ind(4)}<P>role</P>: <S>&quot;{e.role}&quot;</S>,</>);
    lines.push(<>{ind(4)}<P>summary</P>: <S>&quot;{e.summary}&quot;</S>,</>);
    lines.push(<>{ind(4)}<P>highlights</P>: [</>);
    e.bullets.forEach((b) => lines.push(<>{ind(6)}<S>&quot;{b}&quot;</S>,</>));
    lines.push(<>{ind(4)}],</>);
    lines.push(<>{ind(2)}{"},"}</>);
  });
  lines.push(<>];</>);
  lines.push(<>{NBSP}</>);
  lines.push(<C key="c2">{"// 교육"}</C>);
  lines.push(
    <>
      <K>const</K> <V>education</V> = [
    </>,
  );
  education.forEach((ed) => lines.push(<>{ind(2)}<S>&quot;{ed.name} ({ed.period})&quot;</S>,</>));
  lines.push(<>];</>);
  return lines;
}

const LINES = buildLines();

export function ExperienceFile() {
  return (
    <div className="px-4 py-4">
      <CodeView lines={LINES} />
    </div>
  );
}
