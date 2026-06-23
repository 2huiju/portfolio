import { FILE_RENDERERS } from "./files";

interface EditorProps {
  activeId: string;
}

export function Editor({ activeId }: EditorProps) {
  const Renderer = FILE_RENDERERS[activeId];
  return (
    <div className="min-h-0 flex-1 overflow-auto bg-ctp-base text-ctp-text">
      {Renderer ? <Renderer /> : <div className="p-6 text-ctp-overlay">열린 파일이 없습니다.</div>}
    </div>
  );
}
