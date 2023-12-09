/* eslint-disable react/prop-types */

import { useId, useState } from "react";
import "./App.css";

function CheckboxItem({ onChange, label, checked }) {
  const id = useId();

  return (
    <div className="transfer-list__section__items__item">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function ItemList({ items, setItems }) {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section__items">
        {Array.from(items.entries()).map(([label, checked]) => (
          <li key={label}>
            <CheckboxItem
              label={label}
              checked={checked}
              onChange={() => {
                const newItems = new Map(items);
                newItems.set(label, !items.get(label));
                setItems(newItems);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

function generateItemsMap(items) {
  return new Map(items.map((label) => [label, false]));
}

function hasNoSelectedItems(items) {
  return Array.from(items.values()).filter((val) => Boolean(val)).length === 0;
}

function transferAllItems(itemsSrc, setItemsSrc, itemsDst, setItemsDst) {
  setItemsDst(new Map([...itemsDst, ...itemsSrc]));
  setItemsSrc(new Map());
}

function transferSelectedItems(itemsSrc, setItemsSrc, itemsDst, setItemsDst) {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDst = new Map(itemsDst);

  itemsSrc.forEach((value, key) => {
    if (!value) {
      return;
    }

    newItemsDst.set(key, value);
    newItemsSrc.delete(key);
  });
  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
}

export default function App() {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT)
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT)
  );

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="transfer-list__actions">
        <button
          aria-label="Transfer all items to left list"
          disabled={itemsRight.size === 0}
          onClick={() => {
            transferAllItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft
            );
          }}
        >
          <span aria-hidden={true}>&lt;&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to left list"
          disabled={hasNoSelectedItems(itemsRight)}
          onClick={() => {
            transferSelectedItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft
            );
          }}
        >
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to right list"
          disabled={hasNoSelectedItems(itemsLeft)}
          onClick={() => {
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight
            );
          }}
        >
          <span aria-hidden={true}>&gt;</span>
        </button>
        <button
          aria-label="Transfer all items to right list"
          disabled={itemsLeft.size === 0}
          onClick={() => {
            transferAllItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight
            );
          }}
        >
          <span aria-hidden={true}>&gt;&gt;</span>
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
}
