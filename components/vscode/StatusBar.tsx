import { Icon } from "@iconify/react";

export function StatusBar() {
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 bg-ctp-blue px-3 text-[11.5px] font-medium text-ctp-crust">
      <span className="flex items-center gap-1">
        <Icon icon="codicon:git-branch" aria-hidden /> main
      </span>
      <span className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <Icon icon="codicon:error" aria-hidden /> 0
        </span>
        <span className="flex items-center gap-1">
          <Icon icon="codicon:warning" aria-hidden /> 0
        </span>
      </span>
      <span className="ml-auto">TypeScript React</span>
      <span>UTF-8</span>
      <span className="flex items-center gap-1">
        <Icon icon="codicon:check" aria-hidden /> Prettier
      </span>
    </div>
  );
}
