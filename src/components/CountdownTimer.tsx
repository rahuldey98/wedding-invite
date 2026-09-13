import { useState, useEffect } from 'react';
import { weddingData } from '../config/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const { weddingDateISO } = weddingData.couple;

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(weddingDateISO).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDateISO]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="w-full py-8 px-4 bg-white flex justify-center">
      <div className="w-full max-w-md flex items-center justify-center">
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            {/* Unit Column */}
            <div className="flex flex-col items-center justify-center px-3 sm:px-5">
              <span className="font-display text-4xl sm:text-5xl md:text-6xl text-[#4A0000] font-normal leading-none tabular-nums">
                {unit.value}
              </span>
              <span className="font-body text-xs sm:text-sm text-[#7A7570] capitalize mt-2">
                {unit.label}
              </span>
            </div>

            {/* Vertical Divider Line */}
            {index < units.length - 1 && (
              <div className="h-10 sm:h-12 w-[1.5px] bg-[#6E0000]/60 self-center mx-1 sm:mx-2" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
