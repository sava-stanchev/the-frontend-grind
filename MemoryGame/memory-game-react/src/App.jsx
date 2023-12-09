/* eslint-disable react/prop-types */

import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const emojis = [
  "🐵",
  "🐶",
  "🦊",
  "🐱",
  "🦁",
  "🐯",
  "🐴",
  "🦄",
  "🦓",
  "🦌",
  "🐮",
  "🐷",
  "🐭",
  "🐹",
  "🐻",
  "🐨",
  "🐼",
  "🐽",
  "🐸",
  "🐰",
  "🐙",
];

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateCards(totalCount, matchCount) {
  const numGroups = totalCount / matchCount;
  if (numGroups > emojis.length) {
    throw new Error("Not enough emojis");
  }

  const emojisList = emojis.slice(0, numGroups);
  const cards = Array.from({ length: numGroups }, () => null)
    .map((_, idx) => idx)
    .map((idx) => Array.from({ length: matchCount }, () => emojisList[idx]))
    .flat();

  shuffle(cards);
  return cards;
}

function MemoryGame({ cols = 4, rows = 4, delay = 2000, matchCount = 2 }) {
  const totalCount = rows * cols;
  const [cards, setCards] = useState(generateCards(totalCount, matchCount));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const waitTimer = useRef(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const resetGame = useCallback(() => {
    waitTimer.current = null;
    setCards(generateCards(totalCount, matchCount));
    setFlipped([]);
    setMatched(new Set());
    setGameCompleted(false);
  }, [matchCount, totalCount]);

  useEffect(() => {
    resetGame();
  }, [cols, rows, matchCount, resetGame]);

  if (matchCount < 2) {
    throw new Error(`${matchCount} should be 2 or more`);
  }

  if (totalCount % matchCount !== 0) {
    throw new Error(
      `Cannot divide total cells of ${totalCount} by ${matchCount}`
    );
  }

  function onFlip(index) {
    let currFlipped = flipped;

    if (waitTimer.current != null) {
      clearTimeout(waitTimer.current);
      waitTimer.current = null;
      currFlipped = [];
    }

    const newflipped = [...currFlipped, index];
    setFlipped(newflipped);

    if (newflipped.length < matchCount) {
      return;
    }

    const allFlippedAreSame = newflipped.every(
      (index) => cards[newflipped[0]] === cards[index]
    );

    if (allFlippedAreSame) {
      const newMatchedSet = new Set(matched);
      newMatchedSet.add(cards[newflipped[0]]);
      setMatched(newMatchedSet);
      setFlipped([]);

      if (newMatchedSet.size * matchCount === totalCount) {
        setGameCompleted(true);
      }

      return;
    }

    const timer = setTimeout(() => {
      setFlipped([]);
      waitTimer.current = null;
    }, delay);

    waitTimer.current = timer;
  }

  return (
    <div className="app">
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, var(--size))`,
          gridTemplateColumns: `repeat(${cols}, var(--size))`,
        }}
      >
        {cards.map((card, index) => {
          const isMatched = matched.has(cards[index]);
          const isFlipped = flipped.includes(index);

          return (
            <button
              key={index}
              className={["card", matched.has(cards[index]) && "card--revealed"]
                .filter(Boolean)
                .join(" ")}
              disabled={isMatched || isFlipped}
              onClick={() => {
                onFlip(index);
              }}
            >
              {(isMatched || isFlipped) && card}
            </button>
          );
        })}
      </div>
      {gameCompleted && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
}

export default function App() {
  return <MemoryGame rows={4} cols={4} waitTime={3000} matchCount={2} />;
}
