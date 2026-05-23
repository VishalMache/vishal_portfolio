"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { PromptInputBox } from "./ui/ai-prompt-box";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const placeholders = [
  "Ask about Vishal's latest projects...",
  "What is Vishal's tech stack?",
  "How can I contact Vishal?",
  "Tell me about Vishal's experience...",
  "Can Vishal build a React app?",
  "What are Vishal's skills in AI?",
  "Type your message here...",
];

export default function AiAssistant() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const speak = (text: string) => {
    if (isVoiceMuted || typeof window === "undefined") return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith("en"));
    const femaleVoiceNames = ["zira", "samantha", "victoria", "google uk english female", "hazel", "susan", "karen", "tessa", "moira"];
    const preferredVoice = englishVoices.find(v => femaleVoiceNames.some(name => v.name.toLowerCase().includes(name))) || englishVoices.find(v => v.name.includes("Female") || v.name.includes("female")) || englishVoices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.text,
          },
        ]);
        speak(data.text);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Oops, my circuits got crossed! 🤖 (Error: " + (data.error || "Unknown error") + ")",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I couldn't reach the server right now. Vishal might be updating my core systems! 🛠️",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show the message history container if there are messages
  const hasMessages = messages.length > 0;

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 flex flex-col justify-end gap-4 pointer-events-none">
      
      {/* Chat History / Responses */}
      <AnimatePresence>
        {hasMessages && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto relative"
          >
            {/* Close Chat Button */}
            <button
              onClick={() => {
                setMessages([]);
                window.speechSynthesis.cancel();
              }}
              className="absolute -top-10 right-2 p-1.5 rounded-full bg-[#1F2023]/80 border border-[#444444] text-gray-400 hover:text-white transition-colors backdrop-blur-md z-10"
              title="Clear chat"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] px-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {messages.map((msg, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-lg shadow-purple-500/20">
                     <Sparkles className="w-4 h-4 text-white" />
                   </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-xl backdrop-blur-md ${
                    msg.role === "user"
                      ? "bg-white text-black rounded-br-sm"
                      : "bg-[#1F2023]/90 text-gray-200 rounded-bl-sm border border-white/5"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#1F2023]/90 border border-white/5 text-gray-200 rounded-2xl rounded-bl-sm p-4 flex items-center gap-3 shadow-xl backdrop-blur-md">
                  <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />
                  <span className="text-sm">VESLI is thinking...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Box */}
      <div className="pointer-events-auto w-full relative mt-2">
        <button
          onClick={() => {
            setIsVoiceMuted(!isVoiceMuted);
            if (!isVoiceMuted) window.speechSynthesis.cancel();
          }}
          className="absolute -top-10 right-2 p-1.5 rounded-full bg-[#1F2023]/80 border border-[#444444] text-gray-400 hover:text-white transition-colors backdrop-blur-md z-10"
          title={isVoiceMuted ? "Unmute voice" : "Mute voice"}
        >
          {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>



        <div className="relative p-[1px] rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.24)]">
          {/* Moving border light effect */}
          <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)]"></div>
          
          <div className="relative rounded-full h-full w-full bg-[#1F2023]">
            <PromptInputBox 
              placeholder={placeholders[placeholderIndex]}
              onSend={(message) => handleSend(message)} 
              isLoading={isLoading} 
              className="border-transparent shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
