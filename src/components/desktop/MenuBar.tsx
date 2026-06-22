"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { formatClock } from "@/lib/formatClock";

const MENUS = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

interface MenuBarProps {
  /** 현재 활성 앱 이름 (사과 로고 옆 굵은 글씨) */
  appName?: string;
}

export function MenuBar({ appName = "VS Code" }: MenuBarProps) {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const update = () => setClock(formatClock(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex h-7 items-center gap-4 px-3 text-[13px] text-white/95 select-none bg-black/35 backdrop-blur-xl shadow-[0_0.5px_0_rgba(255,255,255,0.12)]"
      role="menubar"
      aria-label="macOS 메뉴 바"
    >
      <Icon icon="mdi:apple" className="text-[15px]" aria-hidden />
      <span className="font-semibold">{appName}</span>

      <nav className="hidden items-center gap-4 text-white/85 desk:flex">
        {MENUS.map((m) => (
          <span key={m} className="cursor-default hover:text-white">
            {m}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3.5 text-white/90">
        <Icon icon="ph:faders" className="text-[15px]" aria-hidden />
        <Icon icon="ph:battery-high" className="text-[17px]" aria-hidden />
        <Icon icon="ph:wifi-high" className="text-[15px]" aria-hidden />
        <Icon icon="ph:magnifying-glass" className="text-[14px]" aria-hidden />
        <span className="tabular-nums" suppressHydrationWarning>
          {clock}
        </span>
      </div>
    </header>
  );
}
