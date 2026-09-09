import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  Pause,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIGNALS = [
  "Chip expansion is moving into construction.",
  "Markets are pushing rate cuts further out.",
  "Storage leads today’s energy momentum.",
];

const TRENDS = [
  { topic: "Quantum computing", volume: "142K", change: "+12%" },
  { topic: "Global rate outlook", volume: "89K", change: "+5%" },
  { topic: "Solid-state batteries", volume: "67K", change: "+22%" },
];

interface IntelligenceSidebarProps {
  className?: string;
  mobile?: boolean;
}

export default function IntelligenceSidebar({ className, mobile = false }: IntelligenceSidebarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <aside className={cn(!mobile && "lg:sticky lg:top-24", className)} aria-label="Daily intelligence">
      <div className="overflow-hidden rounded-xl border border-white/[.09] bg-[#0a121d]/80 shadow-[0_24px_60px_rgba(0,0,0,.18)] backdrop-blur-xl">
        <section className="relative p-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_20%_0%,rgba(35,145,255,.13),transparent_62%)]" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-sky-400">
                  <Sparkles size={13} /> Daily intelligence
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.02em] text-white">Morning brief</h3>
              </div>
              <span className="flex items-center gap-1.5 text-[9px] text-neutral-600"><Clock3 size={11} />08:30 UTC</span>
            </div>

            <p className="mt-3 text-[12px] leading-5 text-neutral-400">
              Technology investment leads today’s agenda as companies commit capital and markets reassess the speed of rate cuts.
            </p>

            <ol className="mt-4 space-y-2 border-l border-white/[.09] pl-4">
              {SIGNALS.map((signal, index) => (
                <li key={signal} className="relative text-xs leading-5 text-neutral-300">
                  <span className="absolute -left-[21px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#0a121d] text-[8px] font-semibold text-sky-400">{index + 1}</span>
                  {signal}
                </li>
              ))}
            </ol>

            <div className="mt-4 flex items-center justify-between border-t border-white/[.07] pt-3 text-[9px] text-neutral-600">
              <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" />Generated from 42 trusted sources</span>
              <button className="text-neutral-400 transition hover:text-white">Open brief</button>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.08] bg-white/[.018] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-neutral-500"><Headphones size={13} />Today’s briefing</p>
              <h4 className="mt-2 text-[15px] font-semibold text-neutral-100">AI, markets and energy</h4>
              <p className="mt-1 text-[10px] text-neutral-600">4:36 · Generated from 8 stories</p>
            </div>
            <button aria-label="Save daily briefing" className="text-neutral-600 transition hover:text-white"><Bookmark size={16} /></button>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => setIsPlaying((playing) => !playing)}
              aria-label={isPlaying ? "Pause daily briefing" : "Play daily briefing"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-slate-950 shadow-[0_0_28px_rgba(14,165,233,.22)] transition hover:bg-sky-400"
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex h-7 items-center gap-[3px] overflow-hidden">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    className={cn("w-[2px] shrink-0 rounded-full bg-white/15", isPlaying && "animate-pulse bg-sky-400/70")}
                    style={{ height: `${8 + ((index * 7) % 18)}px`, animationDelay: `${index * 45}ms` }}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[9px] tabular-nums text-neutral-600"><span>{isPlaying ? "00:18" : "00:00"}</span><span>04:36</span></div>
            </div>
          </div>

          <button onClick={() => setShowTranscript((shown) => !shown)} className="mt-4 flex items-center gap-1 text-[10px] font-medium text-neutral-500 transition hover:text-white">
            Transcript <ChevronDown size={12} className={cn("transition-transform", showTranscript && "rotate-180")} />
          </button>
          {showTranscript && <p className="mt-3 border-l border-sky-400/30 pl-3 text-[11px] leading-5 text-neutral-500">Today’s top signal comes from semiconductor investment, where planned capacity is beginning to turn into physical infrastructure...</p>}
        </section>

        <section className="border-t border-white/[.08] px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="flex items-center gap-2 text-xs font-semibold text-neutral-200"><TrendingUp size={13} className="text-emerald-400" />Momentum</h4>
              <p className="mt-1 text-[9px] text-neutral-600">Fastest-moving topics · 24h</p>
            </div>
            <button className="text-[10px] text-neutral-500 transition hover:text-white">All trends</button>
          </div>
          <ol className="mt-3 divide-y divide-white/[.06]">
            {TRENDS.map((trend, index) => (
              <li key={trend.topic} className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-2 py-2.5">
                <span className="text-[10px] tabular-nums text-neutral-700">0{index + 1}</span>
                <div className="min-w-0"><p className="truncate text-[11px] font-medium text-neutral-300">{trend.topic}</p><p className="mt-0.5 text-[9px] text-neutral-700">{trend.volume} mentions</p></div>
                <span className="text-[9px] font-medium text-emerald-400">{trend.change}</span>
              </li>
            ))}
          </ol>
          <button className="mt-1 flex w-full items-center justify-between border-t border-white/[.06] pt-3 text-[10px] text-neutral-500 transition hover:text-white">Explore intelligence <ArrowRight size={12} /></button>
        </section>
      </div>
    </aside>
  );
}
