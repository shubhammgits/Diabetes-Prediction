import React from 'react';
import { motion } from 'framer-motion';

const CreatorBadge = () => {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 flex items-center bg-amber-100/80 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-200 shadow-lg"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <span className="text-[#05668D] mr-2">Made with</span>
      <motion.span 
        className="text-red-500 mr-2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ❤️
      </motion.span>
      <span className="text-[#05668D] mr-3">by Shubham</span>
      
      <motion.div
        className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#05668D]/30"
        whileHover={{ scale: 1.8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
          alt="Shubham"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default CreatorBadge;