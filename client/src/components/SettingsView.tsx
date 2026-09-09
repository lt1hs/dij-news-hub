import { useState } from "react";
import { Moon, Bell, Globe2, Shield, Sparkles, Volume2 } from "lucide-react";
import ViewShell from "./ViewShell";
import { cn } from "@/lib/utils";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition",
        checked ? "bg-sidebar-primary" : "bg-white/10"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
          checked ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

export default function SettingsView() {
  const [briefing, setBriefing] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [sound, setSound] = useState(false);
  const [dark, setDark] = useState(true);
  const [compactFeed, setCompactFeed] = useState(false);

  const rows = [
    { icon: Sparkles, label: "Morning & evening briefs", hint: "Auto-generate desk summaries twice daily", value: briefing, set: setBriefing },
    { icon: Bell, label: "Tracker alerts", hint: "Notify when watched topics move", value: alerts, set: setAlerts },
    { icon: Volume2, label: "Audio cues", hint: "Soft chime for live ticker breaks", value: sound, set: setSound },
    { icon: Moon, label: "Dark desk", hint: "Keep the intelligence-desk theme", value: dark, set: setDark },
    { icon: Globe2, label: "Compact feed density", hint: "Tighter cards on For You", value: compactFeed, set: setCompactFeed },
  ];

  return (
    <ViewShell
      eyebrow="Preferences"
      title="Settings"
      description="Tune briefing cadence, alerts, and how the desk behaves."
    >
      <section className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0b121c]/55 divide-y divide-white/[.08]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.03] text-neutral-400">
                <row.icon size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{row.label}</p>
                <p className="mt-1 text-[12px] text-neutral-500">{row.hint}</p>
              </div>
            </div>
            <Toggle checked={row.value} onChange={row.set} />
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-xl border border-white/[.08] bg-white/[.025] p-5">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-4 w-4 text-sidebar-primary" />
          <div>
            <h2 className="text-sm font-semibold text-white">Privacy & sources</h2>
            <p className="mt-1 text-[13px] leading-6 text-neutral-500">
              Desk answers stay on your session. Source comparisons cite publishers from your feed and never invent quotes.
            </p>
          </div>
        </div>
      </section>
    </ViewShell>
  );
}
