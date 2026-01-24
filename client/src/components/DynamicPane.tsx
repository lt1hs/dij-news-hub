import { useState } from "react";
import { Send, X, Bot, User, Loader2, MessageCircle, ChevronLeft, ChevronRight, Mic, Paperclip, MoreHorizontal, Bookmark, Share2, RefreshCw, BrainCircuit } from "lucide-react";
import CompactDailySummary from "./CompactDailySummary";
import { AIAssistantInterface } from "./AIAssistantInterface";
import { CompactLoader } from "./CompactLoader";
import { ExpandableTabs } from "./ui/expandable-tabs";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface DynamicPaneProps {
  isCompact: boolean;
  onToggleCompact: () => void;
}

export default function DynamicPane({ isCompact, onToggleCompact }: DynamicPaneProps) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm here to help you understand today's news. What would you like to know more about?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "That's a great question! I can help explain the key points from today's news. What specific aspect interests you most?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (isCompact) {
    return (
      <div className="fixed top-0 right-0 w-12 h-screen bg-white/5 border-l border-white/10 z-40 flex flex-col">
        <button 
          onClick={onToggleCompact}
          className="flex items-center justify-center h-12 w-12 text-muted-foreground hover:text-foreground hover:bg-accent transition border-b border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 w-80 h-screen border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-sm border-l border-white/10 z-40 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-white/10 bg-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          {showChat && (
            <button 
              onClick={() => setShowChat(false)}
              className="inline-flex items-center justify-center h-5 w-5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
          )}
          <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
            {showChat ? <Bot className="w-2.5 h-2.5 text-primary" /> : <MessageCircle className="w-2.5 h-2.5 text-primary" />}
          </div>
          <div>
            <h3 className="font-semibold text-xs text-foreground">
              {showChat ? "AI Assistant" : "Daily News"}
            </h3>
            <p className="text-[9px] text-muted-foreground">
              {showChat ? "Ask about today's news" : "Summary & Chat"}
            </p>
          </div>
        </div>
        <button 
          onClick={onToggleCompact}
          className="inline-flex items-center justify-center h-5 w-5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent ring-1 ring-transparent hover:ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
        >
          <ChevronRight className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!showChat ? (
          // Daily Summary View
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-2">
              {/* Logo and Title */}
              <div className="flex flex-col items-center mb-4">
                <div className="mb-2">
                  <CompactLoader size={48} text="AI" />
                </div>
                <div className="text-center">
                  <h1 className="text-sm font-semibold text-foreground mb-1">
                    AI News Assistant
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Ask about today's news
                  </p>
                </div>
              </div>

              <CompactDailySummary 
                summary="Today's market showed mixed signals with tech stocks leading gains while energy sector faced headwinds."
                sentiment="positive"
                keyStories={[
                  "Tech giants report stronger Q3 earnings",
                  "Inflation cools for third consecutive month",
                  "OPEC maintains steady oil output",
                  "EU introduces new AI transparency regulations"
                ]}
                date="October 2, 2024"
              />
              
              {/* Chat Button */}
              <div className="mt-3 flex justify-center">
                <button 
                  onClick={() => setShowChat(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:bg-primary/90 transition"
                >
                  <MessageCircle className="w-3 h-3" />
                  Chat about news
                </button>
              </div>
            </div>
            
            {/* Chat Input above dock */}
            <div className="p-2 flex-shrink-0">
              <div className="w-full border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden mb-2">
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Ask about today's news..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="w-full text-xs text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
                    disabled={isLoading}
                  />
                </div>

                {/* Functions and actions */}
                <div className="px-3 py-2 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-primary/20 text-primary transition-colors">
                      <Bot className="w-3 h-3" />
                      <span>Search</span>
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                      <BrainCircuit className="w-3 h-3" />
                      <span>AI</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                      <Mic className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={handleSend} 
                      disabled={!input.trim() || isLoading}
                      className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                        input.trim()
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-white/10 text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ExpandableTabs at bottom */}
            <div className="p-2 border-t border-white/10 bg-white/5 flex-shrink-0">
              <ExpandableTabs
                tabs={[
                  { title: "Save", icon: Bookmark },
                  { title: "Share", icon: Share2 },
                  { title: "Refresh", icon: RefreshCw }
                ]}
                className="w-full justify-center border-white/10 bg-white/5"
                activeColor="text-primary"
              />
            </div>
          </div>
        ) : (
          // Chat View - Full Height
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-2 h-full">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-1.5 ${message.isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? "bg-muted text-muted-foreground" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {message.isUser ? <User className="w-2.5 h-2.5" /> : <Bot className="w-2.5 h-2.5" />}
                    </div>
                    <div className={`max-w-[75%] ${message.isUser ? "text-right" : ""}`}>
                      <div className={`inline-block p-1.5 rounded-lg ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}>
                        <p className="text-[10px]">{message.content}</p>
                      </div>
                      <p className={`text-[8px] mt-0.5 text-muted-foreground`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                      <Bot className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 bg-muted rounded-lg">
                      <Loader2 className="w-2.5 h-2.5 animate-spin text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input - Fixed at bottom */}
            <div className="p-2 border-t border-white/10 bg-white/5 flex-shrink-0">
              <div className="flex gap-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about today's news..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 rounded-md bg-muted px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground ring-1 ring-border focus:ring-2 focus:ring-primary/60 focus:outline-none transition"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isLoading}
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-2 py-1.5 text-xs font-medium hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
