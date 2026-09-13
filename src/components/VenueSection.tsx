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

        {/* Clickable Map Card */}
        <motion.a
          href={venue.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[1280/800] bg-sand block group cursor-pointer"
          title="Open location in Google Maps"
        >
          <img
            src={venue.image}
            alt="Venue Location Map"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
        </motion.a>

      </div>
    </section>
  );
};
