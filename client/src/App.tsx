import React, { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/hooks/useSidebar";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import NewsFeed from "@/components/NewsFeed";
import Landing from "@/components/Landing";
import NotFound from "@/pages/not-found";
import PixelBackground from "@/components/PixelBackground";
import type { DeskMode } from "@/components/DynamicPane";

function Router({
  deskMode,
  setDeskMode,
  commandOpen,
  setCommandOpen,
}: {
  deskMode: DeskMode;
  setDeskMode: (mode: DeskMode) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/">
            <NewsFeed
              deskMode={deskMode}
              setDeskMode={setDeskMode}
              commandOpen={commandOpen}
              setCommandOpen={setCommandOpen}
            />
          </Route>
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [deskMode, setDeskMode] = useState<DeskMode>("compact");
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SidebarProvider>
              <div className="min-h-screen relative">
                <PixelBackground />
                <Header
                  deskPinned={deskMode === "pinned"}
                  onSearchOpen={() => setCommandOpen(true)}
                  onPaneToggle={() =>
                    setDeskMode((mode) => {
                      if (mode === "compact") return "float";
                      return "compact";
                    })
                  }
                />
                <Router
                  deskMode={deskMode}
                  setDeskMode={setDeskMode}
                  commandOpen={commandOpen}
                  setCommandOpen={setCommandOpen}
                />
              </div>
            </SidebarProvider>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

