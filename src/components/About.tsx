export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-[0.4em] mb-8">01. The Mission</h2>
          <h3 className="text-3xl font-bold text-white mb-6">Building lean, high-throughput systems.</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            I don't just write code; I audit execution paths. My background in <span className="text-white"> NIT Hamirpur </span> 
            taught me the fundamentals, but my research in <span className="text-white">Artificial Hummingbird Optimization </span> 
            taught me how to starve redundancy.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            From managing <span className="text-white">multithreading and synchronization</span> to architecting 
            <span className="text-white">WebRTC/FastRTC systems</span>, I focus on the "Real-Time" aspect of AI Engineering.
          </p>
        </div>

        <div className="glass-card p-8 border-white/5">
          <h4 className="text-sm font-mono text-white mb-6 uppercase tracking-widest">Stack Audit</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-2 text-zinc-500">
                <span>C++ / Performance Tooling</span>
                <span>L4</span>
              </div>
              <div className="h-[2px] bg-zinc-900 w-full"><div className="h-full bg-cyan-400 w-[90%] shadow-[0_0_10px_#00F5FF]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-2 text-zinc-500">
                <span>Python / AI Architecture</span>
                <span>L4</span>
              </div>
              <div className="h-[2px] bg-zinc-900 w-full"><div className="h-full bg-white w-[85%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-2 text-zinc-500">
                <span>SQL / Query Optimization</span>
                <span>L4</span>
              </div>
              <div className="h-[2px] bg-zinc-900 w-full"><div className="h-full bg-zinc-600 w-[80%]"></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}