"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { FILE_RENDERERS } from "@/components/vscode/files";

interface AppSheetProps {
  id: string;
  title: string;
  onClose: () => void;
}

export function AppSheet({ id, title, onClose }: AppSheetProps) {
  const Renderer = FILE_RENDERERS[id];
  return (
    <motion.div
      role="dialog"
      aria-label={title}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
      className="fixed inset-0 z-50 flex flex-col bg-ctp-base"
    >
      <div className="flex items-center justify-between border-b border-ctp-surface px-4 py-3">
        <span className="font-semibold text-ctp-text">{title}</span>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-ctp-surface text-ctp-subtext"
        >
          <Icon icon="ph:x-bold" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{Renderer ? <Renderer /> : null}</div>
    </motion.div>
  );
}
