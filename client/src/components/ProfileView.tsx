import { LogOut, Mail, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ViewShell from "./ViewShell";

export default function ProfileView() {
  const { user } = useAuth();
  const u = user as any;
  const name = [u?.firstName, u?.lastName].filter(Boolean).join(" ") || "Intelligence member";
  const initials = `${u?.firstName?.[0] || "U"}${u?.lastName?.[0] || ""}`;

  return (
    <ViewShell
      eyebrow="Account"
      title="Profile"
      description="Your desk identity, tier, and session controls."
      actions={
        <button
          onClick={() => {
            window.location.href = "/api/logout";
          }}
          className="flex h-9 items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.03] px-3 text-xs text-neutral-300 transition hover:border-rose-400/30 hover:text-rose-300"
        >
          <LogOut size={14} /> Sign out
        </button>
      }
    >
      <section className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0b121c]/55">
        <div className="relative border-b border-white/[.08] p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_15%_0%,rgba(35,145,255,.14),transparent_60%)]" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-600 to-neutral-950 text-lg font-black text-white ring-1 ring-white/10">
              {u?.profileImageUrl ? (
                <img src={u.profileImageUrl} alt="" className="h-full w-full rounded-2xl object-cover" />
              ) : (
                initials
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{name}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-emerald-400">Pro tier</p>
              <p className="mt-2 text-sm text-neutral-500">{u?.email || u?.username || "Authenticated session"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-0 sm:grid-cols-3">
          {[
            { icon: Sparkles, label: "Desk chats", value: "Unlimited" },
            { icon: ShieldCheck, label: "Source trust", value: "Verified" },
            { icon: UserRound, label: "Role", value: "Member" },
          ].map((stat) => (
            <div key={stat.label} className="border-t border-white/[.06] p-5 sm:border-t-0 sm:border-l sm:first:border-l-0">
              <stat.icon className="h-4 w-4 text-neutral-500" />
              <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-neutral-600">{stat.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-white/[.08] bg-white/[.025] p-5">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 text-sidebar-primary" />
          <div>
            <h3 className="text-sm font-semibold text-white">Digest delivery</h3>
            <p className="mt-1 text-[13px] leading-6 text-neutral-500">
              Morning briefs can be mirrored to email once delivery is enabled for your workspace.
            </p>
          </div>
        </div>
      </section>
    </ViewShell>
  );
}
