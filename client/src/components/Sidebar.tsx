import { useState } from "react";
import {
  Home,
  FolderKanban,
  Settings,
  User,
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  Star,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "Daily Feed", id: "feed", href: "#" },
  { icon: Activity, label: "Live Trends", id: "trending", href: "#" },
  { icon: FolderKanban, label: "Explore News", id: "categories", href: "#" },
  { icon: Star, label: "Your Collection", id: "saved", href: "#" },
  { icon: Settings, label: "Preferences", id: "settings", href: "#" },
];

export default function Sidebar() {
  const { user } = useAuth();
  const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useSidebar();
  const [activeItem, setActiveItem] = useState("feed");

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 68 : 240,
          x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -240 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className={cn(
          "fixed z-50 top-0 left-0 h-[100dvh] overflow-hidden",
          "bg-white/[0.02] border-r border-white/10 backdrop-blur-sm shadow-2xl shadow-black/40",
          "flex flex-col"
        )}
      >
        {/* Toggle Button Container */}
        <div className={cn(
          "flex h-14 items-center px-3 mb-2 transition-all duration-300",
          collapsed ? "justify-center" : "justify-end"
        )}>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCollapse}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 text-neutral-400 hover:text-white transition-colors"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </motion.button>

          <button
            className="md:hidden h-8 w-8 flex items-center justify-center rounded-lg border border-white/5 text-neutral-400 hover:text-white"
            onClick={closeMobile}
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar pt-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                whileHover={{ x: collapsed ? 0 : 4 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative flex items-center rounded-xl transition-all duration-300 group overflow-hidden border border-transparent",
                  collapsed ? "h-10 w-10 mx-auto justify-center" : "h-10 px-3 gap-3 justify-start",
                  isActive
                    ? "bg-white/10 border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-glow"
                    className="absolute inset-0 bg-gradient-to-r from-sidebar-primary/20 via-sidebar-primary/5 to-transparent z-0 pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <item.icon className={cn(
                  "h-[18px] w-[18px] z-10 transition-all duration-300 group-hover:scale-110 shrink-0",
                  isActive ? "text-sidebar-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" : ""
                )} />

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-[13px] font-medium z-10 whitespace-nowrap tracking-tight"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && !collapsed && (
                  <motion.div
                    layoutId="active-item-dot"
                    className="ml-auto h-1 w-1 rounded-full bg-sidebar-primary shadow-[0_0_10px_rgba(59,130,246,1)] z-10"
                  />
                )}

                {collapsed && (
                  <div className="absolute left-[72px] px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-2xl z-[60] -translate-x-2 group-hover:translate-x-0">
                    {item.label}
                  </div>
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 pb-4 mt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className={cn(
              "w-full flex items-center rounded-xl text-neutral-500 hover:text-white transition-all group overflow-hidden border border-transparent hover:bg-white/[0.04]",
              collapsed ? "h-10 w-10 mx-auto justify-center" : "h-10 px-3 gap-3"
            )}
          >
            <div className="relative shrink-0">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-black/50" />
            </div>
            {!collapsed && <span className="text-[12px] font-medium tracking-tight">Updates</span>}
          </motion.button>
        </div>

        {/* User Card */}
        <div className="p-3 mt-auto">
          <div className={cn(
            "rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-500 overflow-hidden",
            collapsed ? "p-1 flex flex-col items-center gap-1" : "p-2.5 flex flex-col gap-3"
          )}>
            <div className={cn(
              "flex items-center gap-3",
              collapsed ? "w-full justify-center" : "w-full"
            )}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-8 w-8 rounded-lg border border-white/10 bg-neutral-900 flex items-center justify-center text-white text-[11px] font-bold shadow-xl shrink-0 cursor-pointer"
              >
                {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
              </motion.div>

              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-white truncate leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate mt-1 font-bold tracking-widest uppercase opacity-60">Subscriber</p>
                </div>
              )}
            </div>

            {!collapsed ? (
              <div className="flex gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 h-7 flex items-center justify-center rounded-lg border border-white/5 text-neutral-400 hover:text-white transition-all text-[10px] font-bold gap-1.5"
                >
                  <User size={12} />
                  Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}
                  whileTap={{ scale: 0.98 }}
                  className="h-7 w-7 flex items-center justify-center rounded-lg border border-white/5 text-neutral-400 transition-all"
                >
                  <LogOut size={12} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-neutral-400"
              >
                <LogOut size={14} />
              </motion.button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
