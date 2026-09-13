import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';

export const HeroSection = () => {
  const { couple } = weddingData;

  return (
    <section className="relative w-full pt-0 pb-0 px-0 flex flex-col items-center bg-white">
      {/* High-Res Invitation Card for Rahul & Riya */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full overflow-hidden bg-white shadow-sm"
      >
        <img
          src={couple.cardImage}
          alt={`${couple.displayNames} Wedding Invitation`}
          className="w-full h-auto object-cover object-center block"
          loading="eager"
        />
      </motion.div>
    </section>
  );
};
