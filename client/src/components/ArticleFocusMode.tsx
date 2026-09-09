import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUp, Bookmark, Check, ChevronRight, Headphones, Lightbulb, Link2, List, Mic, Pause, Play, Quote, Share2, Sparkles, X } from "lucide-react";
import type { Article } from "@shared/schema";

interface ArticleFocusModeProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  onAskDesk?: (article: Article, question?: string) => void;
}

const SUMMARY_POINTS = [
  "The development is moving from isolated trials toward broader commercial deployment.",
  "Multiple independent sources agree on the direction, while timelines and near-term impact remain uncertain.",
  "The most important next signal will be adoption data rather than additional product announcements.",
];

export default function ArticleFocusMode({ isOpen, onClose, article, onAskDesk }: ArticleFocusModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [question, setQuestion] = useState("");
  if (!article) return null;

  const sources = article.sources?.length ? article.sources : ["Reuters", "Associated Press", "Financial Times"];
  const related = [
    "Industry leaders increase spending as adoption accelerates",
    "Regulators outline the next phase of reporting requirements",
    "What the latest shift means for consumers and smaller companies",
  ];

  const submitQuestion = () => {
    if (!question.trim()) return;
    onAskDesk?.(article, question.trim());
    setQuestion("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]">
          <motion.button aria-label="Close article" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 h-full w-full bg-black/75 backdrop-blur-md" />

          <motion.article
            initial={{ opacity: 0, y: 30, scale: .985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: .985 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="absolute inset-0 overflow-hidden bg-[#0b1017] sm:inset-3 sm:rounded-2xl sm:border sm:border-white/[.1] sm:shadow-[0_35px_100px_rgba(0,0,0,.8)] lg:left-auto lg:w-[min(860px,calc(100vw-1.5rem))]"
          >
            <header className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/[.08] bg-[#0b1017]/90 px-4 backdrop-blur-xl sm:px-6">
              <button onClick={onClose} className="flex items-center gap-2 text-sm text-neutral-300"><ArrowLeft size={18} /><span className="hidden sm:inline">Back</span></button>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500"><Check size={13} className="text-emerald-400" />Brief ready</div>
              <div className="flex items-center gap-1">
                <button className="flex h-9 items-center gap-1.5 rounded-lg border border-white/[.08] px-3 text-xs text-neutral-300"><Headphones size={14} />Pod</button>
                <button aria-label="Save" className="flex h-9 w-9 items-center justify-center text-neutral-400"><Bookmark size={16} /></button>
                <button aria-label="Share" className="flex h-9 w-9 items-center justify-center text-neutral-400"><Share2 size={16} /></button>
                <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center text-neutral-400"><X size={18} /></button>
              </div>
            </header>

            <div className="h-full overflow-y-auto px-5 pb-32 pt-24 custom-scrollbar sm:px-10">
              <div className="mx-auto max-w-[680px]">
                <div className="mb-5 flex items-center gap-2 text-xs text-neutral-500"><span className="font-medium text-sidebar-primary">{article.category}</span><span>·</span><span>{sources.length} sources</span><span>·</span><span>Updated recently</span></div>
                {article.imageUrl && <img src={article.imageUrl} alt="" className="mb-7 aspect-[16/8.5] w-full rounded-xl object-cover" />}
                <h1 className="text-3xl font-semibold leading-[1.16] tracking-[-.025em] text-white sm:text-4xl">{article.title}</h1>
                <p className="mt-4 text-sm leading-6 text-neutral-500">{article.summary}</p>

                <ArticleSection icon={List} title="Summary">
                  <ul className="space-y-4">
                    {SUMMARY_POINTS.map((point) => <li key={point} className="flex gap-3 text-[15px] leading-7 text-neutral-300"><span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />{point}</li>)}
                  </ul>
                </ArticleSection>

                <ArticleSection icon={Link2} title="Sources">
                  <div className="overflow-hidden rounded-xl border border-white/[.08] bg-white/[.02] divide-y divide-white/[.07]">
                    {[...sources, "The Verge", "Industry Monitor"].slice(0, 3).map((source, index) => (
                      <button key={`${source}-${index}`} className="flex w-full items-start justify-between gap-4 p-4 text-left transition hover:bg-white/[.025]"><div><p className="text-sm font-medium text-neutral-200">{source}</p><p className="mt-1 text-xs leading-5 text-neutral-500">{related[index]}</p></div><span className="shrink-0 text-[10px] text-neutral-600">{index + 1}h ago</span></button>
                    ))}
                    <button className="flex w-full items-center justify-center gap-1.5 py-3 text-xs text-neutral-400">View all {Math.max(sources.length, 14)} sources <ChevronRight size={13} /></button>
                  </div>
                </ArticleSection>

                <ArticleSection icon={Lightbulb} title="Insights" description="Questions worth considering as this story develops.">
                  <div className="grid gap-3">
                    <button className="rounded-xl border border-white/[.08] bg-white/[.025] p-5 text-left text-lg leading-7 text-neutral-200 transition hover:border-white/[.16]">What second-order effects could matter more than the initial announcement?</button>
                    <button className="rounded-xl border border-white/[.08] bg-white/[.025] p-5 text-left text-lg leading-7 text-neutral-200 transition hover:border-white/[.16]">Which assumptions in the current coverage remain unverified?</button>
                  </div>
                </ArticleSection>

                <ArticleSection icon={Quote} title="Perspectives" description="An alternative analysis selected from the source set.">
                  <button className="w-full rounded-xl border border-white/[.08] bg-white/[.025] p-5 text-left transition hover:border-white/[.16]"><p className="text-lg leading-7 text-neutral-200">The practical impact may depend less on the headline technology and more on how quickly existing organizations can change their workflows.</p><p className="mt-3 text-xs text-neutral-500">Analysis from Financial Times</p></button>
                </ArticleSection>

                <ArticleSection icon={Headphones} title="Clips" description="Key moments extracted from related podcasts and interviews.">
                  <div className="rounded-xl border border-white/[.08] bg-white/[.025] p-5">
                    <p className="text-lg leading-7 text-neutral-200">“The adoption curve is becoming much easier to measure because deployments are finally moving into normal operating budgets.”</p>
                    <p className="mt-3 text-xs text-neutral-500">The Technology Brief</p>
                    <div className="mt-5 flex items-center gap-3"><button onClick={() => setIsPlaying(!isPlaying)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950">{isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="ml-0.5" />}</button><div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: isPlaying ? "68%" : "12%" }} transition={{ duration: 8 }} className="h-full bg-sidebar-primary" /></div><span className="text-[10px] tabular-nums text-neutral-500">0:00 / 1:49</span></div>
                  </div>
                </ArticleSection>

                <ArticleSection icon={Sparkles} title="Related stories">
                  <div className="divide-y divide-white/[.08] border-y border-white/[.08]">
                    {related.map((item, index) => <button key={item} className="grid w-full grid-cols-[minmax(0,1fr)_72px] gap-4 py-4 text-left"><div><p className="text-[15px] leading-6 text-neutral-200">{item}</p><p className="mt-1 text-xs text-neutral-600">{index + 3}h ago</p></div>{article.imageUrl && <img src={article.imageUrl} alt="" className="h-14 w-[72px] rounded-lg object-cover" />}</button>)}
                  </div>
                </ArticleSection>

                <div className="mt-12 flex justify-center gap-3"><button className="flex items-center gap-2 rounded-full bg-white/[.06] px-6 py-3 text-sm text-neutral-300"><Bookmark size={16} />Save</button><button className="flex items-center gap-2 rounded-full bg-white/[.06] px-6 py-3 text-sm text-neutral-300"><Share2 size={16} />Share</button></div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#0b1017] via-[#0b1017] to-transparent px-4 pb-4 pt-8 sm:px-8">
              <div className="mx-auto flex h-14 max-w-[680px] items-center gap-3 rounded-2xl border border-white/[.1] bg-white/[.06] px-4 shadow-2xl backdrop-blur-xl"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitQuestion()} placeholder="Ask about this story…" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600" /><button type="button" className="text-neutral-500"><Mic size={19} /></button><button type="button" onClick={submitQuestion} disabled={!question.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950 disabled:bg-white/10 disabled:text-neutral-600"><ArrowUp size={17} /></button></div>
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}

function ArticleSection({ icon: Icon, title, description, children }: { icon: typeof List; title: string; description?: string; children: ReactNode }) {
  return <section className="mt-10"><div className="mb-4"><div className="flex items-center gap-2"><Icon size={17} className="text-neutral-500" /><h2 className="text-xl font-semibold text-white">{title}</h2></div>{description && <p className="mt-2 text-sm leading-6 text-neutral-500">{description}</p>}</div>{children}</section>;
}
