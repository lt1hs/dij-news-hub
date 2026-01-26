import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Sparkles,
    Target,
    Zap,
    ShieldAlert,
    BarChart3,
    ArrowUpRight,
    Bookmark,
    Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Article } from "@shared/schema";

interface ArticleFocusModeProps {
    isOpen: boolean;
    onClose: () => void;
    article: Article | null;
}

export default function ArticleFocusMode({ isOpen, onClose, article }: ArticleFocusModeProps) {
    if (!article) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        layoutId={`article-${article.id}`}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl h-[min(900px,85vh)] bg-white/[0.03] border border-white/10 rounded-[30px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto"
                    >
                        {/* Header / Actions */}
                        <div className="absolute top-6 right-6 z-20 flex gap-2">
                            <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-md">
                                <Bookmark size={20} />
                            </button>
                            <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-md">
                                <Share2 size={20} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-full bg-sidebar-primary text-white shadow-lg shadow-sidebar-primary/20 hover:scale-105 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col md:flex-row h-full">
                            {/* Left: Cinematic Content */}
                            <div className="flex-1 h-full overflow-y-auto custom-scrollbar relative p-8 md:p-12">
                                <div className="max-w-[700px]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 rounded-lg bg-sidebar-primary/10 border border-sidebar-primary/20 text-sidebar-primary text-[11px] font-black uppercase tracking-widest">
                                            {article.category || 'Intelligence'}
                                        </span>
                                        <span className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">
                                            {article.sources?.[0] || 'Alpha Stream'}
                                        </span>
                                    </div>

                                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
                                        {article.title}
                                    </h1>

                                    {article.imageUrl && (
                                        <div className="aspect-video w-full rounded-[20px] overflow-hidden mb-8 border border-white/5">
                                            <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                                        {article.summary}
                                    </p>

                                    <div className="prose prose-invert max-w-none text-neutral-500">
                                        <p>
                                            Current intelligence vectors suggest this development represents a fundamental shift in the
                                            <span className="text-white mx-1">{(article.category || 'sector').toLowerCase()}</span> landscape.
                                            Primary sources indicate that the momentum of this signal has increased by 14% over the last 2 hours...
                                        </p>
                                        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <h4 className="text-white text-sm font-bold mb-3">Geopolitical Sentiment Analysis</h4>
                                            <p>{article.content || "Detailed content analysis is currently being synthesized by the Alpha Engine. Early data points suggest standard market integration with significant upside potential in the long curve."}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: AI Intelligence Hub (SWOT & Pulse) */}
                            <div className="w-full md:w-[380px] h-full bg-white/[0.02] border-l border-white/5 p-8 flex flex-col gap-6 overflow-y-auto no-scrollbar">

                                {/* AI Intelligence Pulse */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="text-sidebar-primary" size={18} />
                                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.25em]">Alpha Analysis</h3>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Core Impact (TL;DR)</h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Critical infrastructure realignment required",
                                                "Momentum signal strong for next 48-72 hours",
                                                "Secondary market volatility expected"
                                            ].map((p, i) => (
                                                <li key={i} className="flex gap-3 text-[12px] font-medium text-white/80 leading-snug">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary shrink-0 mt-1.5" />
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* SWOT Matrix */}
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                            <Zap className="text-green-500 mb-2" size={16} />
                                            <span className="text-[9px] font-black uppercase text-green-500 tracking-widest">Strength</span>
                                            <p className="text-[11px] text-neutral-500 mt-1">High data fidelity</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                            <Target className="text-orange-500 mb-2" size={16} />
                                            <span className="text-[9px] font-black uppercase text-orange-500 tracking-widest">Opportunity</span>
                                            <p className="text-[11px] text-neutral-500 mt-1">First-mover lead</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                            <ShieldAlert className="text-red-500 mb-2" size={16} />
                                            <span className="text-[9px] font-black uppercase text-red-500 tracking-widest">Threat</span>
                                            <p className="text-[11px] text-neutral-500 mt-1">Market volatility</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                            <BarChart3 className="text-blue-500 mb-2" size={16} />
                                            <span className="text-[9px] font-black uppercase text-blue-500 tracking-widest">Stability</span>
                                            <p className="text-[11px] text-neutral-500 mt-1">Regulatory clearance</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-auto w-full group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Network View</span>
                                        <span className="text-[12px] font-bold text-white">Explore Connections</span>
                                    </div>
                                    <ArrowUpRight size={18} className="text-sidebar-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
