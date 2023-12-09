/* eslint-disable react/prop-types */

import { useState } from "react";
import "./App.css";

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

function Cell({ filled, label, onClick, isDisabled }) {
  return (
    <button
      aria-label={label}
      type="button"
      className={["cell", filled && "cell--activated"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
}

export default function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  function deactivateCells() {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  }

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((value, index) =>
          value ? (
            <Cell
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              isDisabled={order.includes(index) || isDeactivating}
              onClick={() => {
                const newOrder = [...order, index];
                setOrder(newOrder);

                if (newOrder.length === config.flat(1).filter(Boolean).length) {
                  deactivateCells();
                }
              }}
            />
          ) : (
            <span key={index} />
          )
        )}
      </div>
      <pre>order array: {order.join(", ")}</pre>
    </div>
  );
}
