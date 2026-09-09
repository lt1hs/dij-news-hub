import { ArrowDown, ArrowUp } from "lucide-react";
import type { Article } from "@shared/schema";

interface HeadlinesViewProps {
  articles: Article[];
  onOpen: (article: Article) => void;
}

export default function HeadlinesView({ articles, onOpen }: HeadlinesViewProps) {
  const ranked = articles.slice(0, 6);

  return (
    <div className="mx-auto max-w-[980px] px-4 pb-32 pt-24 sm:px-6">
      <header className="border-b border-white/[.09] pb-8">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">Live briefing</p>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">Headlines</h1>
        <h2 className="mt-8 text-sm font-semibold text-neutral-100">At a glance</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-7 text-neutral-400">
          AI agents, infrastructure spending and new model releases are driving today’s coverage. The strongest signals are moving from demos toward practical products, while safety and compute costs remain the central pressure points.
        </p>
      </header>

      <section aria-label="Ranked headlines" className="divide-y divide-white/[.08]">
        {ranked.map((article, index) => {
          const rising = index !== 1 && index !== 4;
          return (
            <button
              key={article.id}
              onClick={() => onOpen(article)}
              className="group grid w-full grid-cols-[42px_minmax(0,1fr)_96px] gap-3 py-6 text-left sm:grid-cols-[52px_minmax(0,1fr)_124px] sm:gap-5"
            >
              <div className="pt-0.5 text-center">
                <span className="block text-2xl font-medium tabular-nums text-neutral-200">{index + 1}</span>
                <span className={rising ? "mt-1 inline-flex items-center gap-0.5 text-[10px] text-emerald-400" : "mt-1 inline-flex items-center gap-0.5 text-[10px] text-rose-400"}>
                  {rising ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{(index % 3) + 1}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-[17px] font-medium leading-6 text-neutral-100 transition-colors group-hover:text-sky-300 sm:text-xl sm:leading-7">{article.title}</h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-neutral-500">
                  <span>{article.sources?.length || index + 4} sources</span>
                  <span aria-hidden="true">·</span>
                  <span>{index + 1}h ago</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/[.08] bg-white/[.03]">
                {article.imageUrl ? <img src={article.imageUrl} alt="" className="h-[72px] w-full object-cover sm:h-[86px]" /> : <div className="h-[72px] sm:h-[86px]" />}
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
