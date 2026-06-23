import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { CodeView, K, P, V, C } from "./code";

const NBSP = " ";
const ind = (n: number) => NBSP.repeat(n);

const link = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-ctp-teal underline-offset-2 hover:underline"
  >
    &quot;{text}&quot;
  </a>
);

function buildLines(): ReactNode[] {
  const lines: ReactNode[] = [
    <C key="c">{"// 함께 일하고 싶다면 언제든 연락 주세요 :)"}</C>,
    <>
      <K>const</K> <V>contact</V> = {"{"}
    </>,
    <>{ind(2)}<P>email</P>: {link(`mailto:${profile.email}`, profile.email)},</>,
    <>{ind(2)}<P>github</P>: {link(profile.github, profile.github.replace(/^https?:\/\//, ""))},</>,
  ];
  if (profile.phone) {
    lines.push(<>{ind(2)}<P>phone</P>: {link(`tel:${profile.phone}`, profile.phone)},</>);
  }
  lines.push(<>{"};"}</>);
  return lines;
}

export function ContactFile() {
  return (
    <div className="px-4 py-4">
      <CodeView lines={buildLines()} />
    </div>
  );
}
