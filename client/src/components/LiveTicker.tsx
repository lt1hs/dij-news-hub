import { motion } from "framer-motion";
import { Activity, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const NEWS_FLASHES = [
    "BREAKING: Quantum supremacy reached by Sycamore v2 with 99.9% gate fidelity",
    "ECONOMY: US Fed signals potential Q3 interest rate pivot amid cooling core inflation",
    "ENERGY: Second fusion ignition milestone confirmed at NIF laboratory in California",
    "GEOPOLITICS: EU unveils comprehensive regulatory framework for AGI development safety",
    "TECH: New silicon-photonics architecture promises 100x increase in datacenter bandwidth",
    "SPACE: Lunar Gateway module assembly completed for Artemis IV support mission",
    "CLIMATE: Global renewable capacity surges past 4000GW for the first time in history",
];

export default function LiveTicker({ compact = false }: { compact?: boolean }) {
    return (
        <motion.div
            layout
            initial={false}
            animate={{ height: compact ? 27 : 36 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
                "relative w-full bg-foreground/[0.03] border border-foreground/10 backdrop-blur-xl flex items-center overflow-hidden shadow-2xl transition-[border-radius] duration-300",
                compact ? "rounded-b-xl rounded-t-none border-t-0" : "rounded-[50px]"
            )}
        >
                {/* Static Prefix */}
                <div className={cn("flex items-center gap-2 px-3 sm:px-4 bg-sidebar-primary/10 border-r border-foreground/10 h-full text-sidebar-primary font-black tracking-[0.16em] flex-shrink-0 z-20 uppercase transition-all", compact ? "text-[8px]" : "text-[10px]")}>
                    <Activity size={12} className="animate-pulse" />
                    <span className="hidden sm:inline">Intelligence Stream</span><span className="sm:hidden">Live</span>
                </div>

                {/* Scrolling Content */}
                <div className="flex-1 overflow-hidden h-full flex items-center relative z-10">
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-20 whitespace-nowrap px-10"
                    >
                        {[...NEWS_FLASHES, ...NEWS_FLASHES, ...NEWS_FLASHES].map((news, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Radio size={12} className="text-muted-foreground dark:text-neutral-500" />
                                <span className={cn("text-foreground dark:text-white font-bold tracking-tight uppercase opacity-90 transition-all", compact ? "text-[9px]" : "text-[11px]")}>{news}</span>
                                <div className="h-1 w-1 rounded-full bg-sidebar-primary/40 mx-2" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Subtle Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-chrome to-transparent pointer-events-none z-20" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-chrome to-transparent pointer-events-none z-20" />
                </div>

                {/* Status Indicator */}
                <div className="hidden md:flex items-center gap-2 px-4 h-full text-[9px] font-black text-muted-foreground dark:text-neutral-500 uppercase tracking-widest bg-foreground/[0.02] border-l border-foreground/10 z-20">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                </div>
        </motion.div>
    );
}
