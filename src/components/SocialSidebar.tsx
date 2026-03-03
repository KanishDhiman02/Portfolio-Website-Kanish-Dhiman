"use client";
import { Github, Linkedin, Terminal, Mail } from "lucide-react";

export default function SocialSidebar() {
  const socials = [
    { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/KanishDhiman02" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com/in/kanish-dhiman" },
    { name: "LeetCode", icon: <Terminal size={20} />, href: "https://leetcode.com/u/kanishdhiman/" },
    { name: "Mail", icon: <Mail size={20} />, href: "mailto:dhimankanish02@gmail.com" },
  ];

  return (
    <div className="fixed bottom-0 left-12 hidden lg:flex flex-col items-center gap-6 z-50">
      {socials.map((s) => (
        <a 
          key={s.name} 
          href={s.href} 
          target="_blank" 
          className="text-zinc-600 hover:text-cyan-400 transition-all hover:-translate-y-1"
          title={s.name}
        >
          {s.icon}
        </a>
      ))}
      <div className="w-[1px] h-20 bg-zinc-800" />
    </div>
  );
}