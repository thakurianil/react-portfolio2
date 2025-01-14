import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incremented, decremented, random } from "./redux/slices/counterSlice.js";
import store from "./redux/store.js";
import { updateTitle } from "./redux/slices/bookSlice.js";

function App() {

  const count = useSelector((store) => store.counter.value);
  const book = useSelector((store)=> store.book);
  console.log(book);
  
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(incremented())}>Increment</button>
        <button onClick={() => dispatch(decremented())}>Decrement</button>
        <button onClick={() => dispatch(random())}>Random multiplier</button>
        <input 
  type="text" 
  onChange={(e) => dispatch(updateTitle(e.target.value))} 
  placeholder="title" 
/>

        count is {count}
        <hr/>
        Title is {book.title}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
