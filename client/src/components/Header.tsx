import { useState, useEffect } from "react";
import { Search, Menu, ChevronDown, ArrowRight, MessageCircle, Sparkles, Command } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onPaneToggle?: () => void;
}

export default function Header({ onPaneToggle }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const { setMobileOpen } = useSidebar();
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

      <header className="fixed z-[60] top-4 left-1/2 -translate-x-1/2 w-[min(1200px,94vw)]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "relative w-full rounded-[15px] border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-2.5 transition-all duration-300 shadow-2xl shadow-black/40",
            scrolled ? "bg-white/[0.05] border-white/20 shadow-primary/5" : ""
          )}
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between gap-4 w-full">
            <a href="#" className="group flex items-center gap-3 focus:outline-none">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-sidebar-primary/20 to-blue-500/10 border border-white/10 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="h-4.5 w-4.5 text-sidebar-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </motion.div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[17px] font-bold tracking-tight text-white transition-colors group-hover:text-sidebar-primary">
                  News<span className="opacity-80">Fusion</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Engineered for Truth</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {[
                { label: "Feed", href: "#" },
                { label: "Trending", href: "#" },
                { label: "Categories", href: "#", hasIcon: true },
                { label: "Saved", href: "#" },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  className="px-4 py-2 rounded-xl text-[14px] font-medium text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1"
                >
                  {item.label}
                  {item.hasIcon && <ChevronDown size={14} className="opacity-50" />}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="hidden md:flex items-center gap-3 bg-white/[0.05] border border-white/5 rounded-xl px-4 py-2 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all group"
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
                  className="hidden md:flex items-center justify-center px-4 py-2 rounded-xl text-[13px] font-bold text-neutral-400 hover:text-white transition-all"
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
      </header>
    </>
  );
}