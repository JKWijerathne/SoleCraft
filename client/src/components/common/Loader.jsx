import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
    : "flex flex-col items-center justify-center py-10 w-full";

  return (
    <div className={containerClasses}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500 opacity-80"
        />
        {/* Inner reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white opacity-60"
        />
        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]"
        />
      </div>
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-xs font-black uppercase tracking-widest text-gray-400"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
