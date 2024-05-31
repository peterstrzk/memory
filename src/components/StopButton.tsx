import  { useState } from "react";
import useSharedStop from "../hooks/useStopTime";

const StopButton = () => {
    const { setStop: setSharedStop } = useSharedStop();
    const [stopGame, setStopGame] = useState("Stop game!");

    const stopGameClick = () => {
        if (stopGame === "Stop game!") {
            setStopGame("Unstop game!");
            setSharedStop(true);
        } else {
            setStopGame("Stop game!");
            setSharedStop(false);
        }
    };

    return (
        <div className="stopButton">
                <button onClick={stopGameClick}>{stopGame}</button>
            </div>
            
       
    );
};

export default StopButton;
