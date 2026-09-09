import { motion } from "framer-motion";
import { Globe, Crosshair, Radar, Map as MapIcon, Maximize2 } from "lucide-react";
import { useState } from "react";

const HOTSPOTS = [
    { id: 1, x: "25%", y: "45%", intensity: 0.8 }, // North America
    { id: 2, x: "48%", y: "35%", intensity: 0.9 }, // Europe
    { id: 3, x: "70%", y: "50%", intensity: 0.6 }, // Asia
    { id: 4, x: "55%", y: "75%", intensity: 0.4 }, // Africa
    { id: 5, x: "30%", y: "70%", intensity: 0.3 }, // South America
];

export default function ImpactMap() {
    return (
        <div className="flex flex-col gap-4 p-5 rounded-[15px] border border-foreground/5 bg-foreground/[0.01] backdrop-blur-3xl shadow-2xl mt-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground dark:text-neutral-500 flex items-center gap-2">
                    <Globe size={14} className="text-sidebar-primary" />
                    Global Signals
                </h3>
                <button className="p-1 rounded-md hover:bg-foreground/5 transition-colors text-muted-foreground dark:text-neutral-500 hover:text-foreground dark:hover:text-white">
                    <Maximize2 size={12} />
                </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-black/40 rounded-xl overflow-hidden border border-foreground/5 group on-media">
                {/* Abstract Map Background (Grid style) */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.28) 1px, transparent 1px)', backgroundSize: '15px 15px' }}
                />

                {/* Animated Hotspots */}
                {HOTSPOTS.map((point) => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute"
                        style={{ left: point.x, top: point.y }}
                    >
                        <motion.div
                            animate={{ scale: [1, 2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: point.id * 0.5 }}
                            className="absolute -inset-2 rounded-full bg-sidebar-primary blur-sm"
                            style={{ padding: `${point.intensity * 8}px` }}
                        />
                        <div className="h-2 w-2 rounded-full bg-sidebar-primary shadow-[0_0_10px_rgba(59,130,246,1)] relative z-10" />
                    </motion.div>
                ))}

                {/* Scanning Radar Effect */}
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-sidebar-primary/5 to-transparent origin-center rounded-full"
                    style={{ width: '200%', height: '200%', top: '-50%', left: '-50%' }}
                />

                {/* Overlay Info */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-foreground/10">
                        <Radar size={10} className="text-sidebar-primary animate-pulse" />
                        <span className="text-[8px] font-bold text-white uppercase tracking-widest">Active Scan: EMEA Zone</span>
                    </div>
                </div>

                <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black text-white/50 tracking-widest">0.842ms LATNCY</span>
                    <span className="text-[9px] font-bold text-white/55 uppercase">Live Intelligence Vector</span>
                </div>
            </div>

            {/* Micro Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-muted-foreground/80 dark:text-neutral-600 uppercase tracking-tighter">Peak Density</span>
                    <span className="text-[12px] font-bold text-foreground dark:text-white">European Sector</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-muted-foreground/80 dark:text-neutral-600 uppercase tracking-tighter">Signal Health</span>
                    <span className="text-[12px] font-bold text-green-500 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        98.2%
                    </span>
                </div>
            </div>
        </div>
    );
}
