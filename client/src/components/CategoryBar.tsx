import { motion } from "framer-motion";
import {
    Cpu,
    Banknote,
    Droplets,
    Scale,
    Globe,
    FlaskConical,
    Users,
    HeartPulse,
    Radar,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CATEGORIES = [
    { id: "all", title: "Intel Hub", icon: Radar },
    { id: "tech", title: "Quantum", icon: Cpu },
    { id: "economy", title: "Macro", icon: Banknote },
    { id: "energy", title: "Fusion", icon: Droplets },
    { id: "policy", title: "Cyber", icon: Scale },
    { id: "world", title: "Global", icon: Globe },
    { id: "science", title: "Deep Sci", icon: FlaskConical },
    { id: "society", title: "Vectors", icon: Users },
    { id: "health", title: "BioTech", icon: HeartPulse },
];

export default function CategoryBar() {
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="w-full mt-8 mb-4">
            {/* Container with premium glass background */}
            <div className="relative flex items-center bg-white/[0.01] border border-white/5 rounded-[12px] p-1 shadow-2xl backdrop-blur-3xl">
                <div className="flex items-center w-full overflow-x-auto no-scrollbar gap-1 py-0.5 px-0.5">
                    {CATEGORIES.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeCategory === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveCategory(item.id)}
                                whileHover={{
                                    scale: 1.02,
                                    y: -1,
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                                whileTap={{ scale: 0.97 }}
                                className={cn(
                                    "relative flex items-center gap-2.5 px-4 py-2 rounded-[10px] transition-all duration-200 group whitespace-nowrap overflow-hidden border",
                                    isActive
                                        ? "bg-white/10 text-white border-white/20 shadow-lg"
                                        : "text-neutral-500 border-transparent bg-white/[0.01]"
                                )}
                            >
                                {/* Active Glow Detail */}
                                {isActive && (
                                    <motion.div
                                        layoutId="tab-highlight"
                                        className="absolute inset-0 bg-gradient-to-tr from-sidebar-primary/20 via-transparent to-transparent opacity-50 z-0 pointer-events-none"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                {/* Icon with visibility fix (using component variable) */}
                                <div className={cn(
                                    "flex items-center justify-center z-10 transition-all duration-300",
                                    isActive ? "text-sidebar-primary drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" : "text-neutral-500 group-hover:text-neutral-100"
                                )}>
                                    <Icon size={16} strokeWidth={2.5} />
                                </div>

                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.12em] z-10 transition-colors",
                                    isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-100"
                                )}>
                                    {item.title}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="active-marker"
                                        className="h-1 w-1 rounded-full bg-sidebar-primary shadow-[0_0_10px_rgba(59,130,246,1)] z-10"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Decorative flair */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
                    <Sparkles size={14} className="text-sidebar-primary" />
                </div>
            </div>
        </div>
    );
}
