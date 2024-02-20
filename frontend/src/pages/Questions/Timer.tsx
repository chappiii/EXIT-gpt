import { useState, useEffect } from "react";

interface TimerProps {
  totalTime: number;
  onTimeExpired: () => void;
}

const Timer: React.FC<TimerProps> = ({ totalTime, onTimeExpired }) => {
  const [seconds, setSeconds] = useState<number>(totalTime);

  useEffect(() => {
    let intervalId: number;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      // Time has expired, invoke the callback
      onTimeExpired();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds, onTimeExpired]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="timer text-gray-900 bg-gray-100 hover:bg-gray-100 border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
      Time Remaining: {formatTime(seconds)}
    </div>
  );
};

export default Timer;
