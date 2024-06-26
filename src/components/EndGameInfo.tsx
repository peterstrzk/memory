import React from 'react';
import  useSharedTime  from '../hooks/useTimeEndGame.tsx'

const EndGameInfo: React.FC = () => {
  const { time } = useSharedTime();
  

  return (
    <div className="congratulations">
      Congratulations! You completed the game in {time} seconds.
    </div>
  );
};

export default EndGameInfo;
