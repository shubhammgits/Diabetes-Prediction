import React from 'react';
import { motion } from 'framer-motion';

const CreatorBadge = () => {
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-[#1B263B]/80 backdrop-blur-sm py-3 border-t border-[#1ABC9C]/30 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center">
        <span className="text-[#F0F2F5] mr-2 body-text font-medium">Made with</span>
        <motion.span 
          className="text-red-500 mr-2 text-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ❤️
        </motion.span>
        <span className="text-[#F0F2F5] mr-3 body-text font-medium">by Shubham</span>
        
        <motion.div
          className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#1ABC9C]/50"
          whileHover={{ scale: 2.5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
            alt="Shubham"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreatorBadge;