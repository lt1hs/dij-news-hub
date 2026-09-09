import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  X,
  AudioLines,
  Minimize2,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AudioHubProps {
  isOpen: boolean;
  expanded: boolean;
  isPlaying: boolean;
  onClose: () => void;
  onCollapse: () => void;
  onTogglePlay: () => void;
}

export default function AudioHub({
  isOpen,
  expanded,
  isPlaying,
  onClose,
  onCollapse,
  onTogglePlay,
}: AudioHubProps) {
  const [volume] = useState(80);

  return (
    <AnimatePresence>
      {isOpen && expanded && (
        <div className="fixed bottom-5 left-1/2 z-[100] w-[min(560px,calc(100vw-1.5rem))] -translate-x-1/2 pointer-events-none">
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            layout
            className="pointer-events-auto relative overflow-hidden rounded-[28px] border border-foreground/[.12] bg-chrome/94 p-6 shadow-[0_24px_60px_rgba(15,23,42,.12)] dark:shadow-[0_28px_80px_rgba(0,0,0,.62)] backdrop-blur-xl sm:p-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sidebar-primary/10 via-transparent to-foreground/5" />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

            <div className="relative flex w-full flex-col items-center gap-5">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sidebar-primary/30 bg-sidebar-primary/20">
                    <AudioLines size={20} className={cn("text-sidebar-primary", isPlaying && "animate-pulse")} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold tracking-tight text-foreground dark:text-white">
                      Intelligence Stream: Neural Lattice Analysis
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sidebar-primary">Echo Alpha v2</span>
                      <span className="h-1 w-1 rounded-full bg-foreground/15" />
                      <span className="text-[10px] uppercase text-muted-foreground dark:text-neutral-500">Live synthesis</span>
                    </div>
                  </div>
                </div>
                <button type="button" className="rounded-lg bg-foreground/5 p-2 text-muted-foreground dark:text-neutral-400 transition hover:text-foreground dark:hover:text-white">
                  <Settings2 size={16} />
                </button>
              </div>

              <div className="flex h-16 w-full items-end justify-center gap-1 px-2">
                {[...Array(42)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying ? [10, Math.random() * 36 + 10, 12, Math.random() * 28 + 6, 10] : 4,
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.025, ease: "easeInOut" }}
                    className={cn("w-1 rounded-full", isPlaying ? "bg-sidebar-primary/50" : "bg-foreground/10")}
                  />
                ))}
              </div>

              <div className="flex items-center gap-8">
                <button type="button" className="p-2 text-muted-foreground dark:text-neutral-500 transition hover:text-foreground dark:hover:text-white">
                  <SkipBack size={18} fill="currentColor" />
                </button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={onTogglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-sidebar-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
                </motion.button>
                <button type="button" className="p-2 text-muted-foreground dark:text-neutral-500 transition hover:text-foreground dark:hover:text-white">
                  <SkipForward size={18} fill="currentColor" />
                </button>
              </div>

              <div className="mt-1 flex w-full items-center justify-between border-t border-foreground/[.07] pt-4">
                <div className="flex items-center gap-3">
                  <button type="button" className="rounded-xl bg-foreground/5 p-2.5 text-muted-foreground dark:text-neutral-400 transition hover:text-sidebar-primary">
                    <Volume2 size={16} />
                  </button>
                  <div className="relative h-1 w-28 overflow-hidden rounded-full bg-foreground/10">
                    <div className="absolute inset-y-0 left-0 bg-sidebar-primary" style={{ width: `${volume}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={onCollapse}
                    className="rounded-xl bg-foreground/5 p-2.5 text-muted-foreground dark:text-neutral-400 transition hover:text-foreground dark:hover:text-white"
                    title="Collapse to island"
                  >
                    <Minimize2 size={16} />
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={onClose}
                    className="rounded-xl bg-foreground/5 p-2.5 text-muted-foreground dark:text-neutral-500 transition hover:bg-rose-500/15 hover:text-rose-400"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
