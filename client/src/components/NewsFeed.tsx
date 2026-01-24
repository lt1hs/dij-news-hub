import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import TopHeadlinesSlider from "./TopHeadlinesSlider";
import NewsCard from "./NewsCard";
import DynamicPane from "./DynamicPane";
import Sidebar from "./Sidebar";
import { DotLoader } from "@/components/ui/dot-loader";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";

const dailySummaryData = {
  summary: "Today's news landscape shows positive developments across multiple sectors. Technology breakthroughs in AI and healthcare are driving market optimism, while international cooperation on climate issues signals progress on global challenges. Urban innovation continues to reshape how we live and work in modern cities.",
  sentiment: "positive" as const,
  keyStories: [
    "Global markets surge on strong tech sector performance",
    "Medical AI breakthrough promises faster disease diagnosis",
    "Historic climate agreement signed by world leaders",
    "Smart city initiatives transform urban landscapes"
  ],
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
};

interface NewsFeedProps {
  paneCompact: boolean;
  setPaneCompact: (compact: boolean) => void;
}

export default function NewsFeed({ paneCompact, setPaneCompact }: NewsFeedProps) {
  const { isAuthenticated } = useAuth();
  const { collapsed } = useSidebar();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Fetch articles from backend
  const { data: articles = [], isLoading, refetch } = useQuery({
    queryKey: ['/api/articles'],
    retry: false,
  });

  // Intersection observer for loading more content
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate loading more content
          setTimeout(() => {
            setIsLoadingMore(false);
          }, 2000);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore]);

  const handleChatClick = (articleId: string) => {
    setPaneCompact(false);
    console.log(`Chat clicked for article: ${articleId}`);
  };

  const handlePlayClick = (articleId: string) => {
    console.log(`Play clicked for article: ${articleId}`);
    // TODO: Implement text-to-speech functionality
  };

  const handleShareClick = (articleId: string) => {
    console.log(`Share clicked for article: ${articleId}`);
    // TODO: Implement sharing functionality
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTimestamp = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 100;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-72'} ${paneCompact ? 'mr-12' : 'mr-80'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-lg p-6 border">
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-72'} ${paneCompact ? 'mr-12' : 'mr-80'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Top Headlines Slider */}
            <TopHeadlinesSlider />

            {/* News Articles */}
            <div className="space-y-6" style={{ marginTop: '2rem' }}>
              {articles.map((article: any) => (
                <NewsCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  summary={article.summary}
                  imageUrl={article.imageUrl}
                  sources={article.sources || []}
                  category={article.category}
                  timestamp={formatTimestamp(article.publishedAt)}
                  readTime={calculateReadTime(article.content)}
                  likeCount={article.likeCount || 0}
                  repostCount={article.repostCount || 0}
                  replyCount={article.replyCount || 0}
                  bookmarkCount={article.bookmarkCount || 0}
                  onChatClick={handleChatClick}
                  onPlayClick={handlePlayClick}
                  onShareClick={handleShareClick}
                />
              ))}
            </div>

            {/* Loading More Animation */}
            <div ref={loaderRef} className="flex justify-center mt-8 p-4">
              <DotLoader
                frames={[
                  [0, 1, 2],
                  [7, 8, 9],
                  [14, 15, 16],
                  [21, 22, 23],
                  [28, 29, 30],
                  [35, 36, 37],
                  [42, 43, 44],
                  [35, 36, 37],
                  [28, 29, 30],
                  [21, 22, 23],
                  [14, 15, 16],
                  [7, 8, 9]
                ]}
                dotClassName="w-2 h-2 rounded-sm transition-colors duration-200"
                duration={150}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Pane - Always Visible */}
        <DynamicPane
          isCompact={paneCompact}
          onToggleCompact={() => setPaneCompact(!paneCompact)}
        />
      </main>
    </div>
  );
}