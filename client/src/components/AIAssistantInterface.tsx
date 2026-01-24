"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AIAssistantInterface() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions = {
    learn: [
      "Explain today's market trends",
      "What caused the tech sector gains?",
      "How does inflation affect markets?",
      "Explain OPEC's oil strategy",
      "What are AI transparency regulations?",
    ],
    code: [
      "Create a news aggregator component",
      "Build a sentiment analysis function",
      "How to implement real-time news updates",
      "Create a market data visualization",
      "Build a news filtering system",
    ],
    write: [
      "Summarize today's key news",
      "Write analysis of market trends",
      "Create a news briefing email",
      "Draft social media post about news",
      "Write investment insights report",
    ],
  };

  const handleUploadFile = () => {
    setShowUploadAnimation(true);
    setTimeout(() => {
      const newFile = `Document.pdf`;
      setUploadedFiles((prev) => [...prev, newFile]);
      setShowUploadAnimation(false);
    }, 1500);
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo with animated gradient */}
        <div className="mb-4 w-12 h-12 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            className="w-full h-full"
          >
            <g clipPath="url(#cs_clip_1_ellipse-12)">
              <mask
                id="cs_mask_1_ellipse-12"
                style={{ maskType: "alpha" }}
                width="200"
                height="200"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M100 150c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50zm0 50c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <g mask="url(#cs_mask_1_ellipse-12)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path
                  fill="#0066FF"
                  fillOpacity="0.33"
                  d="M200 0H0v200h200V0z"
                ></path>
                <g
                  filter="url(#filter0_f_844_2811)"
                  className="animate-pulse"
                >
                  <path fill="#0066FF" d="M110 32H18v68h92V32z"></path>
                  <path fill="#0044FF" d="M188-24H15v98h173v-98z"></path>
                  <path fill="#0099FF" d="M175 70H5v156h170V70z"></path>
                  <path fill="#00CCFF" d="M230 51H100v103h130V51z"></path>
                </g>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_844_2811"
                width="385"
                height="410"
                x="-75"
                y="-104"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_844_2811"
                  stdDeviation="40"
                ></feGaussianBlur>
              </filter>
              <clipPath id="cs_clip_1_ellipse-12">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Welcome message */}
        <div className="mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-lg font-semibold text-foreground mb-1">
              AI News Assistant
            </h1>
            <p className="text-xs text-muted-foreground">
              Ask about today's news
            </p>
          </motion.div>
        </div>

        {/* Input area */}
        <div className="w-full border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden mb-3">
          <div className="p-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about today's news..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-xs text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="px-3 pb-2">
              <div className="flex flex-wrap gap-1">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-white/10 py-1 px-2 rounded text-xs"
                  >
                    <FileText className="w-2 h-2 text-primary" />
                    <span className="text-foreground">{file}</span>
                    <button
                      onClick={() =>
                        setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Functions and actions */}
          <div className="px-3 py-2 flex items-center justify-between border-t border-white/10">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchEnabled(!searchEnabled)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  searchEnabled
                    ? "bg-primary/20 text-primary"
                    : "bg-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Search className="w-3 h-3" />
                <span>Search</span>
              </button>
              <button
                onClick={() => setReasonEnabled(!reasonEnabled)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  reasonEnabled
                    ? "bg-primary/20 text-primary"
                    : "bg-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <BrainCircuit className="w-3 h-3" />
                <span>AI</span>
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <Mic className="w-3 h-3" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                  inputValue.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-white/10 text-muted-foreground cursor-not-allowed"
                }`}
              >
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Command suggestions */}
        <AnimatePresence>
          {activeCommandCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full overflow-hidden"
            >
              <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="p-2 border-b border-white/10">
                  <h3 className="text-xs font-medium text-foreground">
                    {activeCommandCategory === "learn"
                      ? "Learning suggestions"
                      : activeCommandCategory === "code"
                      ? "Coding suggestions"
                      : "Writing suggestions"}
                  </h3>
                </div>
                <ul className="divide-y divide-white/10">
                  {commandSuggestions[
                    activeCommandCategory as keyof typeof commandSuggestions
                  ].map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleCommandSelect(suggestion)}
                      className="p-2 hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {activeCommandCategory === "learn" ? (
                          <BookOpen className="w-3 h-3 text-primary" />
                        ) : activeCommandCategory === "code" ? (
                          <Code className="w-3 h-3 text-primary" />
                        ) : (
                          <PenTool className="w-3 h-3 text-primary" />
                        )}
                        <span className="text-xs text-foreground">
                          {suggestion}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function CommandButton({ icon, label, isActive, onClick }: CommandButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border transition-all ${
        isActive
          ? "bg-primary/20 border-primary/30"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      <div className={`${isActive ? "text-primary" : "text-muted-foreground"}`}>
        {icon}
      </div>
      <span
        className={`text-xs font-medium ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}
