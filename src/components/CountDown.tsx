import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

const defaultState: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false,
};

const CustomStyles = () => (
  <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

      .font-orbitron { font-family: 'Orbitron', sans-serif; }

      .neon-glow-cyan {
        text-shadow: 0 0 10px rgba(52, 211, 235, 0.8), 
                     0 0 20px rgba(52, 211, 235, 0.6);
      }

      .neon-timer-segment {
        background: rgba(18, 24, 47, 0.7); 
        box-shadow: 0 0 15px rgba(52, 211, 235, 0.3);
      }
    `}</style>
);

const targetDate = new Date("2025-12-07T00:00:00");

const TimeSegment = ({ value, label }) => {
  const colorClass =
    label === "seconds" || label === "minutes"
      ? "text-cyan-300 neon-glow-cyan"
      : "text-indigo-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, stiffness: 100 }}
      className="flex flex-col items-center p-4 md:p-6 w-[23vw] max-w-[120px] 
                 neon-timer-segment rounded-xl border border-cyan-500/30 shadow-lg"
    >
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className={`text-3xl md:text-5xl font-extrabold font-orbitron ${colorClass}`}
      >
        {String(value).padStart(2, "0")}
      </motion.div>

      <span className="text-xs md:text-sm text-gray-400 uppercase mt-2 tracking-widest">
        {label}
      </span>
    </motion.div>
  );
};

export const CountdownTimer = () => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +targetDate - +new Date();

    if (difference <= 0) {
      return { ...defaultState, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft.expired) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft, timeLeft.expired]);

  return (
    <>
      <CustomStyles />

      <div className="p-4 md:p-8 backdrop-blur-sm">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-3xl font-bold text-center text-cyan-400 mb-8 
                     font-orbitron neon-glow-cyan"
        >
          Event Starts: December 7, 2025
        </motion.h3>

        <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
          {timeLeft.expired ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.1 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse",
              }}
              className="text-3xl md:text-4xl font-orbitron font-bold text-red-500 neon-glow-cyan"
            >
              CYBER EVENT IS LIVE!
            </motion.div>
          ) : (
            <>
              <TimeSegment value={timeLeft.days} label="days" />
              <TimeSegment value={timeLeft.hours} label="hours" />
              <TimeSegment value={timeLeft.minutes} label="minutes" />
              <TimeSegment value={timeLeft.seconds} label="seconds" />
            </>
          )}
        </div>
      </div>
    </>
  );
};
