import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <p className="me-2">ID</p>
          <input type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div className="flex items-center">
          <p className="me-2">PW</p>
          <input type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div className=" bg-slate-300 px-4 py-2 rounded-md cursor-pointer">
          등록
        </div>
      </div>
    </>
  );
}

export default App;
