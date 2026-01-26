import { motion } from "framer-motion";
import {
    TrendingUp,
    Hash,
    ArrowUpRight,
    MessageSquare,
    Activity,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const TRENDS = [
    { id: "1", tag: "QuantumBreakthrough", count: "142K", momentum: "+12%" },
    { id: "2", tag: "MacroPivot2024", count: "89K", momentum: "+5%" },
    { id: "3", tag: "FusionPilotJapan", count: "67K", momentum: "+22%" },
    { id: "4", tag: "SupplySides", count: "45K", momentum: "+2%" },
    { id: "5", tag: "BrainInterface", count: "31K", momentum: "+18%" },
];

const ANALYTICS = [
    { id: "1", label: "Sentiment Index", value: "84.2", unit: "pts", positive: true },
    { id: "2", label: "Volatility Hub", value: "12.4", unit: "%", positive: false },
];

export default function TrendingSidebar() {
    return (
        <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
            <div className="flex flex-col gap-4 p-5 rounded-[15px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
                        <TrendingUp size={14} className="text-red-500" />
                        Trends & Intel
                    </h3>
                    <Activity size={12} className="text-neutral-600" />
                </div>

                <div className="flex flex-col gap-2">
                    {TRENDS.map((trend) => (
                        <motion.div
                            key={trend.id}
                            whileHover={{ x: 3 }}
                            className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-sidebar-primary">
                                    <Hash size={12} />
                                    <span>{trend.tag}</span>
                                </div>
                                <div className="text-[9px] font-black text-green-500">{trend.momentum}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[12px] font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors">Signals detected</span>
                                <span className="text-[10px] font-bold text-neutral-600">{trend.count} pts</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="h-px bg-white/5 mx-2" />

                <div className="flex flex-col gap-4 px-1 pt-2">
                    {ANALYTICS.map(stat => (
                        <div key={stat.id}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{stat.label}</span>
                                <span className={cn("text-[10px] font-bold", stat.positive ? "text-green-500" : "text-amber-500")}>
                                    {stat.value}{stat.unit}
                                </span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${parseFloat(stat.value)}%` }}
                                    className={cn("h-full", stat.positive ? "bg-green-500" : "bg-amber-500")}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="flex items-center justify-center gap-2 mt-4 p-2 text-[10px] font-black text-neutral-500 uppercase tracking-widest hover:text-white transition-all">
                    Full Data View <ArrowUpRight size={14} />
                </button>
            </div>

            {/* Daily Pulse Mini-Card */}
            <div className="p-4 rounded-[15px] bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                        <Zap size={16} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-white leading-none">Power Signal</span>
                        <span className="text-[9px] font-bold text-neutral-500 mt-1 uppercase">24 New Points</span>
                    </div>
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            </div>
        </aside>
    );
}
