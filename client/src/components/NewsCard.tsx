import { useState } from "react";
import { Bookmark, Clock3, Headphones, MoreHorizontal, Share2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
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
  onClick?: () => void;
}

export default function NewsCard({
  id, title, summary, imageUrl, sources, category, timestamp, readTime,
  onChatClick, onPlayClick, onShareClick, onClick
}: NewsCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const interactionMutation = useMutation({
    mutationFn: async ({ type, action }: { type: string; action: "add" | "remove" }) => {
      await apiRequest(action === "add" ? "POST" : "DELETE", "/api/interactions", {
        targetId: id,
        ...(action === "add" ? { targetType: "article" } : {}),
        type,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/articles"] }),
  });

  const handleAction = (type: "like" | "bookmark", value: boolean, update: (next: boolean) => void) => {
    if (!isAuthenticated) {
      toast({ title: "Sign in required", description: "Please sign in to save or react to stories." });
      return;
    }
    update(!value);
    interactionMutation.mutate({ type, action: value ? "remove" : "add" });
  };

  const source = sources[0] || "DIJAI Newsroom";
  const displayImage = imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&fit=crop";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: .28 }}
      className="group grid min-h-[178px] grid-cols-[minmax(0,1fr)_112px] bg-transparent transition-colors hover:bg-white/[.022] sm:min-h-[204px] sm:grid-cols-[minmax(0,1fr)_210px]"
    >
      <div className="flex min-w-0 flex-col p-4 sm:p-5">
        <div className="mb-2.5 flex min-w-0 items-center gap-2 text-[11px] text-neutral-500">
          <span className="truncate font-semibold text-neutral-300">{source}</span>
          <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-neutral-600" />
          <span className="shrink-0 text-sidebar-primary">{category}</span>
          <ShieldCheck size={12} className="shrink-0 text-neutral-600" aria-label="Verified source" />
        </div>

        <button onClick={onClick} className="text-left">
          <h3 className="line-clamp-3 text-[17px] font-semibold leading-[1.3] tracking-[-.01em] text-neutral-100 transition-colors group-hover:text-white sm:line-clamp-2 sm:text-xl">
            {title}
          </h3>
        </button>

        <p className="mt-2 hidden line-clamp-2 text-[13px] leading-5 text-neutral-500 sm:block">
          {summary || "Read the full report for context, supporting sources, and the latest developments."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex items-center gap-1.5 whitespace-nowrap text-[10px] text-neutral-600 sm:text-[11px]">
            <Clock3 size={12} /><span>{timestamp}</span><span className="hidden sm:inline">· {readTime} read</span>
          </div>

          <div className="flex items-center gap-0.5">
            <button onClick={() => onPlayClick(id)} aria-label="Listen to article" className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-white/[.05] hover:text-white"><Headphones size={14} /></button>
            <button onClick={() => onChatClick(id)} aria-label="Analyze article" className="flex h-8 items-center gap-1.5 rounded-md px-2 text-neutral-400 transition hover:bg-white/[.05] hover:text-white"><Sparkles size={14} /><span className="hidden text-[11px] font-medium md:inline">Analyze</span></button>
            <button onClick={() => handleAction("bookmark", isBookmarked, setIsBookmarked)} aria-label="Bookmark article" className={cn("hidden h-8 w-8 items-center justify-center rounded-md transition sm:flex", isBookmarked ? "text-sidebar-primary" : "text-neutral-500 hover:bg-white/[.05] hover:text-white")}><Bookmark size={14} className={isBookmarked ? "fill-current" : ""} /></button>
            <button onClick={() => onShareClick(id)} aria-label="Share article" className="hidden h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-white/[.05] hover:text-white md:flex"><Share2 size={14} /></button>
            <button aria-label="More options" className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition hover:bg-white/[.05] hover:text-white"><MoreHorizontal size={15} /></button>
          </div>
        </div>
      </div>

      <button onClick={onClick} className="relative m-3 ml-0 overflow-hidden rounded-lg bg-neutral-900 text-left sm:m-4 sm:ml-0">
        <img src={displayImage} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100" />
        <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm sm:hidden"><Headphones size={12} /></span>
      </button>
    </motion.article>
  );
}
