"use client";
import { motion } from "framer-motion";
import { FileText, Database, Zap, BarChart3 } from "lucide-react";

const metrics = [
  { label: "Dimensionality Reduction", value: "75%", icon: <Database className="w-4 h-4" /> }, // 
  { label: "Mean Rank (ROC-AUC)", value: "1.00", icon: <BarChart3 className="w-4 h-4" /> }, // [cite: 164]
  { label: "Top Classifier", value: "2S-AHO-RF", icon: <Zap className="w-4 h-4" /> }, // [cite: 142]
];

export default function Research() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-cyan-400 text-xl">02.</span>
        <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Research Ledger</h2>
        <div className="h-[1px] bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">2S-AHO: Scalable Fault Prediction Framework</h3>
          <p className="text-zinc-400 leading-relaxed">
            Published in <span className="text-white">Springer CCIS</span>, this framework addresses 
            class imbalance and feature redundancy in software defect datasets[cite: 84]. 
            By integrating <span className="text-cyan-400">SMOTE</span> for data balancing 
            with <span className="text-cyan-400">Artificial Hummingbird Optimization</span>, 
            the system achieves superior prediction accuracy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {metrics.map((m) => (
              <div key={m.label} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                <div className="text-zinc-500 mb-2">{m.icon}</div>
                <div className="text-xl font-bold text-white">{m.value}</div>
                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</div>
              </div>
            ))}
          </div>
          
          <a href="#" className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs group">
            <FileText className="w-4 h-4" /> 
            READ FULL MANUSCRIPT <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* 2S-AHO Process Visualizer */}
        <div className="glass-card p-6 border-zinc-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] mb-6">Execution Pipeline</h4>
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded">
              <span className="text-cyan-400">01</span>
              <span className="text-zinc-300">SMOTE Data Re-balancing</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded ml-4">
              <span className="text-cyan-400">02</span>
              <span className="text-zinc-300">Wrapper-based AHO Selection</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded ml-8 border-cyan-500/30">
              <span className="text-cyan-400">03</span>
              <span className="text-white">Rank-I Performance Output</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}