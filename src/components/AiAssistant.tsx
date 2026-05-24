"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, X, Loader2, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

// Shuffling placeholders
const PLACEHOLDERS = [
  "Ask about Vishal's skills...",
  "What projects has Vishal built?",
  "Tell me about Vishal's experience.",
  "What is Vishal's tech stack?",
  "Can Vishal build mobile apps?",
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Shuffling placeholder interval
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setInput((prev) => prev + (prev ? " " : "") + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setInput("");
        setIsOpen(true);
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Your browser does not support voice input.");
      }
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isOpen) setIsOpen(true);

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: "assistant", content: "" }]);

    try {
      const apiMessages = messages.map(m => ({ role: m.role, content: m.content })).concat({ role: "user", content: userMsg.content });
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error(await res.text());

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (reader && !done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        
        // Parse SSE stream from OpenAI-compatible endpoint
        const lines = chunkValue.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const text = data.choices[0]?.delta?.content || "";
              if (text) {
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMsgId ? { ...msg, content: msg.content + text } : msg
                ));
              }
            } catch (e) {
              // Ignore incomplete JSON parsing errors for chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMsgId ? { ...msg, content: "Sorry, I'm having trouble connecting right now." } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none w-full max-w-[340px] px-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full mb-3 pointer-events-auto flex flex-col justify-end max-h-[60vh] relative"
          >
            {/* Chat Area with Very Light Glass Background */}
            <div 
              className="overflow-y-auto p-3 flex flex-col gap-4 mask-image-bottom no-scrollbar bg-white/10 backdrop-blur-sm border border-white/20 rounded-[32px] shadow-lg"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[90%] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                      msg.role === "user" 
                        ? "bg-zinc-900 text-zinc-50 font-medium rounded-tr-md" 
                        : "bg-white/95 backdrop-blur-md text-zinc-900 rounded-tl-md border border-zinc-200/60"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/95 backdrop-blur-md border border-zinc-200/60 rounded-3xl rounded-tl-md px-4 py-3 shadow-sm">
                    <Loader2 size={16} className="text-zinc-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Input Bar - Warm Color (75% opacity) */}
      <motion.form 
        onSubmit={handleSend}
        layout
        className={`pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-300 w-full shadow-2xl border border-black/5 relative`}
        style={{
          backgroundColor: isOpen ? "rgba(255, 255, 255, 0.9)" : "color-mix(in srgb, var(--color-accent-skin) 75%, transparent)",
          backdropFilter: "blur(16px)",
        }}
      >
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${
            isListening 
              ? "bg-red-500 text-white animate-pulse" 
              : isOpen 
                ? "text-[var(--color-accent-skin)] hover:bg-black/5" 
                : "text-[#1a1a1a] hover:bg-black/10"
          }`}
        >
          <Mic size={18} />
        </button>

        <div className="flex-1 relative h-9 flex items-center cursor-text overflow-hidden" onClick={() => !isOpen && setIsOpen(true)}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isOpen ? "Ask anything..." : ""}
            className={`w-full bg-transparent text-[14px] focus:outline-none absolute inset-0 px-1 font-medium ${
              isOpen ? "text-[#1a1a1a] placeholder-[#1a1a1a]/40" : "text-[#1a1a1a] placeholder-[#1a1a1a]/70"
            }`}
          />
          {!isOpen && !input && (
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 px-1 flex items-center text-[14px] font-medium text-[#1a1a1a]/80 pointer-events-none truncate"
              >
                {PLACEHOLDERS[placeholderIdx]}
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full flex-shrink-0 text-[#1a1a1a]/50 hover:bg-black/5 hover:text-[#1a1a1a] transition-all"
            aria-label="Close Chat"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        )}

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`p-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
            input.trim() && !isLoading
              ? isOpen 
                ? "bg-[var(--color-accent-skin)] text-[#1a1a1a] hover:scale-105 shadow-md"
                : "bg-[#1a1a1a] text-white hover:scale-105 shadow-md"
              : isOpen
                ? "bg-black/5 text-[#1a1a1a]/30 cursor-not-allowed"
                : "bg-black/10 text-[#1a1a1a]/50 cursor-not-allowed"
          }`}
        >
          {isLoading && isOpen ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className={input.trim() ? "translate-x-0.5" : ""} />}
        </button>
      </motion.form>
    </div>
  );
}
