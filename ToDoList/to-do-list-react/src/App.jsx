import "./App.css";
import { useState } from "react";

let id = 0;

const INITIAL_TASKS = [
  { id: id++, label: "Walk the dog" },
  { id: id++, label: "Water the plants" },
  { id: id++, label: "Wash the dishes" },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");

  return (
    <div>
      <h1>To Do List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (newTask.trim() === "") {
            return;
          }

          setTasks([...tasks, { id: id++, label: newTask.trim() }]);
          setNewTask("");
        }}
      >
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <div>
          <button>Submit</button>
        </div>
      </form>
      {tasks.length === 0 ? (
        <div>No tasks added</div>
      ) : (
        <ul>
          {tasks.map(({ id, label }) => (
            <li key={id}>
              <span>{label}</span>
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete the task?")
                  ) {
                    setTasks(tasks.filter((task) => task.id !== id));
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
