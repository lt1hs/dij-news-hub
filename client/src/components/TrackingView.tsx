import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Bot, Check, ChevronRight, Clock3, Edit3, Globe2, Headphones, Plus, Radio, Rss, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TRACKERS = [
  {
    id: "everyday-ai",
    title: "AI in Everyday Life",
    description: "Consumer AI features that shipped: assistants, creation tools, smart home, pricing, and policy.",
    updates: 12,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1000&h=600&fit=crop",
  },
  {
    id: "climate-tech",
    title: "Climate Technology",
    description: "Energy storage, grid modernization, carbon markets, and industrial decarbonization.",
    updates: 7,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&h=600&fit=crop",
  },
  {
    id: "global-markets",
    title: "Global Markets",
    description: "Central banks, rates, currencies, commodities, and the companies moving major indices.",
    updates: 5,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&h=600&fit=crop",
  },
];

const TRACKED_STORIES = [
  { title: "Gemini brings custom audio tools to Android", sources: "4 sources", time: "3h ago", image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&h=200&fit=crop" },
  { title: "Consumer AI assistants move from demos to daily workflows", sources: "18 sources", time: "8h ago", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop" },
  { title: "Smart-home platforms agree on expanded interoperability", sources: "11 sources", time: "14h ago", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300&h=200&fit=crop" },
  { title: "Wearable AI devices face a more practical second generation", sources: "6 sources", time: "1d ago", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop" },
];

export default function TrackingView() {
  const [selectedTracker, setSelectedTracker] = useState<(typeof TRACKERS)[number] | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedTracker]);

  return (
    <AnimatePresence mode="wait">
      {selectedTracker ? (
        <motion.div key="detail" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="mx-auto max-w-[980px] px-4 pb-32 pt-14 sm:px-6 lg:px-8">
          <button onClick={() => setSelectedTracker(null)} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground dark:text-neutral-400 transition hover:text-foreground dark:hover:text-white"><ArrowLeft size={16} />Back to tracking</button>

          <section className="border-b border-foreground/[.08] pb-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground dark:text-neutral-500"><span>Tracker</span><span>·</span><span>Updated 18 min ago</span></div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground dark:text-white sm:text-4xl">{selectedTracker.title}</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground dark:text-neutral-400">{selectedTracker.description}</p>
                <p className="mt-3 text-xs text-muted-foreground/80 dark:text-neutral-600">Created by DIJAI · 3.0K tracking</p>
              </div>
              <div className="flex gap-2">
                <button className="flex h-10 items-center gap-2 rounded-lg border border-sidebar-primary/25 bg-sidebar-primary/10 px-4 text-xs font-semibold text-sidebar-primary"><Check size={14} />Tracking</button>
                <button aria-label="Edit tracker" className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/[.08] text-muted-foreground dark:text-neutral-400"><Edit3 size={15} /></button>
                <button aria-label="Share tracker" className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/[.08] text-muted-foreground dark:text-neutral-400"><Share2 size={15} /></button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[Bot, Radio, Rss, Globe2].map((Icon, index) => <span key={index} className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/[.08] bg-foreground/[.025] text-muted-foreground dark:text-neutral-400"><Icon size={15} /></span>)}
            </div>
          </section>

          <section className="pt-7">
            <div className="mb-5 flex items-end justify-between"><div><h2 className="text-xl font-semibold text-foreground dark:text-white">Stories <span className="font-normal text-muted-foreground/80 dark:text-neutral-600">(220)</span></h2><p className="mt-1 text-xs text-muted-foreground dark:text-neutral-500">Latest coverage matching this tracker</p></div><button className="text-xs text-muted-foreground dark:text-neutral-500">Newest first</button></div>
            <div className="divide-y divide-foreground/[.08] border-y border-foreground/[.08]">
              {TRACKED_STORIES.map((story) => (
                <button key={story.title} className="grid w-full grid-cols-[minmax(0,1fr)_104px] gap-5 py-5 text-left transition hover:bg-foreground/[.018] sm:grid-cols-[minmax(0,1fr)_132px]">
                  <div><h3 className="text-lg font-medium leading-7 text-foreground dark:text-neutral-100">{story.title}</h3><p className="mt-3 text-xs text-muted-foreground dark:text-neutral-500">{story.sources} · {story.time}</p></div>
                  <img src={story.image} alt="" className="h-20 w-full rounded-lg object-cover sm:h-24" />
                </button>
              ))}
            </div>
          </section>
        </motion.div>
      ) : (
        <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-[1080px] px-4 pb-32 pt-14 sm:px-6 lg:px-8">
          <header className="mb-8 flex flex-col justify-between gap-4 border-b border-foreground/[.08] pb-6 sm:flex-row sm:items-end">
            <div><p className="text-xs font-medium text-sidebar-primary">12 new stories</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground dark:text-white">Your tracking</h1><p className="mt-2 text-sm text-muted-foreground dark:text-neutral-500">One tracker was updated since your last visit.</p></div>
            <button className="flex h-10 items-center gap-2 self-start rounded-lg bg-foreground px-4 text-xs font-semibold text-background dark:bg-white dark:text-neutral-950"><Plus size={15} />New tracker</button>
          </header>

          <section className="relative mb-8 overflow-hidden rounded-xl border border-foreground/[.08] bg-foreground/[.025] p-6 sm:p-8">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-sidebar-primary/[.07] to-transparent" />
            <div className="relative max-w-2xl"><div className="mb-8 flex items-center justify-between text-xs text-muted-foreground dark:text-neutral-500"><span>Wednesday, September 9</span><span className="flex items-center gap-1.5"><Clock3 size={12} />Updated 19 min ago</span></div><p className="text-sm font-semibold text-muted-foreground dark:text-neutral-400">Your Daily Brief</p><h2 className="mt-3 text-2xl font-medium leading-9 text-foreground dark:text-white">Markets adjust to new trade restrictions while technology investment remains resilient.</h2><p className="mt-4 text-xs text-muted-foreground dark:text-neutral-500">19 min read · selected from 267 sources</p></div>
          </section>

          <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-foreground dark:text-white">Trackers</h2><button className="flex items-center gap-1 text-xs text-muted-foreground dark:text-neutral-500">View all <ChevronRight size={13} /></button></div>
          <div className="grid gap-4 md:grid-cols-3">
            {TRACKERS.map((tracker) => (
              <button key={tracker.id} onClick={() => setSelectedTracker(tracker)} className="group overflow-hidden rounded-xl border border-foreground/[.08] bg-chrome/60 text-left transition hover:-translate-y-0.5 hover:border-foreground/[.16]">
                <img src={tracker.image} alt="" className="h-36 w-full object-cover opacity-80 transition group-hover:opacity-100" />
                <div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold text-foreground dark:text-white">{tracker.title}</h3><ArrowRight size={15} className="mt-1 text-muted-foreground/80 dark:text-neutral-600 transition group-hover:translate-x-1 group-hover:text-foreground dark:group-hover:text-white" /></div><p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground dark:text-neutral-500">{tracker.description}</p><p className="mt-5 text-[11px] font-medium text-sidebar-primary">{tracker.updates} updates today</p></div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
