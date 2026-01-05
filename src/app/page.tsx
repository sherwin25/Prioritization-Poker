"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md w-full text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Priority Poker
          </h1>
          <p className="text-lg text-white/80">
            Align your team's roadmap without the arguments.
          </p>
        </div>

        <div className="rounded-3xl p-8 space-y-6 text-slate-900 dark:text-white bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-black/60 dark:border-white/10">
          <button
            onClick={createRoom}
            disabled={isCreating}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg hover:opacity-90 transition shadow-lg disabled:opacity-50"
          >
            {isCreating ? "Creating Room..." : "Start New Game"}
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <span className="relative bg-white dark:bg-black px-4 text-xs uppercase text-slate-500">
              Or join existing
            </span>
          </div>

          <form onSubmit={joinRoom} className="space-y-4">
            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-mono uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-900 dark:border-slate-700"
              maxLength={6}
            />
            <button
              type="submit"
              disabled={!roomCode}
              className="w-full py-3 px-6 rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300"
            >
              Join Room
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
