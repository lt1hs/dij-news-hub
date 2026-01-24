import { useState } from "react";
import {
  MessageCircle,
  Play,
  Share,
  Clock,
  Heart,
  Repeat2,
  Bookmark,
  Activity,
  Zap,
  Layers,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { NewsCardTabs } from "@/components/ui/news-card-tabs";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  sources: string[];
  category: string;
  timestamp: string;
  readTime: string;
  likeCount: number;
  repostCount: number;
  replyCount: number;
  bookmarkCount: number;
  onChatClick: (id: string) => void;
  onPlayClick: (id: string) => void;
  onShareClick: (id: string) => void;
}

export default function NewsCard({
  id,
  title,
  summary,
  imageUrl,
  sources,
  category,
  timestamp,
  readTime,
  likeCount,
  repostCount,
  replyCount,
  onChatClick,
  onPlayClick,
  onShareClick
}: NewsCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  const interactionMutation = useMutation({
    mutationFn: async ({ type, action }: { type: string; action: 'add' | 'remove' }) => {
      if (action === 'add') {
        await apiRequest('/api/interactions', {
          method: 'POST',
          body: { targetId: id, targetType: 'article', type }
        });
      } else {
        await apiRequest('/api/interactions', {
          method: 'DELETE',
          body: { targetId: id, type }
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/articles'] }),
  });

  const handleAction = (type: 'like' | 'bookmark' | 'repost', state: boolean, setState: (v: boolean) => void) => {
    if (!isAuthenticated) return toast({ title: "Auth Required", description: "Please sign in to interact." });
    const next = !state;
    setState(next);
    interactionMutation.mutate({ type, action: next ? 'add' : 'remove' });
  };

  const displayImage = imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      className="group relative flex flex-col md:flex-row w-full rounded-[15px] border border-white/5 bg-white/[0.01] backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.03] hover:border-white/10 overflow-hidden shadow-lg mb-6"
    >
      {/* Media Side - Clean & Compact */}
      <div className="relative w-full md:w-[260px] lg:w-[300px] flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Category Label - Shrunken */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider">
            <Activity size={10} className="text-sidebar-primary" />
            {category}
          </span>
        </div>

        {/* Play Action - Shrunken */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Zap size={12} className="text-white/60" />
            </div>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-tight">{sources[0] || 'Intel'}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlayClick(id)}
            className="h-8 w-8 rounded-lg bg-sidebar-primary text-white flex items-center justify-center shadow-lg"
          >
            <Play size={14} fill="white" className="ml-0.5" />
          </motion.button>
        </div>
      </div>

      {/* Content Side - Precise & High Density */}
      <div className="flex-1 flex flex-col p-5 min-w-0">
        {/* Top Intelligence Row - Dense */}
        <div className="flex items-center justify-between mb-3 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={10} className="text-neutral-600" />
              {readTime}
            </span>
            <span className="h-0.5 w-0.5 rounded-full bg-white/10" />
            <span>{timestamp}</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-500/60 uppercase">
            <Layers size={10} />
            <span>Verified</span>
          </div>
        </div>

        {/* Title - Compact size */}
        <h2 className="text-base md:text-lg font-bold text-white leading-tight mb-3 group-hover:text-sidebar-primary transition-colors duration-200">
          {title}
        </h2>

        {/* Tabs - Smaller */}
        <div className="mb-3">
          <NewsCardTabs
            defaultIndex={0}
            onTabChange={setActiveTab}
            className="h-8 bg-black/30 border-white/5"
          />
        </div>

        {/* Description - Brief */}
        <div className="relative min-h-[40px] mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[12px] leading-snug text-neutral-400"
            >
              {activeTab === 0 && <p className="line-clamp-2">{summary}</p>}
              {activeTab === 1 && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-[8px] font-black text-sidebar-primary uppercase mb-0.5">Impact</p>
                    <p className="text-white text-[11px] font-medium">Moderate High</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-[8px] font-black text-white/40 uppercase mb-0.5">Reliability</p>
                    <p className="text-white text-[11px] font-medium">9.4/10</p>
                  </div>
                </div>
              )}
              {activeTab === 2 && <p className="italic opacity-50">Discussion pending...</p>}
              {activeTab === 3 && (
                <div className="flex flex-wrap gap-1.5">
                  {['Intel', 'Data', 'Vector'].map(tag => (
                    <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold text-neutral-500 border border-white/5">#{tag}</span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actions - Subtle & Small */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('like', isLiked, setIsLiked)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                isLiked ? "bg-red-500/10 text-red-500" : "text-neutral-500 hover:text-white"
              )}
            >
              <Heart size={13} className={cn(isLiked && "fill-current")} />
              <span>{likeCount + (isLiked ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('repost', isReposted, setIsReposted)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                isReposted ? "bg-green-500/10 text-green-500" : "text-neutral-500 hover:text-white"
              )}
            >
              <Repeat2 size={13} />
              <span>{repostCount + (isReposted ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onChatClick(id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-neutral-500 hover:text-sidebar-primary transition-all"
            >
              <MessageCircle size={13} />
              <span>{replyCount}</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-0.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('bookmark', isBookmarked, setIsBookmarked)}
              className={cn(
                "p-2 rounded-lg transition-all",
                isBookmarked ? "text-sidebar-primary bg-sidebar-primary/5" : "text-neutral-500 hover:text-white"
              )}
            >
              <Bookmark size={14} className={cn(isBookmarked && "fill-current")} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onShareClick(id)}
              className="p-2 text-neutral-500 hover:text-white transition-all"
            >
              <ArrowUpRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Subtle Options Button */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="h-7 w-7 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-white/40 hover:text-white">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </motion.div>
  );
}