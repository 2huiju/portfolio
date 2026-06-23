import { Icon } from "@iconify/react";
import { FILES } from "@/content/files";

const FILE_BY_ID = Object.fromEntries(FILES.map((f) => [f.id, f]));

interface TabsProps {
  openIds: string[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

export function Tabs({ openIds, activeId, onSelect, onClose }: TabsProps) {
  return (
    <div className="flex h-9 shrink-0 items-stretch overflow-x-auto bg-ctp-mantle text-[12.5px]">
      {openIds.map((id) => {
        const file = FILE_BY_ID[id];
        if (!file) return null;
        const active = id === activeId;
        return (
          <div
            key={id}
            className={`group flex items-center gap-2 border-r border-black/30 pr-2 pl-3 ${
              active ? "bg-ctp-base text-ctp-text shadow-[inset_0_2px_0_var(--color-ctp-blue)]" : "text-ctp-overlay"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(id)}
              className="flex items-center gap-2 py-2"
            >
              <Icon icon={file.icon} className="text-base" aria-hidden />
              {file.name}
            </button>
            <button
              type="button"
              aria-label={`${file.name} 닫기`}
              onClick={() => onClose(id)}
              className="rounded p-0.5 opacity-0 hover:bg-white/10 group-hover:opacity-100"
            >
              <Icon icon="codicon:close" className="text-xs" aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
