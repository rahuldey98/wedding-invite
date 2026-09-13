import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';

export const VenueSection = () => {
  const { venue } = weddingData;

  return (
    <section id="venue" className="w-full py-14 px-4 bg-[#7A0000] text-center flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col items-center">
        
        {/* Top "Venue" Header */}
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-sm sm:text-base text-white tracking-wider uppercase mb-1"
        >
          {venue.subtitle}
        </motion.span>

        {/* "Where We Celebrate" Script Calligraphy */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-script text-5xl sm:text-6xl text-white tracking-wide mb-8"
        >
          {venue.title}
        </motion.h2>

        {/* Live Interactive Google Maps Embed Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[1280/800] bg-[#E8ECEF]"
        >
          <iframe
            title="Venue Location Map"
            src="https://maps.google.com/maps?q=23.2247774,87.0867049&hl=en&z=16&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Direct Google Maps Navigation Button */}
        <motion.a
          href={venue.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium tracking-wide backdrop-blur-sm border border-white/30 transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
        >
          <span>📍</span>
          <span>Open in Google Maps</span>
          <span className="text-xs">↗</span>
        </motion.a>

      </div>
    </section>
  );
};
