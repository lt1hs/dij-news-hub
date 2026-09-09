import { Headphones, Pause, Play, Radio } from "lucide-react";
import { useState } from "react";
import ViewShell from "./ViewShell";
import { cn } from "@/lib/utils";

const EPISODES = [
  {
    id: "ep-1",
    title: "Morning intelligence · Markets & policy",
    duration: "8:40",
    meta: "Daily brief · Updated 19m ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  {
    id: "ep-2",
    title: "Tech desk: earnings and infrastructure",
    duration: "12:05",
    meta: "Deep dive · Today",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
  },
  {
    id: "ep-3",
    title: "Climate signal: storage and grid",
    duration: "9:18",
    meta: "Tracker audio · Yesterday",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
  },
  {
    id: "ep-4",
    title: "Source compare: inflation coverage",
    duration: "6:52",
    meta: "Desk clip · 2d ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

interface AudioLibraryViewProps {
  onPlayEpisode?: (id: string) => void;
}

export default function AudioLibraryView({ onPlayEpisode }: AudioLibraryViewProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggle = (id: string) => {
    const next = playingId === id ? null : id;
    setPlayingId(next);
    if (next) onPlayEpisode?.(id);
  };

  return (
    <ViewShell
      eyebrow="Listen"
      title="Audio & podcasts"
      description="Daily briefs, tracker deep dives, and desk clips you can play while reading the feed."
      wide
      actions={
        <span className="flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.03] px-3 py-1.5 text-[11px] text-neutral-400">
          <Radio size={12} className="text-sidebar-primary" /> Live desk audio
        </span>
      }
    >
      <section className="mb-8 overflow-hidden rounded-2xl border border-white/[.09] bg-[#0a121d]/80">
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_20%_0%,rgba(35,145,255,.14),transparent_60%)]" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">Featured briefing</p>
            <h2 className="relative mt-3 text-2xl font-semibold tracking-tight text-white">Morning intelligence stream</h2>
            <p className="relative mt-3 max-w-lg text-sm leading-6 text-neutral-400">
              A condensed audio pass over markets, tech earnings, and the policy signals shaping today’s desk.
            </p>
            <button
              onClick={() => toggle("ep-1")}
              className="relative mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
            >
              {playingId === "ep-1" ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="ml-0.5" />}
              {playingId === "ep-1" ? "Pause brief" : "Play brief"}
            </button>
          </div>
          <div className="min-h-[200px] border-t border-white/[.07] md:border-l md:border-t-0">
            <img src={EPISODES[0].image} alt="" className="h-full w-full object-cover opacity-80" />
          </div>
        </div>
      </section>

      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Library</h2>
          <p className="mt-1 text-xs text-neutral-500">Briefs and podcast-style desk episodes</p>
        </div>
        <Headphones size={16} className="text-neutral-600" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {EPISODES.map((episode) => {
          const active = playingId === episode.id;
          return (
            <button
              key={episode.id}
              type="button"
              onClick={() => toggle(episode.id)}
              className={cn(
                "flex gap-3 rounded-xl border p-3 text-left transition",
                active
                  ? "border-sidebar-primary/30 bg-sidebar-primary/[.08]"
                  : "border-white/[.08] bg-[#0b121c]/55 hover:border-white/[.14] hover:bg-white/[.03]"
              )}
            >
              <img src={episode.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1 py-0.5">
                <p className="line-clamp-2 text-sm font-semibold text-white">{episode.title}</p>
                <p className="mt-1 text-[11px] text-neutral-500">{episode.meta}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{episode.duration}</span>
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", active ? "bg-white text-neutral-950" : "bg-white/10 text-white")}>
                    {active ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </ViewShell>
  );
}
