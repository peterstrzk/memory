import React, { useEffect, useRef, useState} from "react";
import useSharedStop from "../hooks/useStopTime";
const Clock: React.FC = () => {
    const [time, setTime] = useState(0);
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
const { stop } = useSharedStop();

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

  return(
    <div>Time: {time} seconds</div>
  )
}
export default Clock;