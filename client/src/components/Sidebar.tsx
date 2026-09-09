import { Home, Newspaper, Settings, X, Bell, Bookmark, Activity, Zap, LogOut, PanelLeftClose, PanelLeftOpen, Radar, Headphones, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";
import { useLanguage, useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

export default function Sidebar({ activeView = "explore", onViewChange }: SidebarProps) {
  const { user } = useAuth();
  const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useSidebar();
  const { dir } = useLanguage();
  const t = useT();
  const activeItem = activeView;
  const u = user as any;

  const NAV_ITEMS = [
    { icon: Home, label: t("sidebar.forYou"), id: "explore" },
    { icon: Newspaper, label: t("sidebar.headlines"), id: "headlines" },
    { icon: Activity, label: t("sidebar.latest"), id: "latest" },
    { icon: Radar, label: t("sidebar.tracking"), id: "tracking" },
    { icon: Bookmark, label: t("sidebar.saved"), id: "saved" },
    { icon: Headphones, label: t("sidebar.audio"), id: "audio" },
  ];

  const selectItem = (id: string) => {
    onViewChange?.(id);
    setMobileOpen(false);
  };

  const initials = `${u?.firstName?.[0] || "U"}${u?.lastName?.[0] || ""}`;

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            aria-label={t("sidebar.closeNavigation")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : dir === "rtl" ? 280 : -280 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        className="fixed inset-y-0 start-0 z-[80] flex w-[280px] flex-col overflow-hidden border-e border-foreground/10 bg-chrome-deep/95 shadow-2xl backdrop-blur-2xl md:hidden"
      >
        <div className="flex h-20 items-center justify-between border-b border-foreground/5 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sidebar-primary/30 bg-sidebar-primary/15 shadow-[0_0_24px_rgba(59,130,246,.18)]">
              <Zap size={16} className="text-sidebar-primary" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest text-foreground dark:text-white">
                DIJ<span className="text-sidebar-primary">AI</span>
              </p>
              <p className="text-[9px] uppercase tracking-[.2em] text-muted-foreground dark:text-neutral-500">{t("header.tagline")}</p>
            </div>
          </div>
          <button aria-label={t("sidebar.closeMenu")} onClick={() => setMobileOpen(false)} className="rounded-lg border border-foreground/10 bg-foreground/5 p-2 text-muted-foreground dark:text-neutral-400">
            <X size={17} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 pt-6">
          {NAV_ITEMS.map((item) => {
            const active = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => selectItem(item.id)}
                className={cn(
                  "relative flex h-12 w-full items-center gap-3 overflow-hidden rounded-xl border px-4 text-sm font-semibold transition-all",
                  active ? "border-foreground/10 bg-foreground/[.06] text-foreground dark:text-white" : "border-transparent text-muted-foreground dark:text-neutral-400 hover:bg-foreground/[.04] hover:text-foreground dark:hover:text-white"
                )}
              >
                {active && <span className="absolute inset-y-2 start-0 w-0.5 rounded-e bg-sidebar-primary shadow-[0_0_10px_rgba(59,130,246,.8)]" />}
                <item.icon size={18} className={active ? "text-sidebar-primary" : ""} />
                {item.label}
              </button>
            );
          })}
          <div className="my-3 h-px bg-foreground/[.06]" />
          {[
            { id: "notifications", label: t("sidebar.notifications"), icon: Bell },
            { id: "settings", label: t("sidebar.settings"), icon: Settings },
            { id: "profile", label: t("sidebar.profile"), icon: UserRound },
          ].map((item) => {
            const active = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => selectItem(item.id)}
                className={cn(
                  "relative flex h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-semibold transition",
                  active ? "bg-foreground/[.06] text-foreground dark:text-white" : "text-muted-foreground dark:text-neutral-400 hover:bg-foreground/[.04] hover:text-foreground dark:hover:text-white"
                )}
              >
                <item.icon size={17} className={active ? "text-sidebar-primary" : ""} />
                {item.label}
                {item.id === "notifications" && <span className="ms-auto h-1.5 w-1.5 rounded-full bg-red-500" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-foreground/5 p-4">
          <button
            type="button"
            onClick={() => selectItem("profile")}
            className="flex w-full items-center gap-3 rounded-xl border border-foreground/5 bg-foreground/[.025] p-3 text-start"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-950 text-xs font-bold text-foreground dark:text-white">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground dark:text-white">{u?.firstName || t("sidebar.user")} {u?.lastName || ""}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">{t("sidebar.proTier")}</p>
            </div>
            <button
              type="button"
              aria-label={t("sidebar.signOut")}
              className="rounded-md p-1 text-muted-foreground dark:text-neutral-500 transition hover:text-foreground dark:hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                window.location.href = "/api/logout";
              }}
            >
              <LogOut size={16} />
            </button>
          </button>
        </div>
      </motion.aside>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: "spring", stiffness: 360, damping: 36 }}
        className="fixed inset-y-0 start-0 z-50 hidden flex-col overflow-hidden border-e border-foreground/[.06] bg-chrome/80 dark:bg-foreground/[.015] py-4 shadow-[4px_0_24px_rgba(15,23,42,.06)] dark:shadow-[4px_0_28px_rgba(0,0,0,.2)] backdrop-blur-2xl md:flex"
      >
        <div className={cn("mb-6 flex h-10 shrink-0 items-center px-3", collapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sidebar-primary/25 bg-sidebar-primary/10 shadow-[0_0_22px_rgba(59,130,246,.18)]">
              <Zap size={16} className="text-sidebar-primary" fill="currentColor" />
            </div>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="whitespace-nowrap">
                <p className="text-sm font-black tracking-widest text-foreground dark:text-white">
                  DIJ<span className="text-sidebar-primary">AI</span>
                </p>
                <p className="text-[8px] uppercase tracking-[.18em] text-muted-foreground dark:text-neutral-500">{t("header.tagline")}</p>
              </motion.div>
            )}
          </div>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} aria-label={t("sidebar.collapseSidebar")} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground dark:text-neutral-500 transition hover:bg-foreground/5 hover:text-foreground dark:hover:text-white">
              <PanelLeftClose size={16} className="rtl-flip" />
            </button>
          )}
        </div>

        <nav className={cn("flex flex-1 flex-col gap-1.5 overflow-y-auto", collapsed ? "items-center" : "px-3")}>
          {NAV_ITEMS.map((item) => {
            const active = activeItem === item.id;
            return (
              <motion.button
                key={item.id}
                title={collapsed ? item.label : undefined}
                whileHover={{ x: collapsed ? 0 : 3, scale: collapsed ? 1.06 : 1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => selectItem(item.id)}
                className={cn(
                  "relative flex h-10 items-center rounded-xl border transition-all",
                  collapsed ? "w-10 justify-center" : "w-full gap-3 px-3",
                  active
                    ? "border-foreground/10 bg-foreground/[.07] text-sidebar-primary shadow-[0_0_20px_rgba(59,130,246,.12)]"
                    : "border-transparent text-muted-foreground dark:text-neutral-500 hover:bg-foreground/[.04] hover:text-foreground dark:hover:text-white"
                )}
              >
                <item.icon size={17} className="shrink-0" />
                {!collapsed && <span className={cn("whitespace-nowrap text-xs font-semibold", active ? "text-foreground dark:text-white" : "")}>{item.label}</span>}
                {active && <span className="absolute -start-3 h-5 w-0.5 rounded-e bg-sidebar-primary shadow-[0_0_8px_rgba(59,130,246,.9)]" />}
              </motion.button>
            );
          })}
        </nav>

        <div className={cn("flex flex-col gap-1.5", collapsed ? "items-center" : "px-3")}>
          <button
            title={t("sidebar.notifications")}
            onClick={() => selectItem("notifications")}
            className={cn(
              "relative flex h-10 items-center rounded-xl text-muted-foreground dark:text-neutral-500 transition hover:bg-foreground/[.04] hover:text-foreground dark:hover:text-white",
              collapsed ? "w-10 justify-center" : "w-full gap-3 px-3",
              activeItem === "notifications" && "bg-foreground/[.05] text-foreground dark:text-white"
            )}
          >
            <Bell size={17} />
            <span className="absolute start-7 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            {!collapsed && <span className="text-xs font-semibold">{t("sidebar.notifications")}</span>}
          </button>
          <button
            title={t("sidebar.settings")}
            onClick={() => selectItem("settings")}
            className={cn(
              "flex h-10 items-center rounded-xl text-muted-foreground dark:text-neutral-500 transition hover:bg-foreground/[.04] hover:text-foreground dark:hover:text-white",
              collapsed ? "w-10 justify-center" : "w-full gap-3 px-3",
              activeItem === "settings" && "bg-foreground/[.05] text-foreground dark:text-white"
            )}
          >
            <Settings size={17} />
            {!collapsed && <span className="text-xs font-semibold">{t("sidebar.settings")}</span>}
          </button>
          <button
            type="button"
            title={t("sidebar.profile")}
            onClick={() => selectItem("profile")}
            className={cn(
              "mt-1 flex items-center overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[.025] transition hover:border-foreground/20",
              collapsed ? "h-9 w-9 justify-center" : "w-full gap-3 p-2",
              activeItem === "profile" && "border-sidebar-primary/30"
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-950 text-[10px] font-black text-foreground dark:text-white">{initials}</div>
            {!collapsed && (
              <div className="min-w-0 text-start">
                <p className="truncate text-xs font-semibold text-foreground dark:text-white">{u?.firstName || t("sidebar.user")}</p>
                <p className="text-[8px] uppercase tracking-widest text-emerald-400">{t("sidebar.proTier")}</p>
              </div>
            )}
          </button>
          {collapsed && (
            <button onClick={() => setCollapsed(false)} aria-label={t("sidebar.expandSidebar")} className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[.04] text-muted-foreground dark:text-neutral-400 transition hover:border-sidebar-primary/30 hover:text-sidebar-primary">
              <PanelLeftOpen size={16} className="rtl-flip" />
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
}
