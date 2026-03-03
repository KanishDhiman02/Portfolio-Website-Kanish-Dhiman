"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference">
      <motion.div
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", damping: 40, stiffness: 400, mass: 0.2 }}
        className="relative"
      >
        {/* The Central Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
           <div className="w-[1px] h-4 bg-cyan-400 absolute" />
           <div className="h-[1px] w-4 bg-cyan-400 absolute" />
        </div>

        {/* The Rotating Brackets */}
        <motion.div 
          animate={{ rotate: 90 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="w-8 h-8 border-[1px] border-cyan-400/30 rounded-sm"
        />
      </motion.div>
    </div>
  );
}