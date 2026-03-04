"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Mic, MicOff, Volume2 } from "lucide-react";

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", content: "System online. Listening for text or voice commands." }]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to your FastAPI backend
    socket.current = new WebSocket("ws://localhost:8000/ws/agent");
    socket.current.onmessage = (event) => {
      const text = event.data;
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
      speak(text); // Auto-speak the response
    };
    return () => socket.current?.close();
  }, []);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSend = (textOverride?: string) => {
    const message = textOverride || input;
    if (!message.trim()) return;
    socket.current?.send(message);
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div className="mb-4 w-80 h-96 glass-card flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-cyan-500/10">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Agentic Multimodal v2</span>
              <button onClick={() => setIsOpen(false)}><X size={16} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'assistant' ? 'text-cyan-100' : 'text-zinc-400'}>
                  <p className="font-mono text-[8px] opacity-50 uppercase">[{msg.role}]</p>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2 items-center">
              <button onClick={startVoiceInput} className={`${isListening ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                {isListening ? <MicOff size={18}/> : <Mic size={18}/>}
              </button>
              <input 
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk or type..." className="flex-1 bg-transparent text-white outline-none text-[10px] font-mono"
              />
              <button onClick={() => handleSend()} className="text-cyan-400"><Send size={16}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="p-4 bg-cyan-500 text-black rounded-full shadow-lg border-2 border-black">
        <Bot size={24} />
      </button>
    </div>
  );
}