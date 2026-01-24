import { useState } from "react";
import { Send, X, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  articleTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatInterface({ articleTitle, isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi! I'm here to help you understand and discuss "${articleTitle}". What would you like to know more about?`,
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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "That's a great question! Based on the article, I can help explain the key points and provide additional context. What specific aspect interests you most?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-screen border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-sm border-l border-white/10 z-40">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Bot className="w-3 h-3 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-xs text-foreground">AI Assistant</h3>
              <p className="text-[10px] text-muted-foreground">
                Discussing: {articleTitle.length > 40 ? articleTitle.substring(0, 40) + "..." : articleTitle}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="inline-flex items-center justify-center h-6 w-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent ring-1 ring-transparent hover:ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
            data-testid="button-close-chat"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 h-[calc(100vh-140px)] p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${message.isUser ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                  message.isUser 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {message.isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <div className={`max-w-[75%] ${message.isUser ? "text-right" : ""}`}>
                  <div className={`inline-block p-2 rounded-lg ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    <p className="text-xs">{message.content}</p>
                  </div>
                  <p className={`text-[10px] mt-1 ${
                    message.isUser ? "text-muted-foreground" : "text-muted-foreground"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t border-white/10 bg-white/5">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this article..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-md bg-muted px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground ring-1 ring-border focus:ring-2 focus:ring-primary/60 focus:outline-none transition"
              disabled={isLoading}
              data-testid="input-chat-message"
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-2 py-1.5 text-xs font-medium hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition"
              data-testid="button-send-message"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
  );
}