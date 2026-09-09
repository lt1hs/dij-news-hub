import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import TopHeadlinesSlider from "./TopHeadlinesSlider";
import CategoryBar from "./CategoryBar";
import NewsCard from "./NewsCard";
import IntelligenceSidebar from "./IntelligenceSidebar";
import AudioHub from "./AudioHub";
import ArticleFocusMode from "./ArticleFocusMode";
import DynamicPane from "./DynamicPane";
import Sidebar from "./Sidebar";
import TrackingView from "./TrackingView";
import HeadlinesView from "./HeadlinesView";
import { SymmetricWave } from "@/components/ui/symmetric-wave";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

import { Article } from "@shared/schema";

interface NewsFeedProps {
  paneCompact: boolean;
  setPaneCompact: (compact: boolean) => void;
}

export default function NewsFeed({ paneCompact, setPaneCompact }: NewsFeedProps) {
  const { collapsed } = useSidebar();
  const [activeView, setActiveView] = useState("explore");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [focusArticle, setFocusArticle] = useState<Article | null>(null);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    retry: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => setIsLoadingMore(false), 2000);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoadingMore]);

  const handlePlayClick = (articleId: string) => {
    setIsAudioOpen(true);
    console.log(`Audio triggered for: ${articleId}`);
  };

  const handleArticleClick = (article: Article) => {
    setFocusArticle(article);
    setIsFocusOpen(true);
  };

  const formatTimestamp = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const calculateReadTime = (content: string) => {
    const words = content?.split(' ').length || 100;
    return `${Math.ceil(words / 200)} min`;
  };

  return (
    <div className={cn("relative min-h-screen bg-transparent text-foreground selection:bg-sidebar-primary/30 overflow-x-clip", isFocusOpen ? "z-[100]" : "z-10")}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className={cn("min-w-0 transition-[margin] duration-300", collapsed ? "md:ml-16" : "md:ml-[220px]")}>

        {activeView === "tracking" ? (
          <TrackingView />
        ) : activeView === "headlines" ? (
          <HeadlinesView articles={articles} onOpen={handleArticleClick} />
        ) : (
        <div className="pt-14 pb-28">
          <div className="px-4">
            <TopHeadlinesSlider />
          </div>

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryBar />

            <IntelligenceSidebar mobile className="mb-7 lg:hidden" />

            <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-9">
              <section className="min-w-0" aria-label="Latest news">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">Latest news</h2>
                    <p className="mt-1 text-xs text-neutral-500">Reporting from sources across your selected topics</p>
                  </div>
                  <button className="hidden text-xs font-medium text-neutral-400 transition hover:text-white sm:inline">View all</button>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0b121c]/55 divide-y divide-white/[.08]">
                  {articles.map((article: Article) => (
                    <div key={article.id}>
                      <NewsCard
                        id={article.id}
                        title={article.title}
                        summary={article.summary}
                        imageUrl={article.imageUrl || undefined}
                        sources={article.sources || []}
                        category={article.category}
                        timestamp={formatTimestamp(article.publishedAt?.toString() || new Date().toISOString())}
                        readTime={calculateReadTime(article.content || '')}
                        likeCount={article.likeCount || 0}
                        repostCount={article.repostCount || 0}
                        replyCount={article.replyCount || 0}
                        bookmarkCount={article.bookmarkCount || 0}
                        onChatClick={() => setPaneCompact(false)}
                        onPlayClick={() => handlePlayClick(article.id)}
                        onShareClick={() => console.log('Share Triggered')}
                        onClick={() => handleArticleClick(article)}
                      />
                    </div>
                  ))}
                </div>

                <div ref={loaderRef} className="flex min-h-24 items-center justify-center py-8">
                  {isLoadingMore && (
                    <SymmetricWave className="text-base text-sidebar-primary" style={{ "--duration": "1.6s" } as CSSProperties} />
                  )}
                </div>
              </section>

              <IntelligenceSidebar className="hidden lg:block" />
            </div>
          </div>
        </div>
        )}

        <DynamicPane isCompact={paneCompact} onToggleCompact={() => setPaneCompact(!paneCompact)} />
        <AudioHub isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} />
        <ArticleFocusMode isOpen={isFocusOpen} onClose={() => setIsFocusOpen(false)} article={focusArticle} />
      </main>
    </div>
  );
}
