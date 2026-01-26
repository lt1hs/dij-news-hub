import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Volume2,
    ListMusic,
    X,
    AudioLines,
    Waves,
    Maximize2,
    Minimize2,
    Settings2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AudioHubProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AudioHub({ isOpen, onClose }: AudioHubProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [volume, setVolume] = useState(80);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[min(680px,94vw)] pointer-events-none">
                    <motion.div
                        initial={{ y: 100, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        layout
                        className={cn(
                            "relative overflow-hidden border border-white/10 bg-black/40 backdrop-blur-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto",
                            isExpanded
                                ? "rounded-[32px] p-8"
                                : "rounded-full h-16 pr-2 pl-8 flex items-center justify-between"
                        )}
                    >
                        {/* Ultra-Refined Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-sidebar-primary/10 via-transparent to-white/5 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-sidebar-primary/30 to-transparent" />

                        {/* Content Container */}
                        <div className={cn("flex items-center gap-6", isExpanded ? "flex-col w-full" : "flex-1 min-w-0")}>

                            {/* Media Block */}
                            <div className={cn("flex items-center gap-4", isExpanded ? "w-full justify-between mb-2" : "min-w-0 flex-1")}>
                                <motion.div
                                    animate={{
                                        boxShadow: isPlaying ? ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.2)", "0 0 0px rgba(59,130,246,0)"] : "none"
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="h-11 w-11 rounded-2xl bg-sidebar-primary/20 border border-sidebar-primary/30 flex items-center justify-center shrink-0"
                                >
                                    <AudioLines size={22} className={cn("text-sidebar-primary", isPlaying && "animate-pulse")} />
                                </motion.div>

                                <div className="flex flex-col min-w-0">
                                    <span className="text-[14px] font-black text-white truncate tracking-tight">Intelligence Stream: Neural Lattice Analysis</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-sidebar-primary uppercase tracking-[0.15em]">Echo Alpha v2</span>
                                        <span className="h-1 w-1 rounded-full bg-white/10" />
                                        <span className="text-[10px] font-medium text-neutral-500 uppercase">Live Synthesis</span>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <button className="p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white transition-all">
                                        <Settings2 size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Advanced Waveform */}
                            <div className={cn("flex items-end gap-1 px-4", isExpanded ? "w-full h-20 my-6" : "h-7 hidden lg:flex")}>
                                {[...Array(isExpanded ? 50 : 20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: isPlaying
                                                ? [12, Math.random() * 40 + 10, 15, Math.random() * 30 + 5, 12]
                                                : 4
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay: i * 0.03,
                                            ease: "easeInOut"
                                        }}
                                        className={cn(
                                            "w-1 rounded-full transition-colors",
                                            isPlaying ? "bg-sidebar-primary/50" : "bg-white/10"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Core Controls */}
                            <div className={cn("flex items-center gap-4", isExpanded ? "w-full justify-center gap-10 mt-2" : "")}>
                                <button className="p-2 text-neutral-500 hover:text-white transition-all">
                                    <SkipBack size={20} fill="currentColor" />
                                </button>

                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: "var(--sidebar-primary)" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="h-12 w-12 rounded-full bg-sidebar-primary/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10"
                                >
                                    {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" className="ml-1" />}
                                </motion.button>

                                <button className="p-2 text-neutral-500 hover:text-white transition-all">
                                    <SkipForward size={20} fill="currentColor" />
                                </button>
                            </div>
                        </div>

                        {/* Utility Rack */}
                        <div className={cn(
                            "flex items-center gap-2",
                            isExpanded
                                ? "mt-8 w-full justify-between border-t border-white/5 pt-6"
                                : "ml-4"
                        )}>
                            <div className="flex items-center gap-3">
                                <button className="p-2.5 rounded-xl bg-white/5 text-neutral-400 hover:text-sidebar-primary transition-all">
                                    <Volume2 size={18} />
                                </button>
                                {isExpanded && (
                                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden flex items-center relative">
                                        <div className="absolute left-0 top-0 bottom-0 bg-sidebar-primary" style={{ width: `${volume}%` }} />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2.5 rounded-xl bg-white/5 text-neutral-400 hover:text-white transition-all"
                                    title={isExpanded ? "Minimize" : "Full View"}
                                >
                                    {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                </button>

                                <div className="w-px h-5 bg-white/10 mx-1" />

                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(239,68,68,0.15)", color: "#ef4444" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="p-2.5 rounded-xl bg-white/5 text-neutral-500 transition-all flex items-center justify-center"
                                >
                                    <X size={20} strokeWidth={2.5} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Glass Edge Shine */}
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
