import { useState } from "react";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Top stories", "Technology", "Business", "Energy", "Policy", "World", "Science", "Health"];

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState("Top stories");

  return (
    <nav aria-label="News categories" className="my-6 border-y border-foreground/[.08]">
      <div className="flex h-14 items-center gap-3">
        <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[.16em] text-muted-foreground dark:text-neutral-500 sm:block">Topics</span>
        <ChevronRight size={14} className="hidden shrink-0 text-muted-foreground sm:block" />

        <div className="no-scrollbar flex min-w-0 flex-1 self-stretch overflow-x-auto">
          {CATEGORIES.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative flex shrink-0 items-center px-3 text-[13px] font-medium transition-colors sm:px-4",
                  active ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-neutral-500 hover:text-foreground/90 dark:hover:text-neutral-200"
                )}
              >
                <span className="relative z-10">{category}</span>
                {active && (
                  <motion.span
                    layoutId="active-category"
                    className="absolute inset-x-3 bottom-0 h-0.5 bg-sidebar-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button aria-label="Filter stories" className="flex h-9 shrink-0 items-center gap-2 border-l border-foreground/[.08] pl-3 text-xs font-medium text-muted-foreground dark:text-neutral-500 transition hover:text-foreground dark:hover:text-white">
          <SlidersHorizontal size={14} /><span className="hidden sm:inline">Filter</span>
        </button>
      </div>
    </nav>
  );
}
