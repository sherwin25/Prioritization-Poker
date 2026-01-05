"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { usePokerRoom } from "@/hooks/use-poker";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Copy, RefreshCw, Eye } from "lucide-react";

const CARDS = [1, 2, 3, 5, 8, 13, 21, "?", "☕"];

export default function RoomPage() {
  const params = useParams();
  const code = (params?.code as string)?.toUpperCase();
  const [name, setName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  
  const { players, gameState, myId, vote, reveal, reset } = usePokerRoom(hasJoined ? code : "", name);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setHasJoined(true);
  };

  const myPlayer = players.find(p => p.id === myId);
  const myVote = myPlayer?.vote;

  const handleReveal = () => {
    reveal();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#818cf8', '#c084fc', '#f472b6']
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could add toast here
  };

  if (!hasJoined) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <motion.form 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onSubmit={handleJoin} 
          className="glass-panel p-8 rounded-3xl max-w-sm w-full space-y-6 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Join Room</h2>
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-200 font-mono tracking-widest text-lg border border-indigo-500/30">
              {code}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold ml-1">Your Name</label>
              <input
                autoFocus
                type="text"
                placeholder="Ex. Alice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-white/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
            >
              Enter Game
            </button>
          </div>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Room Code</span>
              <button onClick={copyCode} className="flex items-center gap-2 text-2xl font-bold text-white hover:text-indigo-300 transition group">
                {code}
                <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
               <span className="font-bold text-white">{players.length}</span> present
            </div>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <button onClick={reset} className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition" title="Reset Voting">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReveal} 
              className="px-6 py-2.5 bg-white text-indigo-950 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Reveal
            </button>
        </div>
      </header>

      {/* Table Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
        {/* Table Graphic */}
        <div className="absolute w-[800px] h-[400px] rounded-[200px] border-4 border-white/5 bg-white/[0.02] transform rotate-x-12 z-0 backdrop-blur-sm" />
        
        <div className="relative z-10 flex flex-wrap gap-8 justify-center max-w-5xl items-center min-h-[300px]">
          <AnimatePresence>
            {players.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="flex flex-col items-center gap-4 group"
              >
                 {/* Card */}
                 <div className={cn(
                   "w-20 h-28 md:w-24 md:h-36 rounded-xl shadow-2xl flex items-center justify-center text-4xl font-bold transition-all duration-500 transform preserve-3d relative",
                   gameState.isRevealed 
                     ? (p.vote ? "bg-white text-slate-900 -translate-y-4 shadow-white/20" : "bg-white/5 border-2 border-dashed border-white/20 text-transparent")
                     : (p.vote ? "bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/10 rotate-y-180" : "bg-white/5 border-2 border-dashed border-white/10")
                 )}>
                    {gameState.isRevealed ? p.vote : (p.vote ? 
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" /> 
                    : "")}
                 </div>
                 
                 {/* Avatar Label */}
                 <div className="flex flex-col items-center gap-1">
                   <div className="glass-panel px-4 py-1.5 rounded-full text-sm font-semibold text-white flex items-center gap-2 border border-white/10 group-hover:border-white/30 transition-colors">
                     {p.vote && !gameState.isRevealed && (
                       <span className="relative flex h-2 w-2">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                       </span>
                     )}
                     {p.name}
                   </div>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Hand Area */}
      <div className="glass-panel mx-4 mb-4 md:mx-auto md:mb-8 md:max-w-4xl rounded-3xl p-4 md:p-6 flex justify-center gap-3 md:gap-4 overflow-x-auto pb-safe z-20">
        {CARDS.map((card) => (
          <button
            key={card}
            onClick={() => vote(card)}
            className={cn(
              "flex-shrink-0 w-14 h-20 md:w-16 md:h-24 rounded-xl border border-white/10 flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg transition-all duration-200",
              myVote === card 
                ? "bg-white text-indigo-900 -translate-y-6 shadow-xl shadow-white/20 scale-110 ring-4 ring-indigo-500/30" 
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:-translate-y-2 hover:text-white"
            )}
          >
            {card}
          </button>
        ))}
      </div>
    </main>
  );
}
