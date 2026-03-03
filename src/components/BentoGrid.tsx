"use client";
import { motion } from "framer-motion";
import { Cpu, Trophy, Globe, Code2 } from "lucide-react";

const cards = [
  {
    title: "2S-AHO Framework",
    description: "Software Fault Prediction published in Springer CCIS. Optimized visit-table mechanism to minimize CPU cycles.",
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    stats: "Springer CCIS",
    className: "md:col-span-2"
  },
  {
    title: "Competitive Programming",
    description: "500+ problems solved on LeetCode & GFG.",
    icon: <Trophy className="w-6 h-6 text-yellow-500" />,
    stats: "500+ Solved",
    className: "md:col-span-1"
  },
  {
    title: "Innovation Coordinator",
    description: "Leading technical projects for E-Cell at NIT Hamirpur.",
    icon: <Code2 className="text-blue-500 w-6 h-6" />,
    stats: "E-Cell NITH",
    className: "md:col-span-1"
  },
  {
    title: "Systems Engineering",
    description: "Expertise in Python, C++, and low-latency WebRTC/FastRTC integration.",
    icon: <Globe className="text-purple-500 w-6 h-6" />,
    stats: "L4 Proficiency",
    className: "md:col-span-2"
  }
];

export default function BentoGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 border border-zinc-800 flex flex-col justify-between hover:border-cyan-500/50 transition-colors group ${card.className}`}
          >
            <div>
              <div className="mb-4 p-2 bg-zinc-900 w-fit rounded-lg border border-zinc-800 group-hover:border-cyan-500/30 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{card.description}</p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Verified Impact</span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded">{card.stats}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}