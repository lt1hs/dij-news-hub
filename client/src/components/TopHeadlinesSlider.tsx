import { useState, useEffect } from "react";
import {
  TrendingUp,
  Clock,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Cpu,
  Banknote,
  Droplets,
  Scale,
  Activity,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Headline {
  id: string;
  title: string;
  source: string;
  category: string;
  timeAgo: string;
  image: string;
  description: string;
  impact: "high" | "medium" | "low";
}

const HEADLINES: Headline[] = [
  {
    id: "1",
    title: "Quantum Supremacy: Google's Sycamore Processor Crosses New Stability Threshold",
    source: "QuantumWire",
    category: "Tech",
    timeAgo: "14m ago",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop",
    description: "The latest benchmark confirms a 10x reduction in error rates for complex gate operations, marking a pivotal step toward error-corrected quantum computation.",
    impact: "high"
  },
  {
    id: "2",
    title: "Global Supply Chain Reconfiguration: The Rise of 'Friend-Shoring' in 2024",
    source: "Global Trade Hub",
    category: "Economy",
    timeAgo: "1h ago",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop",
    description: "New economic reports indicate a massive shift in manufacturing centers as corporations prioritize geopolitical stability over immediate cost efficiency.",
    impact: "medium"
  },
  {
    id: "3",
    title: "Next-Gen Solid State Batteries Enter Pilot Production phase in Japan",
    source: "EnergyDigest",
    category: "Energy",
    timeAgo: "2h ago",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=600&fit=crop",
    description: "With double the energy density of traditional lithium-ion, these solid-state cells promise 1000km range for EVs with 10-minute charging cycles.",
    impact: "high"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'tech': return <Cpu className="h-3 w-3" />;
    case 'economy': return <Banknote className="h-3 w-3" />;
    case 'energy': return <Droplets className="h-3 w-3" />;
    case 'policy': return <Scale className="h-3 w-3" />;
    default: return <Activity className="h-3 w-3" />;
  }
};

export default function TopHeadlinesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const activeStory = HEADLINES[activeIndex];

  return (
    <div
      className="relative w-full rounded-[15px] border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[400px] flex group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Layer (Animated Image) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeStory.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 w-full flex h-full">

        {/* Left Section: Active Detail (65%) */}
        <div className="w-[65%] flex flex-col justify-between p-8">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-sidebar-primary/20 border border-sidebar-primary/30 text-sidebar-primary text-[10px] font-bold uppercase tracking-widest">
              <TrendingUp size={12} />
              Featured Intelligence
            </div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
              Real-time update
            </span>
          </motion.div>

          {/* Main Story Info */}
          <div className="max-w-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-sidebar-primary uppercase tracking-wider">{activeStory.source}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1">
                    <Clock size={12} />
                    {activeStory.timeAgo}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-[1.15] mb-4 tracking-tight">
                  {activeStory.title}
                </h1>

                <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-2 opacity-90">
                  {activeStory.description}
                </p>

                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-xl bg-sidebar-primary text-white text-xs font-bold shadow-lg shadow-sidebar-primary/20 hover:shadow-sidebar-primary/40 transition-all flex items-center gap-2"
                  >
                    Deep Analysis <ArrowRight size={14} />
                  </motion.button>
                  <button className="p-2 rounded-xl border border-white/5 bg-white/5 text-white/50 hover:text-white transition-all">
                    <Maximize2 size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex gap-1.5">
            {HEADLINES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === activeIndex ? "w-10 bg-sidebar-primary" : "w-2 bg-white/10 hover:bg-white/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Navigation Rail (35%) */}
        <div className="w-[35%] border-l border-white/5 bg-white/[0.01] backdrop-blur-xl flex flex-col p-4 gap-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Sparkles size={12} className="text-sidebar-primary" />
              Incoming Feed
            </h4>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-sidebar-primary animate-pulse" />
              <span className="text-[9px] font-bold text-neutral-600 uppercase">Live</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto custom-scrollbar pr-1">
            {HEADLINES.map((story, i) => (
              <button
                key={story.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative flex flex-col p-3 rounded-xl border transition-all duration-300 text-left group/item",
                  i === activeIndex
                    ? "bg-white/[0.06] border-white/10 shadow-lg"
                    : "bg-transparent border-transparent hover:bg-white/[0.03] text-neutral-400 hover:text-white"
                )}
              >
                {i === activeIndex && (
                  <motion.div
                    layoutId="rail-active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full shadow-[2px_0_8px_rgba(59,130,246,0.6)]"
                  />
                )}

                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn(
                    "inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider",
                    i === activeIndex ? "text-sidebar-primary border-sidebar-primary/30" : "text-neutral-500"
                  )}>
                    {getCategoryIcon(story.category)}
                    {story.category}
                  </span>
                  <span className="text-[8px] font-bold text-neutral-600 uppercase">{story.timeAgo}</span>
                </div>

                <h5 className={cn(
                  "text-[11px] font-bold leading-snug transition-all line-clamp-2",
                  i === activeIndex ? "text-white" : "text-neutral-500 group-hover/item:text-neutral-300"
                )}>
                  {story.title}
                </h5>

                {/* Progress bar for auto-cycling (only on active) */}
                {i === activeIndex && (
                  <div className="mt-3 h-[1px] w-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      key={activeIndex}
                      transition={{ duration: 8, ease: "linear" }}
                      className="h-full bg-sidebar-primary"
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Footer of the rail */}
          <button className="flex items-center justify-center gap-2 p-2 rounded-lg border border-white/5 bg-white/[0.02] text-[9px] font-bold text-neutral-500 hover:text-white transition-all uppercase tracking-widest mt-auto">
            View All Reports <ChevronRight size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}
