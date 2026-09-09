import { useState, useEffect, useMemo, useRef, type CSSProperties } from "react";
import { LayoutGroup } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import TopHeadlinesSlider from "./TopHeadlinesSlider";
import CategoryBar from "./CategoryBar";
import NewsCard from "./NewsCard";
import IntelligenceSidebar from "./IntelligenceSidebar";
import ActivityIsland from "./ActivityIsland";
import AudioHub from "./AudioHub";
import ArticleFocusMode from "./ArticleFocusMode";
import DynamicPane, { type DeskArticleContext, type DeskMode } from "./DynamicPane";
import Sidebar from "./Sidebar";
import TrackingView from "./TrackingView";
import HeadlinesView from "./HeadlinesView";
import LatestView from "./LatestView";
import SavedView from "./SavedView";
import NotificationsView from "./NotificationsView";
import SettingsView from "./SettingsView";
import ProfileView from "./ProfileView";
import AudioLibraryView from "./AudioLibraryView";
import CommandPalette, { type CommandItem } from "./CommandPalette";
import { SymmetricWave } from "@/components/ui/symmetric-wave";
import { useSidebar } from "@/hooks/useSidebar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Article } from "@shared/schema";

interface NewsFeedProps {
  deskMode: DeskMode;
  setDeskMode: (mode: DeskMode) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
}

