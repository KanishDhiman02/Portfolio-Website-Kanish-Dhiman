"use client";
import { motion } from "framer-motion";

export default function CodeShowcase() {
  const codeSnippet = `class AHOFeatureSelector:
    def _fitness(self, solution, X, y):
        # The 'Optimizer' Flex: Minimizing latency & error
        selected_features = np.where(solution == 1)[0]
        accuracy = np.mean(cross_val_score(self.estimator, X_subset, y, cv=3))
        error_rate = 1 - accuracy
        
        # Alpha-weighted objective function
        return self.alpha * error_rate + (1 - self.alpha) * feature_reduction_rate`;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="rounded-lg bg-[#0d1117] p-6 border border-zinc-800 shadow-2xl">
            <div className="flex gap-1.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <pre className="font-mono text-xs text-zinc-300 overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-[0.4em] mb-4">03. The Engine</h2>
          <h3 className="text-3xl font-bold text-white mb-6">Production-Ready <br/>Python Tooling</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Beyond the math, I built a modular Python library for the Hummingbird-AHO engine. 
            It features a <span className="text-white">visit-table mechanism</span> to starve redundant computation 
            and a <span className="text-white">migration-based explorer</span> to escape local optima.
          </p>
          <ul className="space-y-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <li className="flex items-center gap-2"><span className="text-cyan-400">▹</span> Custom setup.py distribution</li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">▹</span> High-Dimensional Data Support</li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">▹</span> Sklearn-compatible API</li>
          </ul>
        </div>
      </div>
    </section>
  );
}