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
          if (event.error === 'no-speech') {
            console.log("No speech detected. Stopped listening.");
          } else {
            console.error("Speech recognition error", event.error);
          }
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
    <div className="fixed bottom-6 sm:bottom-6 max-sm:bottom-[72px] right-4 sm:right-6 z-[999] flex flex-col items-end gap-3 w-full max-w-[420px] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full mb-3 pointer-events-auto flex flex-col justify-end max-h-[60vh] relative group"
          >
            {/* Floating Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 z-50 p-1.5 bg-surface dark:bg-zinc-800 border border-border shadow-md rounded-full text-text-sec hover:text-text hover:scale-110 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
              aria-label="Close Chat"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Chat Area with Very Light Glass Background */}
            <div 
              className="overflow-y-auto p-3 flex flex-col gap-4 mask-image-bottom no-scrollbar bg-surface/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/50 rounded-[32px] shadow-lg"
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
                    className={`max-w-[90%] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed transition-all duration-300 ${
                      msg.role === "user" 
                        ? "bg-gradient-to-tr from-[var(--color-accent-skin)] to-[var(--color-accent-skin)]/80 text-white border border-transparent shadow-md shadow-black/20 font-medium rounded-tr-md" 
                        : "bg-surface dark:bg-zinc-800 text-text border border-border shadow-lg shadow-black/5 rounded-tl-md ring-1 ring-black/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface dark:bg-zinc-800 border border-border shadow-lg shadow-black/5 rounded-3xl rounded-tl-md px-4 py-3 ring-1 ring-black/5">
                    <Loader2 size={16} className="text-text-sec animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Input Bar */}
      <motion.form 
        onSubmit={handleSend}
        className={`pointer-events-auto flex items-center gap-1 p-1 rounded-full transition-all duration-500 w-full relative ${
          isOpen 
            ? "bg-surface dark:bg-zinc-900 shadow-2xl border border-border ring-1 ring-black/5 backdrop-blur-xl" 
            : "shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--color-accent-skin)_30%,transparent)]"
        }`}
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]" style={{
              background: "conic-gradient(from 0deg, var(--color-accent-skin) 0%, var(--color-bg-alt) 33%, var(--color-text) 66%, var(--color-accent-skin) 100%)"
            }} />
            <div className="absolute inset-[1.5px] rounded-full bg-surface dark:bg-zinc-900 backdrop-blur-xl" />
          </div>
        )}
        <button
          type="button"
          onClick={toggleListening}
          className={`relative z-10 p-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
            isListening 
              ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-500/20" 
              : isOpen 
                ? "text-[var(--color-accent-skin)] hover:bg-[var(--color-accent-skin)]/10" 
                : "text-[var(--color-accent-skin)] hover:bg-[var(--color-accent-skin)]/15"
          }`}
        >
          <Mic size={16} />
        </button>

        <div className="flex-1 relative z-10 h-8 flex items-center cursor-text overflow-hidden" onClick={() => !isOpen && setIsOpen(true)}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isOpen ? "Ask anything..." : ""}
            className={`w-full bg-transparent text-[13px] focus:outline-none absolute inset-0 px-1 font-medium ${
              isOpen ? "text-text placeholder:text-text-sec" : "text-transparent placeholder-transparent"
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
                className="absolute inset-0 px-1 flex items-center text-[13px] font-medium text-[var(--color-text)]/70 pointer-events-none truncate"
              >
                {PLACEHOLDERS[placeholderIdx]}
              </motion.span>
            </AnimatePresence>
          )}
        </div>



        <AnimatePresence mode="wait">
          {(input.trim() || isListening) ? (
            <motion.button
              key="send-btn"
              type="submit"
              disabled={isLoading || (!input.trim() && !isListening)}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className={`relative z-10 p-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                isOpen 
                  ? "bg-[var(--color-accent-skin)] text-[var(--color-bg)] hover:scale-105 shadow-md"
                  : "bg-[var(--color-text)] text-[var(--color-bg)] hover:scale-105 shadow-md"
              } disabled:opacity-50`}
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} className="ml-0.5" />}
            </motion.button>
          ) : (
            <motion.div
              key="sparkles-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative z-10 p-1.5 flex-shrink-0 text-zinc-400"
            >
              <Sparkles size={14} className={isOpen ? "animate-pulse" : ""} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}
