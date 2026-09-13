import { motion } from 'framer-motion';

export const IntroQuote = () => {
  return (
    <section className="w-full py-16 px-6 bg-white text-center flex flex-col items-center justify-center">
      <div className="max-w-lg mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-4xl sm:text-5xl text-[#7A0000] tracking-wide mb-4 leading-tight"
        >
          Awaiting your noble presence
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-body text-xs sm:text-sm text-[#7A7570] leading-relaxed max-w-sm mx-auto"
        >
          Because meeting two souls requires the fun- and you!
        </motion.p>
      </div>
    </section>
  );
};
