"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full z-10"
      >
        <p className="font-mono text-cyan-400 mb-5 tracking-widest text-sm">
          01. SIGNAL DETECTED: INITIALIZING_PROXIMITY...
        </p>
        
        <h1 className="text-zinc-500 font-bold text-lg md:text-xl mb-2">
          Hi, my name is
        </h1>
        
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
          Kanish Dhiman.
        </h2>
        
        <h3 className="text-4xl md:text-7xl font-bold text-zinc-500 mb-8 tracking-tighter leading-[1.1]">
          I build high-performance engines.
        </h3>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          I am a <span className="text-white">Systems & AI Engineer</span> at NIT Hamirpur. 
          I specialize in <span className="text-cyan-400">metaheuristic optimization</span>, 
          architecting frameworks like <span className="text-white font-mono">2S-AHO</span> that achieve a 
          <span className="text-white underline decoration-cyan-500/50"> 65% reduction in computational dimensionality</span>.
        </p>

        <div className="flex flex-wrap gap-4">
          <a 
            href="#work" 
            className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-sm font-mono text-xs hover:bg-cyan-400/10 transition-all"
          >
            Inspect My Work
          </a>

<div className="p-4 bg-zinc-900/50 border border-zinc-800 font-mono text-xs text-zinc-500 rounded-sm flex items-center gap-3">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
  </span>
  STATUS: GATE_CSE_2026_QUALIFIED // PREPARING_IIT_ROORKEE_INTERNSHIP
</div>
        </div>
      </motion.div>
    </section>
  );
}