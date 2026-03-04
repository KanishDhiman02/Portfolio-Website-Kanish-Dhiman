import CustomCursor from "@/components/CustomCursor";
import SocialSidebar from "@/components/SocialSidebar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import CodeShowcase from "@/components/CodeShowcase";
import BentoGrid from "@/components/BentoGrid";
import Contact from "@/components/Contact";
import AIAgent from "@/components/AIAgent";

export default function Home() {
  return (
    <main className="bg-black min-h-screen relative selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Precision UI Elements */}
      <CustomCursor />
      <SocialSidebar />
      <Navbar />

      {/* Main Content Stream */}
      <div className="pt-20">
        <Hero />
        
        {/* About Section: Focus on Systems & Performance */}
        <About />

        {/* Research Ledger: Deep dive into the 2S-AHO paper */}
        <Research />

        {/* Code Showcase: The Python Engine and visit-table mechanism */}
        <CodeShowcase />

        {/* The Bento Grid: Quick-scan achievements (GATE, LeetCode, E-Cell) */}
        <BentoGrid />

        {/* Contact Protocol: Career and Research inquiries */}
        <Contact />
      </div>

      {/* The Agentic Intelligence Layer */}
      <AIAgent />

      {/* Engineering Accent: Subtle Bottom Glow */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none z-0" />
    </main>
  );
}