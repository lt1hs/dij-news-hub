import { motion } from "framer-motion";
import {
    Rss,
    Plus,
    Check,
    Globe,
    Cpu,
    Zap,
    ShieldCheck,
    Radio
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const RESOURCES = [
    { id: "1", name: "Reuters Intel", followers: "2.4M", icon: Globe, category: "Verified" },
    { id: "2", name: "TechCrunch Pro", followers: "1.8M", icon: Cpu, category: "Tech" },
    { id: "3", name: "Alpha Signal", followers: "850K", icon: Zap, category: "Signals" },
    { id: "4", name: "Cyber Monitor", followers: "420K", icon: ShieldCheck, category: "Security" },
    { id: "5", name: "Market Pulse", followers: "3.1M", icon: Radio, category: "Signals" },
];

export default function ResourceSidebar() {
    const [followed, setFollowed] = useState<string[]>(["1"]);

    const toggleFollow = (id: string) => {
        setFollowed(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <aside className="hidden xl:flex flex-col gap-6 w-64 shrink-0">
            <div className="flex flex-col gap-4 p-5 rounded-[15px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
                        <Rss size={14} className="text-sidebar-primary" />
                        Resources
                    </h3>
                    <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary shadow-[0_0_8px_rgba(59,130,246,1)] animate-pulse" />
                </div>

                <div className="flex flex-col gap-3">
                    {RESOURCES.map((res) => {
                        const isFollowed = followed.includes(res.id);
                        return (
                            <div key={res.id} className="group flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                                        <res.icon size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-white leading-tight">{res.name}</span>
                                        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">{res.followers} Analysts</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleFollow(res.id)}
                                    className={cn(
                                        "h-7 w-7 rounded-lg flex items-center justify-center transition-all border shadow-sm",
                                        isFollowed
                                            ? "bg-sidebar-primary/10 border-sidebar-primary/30 text-sidebar-primary"
                                            : "bg-white/5 border-white/10 text-neutral-500 hover:text-white"
                                    )}
                                >
                                    {isFollowed ? <Check size={14} /> : <Plus size={14} />}
                                </motion.button>
                            </div>
                        );
                    })}
                </div>

                <button className="mt-2 w-full py-2 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] font-black text-neutral-500 uppercase tracking-widest hover:text-white hover:bg-white/[0.05] transition-all">
                    Explore Directory
                </button>
            </div>

            {/* Verification Card */}
            <div className="relative p-5 rounded-[15px] border border-sidebar-primary/20 bg-sidebar-primary/5 overflow-hidden group">
                <div className="relative z-10">
                    <h4 className="text-[11px] font-black text-sidebar-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                        <ShieldCheck size={14} />
                        Alpha Verified
                    </h4>
                    <p className="text-[10px] leading-relaxed text-neutral-400">
                        Gain executive access to verified deep intelligence and primary sources.
                    </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                    <ShieldCheck size={80} className="text-sidebar-primary" />
                </div>
            </div>
        </aside>
    );
}
