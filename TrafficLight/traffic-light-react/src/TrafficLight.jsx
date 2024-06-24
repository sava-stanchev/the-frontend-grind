/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}

export default function TrafficLight({ config }) {
  const [currColor, setCurrColor] = useState("green");

  useEffect(() => {
    const { duration, next } = config[currColor];

    const timerId = setTimeout(() => {
      setCurrColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [config, currColor]);

  return (
    <div
      aria-label={`Current light: ${currColor}`}
      className="traffic-light-container"
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currColor ? config[color].backgroundColor : undefined
          }
        />
      ))}
    </div>
  );
}
