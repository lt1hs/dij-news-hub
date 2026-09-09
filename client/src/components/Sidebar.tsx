import { useState } from "react";
import { Home, Newspaper, Settings, X, Bell, Bookmark, Activity, Zap, LogOut, PanelLeftClose, PanelLeftOpen, Radar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "For You", id: "explore" },
  { icon: Newspaper, label: "Headlines", id: "headlines" },
  { icon: Activity, label: "Latest", id: "latest" },
  { icon: Radar, label: "Tracking", id: "tracking" },
  { icon: Bookmark, label: "Saved", id: "saved" },
];

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

export default function Sidebar({ activeView = "explore", onViewChange }: SidebarProps) {
  const { user } = useAuth();
  const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useSidebar();
  const [localActiveItem, setLocalActiveItem] = useState(activeView);
  const activeItem = onViewChange ? activeView : localActiveItem;
  const selectItem = (id: string) => {
    setLocalActiveItem(id);
    onViewChange?.(id);
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            aria-label="Close navigation"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        className="fixed inset-y-0 left-0 z-[80] flex w-[280px] flex-col overflow-hidden border-r border-white/10 bg-[#090d14]/95 shadow-2xl backdrop-blur-2xl md:hidden"
      >
        <div className="flex h-20 items-center justify-between border-b border-white/5 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sidebar-primary/30 bg-sidebar-primary/15 shadow-[0_0_24px_rgba(59,130,246,.18)]">
              <Zap size={16} className="text-sidebar-primary" fill="currentColor" />
            </div>
            <div><p className="text-sm font-black tracking-widest text-white">DIJ<span className="text-sidebar-primary">AI</span></p><p className="text-[9px] uppercase tracking-[.2em] text-neutral-500">Intelligence desk</p></div>
          </div>
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="rounded-lg border border-white/10 bg-white/5 p-2 text-neutral-400"><X size={17} /></button>
        </div>

        <nav className="flex-1 space-y-1.5 p-4 pt-6">
          {NAV_ITEMS.map((item) => {
            const active = activeItem === item.id;
            return (
              <button key={item.id} onClick={() => { selectItem(item.id); setMobileOpen(false); }} className={cn("relative flex h-12 w-full items-center gap-3 overflow-hidden rounded-xl border px-4 text-sm font-semibold transition-all", active ? "border-white/10 bg-white/[.06] text-white" : "border-transparent text-neutral-400 hover:bg-white/[.04] hover:text-white")}>
                {active && <span className="absolute inset-y-2 left-0 w-0.5 rounded-r bg-sidebar-primary shadow-[0_0_10px_rgba(59,130,246,.8)]" />}
                <item.icon size={18} className={active ? "text-sidebar-primary" : ""} />{item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[.025] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-950 text-xs font-bold text-white">{(user as any)?.firstName?.[0] || "U"}{(user as any)?.lastName?.[0] || ""}</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{(user as any)?.firstName || "User"} {(user as any)?.lastName || "Account"}</p><p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Pro tier</p></div>
            <LogOut size={16} className="text-neutral-500" />
          </div>
        </div>
      </motion.aside>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: "spring", stiffness: 360, damping: 36 }}
        className="fixed inset-y-0 left-0 z-50 hidden flex-col overflow-hidden border-r border-white/[.06] bg-white/[.015] py-4 shadow-[4px_0_28px_rgba(0,0,0,.2)] backdrop-blur-2xl md:flex"
      >
        <div className={cn("mb-8 flex h-10 shrink-0 items-center px-3", collapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sidebar-primary/25 bg-sidebar-primary/10 shadow-[0_0_22px_rgba(59,130,246,.18)]"><Zap size={16} className="text-sidebar-primary" fill="currentColor" /></div>
            {!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="whitespace-nowrap"><p className="text-sm font-black tracking-widest text-white">DIJ<span className="text-sidebar-primary">AI</span></p><p className="text-[8px] uppercase tracking-[.18em] text-neutral-500">Intelligence desk</p></motion.div>}
          </div>
          {!collapsed && <button onClick={() => setCollapsed(true)} aria-label="Collapse sidebar" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-white/5 hover:text-white"><PanelLeftClose size={16} /></button>}
        </div>
        <nav className={cn("flex flex-1 flex-col gap-2", collapsed ? "items-center" : "px-3")}>
          {NAV_ITEMS.map((item) => {
            const active = activeItem === item.id;
            return (
              <motion.button key={item.id} title={collapsed ? item.label : undefined} whileHover={{ x: collapsed ? 0 : 3, scale: collapsed ? 1.06 : 1 }} whileTap={{ scale: .96 }} onClick={() => selectItem(item.id)} className={cn("relative flex h-11 items-center rounded-xl border transition-all", collapsed ? "w-10 justify-center" : "w-full gap-3 px-3", active ? "border-white/10 bg-white/[.07] text-sidebar-primary shadow-[0_0_20px_rgba(59,130,246,.12)]" : "border-transparent text-neutral-500 hover:bg-white/[.04] hover:text-white")}>
                <item.icon size={17} className="shrink-0" />
                {!collapsed && <span className={cn("whitespace-nowrap text-xs font-semibold", active ? "text-white" : "")}>{item.label}</span>}
                {active && <span className={cn("absolute h-5 w-0.5 rounded-r bg-sidebar-primary shadow-[0_0_8px_rgba(59,130,246,.9)]", collapsed ? "-left-3" : "-left-3")} />}
              </motion.button>
            );
          })}
        </nav>
        <div className={cn("flex flex-col gap-2", collapsed ? "items-center" : "px-3")}>
          <button title="Notifications" className={cn("relative flex h-10 items-center rounded-xl text-neutral-500 hover:bg-white/[.04] hover:text-white", collapsed ? "w-10 justify-center" : "w-full gap-3 px-3")}><Bell size={17} /><span className="absolute left-7 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />{!collapsed && <span className="text-xs font-semibold">Notifications</span>}</button>
          <button title="Settings" className={cn("flex h-10 items-center rounded-xl text-neutral-500 hover:bg-white/[.04] hover:text-white", collapsed ? "w-10 justify-center" : "w-full gap-3 px-3")}><Settings size={17} />{!collapsed && <span className="text-xs font-semibold">Settings</span>}</button>
          <div className={cn("mt-2 flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[.025]", collapsed ? "h-9 w-9 justify-center" : "w-full gap-3 p-2")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-950 text-[10px] font-black text-white">{(user as any)?.firstName?.[0] || "U"}{(user as any)?.lastName?.[0] || ""}</div>
            {!collapsed && <div className="min-w-0"><p className="truncate text-xs font-semibold text-white">{(user as any)?.firstName || "User"}</p><p className="text-[8px] uppercase tracking-widest text-emerald-400">Pro tier</p></div>}
          </div>
          {collapsed && <button onClick={() => setCollapsed(false)} aria-label="Expand sidebar" className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[.04] text-neutral-400 transition hover:border-sidebar-primary/30 hover:text-sidebar-primary"><PanelLeftOpen size={16} /></button>}
        </div>
      </motion.aside>
    </>
  );
}
