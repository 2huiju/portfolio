"use client";

import { useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";

interface WindowProps {
  title: string;
  z: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
}

const MIN_W = 520;
const MIN_H = 360;
const DEFAULT_W = 880;
const DEFAULT_H = 560;

type Dir = "e" | "s" | "se";

export function Window({ title, z, onFocus, onClose, onMinimize, children }: WindowProps) {
  const controls = useDragControls();
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });

  // 모서리/가장자리 드래그로 리사이즈
  const startResize = (e: ReactPointerEvent, dir: Dir) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.w;
    const startH = size.h;
    const move = (ev: globalThis.PointerEvent) => {
      setSize({
        w: dir.includes("e") ? Math.max(MIN_W, startW + (ev.clientX - startX)) : startW,
        h: dir.includes("s") ? Math.max(MIN_H, startH + (ev.clientY - startY)) : startH,
      });
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };

  return (
    <motion.div
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      onMouseDown={onFocus}
      style={{
        zIndex: z,
        width: maximized ? "94vw" : size.w,
        height: maximized ? "85vh" : size.h,
        maxWidth: "96vw",
        maxHeight: "88vh",
      }}
      className="absolute inset-x-0 top-14 mx-auto flex flex-col overflow-hidden rounded-xl border border-white/10 bg-ctp-base shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
    >
      {/* 타이틀바 (드래그 핸들) */}
      <div
        onPointerDown={(e) => controls.start(e)}
        onDoubleClick={() => setMaximized((m) => !m)}
        className="flex h-9 shrink-0 cursor-grab items-center gap-2 border-b border-black/40 bg-ctp-crust px-3 select-none active:cursor-grabbing"
      >
        <div className="group flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] leading-none text-black/0 transition-colors group-hover:text-black/55"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="최소화"
            onClick={onMinimize}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[8px] leading-none text-black/0 transition-colors group-hover:text-black/55"
          >
            −
          </button>
          <button
            type="button"
            aria-label="최대화"
            onClick={() => setMaximized((m) => !m)}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] leading-none text-black/0 transition-colors group-hover:text-black/55"
          >
            +
          </button>
        </div>
        <span className="flex-1 pr-12 text-center text-xs font-medium text-ctp-subtext">{title}</span>
      </div>

      <div className="min-h-0 flex-1">{children}</div>

      {/* 리사이즈 핸들 (최대화 시 숨김) */}
      {!maximized && (
        <>
          <div
            onPointerDown={(e) => startResize(e, "e")}
            className="absolute top-9 right-0 bottom-3 w-1.5 cursor-ew-resize"
          />
          <div
            onPointerDown={(e) => startResize(e, "s")}
            className="absolute bottom-0 left-0 h-1.5 w-full cursor-ns-resize"
          />
          <div
            onPointerDown={(e) => startResize(e, "se")}
            className="absolute right-0 bottom-0 h-3.5 w-3.5 cursor-nwse-resize"
          />
        </>
      )}
    </motion.div>
  );
}
