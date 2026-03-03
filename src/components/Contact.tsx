export default function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-40 text-center">
      <h2 className="font-mono text-cyan-400 text-sm mb-6 tracking-[0.4em] uppercase">04. Final Protocol</h2>
      <h3 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter">Get In Touch.</h3>
      
      <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
        Currently open to <span className="text-white font-medium">SDE, AI, and Performance Engineering</span> roles. 
        Whether you have a question about the <span className="text-cyan-400">2S-AHO architecture</span> or just want to connect.
      </p>

      <a 
        href="mailto:dhimankanish02@gmail.com" 
        className="px-12 py-5 border border-cyan-400 text-cyan-400 font-mono text-sm hover:bg-cyan-400/10 transition-all rounded-sm"
      >
        DISPATCH SIGNAL (EMAIL)
      </a>

      <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-zinc-900">
        <div className="text-left">
          <p className="font-mono text-[10px] text-zinc-600 uppercase mb-2">Primary Node</p>
          <p className="text-sm text-zinc-400 font-medium">NIT Hamirpur, HP, India</p>
        </div>
        <div className="text-left md:text-center">
          <p className="font-mono text-[10px] text-zinc-600 uppercase mb-2">Credentials</p>
          <p className="text-sm text-zinc-400 font-medium">GATE CSE 2026 QUALIFIED</p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-mono text-[10px] text-zinc-600 uppercase mb-2">Digital Signature</p>
          <p className="text-sm text-zinc-400 font-medium">KANISH DHIMAN // SDE</p>
        </div>
      </div>
    </section>
  );
}