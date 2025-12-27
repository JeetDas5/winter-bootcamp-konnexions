import "./App.css";
import Header from "./Header";
import { useState } from "react";

function App() {
  const name = "Jeet";

  const [count, setCount] = useState(1);

  const handleClick = () => {
    alert("Button Clicked!");
  };

  const isLoggedIn = true;

  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <>
      <div>
        <Header title="Welcome to my React App" />
        <h1>Hello {name}</h1>
        <h2>{count}</h2>
        <h2>{isLoggedIn ? "I am logged in" : "Please login"}</h2>
        <button onClick={() => setCount(count + 1)}>Increment!</button>
        <button onClick={handleClick}>Click Me</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
