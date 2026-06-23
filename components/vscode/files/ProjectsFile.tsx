import { projects } from "@/content/projects";
import type { Highlight } from "@/types/content";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-ctp-surface/70 px-2 py-0.5 text-[11px] text-ctp-subtext">{children}</span>
  );
}

function Row({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-[13px] leading-relaxed">
      <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${color}`}>{label}</span>
      <span className="text-ctp-subtext">{children}</span>
    </div>
  );
}

function HighlightBlock({ h }: { h: Highlight }) {
  return (
    <div className="space-y-1.5 border-l-2 border-ctp-surface pl-3">
      <div className="text-[13px] font-semibold text-ctp-text">{h.title}</div>
      {h.problem && <Row label="문제" color="bg-ctp-red/15 text-ctp-red">{h.problem}</Row>}
      <Row label="해결" color="bg-ctp-blue/15 text-ctp-blue">{h.solution}</Row>
      {h.result && <Row label="결과" color="bg-ctp-green/15 text-ctp-green">{h.result}</Row>}
    </div>
  );
}

export function ProjectsFile() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-6">
      {projects.map((p, i) => (
        <section key={p.id} className="space-y-3">
          {/* 헤더 */}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-lg text-ctp-overlay">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="text-xl font-bold text-ctp-text">{p.name}</h2>
            <span className="text-xs text-ctp-overlay">{p.org}</span>
            <span
              className={`ml-auto rounded-full px-2 py-0.5 text-[11px] ${
                p.status === "운영" ? "bg-ctp-green/15 text-ctp-green" : "bg-ctp-surface text-ctp-overlay"
              }`}
            >
              {p.status}
            </span>
          </div>

          <p className="text-[13px] leading-relaxed text-ctp-subtext">{p.tagline}</p>

          <div className="font-mono text-[11px] text-ctp-overlay">
            {p.period} · {p.role} · {p.team}
          </div>

          {/* 스택 */}
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>

          {/* 아키텍처 요약 */}
          <p className="rounded-lg bg-ctp-mantle px-3 py-2 text-[12.5px] text-ctp-subtext">{p.summary}</p>

          {/* 핵심 경험 */}
          <div className="space-y-4">
            {p.highlights.map((h) => (
              <HighlightBlock key={h.title} h={h} />
            ))}
          </div>

          {/* 회고 */}
          {p.retrospective && (
            <div className="rounded-lg border border-ctp-surface bg-ctp-mantle/50 px-3 py-2.5 text-[12.5px] leading-relaxed text-ctp-subtext">
              <div className="mb-1 font-semibold text-ctp-text">회고</div>
              {p.retrospective}
            </div>
          )}

          {/* 링크 */}
          {p.links.length > 0 && (
            <div className="flex flex-wrap gap-3 text-[12.5px]">
              {p.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctp-teal underline-offset-2 hover:underline"
                >
                  🔗 {l.url.replace(/^https?:\/\//, "")}
                </a>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
