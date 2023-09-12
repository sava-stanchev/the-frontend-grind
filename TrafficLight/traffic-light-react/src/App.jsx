import TrafficLight from "./TrafficLight.jsx";
import "./App.css";

const config = {
  red: {
    backgroundColor: "red",
    duration: 4000,
    next: "green",
  },
  yellow: {
    backgroundColor: "yellow",
    duration: 500,
    next: "red",
  },
  green: {
    backgroundColor: "green",
    duration: 3000,
    next: "yellow",
  },
};

function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
    </div>
  );
}

export default App;
