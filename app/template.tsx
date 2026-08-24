"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ 
        rotateY: 20,
        x: 40,
        opacity: 0, 
        transformPerspective: 2000, 
        transformOrigin: "left center" 
      }}
      animate={{ 
        rotateY: 0, 
        x: 0,
        opacity: 1 
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
