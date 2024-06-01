import React, { useState, useEffect, useRef } from 'react';
import StopButton from './components/StopButton';
import  { SharedStopProvider } from './hooks/useStopTime';
import './App.css';
import Clock from './components/Clock';
import EndGameInfo from './components/EndGameInfo';

type Card = {
  id: number;
  pattern: string;
  matched: boolean;
  revealed: boolean;
};

const generatePatternCards = (): Card[] => {
  const patterns = [
    '🌟', '🍀', '🔥', '🌈', '🌙', '❄️', '⚡️', '💎', '🌸', '🎃',
    '🦄', '🐲', '🎄', '🍎', '🚀', '🌵', '🐠', '🧩', '🎈', '🎁',
    '📚', '🏀', '🎸', '🏆', '⚽️', '🍕', '🍔', '🚗', '✈️', '🚢'
  ];
  const cards = patterns.concat(patterns).map((pattern, index) => ({
    id: index,
    pattern,
    matched: false,
    revealed: false,
  }));
  return shuffleArray(cards);
};

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(generatePatternCards());
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (revealedCards.length === 2) {
      const [firstId, secondId] = revealedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.pattern === secondCard.pattern) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.pattern === firstCard.pattern ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstId || index === secondId ? { ...card, revealed: false } : card
            )
          );
        }, 1000);
      }
      setMoves((prevMoves) => prevMoves + 1);
      setRevealedCards([]);
    }
  }, [revealedCards, cards]);

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      setGameCompleted(true);
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    }
  }, [matchedPairs, cards.length]);

  const handleCardClick = (index: number) => {
    if (!gameCompleted && revealedCards.length < 2 && !cards[index].revealed && !cards[index].matched) {
      setCards((prevCards) =>
        prevCards.map((card, i) => (i === index ? { ...card, revealed: true } : card))
      );
      setRevealedCards((prevRevealed) => [...prevRevealed, index]);
    }
  };

  return (
    <SharedStopProvider>
      <div className="game">
        <div className="stats">
          <Clock />
          <div>Moves: {moves}</div>
          <div>Matched Pairs: {matchedPairs}</div>
          <StopButton />
        </div>
        {gameCompleted ? (
          <EndGameInfo />
        ) : (
          <div className="grid">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${card.revealed ? 'revealed' : ''} ${card.matched ? 'matched' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                {card.revealed || card.matched ? card.pattern : ''}
              </div>
            ))}
          </div>
        )}
        <div>Made by Piotr Starzak</div>
      </div>
    </SharedStopProvider>
  );
};

export default App;
