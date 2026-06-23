"use client";

import { useVscode } from "@/store/vscode";
import { ActivityBar } from "./ActivityBar";
import { Explorer } from "./Explorer";
import { Tabs } from "./Tabs";
import { Editor } from "./Editor";
import { StatusBar } from "./StatusBar";

export function VSCodeApp() {
  const openIds = useVscode((s) => s.openIds);
  const activeId = useVscode((s) => s.activeId);
  const openFile = useVscode((s) => s.openFile);
  const setActive = useVscode((s) => s.setActive);
  const closeFile = useVscode((s) => s.closeFile);

  return (
    <div className="flex h-full w-full overflow-hidden bg-ctp-base text-ctp-text">
      <ActivityBar />
      <Explorer activeId={activeId} onOpen={openFile} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Tabs openIds={openIds} activeId={activeId} onSelect={setActive} onClose={closeFile} />
        <Editor activeId={activeId} />
        <StatusBar />
      </div>
    </div>
  );
}
