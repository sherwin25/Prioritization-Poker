"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { usePokerRoom } from "@/hooks/use-poker";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Copy, RefreshCw, Eye, Check, Users } from "lucide-react";

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
      colors: ['#ffffff', '#000000', '#52525b']
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (!hasJoined) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 bg-background">
        <motion.form 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onSubmit={handleJoin} 
          className="bg-card border border-border p-8 rounded-xl max-w-sm w-full space-y-6 text-center shadow-lg"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Join Room</h2>
            <div className="inline-block px-4 py-1 rounded-md bg-secondary text-foreground font-mono tracking-widest text-lg border border-border">
              {code}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Your Name</label>
              <input
                autoFocus
                type="text"
                placeholder="Ex. Alice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-background border border-input text-lg outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground/40 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-bold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              Enter Game
            </button>
          </div>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center z-10 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Room</span>
              <button onClick={copyCode} className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition group">
                {code}
                <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
              </button>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-md bg-secondary border border-border text-sm text-foreground flex items-center gap-2">
               <Users className="w-4 h-4 text-muted-foreground"/>
               <span className="font-bold">{players.length}</span>
            </div>
            <div className="h-6 w-px bg-border mx-1" />
            <button onClick={reset} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition" title="Reset Voting">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReveal} 
              className="px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Reveal
            </button>
        </div>
      </header>

      {/* Table Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden bg-grid">
        
        <div className="relative z-10 flex flex-wrap gap-12 justify-center max-w-5xl items-center min-h-[300px]">
          <AnimatePresence>
            {players.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-3 group"
              >
                 {/* Card */}
                 <div className={cn(
                   "w-20 h-28 md:w-24 md:h-36 rounded-md shadow-sm flex items-center justify-center text-4xl font-bold transition-all duration-300 relative border",
                   gameState.isRevealed 
                     ? (p.vote ? "bg-card text-foreground border-border -translate-y-2 shadow-md" : "bg-muted border-dashed border-muted-foreground/30 text-transparent")
                     : (p.vote ? "bg-primary border-primary -translate-y-2 shadow-lg shadow-primary/20" : "bg-muted/30 border-dashed border-muted-foreground/20")
                 )}>
                    {gameState.isRevealed ? p.vote : (p.vote ? 
                      <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                         <Check className="w-5 h-5 text-primary-foreground" />
                      </div>
                    : "")}
                 </div>
                 
                 {/* Avatar Label */}
                 <div className="flex flex-col items-center gap-1">
                   <div className="px-3 py-1 rounded-full text-xs font-bold text-muted-foreground bg-secondary/50 border border-border group-hover:border-primary/30 group-hover:text-foreground transition-colors">
                     {p.name}
                   </div>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Hand Area */}
      <div className="border-t border-border bg-background p-6 flex justify-center gap-3 md:gap-4 overflow-x-auto pb-safe z-20">
        {CARDS.map((card) => (
          <button
            key={card}
            onClick={() => vote(card)}
            className={cn(
              "flex-shrink-0 w-14 h-20 md:w-16 md:h-24 rounded-lg border flex items-center justify-center text-xl md:text-2xl font-bold shadow-sm transition-all duration-200",
              myVote === card 
                ? "bg-primary text-primary-foreground border-primary -translate-y-4 shadow-lg scale-105" 
                : "bg-card text-foreground border-border hover:border-primary/50 hover:-translate-y-2 hover:shadow-md"
            )}
          >
            {card}
          </button>
        ))}
      </div>
    </main>
  );
}
