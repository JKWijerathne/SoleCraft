import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC]/95 backdrop-blur-sm"
    : "flex flex-col items-center justify-center py-10 w-full";

  return (
    <div className={containerClasses}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#F5B942] opacity-90"
        />

        {/* Inner reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#071A2F] opacity-70"
        />

        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 bg-[#D99A20] rounded-full shadow-[0_0_10px_rgba(245,185,66,0.8)]"
        />
      </div>

      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-xs font-extrabold uppercase tracking-widest text-[#111827]/55"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;