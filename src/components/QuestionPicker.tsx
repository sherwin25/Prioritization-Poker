"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ListTodo, Plus } from "lucide-react";
import { SAMPLE_QUESTIONS } from "@/data/sample-questions";

interface QuestionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (question: string) => void;
}

export function QuestionPicker({ isOpen, onClose, onSelect }: QuestionPickerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div className="bg-card w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl border border-border pointer-events-auto flex flex-col">
              
              <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-card/95 backdrop-blur z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <ListTodo className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Select a Task</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid sm:grid-cols-1 gap-2">
                  {SAMPLE_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onSelect(q);
                        onClose();
                      }}
                      className="group flex items-center gap-4 w-full p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-left"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {q}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
