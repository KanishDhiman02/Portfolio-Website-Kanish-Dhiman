"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Terminal } from "lucide-react";

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "System initialized. How can I assist your technical audit of Kanish's profile?" }
  ]);
  const socket = useRef<WebSocket | null>(null);

  // Initialize WebSocket for Groq Inference
  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8000/ws/agent");
    socket.current.onmessage = (event) => {
      setMessages(prev => [...prev, { role: "assistant", content: event.data }]);
    };
    return () => socket.current?.close();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    socket.current?.send(input);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Floating Dialogue Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-4 bg-cyan-500 text-black font-mono text-[10px] px-4 py-2 rounded-t-xl rounded-bl-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-400 relative"
          >
            I am here to let you know about Kanish Dhiman
            <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-cyan-500"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Agent Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 400 }}
            className="mb-4 w-80 glass-card border-cyan-500/30 flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-cyan-500/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">Optimizer_v1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white"><X size={16}/></button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'assistant' ? 'text-cyan-100' : 'text-zinc-400'}>
                  <span className="text-[8px] font-mono text-zinc-600 block mb-1 uppercase">
                    [{msg.role}]
                  </span>
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder="Query system..." 
                className="flex-1 bg-transparent border-none text-[10px] text-white focus:outline-none font-mono"
              />
              <button onClick={handleSend} className="text-cyan-400"><Send size={14}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-cyan-500 text-black rounded-full shadow-lg hover:rotate-12 transition-transform border-4 border-black"
      >
        <Bot size={24} />
      </button>
    </div>
  );
}