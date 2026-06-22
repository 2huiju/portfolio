import { Icon } from "@iconify/react";
import { FILES } from "@/content/files";

interface ExplorerProps {
  activeId: string;
  onOpen: (id: string) => void;
}

export function Explorer({ activeId, onOpen }: ExplorerProps) {
  return (
    <div className="hidden w-52 shrink-0 flex-col bg-ctp-mantle text-[13px] text-ctp-subtext desk:flex">
      <div className="px-4 py-2 text-[11px] font-medium tracking-wide text-ctp-overlay uppercase">
        Explorer
      </div>
      <div className="flex items-center gap-1 px-3 py-1 font-semibold text-ctp-text">
        <Icon icon="codicon:chevron-down" className="text-xs" aria-hidden />
        HEEJOO.DEV
      </div>
      <ul>
        {FILES.map((f) => (
          <li key={f.id}>
            <button
              type="button"
              onClick={() => onOpen(f.id)}
              aria-current={activeId === f.id}
              className={`flex w-full items-center gap-2 py-1 pr-3 pl-7 text-left hover:bg-white/5 ${
                activeId === f.id ? "bg-white/10 text-ctp-text" : ""
              }`}
            >
              <Icon icon={f.icon} className="text-base" aria-hidden />
              {f.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
