"use client";

import { useState } from "react";
import { ActivityBar } from "./ActivityBar";
import { Explorer } from "./Explorer";
import { Tabs } from "./Tabs";
import { Editor } from "./Editor";
import { StatusBar } from "./StatusBar";

const DEFAULT_FILE = "home";

export function VSCodeApp() {
  const [openIds, setOpenIds] = useState<string[]>([DEFAULT_FILE]);
  const [activeId, setActiveId] = useState<string>(DEFAULT_FILE);

  const open = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveId(id);
  };

  const close = (id: string) => {
    const idx = openIds.indexOf(id);
    const remaining = openIds.filter((x) => x !== id);
    setOpenIds(remaining);
    if (id === activeId) {
      setActiveId(remaining[idx - 1] ?? remaining[0] ?? "");
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-ctp-base text-ctp-text">
      <ActivityBar />
      <Explorer activeId={activeId} onOpen={open} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Tabs openIds={openIds} activeId={activeId} onSelect={setActiveId} onClose={close} />
        <Editor activeId={activeId} />
        <StatusBar />
      </div>
    </div>
  );
}
