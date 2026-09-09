import { useState, useEffect } from "react";
import { Search, Menu, ArrowRight, MessageCircle, Sparkles, Command } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import LiveTicker from "@/components/LiveTicker";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onPaneToggle?: () => void;
}

export default function Header({ onPaneToggle }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const { setMobileOpen, collapsed } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <>
      <div className="h-24"></div>

      <motion.header
        layout
        initial={false}
        animate={{ top: scrolled ? 8 : 16 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className={cn("fixed z-[60] left-4 right-4 transition-[left] duration-300", collapsed ? "md:left-20" : "md:left-[236px]")}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "relative w-full border border-white/10 bg-[#0b1320]/70 backdrop-blur-xl px-3 sm:px-4 transition-all duration-300 shadow-2xl shadow-black/40",
            scrolled ? "rounded-t-xl rounded-b-none border-b-white/5 bg-[#0b1320]/90 py-1.5 shadow-primary/5" : "rounded-xl py-2.5"
          )}
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between gap-4 w-full">
            <a href="#" className="group flex items-center gap-3 focus:outline-none">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className={cn("rounded-xl bg-gradient-to-br from-sidebar-primary/20 to-blue-500/10 border border-white/10 flex items-center justify-center shadow-lg transition-all", scrolled ? "h-8 w-8" : "h-9 w-9")}
              >
                <Sparkles className="h-4.5 w-4.5 text-sidebar-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </motion.div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[17px] font-bold tracking-tight text-white transition-colors group-hover:text-sidebar-primary">
                  News<span className="opacity-80">Fusion</span>
                </span>
                {!scrolled && <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Engineered for Truth</span>}
              </div>
            </a>

            <div className="flex flex-1 items-center justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className={cn("hidden md:flex w-full items-center gap-3 bg-white/[0.05] border border-white/5 rounded-xl px-4 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all group", scrolled ? "max-w-[260px] py-1.5" : "max-w-sm py-2")}
              >
                <Search size={16} className="group-hover:text-sidebar-primary transition-colors" />
                <span className="text-[13px] font-medium pr-8 whitespace-nowrap">Search Information</span>
                <div className="flex items-center gap-0.5 bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-[10px]">
                  <Command size={10} />
                  <span>K</span>
                </div>
              </motion.button>

              <div className="h-6 w-px bg-white/10 mx-1 hidden md:block" />

              {onPaneToggle && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPaneToggle}
                  className="relative p-2 rounded-xl text-neutral-400 hover:text-sidebar-primary hover:bg-sidebar-primary/10 transition-all"
                  title="Daily Insights"
                >
                  <MessageCircle size={20} />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sidebar-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </motion.button>
              )}

              <ThemeToggle />

              {isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className={cn("hidden md:flex items-center justify-center rounded-xl text-[13px] font-bold text-neutral-400 hover:text-white transition-all", scrolled ? "px-3 py-1.5" : "px-4 py-2")}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="bg-sidebar-primary text-white px-5 py-2 rounded-xl text-[13px] font-bold shadow-lg shadow-sidebar-primary/20 hover:shadow-sidebar-primary/40 transition-all flex items-center gap-2"
                >
                  Join Fusion
                  <ArrowRight size={14} />
                </motion.button>
              )}

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-white/10 text-neutral-400 hover:text-white bg-white/5"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div layout className={cn("transition-all duration-300", scrolled ? "mt-0" : "mt-2")}>
          <LiveTicker compact={scrolled} />
        </motion.div>
      </motion.header>
    </>
  );
}
