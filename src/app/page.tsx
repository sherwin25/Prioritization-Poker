"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ArrowRight, Users, Play } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl w-full space-y-12"
      >
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-sm text-indigo-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Real-time Consensus Tool
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 pb-2">
            Prioritization Poker
          </h1>
          <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
            Stop the endless debates. Vote silently on task complexity, reveal instantly, and focus the conversation where it matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Room Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-3xl flex flex-col justify-between group hover:border-indigo-500/30 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Start New Game</h3>
                <p className="text-slate-400 text-sm mt-1">Generate a fresh room and invite your team.</p>
              </div>
            </div>
            
            <button
              onClick={createRoom}
              disabled={isCreating}
              className="mt-8 w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center justify-center gap-2 group-hover:translate-x-1"
            >
              {isCreating ? "Creating..." : "Create Room"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Join Room Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-3xl flex flex-col justify-between hover:border-pink-500/30 transition-colors">
             <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-300">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Join Existing</h3>
                <p className="text-slate-400 text-sm mt-1">Enter the 4-character code shared with you.</p>
              </div>
            </div>

            <form onSubmit={joinRoom} className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="XK9Z"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-center text-xl font-mono uppercase tracking-widest focus:ring-2 focus:ring-pink-500/50 outline-none text-white placeholder:text-white/20 transition-all font-bold"
                maxLength={6}
              />
              <button
                type="submit"
                disabled={!roomCode}
                className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
              >
                Join Room
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
