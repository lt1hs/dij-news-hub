"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageCircle, BarChart3, Users, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const tabItems = [
  { label: "Summary", icon: FileText },
  { label: "Analysis", icon: BarChart3 },
  { label: "Comments", icon: MessageCircle },
  { label: "Related", icon: ExternalLink },
];

const MOBILE_LABEL_WIDTH = 60;

type NewsCardTabsProps = {
  className?: string;
  defaultIndex?: number;
  onTabChange?: (index: number) => void;
};

export function NewsCardTabs({
  className,
  defaultIndex = 0,
  onTabChange,
}: NewsCardTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (idx: number) => {
    setActiveIndex(idx);
    onTabChange?.(idx);
  };

  return (
    <motion.nav
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "bg-black/20 border border-white/10 rounded-full flex items-center p-1 shadow-lg space-x-1 w-full h-[40px]",
        className,
      )}
    >
      {tabItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center gap-0 px-2 py-1.5 rounded-full transition-colors duration-200 relative h-8 min-w-[32px] flex-1",
              isActive
                ? "bg-primary/20 text-primary gap-1.5"
                : "bg-transparent text-muted-foreground hover:bg-white/10",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => handleTabClick(idx)}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={16}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200 flex-shrink-0"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "4px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="overflow-hidden flex items-center"
            >
              <span
                className={cn(
                  "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis",
                  isActive ? "text-primary" : "opacity-0",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
