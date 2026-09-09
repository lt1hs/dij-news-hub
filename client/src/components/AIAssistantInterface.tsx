import { useState } from "react";
import { ArrowUp, Check, Circle, Mic, Search, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SUGGESTIONS = ["What changed today?", "Summarize the top technology stories", "Update my AI tracker"];

export function AIAssistantInterface() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const [stage, setStage] = useState(0);

  const runQuery = (value = input) => {
    if (!value.trim()) return;
    setQuery(value.trim());
    setInput("");
    setStage(1);
    window.setTimeout(() => setStage(2), 700);
    window.setTimeout(() => setStage(3), 1500);
  };

  return (
    <div className="flex min-h-full flex-col px-4 pb-24 pt-5">
      <div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-2"><Sparkles size={16} className="text-sidebar-primary" /><h2 className="text-sm font-semibold text-foreground dark:text-white">News assistant</h2></div>{query && <button onClick={() => { setQuery(null); setStage(0); }} className="text-muted-foreground/80 dark:text-neutral-600 hover:text-foreground dark:hover:text-white"><X size={15} /></button>}</div>

      {!query ? (
        <div className="my-auto">
          <h3 className="text-2xl font-medium tracking-tight text-foreground dark:text-white">What would you like to know?</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-neutral-500">Search the news, compare sources, or update a tracker.</p>
          <div className="mt-6 space-y-2">{SUGGESTIONS.map((suggestion) => <button key={suggestion} onClick={() => runQuery(suggestion)} className="block w-full rounded-xl border border-foreground/[.08] p-3 text-left text-xs text-muted-foreground dark:text-neutral-400 transition hover:bg-foreground/[.03] hover:text-foreground dark:hover:text-white">{suggestion}</button>)}</div>
        </div>
      ) : (
        <div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-sidebar-primary/15 px-4 py-3 text-sm leading-6 text-foreground/90 dark:text-neutral-200">{query}</div>
          <div className="mt-7 space-y-3 border-l border-foreground/[.08] pl-4">
            <StatusRow done={stage > 1} active={stage === 1} label="Understanding your request" />
            <StatusRow done={stage > 2} active={stage === 2} label="Searching recent coverage" />
            <StatusRow done={stage >= 3} active={false} label="Sources reviewed and feed updated" />
          </div>
          <AnimatePresence>{stage >= 3 && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-7 text-sm leading-7 text-muted-foreground dark:text-neutral-300"><p>The strongest pattern across today’s coverage is a shift from announcements toward deployment. Technology investment remains resilient, while policy and infrastructure constraints are becoming more important.</p><p className="mt-4">I compared the latest reporting across the sources in your feed. Open any story to inspect its summary, source list, related perspectives, and clips.</p><div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground dark:text-neutral-500"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground/[.08]"><Search size={12} /></span>8 stories · 21 sources</div></motion.div>}</AnimatePresence>
        </div>
      )}

      <div className="absolute inset-x-3 bottom-3 flex h-14 items-center gap-2 rounded-xl border border-foreground/[.1] bg-chrome-raised px-3 shadow-xl"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && runQuery()} placeholder="Ask about the news…" className="min-w-0 flex-1 bg-transparent text-xs text-foreground dark:text-white outline-none placeholder:text-muted-foreground" /><button className="text-muted-foreground dark:text-neutral-500"><Mic size={17} /></button><button onClick={() => runQuery()} disabled={!input.trim()} className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background dark:bg-white dark:text-neutral-950 disabled:bg-foreground/10 disabled:text-muted-foreground/80 dark:disabled:text-neutral-600"><ArrowUp size={15} /></button></div>
    </div>
  );
}

function StatusRow({ done, active, label }: { done: boolean; active: boolean; label: string }) {
  return <div className="flex items-center gap-3 text-xs"><span className="-ml-[22px] flex h-3 w-3 items-center justify-center bg-chrome-deep">{done ? <Check size={13} className="text-emerald-400" /> : <Circle size={8} className={active ? "animate-pulse fill-sidebar-primary text-sidebar-primary" : "text-neutral-700"} />}</span><span className={done ? "text-muted-foreground dark:text-neutral-400" : active ? "text-foreground dark:text-white" : "text-muted-foreground/80 dark:text-neutral-600"}>{label}</span></div>;
}
