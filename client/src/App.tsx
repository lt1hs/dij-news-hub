import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import NewsFeed from "@/components/NewsFeed";
import Landing from "@/components/Landing";
import NotFound from "@/pages/not-found";
import PixelBackground from "@/components/PixelBackground";

function Router({ paneCompact, setPaneCompact }: { paneCompact: boolean; setPaneCompact: (compact: boolean) => void }) {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/">
            <NewsFeed paneCompact={paneCompact} setPaneCompact={setPaneCompact} />
          </Route>
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [paneCompact, setPaneCompact] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <div className="min-h-screen relative">
            <PixelBackground />
            <Header onPaneToggle={() => setPaneCompact(!paneCompact)} />
            <Router paneCompact={paneCompact} setPaneCompact={setPaneCompact} />
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
