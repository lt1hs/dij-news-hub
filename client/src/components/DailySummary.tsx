import { 
  Newspaper, 
  CalendarDays, 
  Globe, 
  TrendingUp, 
  ExternalLink, 
  Cpu, 
  Banknote, 
  Droplets, 
  Scale,
  List,
  Smile,
  Globe2,
  Briefcase,
  LineChart,
  Clock,
  ShieldCheck,
  Bookmark,
  Share2,
  RefreshCw
} from "lucide-react";

interface DailySummaryProps {
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
  keyStories: string[];
  date: string;
}

export default function DailySummary({ summary, sentiment, keyStories, date }: DailySummaryProps) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-300/90";
      case "negative":
        return "text-red-300/90";
      default:
        return "text-blue-300/90";
    }
  };

  const getSentimentText = () => {
    switch (sentiment) {
      case "positive":
        return "Market-positive";
      case "negative":
        return "Market-negative";
      default:
        return "Market-neutral";
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex md:p-8 pt-6 pr-6 pb-6 pl-6 items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg border border-white/10 bg-white/10 inline-flex items-center justify-center">
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-white">Daily News Summary</h2>
            <p className="text-xs text-neutral-400 mt-1">Curated highlights from trusted sources</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-300">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
            <CalendarDays className="h-4 w-4" />
            <span>{date}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
            <Globe className="h-4 w-4" />
            <span>Global</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Summary + Headlines */}
        <div className="md:col-span-2 space-y-4">
          {/* At a glance */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold tracking-tight text-white">At a glance</h3>
              <span className={`inline-flex items-center gap-1 text-xs ${getSentimentColor()}`}>
                <TrendingUp className="h-4 w-4" />
                {getSentimentText()}
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              {keyStories.map((story, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-300/70"></span>
                  {story}
                </li>
              ))}
            </ul>
          </div>

          {/* Top Headlines */}
          <div className="rounded-xl border border-white/10 bg-black/30">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-base font-semibold tracking-tight text-white">Top headlines</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-300 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90"></span>
                  Verified sources
                </span>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              <a href="#" className="group block p-4 hover:bg-white/[0.04] transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-white/90">Tech giants post stronger-than-expected quarterly results</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                        <Cpu className="h-3.5 w-3.5" />
                        Tech
                      </span>
                      <span>•</span>
                      <span>Bloomwire</span>
                      <span>•</span>
                      <span>2h ago</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-neutral-200" />
                </div>
              </a>
              <a href="#" className="group block p-4 hover:bg-white/[0.04] transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-white/90">Inflation cools as core prices ease for third straight month</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                        <Banknote className="h-3.5 w-3.5" />
                        Economy
                      </span>
                      <span>•</span>
                      <span>JournalDaily</span>
                      <span>•</span>
                      <span>3h ago</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-neutral-200" />
                </div>
              </a>
              <a href="#" className="group block p-4 hover:bg-white/[0.04] transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-white/90">OPEC signals steady output as demand outlook stabilizes</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                        <Droplets className="h-3.5 w-3.5" />
                        Energy
                      </span>
                      <span>•</span>
                      <span>GlobalWire</span>
                      <span>•</span>
                      <span>4h ago</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-neutral-200" />
                </div>
              </a>
              <a href="#" className="group block p-4 hover:bg-white/[0.04] transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-white/90">EU unveils new AI rules focusing on transparency and safety</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                        <Scale className="h-3.5 w-3.5" />
                        Policy
                      </span>
                      <span>•</span>
                      <span>EuroPost</span>
                      <span>•</span>
                      <span>5h ago</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-neutral-200" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Highlights / Metrics */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <h3 className="text-sm font-semibold tracking-tight text-white">Highlights</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Stories</span>
                  <List className="h-4 w-4 text-neutral-300" />
                </div>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white">24</p>
                <p className="text-xs text-neutral-400">last 24h</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Sentiment</span>
                  <Smile className="h-4 w-4 text-neutral-300" />
                </div>
                <p className={`mt-1 text-lg font-semibold tracking-tight ${getSentimentColor()}`}>
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </p>
                <p className="text-xs text-neutral-400">balanced</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <h3 className="text-sm font-semibold tracking-tight text-white">Topics</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="text-xs inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-200 hover:bg-white/10 hover:border-white/20 transition">
                <Globe2 className="h-3.5 w-3.5" />
                World
              </button>
              <button className="text-xs inline-flex items-center gap-1 rounded-md border border-white/10 bg-white px-2.5 py-1 text-neutral-900 hover:bg-neutral-100 transition">
                <Briefcase className="h-3.5 w-3.5" />
                Business
              </button>
              <button className="text-xs inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-200 hover:bg-white/10 hover:border-white/20 transition">
                <Cpu className="h-3.5 w-3.5" />
                Tech
              </button>
              <button className="text-xs inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-200 hover:bg-white/10 hover:border-white/20 transition">
                <LineChart className="h-3.5 w-3.5" />
                Markets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-6 md:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-neutral-300">
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
            <Clock className="h-3.5 w-3.5" />
            Updated 5m ago
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Source integrity
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/15 hover:border-white/20 transition">
            <Bookmark className="h-4 w-4" />
            Save
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/15 hover:border-white/20 transition">
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}