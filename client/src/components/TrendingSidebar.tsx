import { ArrowRight, ArrowUpRight, Clock3, MoreHorizontal } from "lucide-react";

const TRENDS = [
  { topic: "Quantum computing", section: "Technology", volume: "142K", change: "+12%" },
  { topic: "Global rate outlook", section: "Markets", volume: "89K", change: "+5%" },
  { topic: "Solid-state batteries", section: "Energy", volume: "67K", change: "+22%" },
  { topic: "Supply-chain policy", section: "Business", volume: "45K", change: "+2%" },
  { topic: "Brain-computer interfaces", section: "Science", volume: "31K", change: "+18%" },
];

export default function TrendingSidebar() {
  return (
    <aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block">
      <section className="overflow-hidden rounded-xl border border-foreground/[.08] bg-chrome/55">
        <header className="flex items-center justify-between border-b border-foreground/[.08] px-4 py-3.5">
          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-white">Trending</h3>
            <p className="mt-0.5 text-[10px] text-muted-foreground/80 dark:text-neutral-600">Most discussed in the last 24 hours</p>
          </div>
          <button aria-label="Trending options" className="text-muted-foreground/80 dark:text-neutral-600 transition hover:text-foreground dark:hover:text-white"><MoreHorizontal size={17} /></button>
        </header>

        <ol>
          {TRENDS.map((trend, index) => (
            <li key={trend.topic}>
              <button className="group grid w-full grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-2.5 border-b border-foreground/[.06] px-4 py-3.5 text-left transition-colors last:border-0 hover:bg-foreground/[.025]">
                <span className="pt-0.5 text-xs tabular-nums text-neutral-700">{index + 1}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-foreground/90 dark:text-neutral-200 transition-colors group-hover:text-foreground dark:group-hover:text-white">{trend.topic}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground/80 dark:text-neutral-600">{trend.section} · {trend.volume} mentions</span>
                </span>
                <span className="pt-0.5 text-[10px] font-medium text-emerald-400">{trend.change}</span>
              </button>
            </li>
          ))}
        </ol>

        <button className="flex w-full items-center justify-between border-t border-foreground/[.08] px-4 py-3 text-[11px] font-medium text-muted-foreground dark:text-neutral-400 transition hover:bg-foreground/[.025] hover:text-foreground dark:hover:text-white">
          See all trends <ArrowRight size={13} />
        </button>
      </section>

      <section className="mt-5 border-t border-foreground/[.1] pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground dark:text-neutral-500">Market snapshot</h3>
          <span className="flex items-center gap-1 text-[9px] text-muted-foreground/80 dark:text-neutral-600"><Clock3 size={10} />Live</span>
        </div>
        <div className="divide-y divide-foreground/[.06]">
          <div className="flex items-center justify-between py-2.5"><div><p className="text-xs text-muted-foreground dark:text-neutral-300">Sentiment index</p><p className="mt-0.5 text-[9px] text-muted-foreground/80 dark:text-neutral-600">Global coverage</p></div><span className="text-sm font-semibold tabular-nums text-emerald-400">84.2</span></div>
          <div className="flex items-center justify-between py-2.5"><div><p className="text-xs text-muted-foreground dark:text-neutral-300">Volatility</p><p className="mt-0.5 text-[9px] text-muted-foreground/80 dark:text-neutral-600">24-hour average</p></div><span className="text-sm font-semibold tabular-nums text-amber-400">12.4%</span></div>
        </div>
        <button className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground dark:text-neutral-500 transition hover:text-foreground dark:hover:text-white">View market data <ArrowUpRight size={12} /></button>
      </section>
    </aside>
  );
}
