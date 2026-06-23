import { experience, education } from "@/content/experience";

export function ExperienceFile() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-6">
      <section className="space-y-5">
        <h2 className="text-sm font-semibold tracking-wide text-ctp-overlay uppercase">경력</h2>
        {experience.map((e) => (
          <div key={e.company} className="border-l-2 border-ctp-surface pl-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-base font-bold text-ctp-text">{e.company}</h3>
              {e.team && <span className="text-xs text-ctp-overlay">{e.team}</span>}
              <span className="ml-auto font-mono text-[11px] text-ctp-overlay">{e.period}</span>
            </div>
            <div className="mt-0.5 text-[12px] text-ctp-blue">{e.role}</div>
            <p className="mt-2 text-[13px] leading-relaxed text-ctp-subtext">{e.summary}</p>
            <ul className="mt-2 space-y-1.5">
              {e.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ctp-subtext">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ctp-overlay" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold tracking-wide text-ctp-overlay uppercase">교육</h2>
        <ul className="space-y-1">
          {education.map((ed) => (
            <li key={ed.name} className="flex items-baseline gap-2 text-[13px] text-ctp-subtext">
              <span className="text-ctp-text">{ed.name}</span>
              <span className="ml-auto font-mono text-[11px] text-ctp-overlay">{ed.period}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
