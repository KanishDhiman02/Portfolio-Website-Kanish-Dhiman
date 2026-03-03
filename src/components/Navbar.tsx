"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-4 backdrop-blur-xl bg-[#050505]/80 border-b border-white/5 flex justify-between items-center"
    >
      <div className="font-mono text-cyan-400 font-bold tracking-tighter text-xl group cursor-default">
  KD<span className="text-zinc-600 group-hover:text-cyan-400 transition-colors">.SH</span>
</div>
      <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        <a href="#about" className="hover:text-cyan-400 transition-colors">01. Optimizer</a>
        <a href="#work" className="hover:text-cyan-400 transition-colors">02. Engineering</a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors">03. Contact</a>
      </div>
    </motion.nav>
  );
}