import React, { useEffect, useRef, useState } from "react";
import useSharedStop from "../hooks/useStopTime";
import useSharedTime from "../hooks/useTimeEndGame";

const Clock: React.FC = () => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { stop } = useSharedStop();
  const { setTime: setSharedTime } = useSharedTime();

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (!stop) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [stop]);

  useEffect(() => {
    setSharedTime(time);
  }, [time, setSharedTime]);

  return (
    <div>Time: {time} seconds</div>
  );
};

export default Clock;
