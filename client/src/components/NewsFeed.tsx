import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import TopHeadlinesSlider from "./TopHeadlinesSlider";
import CategoryBar from "./CategoryBar";
import NewsCard from "./NewsCard";
import ResourceSidebar from "./ResourceSidebar";
import TrendingSidebar from "./TrendingSidebar";
import LiveTicker from "./LiveTicker";
import AudioHub from "./AudioHub";
import ArticleFocusMode from "./ArticleFocusMode";
import DynamicPane from "./DynamicPane";
import Sidebar from "./Sidebar";
import { DotLoader } from "@/components/ui/dot-loader";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";

import { Article } from "@shared/schema";

interface NewsFeedProps {
  paneCompact: boolean;
  setPaneCompact: (compact: boolean) => void;
}

export default function NewsFeed({ paneCompact, setPaneCompact }: NewsFeedProps) {
  const { collapsed } = useSidebar();
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
    <div className="flex min-h-screen bg-background text-foreground selection:bg-sidebar-primary/30">
      <Sidebar />

      <main className="flex-1 transition-all duration-300 md:ml-20 mr-20">

        {/* Cinematic Header Spacer for Live Ticker */}
        <LiveTicker />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-[4rem] pb-32">
          <div className="max-w-[1350px] mx-auto">

            <TopHeadlinesSlider />
            <CategoryBar />

            <div className="flex gap-8 items-start mt-4">
              <ResourceSidebar />

              <div className="flex-1 min-w-0">
                <div className="space-y-6">
                  {articles.map((article: Article) => (
                    <div key={article.id} onClick={() => handleArticleClick(article)} className="cursor-pointer">
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
                      />
                    </div>
                  ))}
                </div>

                <div ref={loaderRef} className="flex justify-center mt-12 p-8">
                  {isLoadingMore && <DotLoader frames={[[0, 1, 2], [7, 8, 9], [14, 15, 16]]} dotClassName="w-2 h-2 rounded-sm" duration={150} />}
                </div>
              </div>

              <TrendingSidebar />
            </div>
          </div>
        </div>

        <DynamicPane isCompact={paneCompact} onToggleCompact={() => setPaneCompact(!paneCompact)} />
        <AudioHub isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} />
        <ArticleFocusMode isOpen={isFocusOpen} onClose={() => setIsFocusOpen(false)} article={focusArticle} />
      </main>
    </div>
  );
}