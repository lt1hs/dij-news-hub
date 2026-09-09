import { Bell, CheckCheck, Radio, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import ViewShell from "./ViewShell";
import { cn } from "@/lib/utils";

const INITIAL = [
  {
    id: "1",
    type: "alert",
    title: "AI in Everyday Life moved",
    body: "3 new stories matched your tracker in the last hour.",
    time: "12m ago",
    unread: true,
  },
  {
    id: "2",
    type: "brief",
    title: "Evening brief is ready",
    body: "Policy and infrastructure are today’s quieter through-line.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    type: "signal",
    title: "Signal spike: solid-state batteries",
    body: "Coverage volume up 22% versus yesterday’s baseline.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    type: "desk",
    title: "Desk suggestion",
    body: "You asked about inflation twice — pin a watchlist?",
    time: "Yesterday",
    unread: false,
  },
];

const iconFor = {
  alert: Radio,
  brief: Sparkles,
  signal: TrendingUp,
  desk: Bell,
} as const;

interface NotificationsViewProps {
  onOpenDesk?: () => void;
  onOpenTracking?: () => void;
}

export default function NotificationsView({ onOpenDesk, onOpenTracking }: NotificationsViewProps) {
  const [items, setItems] = useState(INITIAL);

  const markAll = () => setItems((prev) => prev.map((item) => ({ ...item, unread: false })));

  return (
    <ViewShell
      eyebrow="Inbox"
      title="Notifications"
      description="Tracker moves, briefs, and desk suggestions in one place."
      actions={
        <button
          onClick={markAll}
          className="flex h-9 items-center gap-2 rounded-lg border border-foreground/[.08] bg-foreground/[.03] px-3 text-xs text-muted-foreground dark:text-neutral-300 transition hover:text-foreground dark:hover:text-white"
        >
          <CheckCheck size={14} /> Mark all read
        </button>
      }
    >
      <div className="overflow-hidden rounded-xl border border-foreground/[.08] bg-chrome/55 divide-y divide-foreground/[.08]">
        {items.map((item) => {
          const Icon = iconFor[item.type as keyof typeof iconFor] || Bell;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setItems((prev) => prev.map((row) => (row.id === item.id ? { ...row, unread: false } : row)));
                if (item.type === "desk" || item.type === "brief") onOpenDesk?.();
                if (item.type === "alert") onOpenTracking?.();
              }}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-foreground/[.03] sm:px-5",
                item.unread && "bg-sidebar-primary/[.04]"
              )}
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-foreground/[.08] bg-foreground/[.03] text-sidebar-primary">
                <Icon size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-foreground dark:text-white">{item.title}</span>
                  {item.unread && <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary" />}
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-muted-foreground dark:text-neutral-500">{item.body}</span>
                <span className="mt-2 block text-[11px] text-muted-foreground/80 dark:text-neutral-600">{item.time}</span>
              </span>
            </button>
          );
        })}
      </div>
    </ViewShell>
  );
}