export default function NewsFeed({ deskMode, setDeskMode, commandOpen, setCommandOpen }: NewsFeedProps) {
  const { collapsed } = useSidebar();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState("explore");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [focusArticle, setFocusArticle] = useState<Article | null>(null);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isAudioExpanded, setIsAudioExpanded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [deskContext, setDeskContext] = useState<DeskArticleContext | null>(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const deskPinned = deskMode === "pinned";

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  const openDeskWithArticle = (article: { id: string; title: string; summary?: string | null; sources?: string[] | null; category?: string | null }) => {
    setDeskContext({
      id: article.id,
      title: article.title,
      summary: article.summary || undefined,
      sources: article.sources || undefined,
      category: article.category || undefined,
    });
    setIsAudioExpanded(false);
    setDeskMode(deskMode === "pinned" ? "pinned" : "float");
  };

  const handlePlayClick = () => {
    setIsAudioOpen(true);
    setIsAudioExpanded(false);
    setIsAudioPlaying(true);
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
    const words = content?.split(" ").length || 100;
    return `${Math.ceil(words / 200)} min`;
  };

  const commandItems = useMemo<CommandItem[]>(
    () => [
      { id: "explore", label: "For You", hint: "Personalized feed", group: "Navigate", onSelect: () => setActiveView("explore") },
      { id: "headlines", label: "Headlines", hint: "Ranked briefing", group: "Navigate", onSelect: () => setActiveView("headlines") },
      { id: "latest", label: "Latest", hint: "Chronological wires", group: "Navigate", onSelect: () => setActiveView("latest") },
      { id: "tracking", label: "Tracking", hint: "Watchlists", group: "Navigate", onSelect: () => setActiveView("tracking") },
      { id: "saved", label: "Saved", hint: "Reading queue", group: "Navigate", onSelect: () => setActiveView("saved") },
      { id: "audio", label: "Audio & podcasts", hint: "Listen library", group: "Navigate", onSelect: () => setActiveView("audio") },
      { id: "notifications", label: "Notifications", group: "Navigate", onSelect: () => setActiveView("notifications") },
      { id: "settings", label: "Settings", group: "Navigate", onSelect: () => setActiveView("settings") },
      { id: "profile", label: "Profile", group: "Navigate", onSelect: () => setActiveView("profile") },
      { id: "desk", label: "Open intelligence desk", hint: "Ask about the news", group: "Desk", onSelect: () => setDeskMode("float") },
      { id: "pin", label: "Pin desk to the right", group: "Desk", onSelect: () => setDeskMode("pinned") },
      ...articles.slice(0, 8).map((article) => ({
        id: `story-${article.id}`,
        label: article.title,
        hint: article.category,
        group: "Stories",
        onSelect: () => handleArticleClick(article),
      })),
    ],
    [articles, setDeskMode]
  );

  const renderView = () => {
    if (activeView === "tracking") return <TrackingView />;
    if (activeView === "headlines") return <HeadlinesView articles={articles} onOpen={handleArticleClick} />;
    if (activeView === "latest") return <LatestView articles={articles} onOpen={handleArticleClick} />;
    if (activeView === "saved") {
      return (
        <SavedView
          onOpen={(item) => {
            const match = articles.find((article) => article.id === item.id);
            if (match) handleArticleClick(match);
            else toast({ title: item.title, description: "Open from Saved when the full article is in the current feed." });
          }}
          onAsk={(item) => openDeskWithArticle(item)}
          onPlay={() => handlePlayClick()}
        />
      );
    }
    if (activeView === "notifications") {
      return (
        <NotificationsView
          onOpenDesk={() => setDeskMode("float")}
          onOpenTracking={() => setActiveView("tracking")}
        />
      );
    }
    if (activeView === "settings") return <SettingsView />;
    if (activeView === "profile") return <ProfileView />;
    if (activeView === "audio") return <AudioLibraryView onPlayEpisode={() => handlePlayClick()} />;

    return (
      <div className="pt-8 pb-28">
        <div className="px-4">
          <TopHeadlinesSlider />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <CategoryBar />
          <IntelligenceSidebar mobile className="mb-7 lg:hidden" />

          <div
            className={cn(
              "grid grid-cols-1 items-start gap-7",
              !deskPinned && "lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-9"
            )}
          >
            <section className="min-w-0" aria-label="Latest news">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground dark:text-white">Latest news</h2>
                  <p className="mt-1 text-xs text-muted-foreground dark:text-neutral-500">Reporting from sources across your selected topics</p>
                </div>
                <button type="button" onClick={() => setActiveView("latest")} className="hidden text-xs font-medium text-muted-foreground dark:text-neutral-400 transition hover:text-foreground dark:hover:text-white sm:inline">
                  View all
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-foreground/[.08] bg-chrome/55 divide-y divide-foreground/[.08]">
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
                      readTime={calculateReadTime(article.content || "")}
                      likeCount={article.likeCount || 0}
                      repostCount={article.repostCount || 0}
                      replyCount={article.replyCount || 0}
                      bookmarkCount={article.bookmarkCount || 0}
                      onChatClick={() => openDeskWithArticle(article)}
                      onPlayClick={() => handlePlayClick()}
                      onShareClick={() =>
                        toast({ title: "Link ready", description: "Share sheet will connect when publishing is enabled." })
                      }
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

            {!deskPinned && <IntelligenceSidebar className="hidden lg:block" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative min-h-screen bg-transparent text-foreground selection:bg-sidebar-primary/30 overflow-x-clip", isFocusOpen ? "z-[100]" : "z-10")}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main
        className={cn(
          "min-w-0 transition-[margin,padding] duration-300 ease-out",
          collapsed ? "md:ms-16" : "md:ms-[220px]",
          deskPinned && "lg:pe-[392px]"
        )}
      >
        {renderView()}

        <LayoutGroup id="intelligence-desk">
          <DynamicPane
            mode={deskMode}
            onModeChange={setDeskMode}
            contextArticle={deskContext}
            onClearContext={() => setDeskContext(null)}
            pendingPrompt={pendingPrompt}
            onConsumePrompt={() => setPendingPrompt(null)}
          />
          <ActivityIsland
            deskCompact={deskMode === "compact"}
            audioOpen={isAudioOpen && !isAudioExpanded}
            audioPlaying={isAudioPlaying}
            onOpenDesk={() => {
              setIsAudioExpanded(false);
              setDeskMode("float");
            }}
            onToggleAudioPlay={() => setIsAudioPlaying((playing) => !playing)}
            onExpandAudio={() => setIsAudioExpanded(true)}
            onCloseAudio={() => {
              setIsAudioOpen(false);
              setIsAudioExpanded(false);
            }}
          />
        </LayoutGroup>
        <AudioHub
          isOpen={isAudioOpen}
          expanded={isAudioExpanded}
          isPlaying={isAudioPlaying}
          onCollapse={() => setIsAudioExpanded(false)}
          onTogglePlay={() => setIsAudioPlaying((playing) => !playing)}
          onClose={() => {
            setIsAudioOpen(false);
            setIsAudioExpanded(false);
          }}
        />
        <ArticleFocusMode
          isOpen={isFocusOpen}
          onClose={() => setIsFocusOpen(false)}
          article={focusArticle}
          onAskDesk={(article, question) => {
            openDeskWithArticle(article);
            if (question) setPendingPrompt(question);
          }}
        />
        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} items={commandItems} />
      </main>
    </div>
  );
}
