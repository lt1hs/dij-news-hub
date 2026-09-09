import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ChevronDown, GitCompare, Mic, Minus, PanelRight, Pin, PinOff, Sparkles, TrendingUp, X } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export type DeskMode = "compact" | "float" | "pinned";

export interface DeskArticleContext {
  id: string;
  title: string;
  summary?: string;
  sources?: string[];
  category?: string;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface DynamicPaneProps {
  mode: DeskMode;
  onModeChange: (mode: DeskMode) => void;
  contextArticle?: DeskArticleContext | null;
  onClearContext?: () => void;
  pendingPrompt?: string | null;
  onConsumePrompt?: () => void;
}

const KEY_STORIES = [
  { label: "Tech earnings", detail: "Q3 beat across majors" },
  { label: "Inflation", detail: "Cooling for a third month" },
  { label: "Energy", detail: "OPEC holds output steady" },
  { label: "Policy", detail: "EU AI transparency rules" },
];

const SUGGESTIONS = ["What changed today?", "Top tech stories", "Market risks"];

const BRIEF =
  "Tech is leading, energy is soft, and policy is becoming the quieter through-line across today’s coverage.";

export const DESK_PINNED_WIDTH = 380;

export default function DynamicPane({ mode, onModeChange, contextArticle = null, onClearContext, pendingPrompt = null, onConsumePrompt }: DynamicPaneProps) {
  const { collapsed } = useSidebar();
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [briefOpen, setBriefOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<number | null>(null);

  const isCompact = mode === "compact";
  const isFloat = mode === "float";
  const isPinned = mode === "pinned";
  const isOpen = !isCompact;
  const canSend = Boolean(input.trim()) && !isLoading;

  const spring = reduceMotion
    ? { type: "tween" as const, duration: 0.16 }
    : { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.85 };

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, isLoading, reduceMotion, mode]);

  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), reduceMotion ? 0 : 160);
    return () => window.clearTimeout(id);
  }, [isOpen, mode, reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onModeChange("compact");
    };
    window.addEventListener("keydown", onKeyDown);

    if (!isFloat) {
      return () => window.removeEventListener("keydown", onKeyDown);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isFloat, onModeChange]);

  useEffect(() => {
    if (messages.length > 0) setBriefOpen(false);
  }, [messages.length]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    };
  }, []);

  const handleSend = (value = input) => {
    const text = value.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, content: text, isUser: true }]);
    setInput("");
    setIsLoading(true);

    if (replyTimer.current) window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      const contextual = contextArticle
        ? `On “${contextArticle.title}”: the feed’s strongest angle is practical deployment over announcement. ${(contextArticle.sources?.length || 0) > 1 ? `I compared ${contextArticle.sources?.slice(0, 3).join(", ")} — framing differs on timing more than outcome.` : "Open source compare for a side-by-side read."} Want a tighter brief or risks only?`
        : "Across today’s desk, tech earnings are carrying risk appetite while energy softens. Policy and infrastructure are the quieter through-line — want any of those opened further?";

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-a`,
          content: contextual,
          isUser: false,
        },
      ]);
      setIsLoading(false);
      replyTimer.current = null;
    }, 850);
  };

  useEffect(() => {
    if (!pendingPrompt || isCompact) return;
    const prompt = pendingPrompt;
    onConsumePrompt?.();
    const id = window.setTimeout(() => handleSend(prompt), 220);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPrompt, isCompact]);

  const runSourceCompare = () => {
    const sources = contextArticle?.sources?.length
      ? contextArticle.sources
      : ["Reuters", "Bloomberg", "AP"];
    handleSend(`Compare sources on ${contextArticle?.title || "today’s top story"} across ${sources.slice(0, 3).join(", ")}`);
  };

  const contextChip = contextArticle ? (
    <div className="mb-2.5 rounded-xl border border-sidebar-primary/25 bg-sidebar-primary/[.08] px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-primary">Story context</p>
          <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-5 text-foreground dark:text-white">{contextArticle.title}</p>
          {contextArticle.category && <p className="mt-1 text-[10px] text-muted-foreground dark:text-neutral-500">{contextArticle.category}</p>}
        </div>
        <button type="button" onClick={onClearContext} aria-label="Clear story context" className="rounded-md p-1 text-muted-foreground dark:text-neutral-500 transition hover:bg-foreground/5 hover:text-foreground dark:hover:text-white">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => handleSend(`Brief me on: ${contextArticle.title}`)}
          className="rounded-full border border-foreground/[.1] bg-black/20 px-2.5 py-1 text-[11px] text-muted-foreground dark:text-neutral-300 transition hover:text-foreground dark:hover:text-white"
        >
          Brief this
        </button>
        <button
          type="button"
          onClick={runSourceCompare}
          className="inline-flex items-center gap-1 rounded-full border border-foreground/[.1] bg-black/20 px-2.5 py-1 text-[11px] text-muted-foreground dark:text-neutral-300 transition hover:text-foreground dark:hover:text-white"
        >
          <GitCompare className="h-3 w-3" /> Compare sources
        </button>
      </div>
    </div>
  ) : null;

  const centerClass = cn(
    "fixed z-[80] bottom-5 left-1/2 w-[min(540px,calc(100vw-1.5rem))] -translate-x-1/2 will-change-transform",
    "transition-[left] duration-300 ease-out",
    collapsed ? "md:left-[calc(50%+2rem)]" : "md:left-[calc(50%+110px)]"
  );

  const iconBtn =
    "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground dark:text-neutral-500 ring-1 ring-foreground/[.08] transition hover:bg-foreground/[.06] hover:text-foreground dark:hover:text-white";

  const composer = (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border bg-chrome-raised/95 px-1.5 py-1.5 pl-3.5 transition",
        "border-foreground/[.1] focus-within:border-sidebar-primary/35 focus-within:bg-chrome-raised"
      )}
    >
      <input
        ref={inputRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
          }
        }}
        placeholder="Ask the desk…"
        disabled={isLoading}
        className="min-w-0 flex-1 bg-transparent py-1.5 text-[13px] text-foreground dark:text-white outline-none placeholder:text-muted-foreground"
      />
      <button type="button" className="rounded-full p-2 text-muted-foreground dark:text-neutral-500 transition hover:bg-foreground/[.04] hover:text-foreground dark:hover:text-white" aria-label="Voice input">
        <Mic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => handleSend()}
        disabled={!canSend}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition",
          canSend
            ? "bg-sidebar-primary text-white shadow-[0_0_18px_rgba(59,130,246,.28)] enabled:active:scale-95"
            : "bg-foreground/10 text-muted-foreground/80 dark:text-neutral-600"
        )}
        aria-label="Send"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  const briefing = (
    <div className="overflow-hidden rounded-2xl border border-foreground/[.08] bg-foreground/[.025]">
      <button
        type="button"
        onClick={() => setBriefOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left transition hover:bg-foreground/[.02]"
        aria-expanded={briefOpen}
      >
        <div className="flex min-w-0 items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span className="truncate text-[12px] text-muted-foreground dark:text-neutral-300">
            <span className="font-medium text-emerald-400">Positive</span>
            <span className="text-muted-foreground/80 dark:text-neutral-600"> · </span>
            {briefOpen ? "Today’s outlook" : BRIEF}
          </span>
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground dark:text-neutral-500 transition-transform duration-200", briefOpen && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {briefOpen && (
          <motion.div
            key="brief-body"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-foreground/[.06] px-3.5 pb-3.5 pt-3">
              <p className="text-[13px] leading-6 text-foreground/90 dark:text-neutral-200">{BRIEF}</p>
              <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {KEY_STORIES.map((story) => (
                  <button
                    key={story.label}
                    type="button"
                    onClick={() => handleSend(`Brief me on ${story.label.toLowerCase()}`)}
                    className="min-w-[120px] shrink-0 rounded-xl border border-foreground/[.08] bg-chrome/8 px-3 py-2 text-left transition hover:border-sidebar-primary/30 hover:bg-sidebar-primary/[.08]"
                  >
                    <span className="block text-[11px] font-semibold text-foreground dark:text-white">{story.label}</span>
                    <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground dark:text-neutral-500">{story.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const thread = (
    <div ref={listRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain custom-scrollbar">
      {messages.length === 0 ? (
        <div className="space-y-2.5 px-4 pb-2 pt-1">
          <p className="text-[11px] text-muted-foreground/80 dark:text-neutral-600">Start from a prompt, or ask anything about the feed.</p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSend(suggestion)}
                className="rounded-full border border-foreground/[.08] bg-foreground/[.03] px-3 py-1.5 text-[12px] text-muted-foreground dark:text-neutral-400 transition hover:border-foreground/18 hover:bg-foreground/[.05] hover:text-foreground dark:hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 px-4 pb-2.5 pt-1">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-6",
                  message.isUser
                    ? "ml-auto rounded-br-md bg-sidebar-primary text-white shadow-[0_8px_24px_rgba(59,130,246,.18)]"
                    : "mr-auto rounded-bl-md border border-foreground/[.08] bg-foreground/[.035] text-muted-foreground dark:text-neutral-300"
                )}
              >
                {message.content}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-foreground/[.08] bg-foreground/[.035] px-3.5 py-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sidebar-primary/70" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sidebar-primary/50 [animation-delay:140ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sidebar-primary/30 [animation-delay:280ms]" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isFloat && (
          <motion.button
            key="scrim"
            type="button"
            aria-label="Dismiss intelligence desk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.18 }}
            onClick={() => onModeChange("compact")}
            className="fixed inset-0 z-[75] bg-chrome-overlay/45"
          />
        )}
      </AnimatePresence>

      {!isPinned && isFloat && (
        <div className={centerClass}>
          <AnimatePresence initial={false}>
              <motion.div
                key="float-panel"
                layoutId="desk-shell"
                transition={spring}
                role="dialog"
                aria-modal="true"
                aria-label="Intelligence desk"
                className="relative flex max-h-[min(64vh,560px)] w-full origin-bottom flex-col overflow-hidden rounded-[24px] border border-foreground/[.12] bg-chrome-deep/96 shadow-[0_24px_60px_rgba(15,23,42,.12)] dark:shadow-[0_28px_90px_rgba(0,0,0,.58)] backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-foreground/22 to-transparent" />

                <div className="relative flex shrink-0 items-center justify-between gap-3 px-4 pb-2 pt-3.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <motion.span
                      layoutId="desk-mark"
                      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15 ring-1 ring-sidebar-primary/30"
                    >
                      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.9)]" />
                      <Sparkles className="h-3.5 w-3.5 text-sidebar-primary" />
                    </motion.span>
                    <div className="min-w-0">
                      <motion.p layoutId="desk-title" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-neutral-500">
                        Intelligence desk
                      </motion.p>
                      <h3 className="text-[15px] font-semibold tracking-tight text-foreground dark:text-white">Daily briefing</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onModeChange("pinned")}
                      aria-label="Pin desk to the right"
                      title="Pin for long chat"
                      className="hidden h-8 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium text-muted-foreground dark:text-neutral-400 ring-1 ring-foreground/[.08] transition hover:border-sidebar-primary/30 hover:bg-sidebar-primary/10 hover:text-sidebar-primary lg:inline-flex"
                    >
                      <Pin className="h-3.5 w-3.5" />
                      Pin
                    </button>
                    <button type="button" onClick={() => onModeChange("compact")} aria-label="Minimize intelligence desk" className={iconBtn}>
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative shrink-0 px-4">
                  {contextChip}
                  {briefing}
                </div>
                <div className="mt-2 flex min-h-0 flex-1 flex-col">{thread}</div>
                <div className="relative shrink-0 p-3 pt-1">{composer}</div>
              </motion.div>
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {isPinned && (
          <motion.aside
            key="pinned-panel"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: 16 }}
            transition={spring}
            aria-label="Pinned intelligence desk"
            className="fixed inset-y-3 end-3 z-[70] hidden w-[min(360px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[20px] border border-foreground/[.09] bg-chrome/94 shadow-[0_20px_50px_rgba(15,23,42,.10)] dark:shadow-[0_24px_70px_rgba(0,0,0,.42)] backdrop-blur-xl lg:flex"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_18%_0%,rgba(35,145,255,.11),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/18 to-transparent" />

            <div className="relative flex shrink-0 items-center justify-between gap-3 border-b border-foreground/[.07] px-3.5 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary/15 ring-1 ring-sidebar-primary/25">
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.9)]" />
                  <PanelRight className="h-3.5 w-3.5 text-sidebar-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400/90">Pinned desk</p>
                  <h3 className="truncate text-[14px] font-semibold tracking-tight text-foreground dark:text-white">Continue the chat</h3>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onModeChange("float")}
                  aria-label="Unpin to floating desk"
                  title="Unpin"
                  className={cn(iconBtn, "rounded-lg hover:text-sidebar-primary")}
                >
                  <PinOff className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => onModeChange("compact")} aria-label="Close pinned desk" className={cn(iconBtn, "rounded-lg")}>
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative shrink-0 px-3 pt-3">
              {contextChip}
              {briefing}
            </div>
            <div className="mt-2 flex min-h-0 flex-1 flex-col">{thread}</div>
            <div className="relative shrink-0 border-t border-foreground/[.07] bg-black/10 p-3">{composer}</div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
