import { Bookmark, Headphones, Sparkles, Trash2 } from "lucide-react";
import ViewShell from "./ViewShell";
import { useSavedArticles } from "@/hooks/useSavedArticles";
import type { SavedArticle } from "@/hooks/useSavedArticles";

interface SavedViewProps {
  onOpen?: (article: SavedArticle) => void;
  onAsk?: (article: SavedArticle) => void;
  onPlay?: (article: SavedArticle) => void;
}

export default function SavedView({ onOpen, onAsk, onPlay }: SavedViewProps) {
  const { saved, remove } = useSavedArticles();

  return (
    <ViewShell
      eyebrow="Library"
      title="Saved"
      description="Stories you bookmarked for later reading, briefing, or audio."
      actions={
        <span className="rounded-full border border-white/[.08] bg-white/[.03] px-3 py-1.5 text-[11px] text-neutral-400">
          {saved.length} saved
        </span>
      }
    >
      {saved.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[.1] bg-white/[.02] px-6 py-16 text-center">
          <Bookmark className="mx-auto h-8 w-8 text-neutral-600" />
          <h2 className="mt-4 text-lg font-semibold text-white">Nothing saved yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            Bookmark stories from the feed to build a personal reading queue. They’ll appear here across sessions.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0b121c]/55 divide-y divide-white/[.08]">
          {saved.map((article) => (
            <article key={article.id} className="grid grid-cols-[minmax(0,1fr)_96px] gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_140px] sm:p-5">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2 text-[11px] text-neutral-500">
                  <span className="text-sidebar-primary">{article.category}</span>
                  <span>·</span>
                  <span>Saved {new Date(article.savedAt).toLocaleDateString()}</span>
                </div>
                <button onClick={() => onOpen?.(article)} className="text-left">
                  <h3 className="text-[17px] font-semibold leading-6 text-neutral-100 transition hover:text-white">{article.title}</h3>
                </button>
                <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-neutral-500">{article.summary}</p>
                <div className="mt-3 flex items-center gap-1">
                  <button onClick={() => onAsk?.(article)} className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[11px] text-neutral-400 transition hover:bg-white/[.05] hover:text-white">
                    <Sparkles size={13} /> Ask desk
                  </button>
                  <button onClick={() => onPlay?.(article)} className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[11px] text-neutral-400 transition hover:bg-white/[.05] hover:text-white">
                    <Headphones size={13} /> Listen
                  </button>
                  <button onClick={() => remove(article.id)} className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[11px] text-neutral-500 transition hover:bg-white/[.05] hover:text-rose-300">
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/[.08] bg-white/[.03]">
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt="" className="h-full min-h-[88px] w-full object-cover" />
                ) : (
                  <div className="min-h-[88px]" />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </ViewShell>
  );
}
