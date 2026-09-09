import { Newspaper, TrendingUp, Clock } from "lucide-react";

interface CompactDailySummaryProps {
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
  keyStories: string[];
  date: string;
}

export default function CompactDailySummary({ summary, sentiment, keyStories, date }: CompactDailySummaryProps) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive": return "text-emerald-400";
      case "negative": return "text-red-400";
      default: return "text-blue-400";
    }
  };

  return (
    <div className="rounded-lg border border-foreground/10 bg-foreground/5 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-foreground/10">
        <div className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground dark:text-white">Daily Summary</h2>
        </div>
        <span className="text-xs text-muted-foreground dark:text-neutral-400">{date}</span>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Sentiment */}
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3 w-3" />
          <span className={`text-xs font-medium ${getSentimentColor()}`}>
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} outlook
          </span>
        </div>

        {/* Key Stories */}
        <div>
          <h3 className="text-xs font-medium text-foreground dark:text-white mb-2">Key Stories</h3>
          <ul className="space-y-1">
            {keyStories.slice(0, 4).map((story, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground dark:text-neutral-300">
                <span className="mt-1 h-1 w-1 rounded-full bg-neutral-400 flex-shrink-0"></span>
                {story}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
          <span className="flex items-center gap-1 text-xs text-muted-foreground dark:text-neutral-400">
            <Clock className="h-3 w-3" />
            Updated 5m ago
          </span>
          <span className="text-xs text-muted-foreground dark:text-neutral-400">{keyStories.length} stories</span>
        </div>
      </div>
    </div>
  );
}
