import { Icon } from "@iconify/react";

const ITEMS = [
  { icon: "codicon:files", label: "Explorer", active: true },
  { icon: "codicon:search", label: "Search", active: false },
  { icon: "codicon:source-control", label: "Source Control", active: false },
  { icon: "codicon:debug-alt", label: "Run and Debug", active: false },
  { icon: "codicon:extensions", label: "Extensions", active: false },
];

export function ActivityBar() {
  return (
    <div className="flex w-12 shrink-0 flex-col items-center gap-5 bg-ctp-mantle py-3 text-ctp-overlay">
      {ITEMS.map((it) => (
        <span
          key={it.label}
          title={it.label}
          className={`relative flex w-full justify-center text-[22px] ${
            it.active ? "text-ctp-text" : ""
          }`}
        >
          {it.active && <span className="absolute left-0 h-6 w-0.5 -translate-y-0 bg-ctp-text" />}
          <Icon icon={it.icon} aria-hidden />
        </span>
      ))}
    </div>
  );
}
