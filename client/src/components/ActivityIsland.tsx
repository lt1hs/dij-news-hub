import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, AudioLines, Pause, Play, Sparkles, X } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface ActivityIslandProps {
  deskCompact: boolean;
  audioOpen: boolean;
  audioPlaying: boolean;
  onOpenDesk: () => void;
  onToggleAudioPlay: () => void;
  onExpandAudio: () => void;
  onCloseAudio: () => void;
}

const spring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.78 };

export default function ActivityIsland({
  deskCompact,
  audioOpen,
  audioPlaying,
  onOpenDesk,
  onToggleAudioPlay,
  onExpandAudio,
  onCloseAudio,
}: ActivityIslandProps) {
  const { collapsed } = useSidebar();
  const reduceMotion = useReducedMotion();

  const showDesk = deskCompact;
  const showAudio = audioOpen;
  const both = showDesk && showAudio;
  const visible = showDesk || showAudio;

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed z-[90] bottom-5 left-1/2 -translate-x-1/2 will-change-transform",
        "transition-[left,width] duration-300 ease-out",
        both ? "w-[min(620px,calc(100vw-1.5rem))]" : "w-[min(540px,calc(100vw-1.5rem))]",
        collapsed ? "md:left-[calc(50%+2rem)]" : "md:left-[calc(50%+110px)]"
      )}
    >
      <motion.div
        layout
        transition={reduceMotion ? { duration: 0.16 } : spring}
        className={cn(
          "relative overflow-hidden border border-foreground/[.12] bg-chrome/94 shadow-[0_16px_40px_rgba(15,23,42,.10)] dark:shadow-[0_16px_44px_rgba(0,0,0,.5)] backdrop-blur-xl",
          both ? "flex h-[54px] items-stretch rounded-[28px]" : "rounded-full"
        )}
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-foreground/22 to-transparent" />
        {both && (
          <div className="pointer-events-none absolute -top-3 left-1/2 h-5 w-36 -translate-x-1/2 rounded-full bg-sidebar-primary/15 blur-md" />
        )}

        <AnimatePresence initial={false} mode="popLayout">
          {showAudio && (
            <motion.div
              key="audio-slot"
              layout
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: -12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92, x: -10 }}
              transition={spring}
              className={cn(
                "relative flex min-w-0 items-center gap-2.5",
                both ? "flex-[1.15] px-2.5" : "h-12 w-full px-2 pl-3"
              )}
            >
              <button
                type="button"
                onClick={onExpandAudio}
                className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full py-1 text-left transition hover:bg-foreground/[.03]"
                aria-label="Expand audio player"
              >
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15 ring-1 ring-sidebar-primary/30">
                  {!reduceMotion && audioPlaying && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-sidebar-primary/20 opacity-25 [animation-duration:2.2s]" />
                  )}
                  <AudioLines className={cn("relative h-3.5 w-3.5 text-sidebar-primary", audioPlaying && "animate-pulse")} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground dark:text-neutral-500">
                    {both ? "Now playing" : "Intelligence stream"}
                  </span>
                  <span className="block truncate text-[13px] text-foreground/90 dark:text-neutral-200">
                    {both ? "Neural Lattice" : "Neural Lattice Analysis"}
                  </span>
                </span>
              </button>

              {!both && (
                <div className="mr-1 hidden h-6 items-end gap-0.5 sm:flex">
                  {[...Array(10)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: audioPlaying ? [4, 12 + (i % 4) * 3, 5, 10, 4] : 3 }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
                      className={cn("w-0.5 rounded-full", audioPlaying ? "bg-sidebar-primary/55" : "bg-foreground/15")}
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={onToggleAudioPlay}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-white shadow-[0_0_16px_rgba(59,130,246,.28)]"
                aria-label={audioPlaying ? "Pause" : "Play"}
              >
                {audioPlaying ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />}
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onCloseAudio();
                }}
                className="mr-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground dark:text-neutral-500 transition hover:bg-foreground/[.06] hover:text-foreground dark:hover:text-white"
                aria-label="Close audio"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}

          {both && (
            <motion.div
              key="split"
              layout
              initial={{ opacity: 0, scaleY: 0.4 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.4 }}
              transition={spring}
              className="my-2.5 w-px shrink-0 bg-foreground/[.12]"
            />
          )}

          {showDesk && (
            <motion.button
              key="desk-slot"
              type="button"
              layout
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: 12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92, x: 10 }}
              transition={spring}
              whileHover={reduceMotion || both ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              onClick={onOpenDesk}
              aria-label="Open intelligence desk"
              className={cn(
                "group relative flex min-w-0 items-center gap-2.5 text-left",
                both ? "flex-1 px-2.5" : "h-12 w-full px-2 pl-3"
              )}
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15 ring-1 ring-sidebar-primary/30">
                {!reduceMotion && !both && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-sidebar-primary/20 opacity-20 [animation-duration:2.6s]" />
                )}
                <Sparkles className="relative h-3.5 w-3.5 text-sidebar-primary" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground dark:text-neutral-500">
                  {both ? "Desk" : "Intelligence desk"}
                </span>
                <span className="block truncate text-[13px] text-muted-foreground dark:text-neutral-300 transition group-hover:text-foreground dark:group-hover:text-white">
                  {both ? "Ask…" : "Ask about today’s news…"}
                </span>
              </span>
              {!both && (
                <span className="mr-0.5 flex h-8 items-center gap-1.5 rounded-full bg-foreground/[.06] px-2.5 text-[11px] font-medium text-muted-foreground dark:text-neutral-400 ring-1 ring-foreground/[.06] transition group-hover:bg-foreground group-hover:text-background dark:group-hover:bg-white dark:group-hover:text-neutral-950">
                  Open
                  <ArrowUp className="h-3 w-3 rotate-45" />
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
