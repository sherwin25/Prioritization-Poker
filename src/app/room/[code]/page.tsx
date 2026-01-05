"use client";

import { useState } from "react";
import { usePokerRoom } from "@/hooks/use-poker";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CARDS = [1, 2, 3, 5, 8, 13, 21, "?", "☕"];

export default function RoomPage({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const [name, setName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  
  // We only initialize the hook once we have a name
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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!hasJoined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 p-4">
        <form onSubmit={handleJoin} className="p-8 rounded-2xl max-w-sm w-full space-y-4 bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-black/60 dark:border-white/10">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">Join Room <span className="text-indigo-600">{code}</span></h2>
          <input
            autoFocus
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 text-lg outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-black/20 dark:border-slate-700"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            Enter Game
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center m-4 rounded-xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-black/60 dark:border-white/10">
        <div className="flex items-center gap-2">
           <h1 className="font-bold text-white text-xl">Room: {code}</h1>
           <span className="bg-white/20 px-2 py-0.5 rounded text-sm text-white">{players.length} players</span>
        </div>
        <div className="flex gap-2">
            <button onClick={reset} className="px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded">Reset</button>
            <button onClick={handleReveal} className="px-6 py-2 bg-white text-indigo-900 font-bold rounded-lg shadow hover:bg-indigo-50 transition">Reveal</button>
        </div>
      </header>

      {/* Table Area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="flex flex-wrap gap-8 justify-center max-w-4xl">
          <AnimatePresence>
            {players.map((p) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                 <div className={cn(
                   "w-24 h-36 rounded-xl shadow-xl flex items-center justify-center text-3xl font-bold transition-all duration-500 border-2",
                   gameState.isRevealed 
                     ? (p.vote ? "bg-white text-slate-900 border-white -translate-y-2" : "bg-slate-200/50 border-dashed border-slate-400 text-transparent")
                     : (p.vote ? "bg-indigo-600 border-indigo-400 rotate-y-180" : "bg-white/10 border-dashed border-white/30")
                 )}>
                    {gameState.isRevealed ? p.vote : (p.vote ? "🃏" : "")}
                 </div>
                 <div className="px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-black/60 dark:border-white/10">
                   {p.name}
                   {p.vote && !gameState.isRevealed && <span className="w-2 h-2 rounded-full bg-green-400" />}
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Hand Area */}
      <div className="mt-auto p-6 md:p-8 flex justify-center gap-3 md:gap-6 overflow-x-auto pb-safe bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-black/60 dark:border-white/10">
        {CARDS.map((card) => (
          <button
            key={card}
            onClick={() => vote(card)}
            className={cn(
              "flex-shrink-0 w-16 h-24 md:w-20 md:h-32 rounded-xl border-2 flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg transition-all hover:-translate-y-2",
              myVote === card 
                ? "bg-indigo-600 border-indigo-400 text-white -translate-y-4 shadow-indigo-500/50" 
                : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            )}
          >
            {card}
          </button>
        ))}
      </div>
    </main>
  );
}
