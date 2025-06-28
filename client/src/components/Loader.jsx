import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const flameVariants = {
  initial: { scale: 1, opacity: 0.7 },
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-6">

      <div className="relative flex items-center justify-center">

        <div className="flex space-x-2 absolute -bottom-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-3 bg-orange-500 rounded-t-full"
              initial="initial"
              animate="animate"
              variants={flameVariants}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>


        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-red-600"
        >
          <Flame size={60} className="drop-shadow-lg" />
        </motion.div>
      </div>


      <p className="text-sm font-medium my-4 text-gray-600 animate-pulse">
        Cooking...
      </p>
    </div>
  );
};

export default Loader;
