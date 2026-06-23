"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { profile } from "@/content/profile";
import { AppSheet } from "./AppSheet";

interface IosApp {
  id: string;
  label: string;
  icon: string;
  /** 아이콘 타일 그라데이션 (Tailwind) */
  tile: string;
}

const IOS_APPS: IosApp[] = [
  { id: "home", label: "Profile", icon: "ph:identification-badge-fill", tile: "from-violet-500 to-indigo-600" },
  { id: "about", label: "About", icon: "ph:user-fill", tile: "from-sky-400 to-blue-600" },
  { id: "projects", label: "Projects", icon: "ph:folder-fill", tile: "from-amber-400 to-orange-500" },
  { id: "experience", label: "Experience", icon: "ph:briefcase-fill", tile: "from-emerald-400 to-green-600" },
  { id: "contact", label: "Contact", icon: "ph:envelope-fill", tile: "from-rose-400 to-pink-600" },
  { id: "github", label: "GitHub", icon: "mdi:github", tile: "from-neutral-700 to-neutral-900" },
];

const WALLPAPER =
  "radial-gradient(60% 50% at 20% 15%, rgba(124,92,255,0.5) 0%, transparent 60%)," +
  "radial-gradient(55% 45% at 85% 25%, rgba(34,211,238,0.4) 0%, transparent 60%)," +
  "radial-gradient(60% 50% at 70% 95%, rgba(255,106,213,0.4) 0%, transparent 60%)," +
  "linear-gradient(160deg, #1b1033 0%, #0f1230 45%, #07111f 100%)";

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setT(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function IOSHome() {
  const [active, setActive] = useState<IosApp | null>(null);
  const clock = useClock();

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white" style={{ backgroundImage: WALLPAPER }}>
      {/* 상태바 */}
      <div className="flex items-center justify-between px-6 pt-3 text-sm font-semibold">
        <span suppressHydrationWarning>{clock}</span>
        <span className="flex items-center gap-1.5">
          <Icon icon="ph:cell-signal-full-fill" />
          <Icon icon="ph:wifi-high-fill" />
          <Icon icon="ph:battery-full-fill" className="text-base" />
        </span>
      </div>

      {/* 프로필 헤더 */}
      <div className="flex flex-col items-center px-6 pt-12 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl font-bold shadow-lg">
          이
        </div>
        <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
        <p className="text-white/70">{profile.role} · {profile.years}년차</p>
      </div>

      {/* 앱 그리드 */}
      <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-6 px-7">
        {IOS_APPS.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => setActive(app)}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={`flex items-center justify-center rounded-[22%] bg-gradient-to-b ${app.tile} text-[28px] text-white shadow-md`}
              style={{ width: 60, height: 60 }}
            >
              <Icon icon={app.icon} aria-hidden />
            </span>
            <span className="text-xs font-medium text-white/90">{app.label}</span>
          </button>
        ))}
      </div>

      {/* 하단 힌트 독 */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <div className="rounded-full bg-white/15 px-5 py-2 text-xs text-white/80 backdrop-blur-xl">
          앱을 탭해서 살펴보세요
        </div>
      </div>

      <AnimatePresence>
        {active && <AppSheet id={active.id} title={active.label} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
