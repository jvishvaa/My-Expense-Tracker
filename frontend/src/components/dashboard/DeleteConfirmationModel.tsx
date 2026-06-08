"use client";

import { motion, AnimatePresence } from "framer-motion";

import { AlertTriangle, Trash2, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  loading,
  title = "Delete Transaction?",
  description = "This action cannot be undone.",
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* BACKDROP */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-7 shadow-2xl shadow-red-500/10"
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* ICON */}
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <AlertTriangle size={32} />
            </div>

            {/* CONTENT */}
            <h2 className="text-2xl font-bold text-white">{title}</h2>

            <p className="mt-3 text-slate-400">{description}</p>

            {/* ACTIONS */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-medium text-white transition hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={onConfirm}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 cursor-pointer"
              >
                <Trash2 size={18} />
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
