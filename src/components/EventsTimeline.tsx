import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';

export const EventsTimeline = () => {
  const { events } = weddingData;

  return (
    <section id="schedule" className="w-full py-12 px-4 bg-[#7A0000] text-center flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col items-center">
        
        {/* "Events Schedule" Calligraphy Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-5xl sm:text-6xl text-white tracking-wide mb-8 mt-2"
        >
          Events Schedule
        </motion.h2>

        {/* Stacked Event Cards with Artwork and Overlay Titles */}
        <div className="w-full space-y-6">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-black/10 aspect-[4568/2373] bg-[#5A0000] flex items-center justify-center group"
            >
              {/* Event Background Artwork */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />

              {/* Dark subtle scrim for maximum text legibility */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-colors" />

              {/* Centered Event Title & Yellow Time Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <h3 className="font-script-accent text-3xl sm:text-4xl md:text-5xl text-white font-normal drop-shadow-md">
                  {event.title}
                </h3>
                <p className="font-body text-base sm:text-lg md:text-xl text-[#FFF200] font-medium mt-1 drop-shadow-md">
                  {event.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
