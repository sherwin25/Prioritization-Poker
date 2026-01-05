"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Coffee, HelpCircle } from "lucide-react";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div className="bg-card w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl border border-border pointer-events-auto flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-card/95 backdrop-blur z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Play</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                
                {/* Section 1: The Goal */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">The Goal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Prioritization Poker is a consensus-based estimation technique. The goal is not to be "right" immediately, but to trigger necessary conversations when estimates differ significantly.
                  </p>
                </div>

                {/* Section 2: How it Works */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Game Flow</h3>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mt-0.5">1</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Discuss:</strong> The Product Owner explains a user story or task.</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mt-0.5">2</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Vote:</strong> Each member selects a card representing their complexity estimate. Votes remain hidden.</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mt-0.5">3</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Reveal:</strong> When everyone is ready, reveal the cards.</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mt-0.5">4</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Consensus:</strong> If estimates vary wildy (e.g., 2 vs 13), discuss why. Then re-vote.</p>
                    </li>
                  </ol>
                </div>

                {/* Section 3: Card Values */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Card Meanings (Fibonacci)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                       <div className="flex gap-2 text-primary font-mono font-bold text-lg">
                          <span>1</span><span>2</span><span>3</span>
                       </div>
                       <p className="text-sm font-medium text-foreground">Low Complexity</p>
                       <p className="text-xs text-muted-foreground">Quick fixes, copy updates, or very well-understood tasks. Less than a day.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                       <div className="flex gap-2 text-primary font-mono font-bold text-lg">
                          <span>5</span><span>8</span>
                       </div>
                       <p className="text-sm font-medium text-foreground">Medium Complexity</p>
                       <p className="text-xs text-muted-foreground">Standard features. Might have some unknowns or cross-component work. 2-5 days.</p>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                       <div className="flex gap-2 text-primary font-mono font-bold text-lg">
                          <span>13</span><span>21</span>
                       </div>
                       <p className="text-sm font-medium text-foreground">High Complexity</p>
                       <p className="text-xs text-muted-foreground">Major features. High risk or high uncertainty. Consider breaking these down.</p>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                       <div className="flex gap-2 text-primary font-mono font-bold text-lg items-center">
                          <HelpCircle className="w-5 h-5"/>
                          <Coffee className="w-5 h-5"/>
                       </div>
                       <p className="text-sm font-medium text-foreground">Special Cards</p>
                       <p className="text-xs text-muted-foreground">
                         <span className="font-bold">?</span> = Usage unclear / need info.
                         <br/>
                         <span className="font-bold">☕</span> = I need a break / Task too small to vote.
                       </p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-border bg-secondary/20">
                 <p className="text-xs text-center text-muted-foreground">
                   Pro Tip: Focus on <span className="font-bold text-primary">Relative Sizing</span>. Is this task 2x harder than the last one?
                 </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
