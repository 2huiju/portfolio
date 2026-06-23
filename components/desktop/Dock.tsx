"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { DOCK_APPS, type DockApp } from "./dockApps";

// 아이콘 기본/최대 크기와 매그니피케이션 반경(px)
const BASE_SIZE = 46;
const MAX_SIZE = 74;
const INFLUENCE = 150;
const SPRING = { mass: 0.2, stiffness: 240, damping: 18 } as const;

interface DockProps {
  onOpen: (id: string) => void;
  runningIds?: string[];
}

export function Dock({ onOpen, runningIds = [] }: DockProps) {
  const prefersReduced = useReducedMotion();
  const isStatic = prefersReduced ?? false;
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <nav
      aria-label="독"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-end gap-2.5 rounded-[22px] border border-white/25 bg-white/15 px-2.5 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
    >
      {DOCK_APPS.map((app) => (
        <DockItem
          key={app.id}
          app={app}
          mouseX={mouseX}
          isStatic={isStatic}
          running={runningIds.includes(app.id)}
          onOpen={onOpen}
        />
      ))}
    </nav>
  );
}

interface DockItemProps {
  app: DockApp;
  mouseX: MotionValue<number>;
  isStatic: boolean;
  running: boolean;
  onOpen: (id: string) => void;
}

function DockItem({ app, mouseX, isStatic, running, onOpen }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return INFLUENCE;
    return x - (rect.x + rect.width / 2);
  });
  const sizeTarget = useTransform(distance, [-INFLUENCE, 0, INFLUENCE], [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
  const size = useSpring(sizeTarget, SPRING);

  return (
    <button
      ref={ref}
      type="button"
      aria-label={app.label}
      disabled={!app.enabled}
      onClick={() => app.enabled && onOpen(app.id)}
      className="group relative flex flex-col items-center"
    >
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {app.label}
      </span>

      <motion.span
        style={isStatic ? { width: BASE_SIZE, height: BASE_SIZE } : { width: size, height: size }}
        className={`relative block ${app.enabled ? "" : "opacity-80 grayscale"}`}
      >
        {app.img ? (
          <Image src={app.img} alt={app.label} fill sizes="74px" className="object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]" />
        ) : (
          <span className={`flex h-full w-full items-center justify-center rounded-[22%] shadow-[0_4px_10px_rgba(0,0,0,0.25)] ${app.tile ?? ""}`}>
            <Icon icon={app.icon ?? ""} className="h-[64%] w-[64%]" aria-hidden />
          </span>
        )}
      </motion.span>

      <span
        className={`mt-1 h-1 w-1 rounded-full bg-white/80 ${running ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
    </button>
  );
}
