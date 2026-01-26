import { motion } from "framer-motion";
import { Activity, Radio } from "lucide-react";

const NEWS_FLASHES = [
    "BREAKING: Quantum supremacy reached by Sycamore v2 with 99.9% gate fidelity",
    "ECONOMY: US Fed signals potential Q3 interest rate pivot amid cooling core inflation",
    "ENERGY: Second fusion ignition milestone confirmed at NIF laboratory in California",
    "GEOPOLITICS: EU unveils comprehensive regulatory framework for AGI development safety",
    "TECH: New silicon-photonics architecture promises 100x increase in datacenter bandwidth",
    "SPACE: Lunar Gateway module assembly completed for Artemis IV support mission",
    "CLIMATE: Global renewable capacity surges past 4000GW for the first time in history",
];

export default function LiveTicker() {
    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[55] w-[min(1350px,94vw)]">
            <div className="relative w-full h-9 bg-white/[0.03] border border-white/10 rounded-[50px] backdrop-blur-xl flex items-center overflow-hidden shadow-2xl">
                {/* Static Prefix */}
                <div className="flex items-center gap-2 px-4 bg-sidebar-primary/10 border-r border-white/10 h-full text-sidebar-primary text-[10px] font-black tracking-[0.2em] flex-shrink-0 z-20 uppercase">
                    <Activity size={12} className="animate-pulse" />
                    Intelligence Stream
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
                                <Radio size={12} className="text-neutral-500" />
                                <span className="text-white text-[11px] font-bold tracking-tight uppercase opacity-90">{news}</span>
                                <div className="h-1 w-1 rounded-full bg-sidebar-primary/40 mx-2" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Subtle Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#121417] to-transparent pointer-events-none z-20" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#121417] to-transparent pointer-events-none z-20" />
                </div>

                {/* Status Indicator */}
                <div className="hidden md:flex items-center gap-2 px-4 h-full text-[9px] font-black text-neutral-500 uppercase tracking-widest bg-white/[0.02] border-l border-white/10 z-20">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                </div>
            </div>
        </div>
    );
}
