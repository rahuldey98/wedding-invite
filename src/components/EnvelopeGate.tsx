import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingHearts } from './FloatingHearts';
import { triggerWeddingConfetti } from '../utils/confetti';

interface EnvelopeGateProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeGate = ({ onOpen, isOpen }: EnvelopeGateProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    triggerWeddingConfetti();
    setTimeout(() => {
      onOpen();
    }, 500);
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        onClick={handleOpen}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FDFBF7] cursor-pointer select-none overflow-hidden"
      >
        {/* Floating Hearts Particle Layer */}
        <FloatingHearts />

        {/* Full Viewport Background Artwork with Envelope */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
          <picture className="w-full h-full">
            <source
              media="(max-width: 809px)"
              srcSet="https://framerusercontent.com/images/M1wPt5rmICI3h5ImgIUPMzaK2n4.jpg?width=1024&height=2510"
            />
            <source
              media="(max-width: 1199px)"
              srcSet="https://framerusercontent.com/images/jxebIgORuOmHykrOptbbuTah4MA.jpg?width=2126&height=3286"
            />
            <img
              src="https://framerusercontent.com/images/bmJ5M5gsocWry9xq9Xzy45ZdQsQ.jpg?width=3150&height=3528"
              alt="You are Invited - Wedding Invitation"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>

        {/* Top Spacer */}
        <div className="w-full pt-10" />

        {/* Bottom Text Area matching Framer layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 w-full text-center pb-16 sm:pb-24 px-4 flex flex-col items-center pointer-events-none"
        >
          <h1
            className="font-script text-5xl sm:text-7xl md:text-8xl text-[#7A0000] tracking-normal leading-tight select-none"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            You are Invited
          </h1>

          <p
            className="font-body text-sm sm:text-base md:text-lg text-[#333333] mt-1 sm:mt-2 tracking-normal"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
          >
            Tap the Envelop to open your Invitation
          </p>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};
