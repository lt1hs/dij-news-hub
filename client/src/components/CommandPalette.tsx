import { useEffect, useMemo, useState } from "react";
import { Command, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  group: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
}

export default function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => `${item.label} ${item.hint || ""} ${item.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Enter" && filtered[active]) {
        event.preventDefault();
        filtered[active].onSelect();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close command palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-chrome-overlay/55 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
            className="fixed left-1/2 top-[18%] z-[95] w-[min(560px,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-foreground/[.12] bg-chrome-deep/96 shadow-[0_24px_60px_rgba(15,23,42,.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,.55)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-foreground/[.08] px-4 py-3">
              <Search size={16} className="text-muted-foreground dark:text-neutral-500" />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a view, open the desk, search stories…"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground dark:text-white outline-none placeholder:text-muted-foreground"
              />
              <span className="hidden items-center gap-1 rounded border border-foreground/10 bg-black/30 px-1.5 py-0.5 text-[10px] text-muted-foreground dark:text-neutral-500 sm:flex">
                <Command size={10} />K
              </span>
            </div>
            <div className="max-h-[360px] overflow-y-auto p-2 custom-scrollbar">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground dark:text-neutral-500">No matches</p>
              ) : (
                filtered.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => {
                      item.onSelect();
                      onClose();
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition",
                      index === active ? "bg-foreground/[.06] text-foreground dark:text-white" : "text-muted-foreground dark:text-neutral-400 hover:bg-foreground/[.03]"
                    )}
                  >
                    <span>
                      <span className="block text-sm font-medium">{item.label}</span>
                      {item.hint && <span className="mt-0.5 block text-[11px] text-muted-foreground/80 dark:text-neutral-600">{item.hint}</span>}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 dark:text-neutral-600">{item.group}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
