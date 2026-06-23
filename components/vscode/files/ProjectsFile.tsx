import type { ReactNode } from "react";
import { projects } from "@/content/projects";
import { CodeView, S, P, C } from "./code";

const NBSP = " ";
const ind = (n: number) => NBSP.repeat(n);

function buildLines(): ReactNode[] {
  const lines: ReactNode[] = [<>[</>];
  projects.forEach((p, idx) => {
    const comma = idx < projects.length - 1 ? "," : "";
    lines.push(
      <>
        {ind(2)}
        <C>{`// ${p.description}`}</C>
      </>,
    );
    lines.push(<>{ind(2)}{"{"}</>);
    lines.push(<>{ind(4)}<P>name</P>: <S>&quot;{p.name}&quot;</S>,</>);
    lines.push(<>{ind(4)}<P>period</P>: <S>&quot;{p.period}&quot;</S>,</>);
    lines.push(<>{ind(4)}<P>role</P>: <S>&quot;{p.role}&quot;</S>,</>);
    lines.push(
      <>
        {ind(4)}
        <P>stack</P>: [<S>{p.stack.map((s) => `"${s}"`).join(", ")}</S>],
      </>,
    );
    lines.push(<>{ind(4)}<P>status</P>: <S>&quot;{p.status}&quot;</S>,</>);
    if (p.links.length > 0) {
      lines.push(
        <>
          {ind(4)}
          <P>links</P>: [
          {p.links.map((l, i) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ctp-teal underline-offset-2 hover:underline"
            >
              {i > 0 ? ", " : ""}&quot;{l.url}&quot;
            </a>
          ))}
          ],
        </>,
      );
    }
    lines.push(<>{ind(2)}{"}"}{comma}</>);
  });
  lines.push(<>]</>);
  return lines;
}

const LINES = buildLines();

export function ProjectsFile() {
  return (
    <div className="px-4 py-4">
      <CodeView lines={LINES} />
    </div>
  );
}
