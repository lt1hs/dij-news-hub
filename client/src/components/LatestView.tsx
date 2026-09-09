import { Clock3 } from "lucide-react";
import type { Article } from "@shared/schema";
import ViewShell from "./ViewShell";

interface LatestViewProps {
  articles: Article[];
  onOpen: (article: Article) => void;
}

export default function LatestView({ articles, onOpen }: LatestViewProps) {
  const sorted = [...articles].sort((a, b) => {
    const aTime = new Date(a.publishedAt?.toString() || 0).getTime();
    const bTime = new Date(b.publishedAt?.toString() || 0).getTime();
    return bTime - aTime;
  });

  return (
    <ViewShell
      eyebrow="Chronological"
      title="Latest"
      description="Newest reporting first — no ranking, just the freshest wires."
    >
      <div className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0b121c]/55 divide-y divide-white/[.08]">
        {sorted.map((article, index) => (
          <button
            key={article.id}
            type="button"
            onClick={() => onOpen(article)}
            className="grid w-full grid-cols-[56px_minmax(0,1fr)_96px] gap-3 p-4 text-left transition hover:bg-white/[.025] sm:grid-cols-[72px_minmax(0,1fr)_132px] sm:gap-5 sm:p-5"
          >
            <div className="pt-1 text-[11px] tabular-nums text-neutral-600">
              <Clock3 size={12} className="mb-1 text-neutral-600" />
              {index < 3 ? `${index + 1}h` : `${index + 2}h`}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-sidebar-primary">{article.category}</p>
              <h3 className="mt-1 text-[16px] font-semibold leading-6 text-neutral-100 sm:text-[17px]">{article.title}</h3>
              <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-neutral-500">{article.summary}</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/[.08] bg-white/[.03]">
              {article.imageUrl ? <img src={article.imageUrl} alt="" className="h-[72px] w-full object-cover sm:h-[86px]" /> : <div className="h-[72px] sm:h-[86px]" />}
            </div>
          </button>
        ))}
      </div>
    </ViewShell>
  );
}
