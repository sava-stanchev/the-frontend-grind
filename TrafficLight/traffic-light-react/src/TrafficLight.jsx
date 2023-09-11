/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Light({ backgroundColor }) {
  return <div className="traffic-light" style={{ backgroundColor }} />;
}

export default function TrafficLight({ config }) {
  const [currColor, setCurrColor] = useState("green");

  useEffect(() => {
    const { duration, next } = config[currColor];

    setTimeout(() => {
      setCurrColor(next);
    }, duration);
  }, [config, currColor]);

  return (
    <div className="traffic-lights-container">
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
