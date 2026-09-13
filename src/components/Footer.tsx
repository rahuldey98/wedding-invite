import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';

export const Footer = () => {
  const { couple } = weddingData;

  return (
    <footer className="w-full py-16 px-4 bg-white text-center flex flex-col items-center justify-center border-t border-gray-100">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* With Love */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-sm sm:text-base text-[#7A7570] tracking-normal mb-2"
        >
          With Love
        </motion.span>

        {/* Couple Names */}
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-script text-5xl sm:text-6xl text-[#7A0000] tracking-wide mb-4 leading-tight"
        >
          {couple.displayNames}
        </motion.h4>

        {/* Wedding Date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-base sm:text-lg text-[#7A0000] font-normal mb-1"
        >
          {couple.weddingDateFormatted}
        </motion.p>

        {/* Wedding Hashtag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-xs sm:text-sm text-[#7A7570] tracking-wider"
        >
          {couple.hashtag}
        </motion.p>

      </div>
    </footer>
  );
};
