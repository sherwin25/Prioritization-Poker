"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ArrowRight, Users, Play, Radio } from "lucide-react";

import { RulesModal } from "@/components/RulesModal";

export default function Home() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const createRoom = () => {
    setIsCreating(true);
    // Generate a simple 4-character code
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setTimeout(() => {
      router.push(`/room/${code}`);
    }, 800);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.length >= 3) {
      router.push(`/room/${roomCode.toUpperCase()}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background relative">
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
      
      <button 
        onClick={() => setShowRules(true)}
        className="absolute top-6 right-6 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-secondary/50"
      >
        <span>How to Play?</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl w-full space-y-16"
      >
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground font-medium border border-border">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Real-time Consensus</span>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground lg:text-7xl">
            Prioritization
            <span className="block text-primary/40">Poker.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Align your team on complexity. Vote silently, reveal instantly, and debate what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Room Card */}
          <div className="border border-border bg-card p-8 rounded-xl flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">New Session</h3>
                <p className="text-muted-foreground text-sm mt-1">Generate a fresh room code.</p>
              </div>
            </div>
            
            <button
              onClick={createRoom}
              disabled={isCreating}
              className="mt-8 w-full py-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isCreating ? "Initializing..." : "Create Room"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Join Room Card */}
          <div className="border border-border bg-card p-8 rounded-xl flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm">
             <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Join Team</h3>
                <p className="text-muted-foreground text-sm mt-1">Enter your 4-digit room code.</p>
              </div>
            </div>

            <form onSubmit={joinRoom} className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Enter Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-lg bg-background border border-input text-center text-xl font-mono uppercase tracking-widest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground placeholder:text-muted-foreground/30 transition-all font-bold placeholder:normal-case placeholder:tracking-normal placeholder:font-sans"
                maxLength={6}
              />
              <button
                type="submit"
                disabled={!roomCode}
                className="w-full py-3.5 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold transition-all disabled:opacity-50 border border-border"
              >
                Enter Room
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
