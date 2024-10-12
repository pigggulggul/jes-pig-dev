import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { login, register } from "./api/user";
import { loginUser, registUser } from "./types/type";

function App() {
  const [count, setCount] = useState(0);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const idRef2 = useRef<HTMLInputElement>(null);
  const pwRef2 = useRef<HTMLInputElement>(null);
  const nickRef = useRef<HTMLInputElement>(null);
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
          <input ref={idRef} type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div className="flex items-center">
          <p className="me-2">PW</p>
          <input ref={pwRef} type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div
          onClick={submitLogin}
          className=" bg-slate-300 px-4 py-2 rounded-md cursor-pointer"
        >
          로그인
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <p className="me-2">ID</p>
          <input ref={idRef2} type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div className="flex items-center">
          <p className="me-2">PW</p>
          <input ref={pwRef2} type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div className="flex items-center">
          <p className="me-2">닉네임</p>
          <input ref={nickRef} type="text" className="px-2 bg-slate-200 my-2" />
        </div>
        <div
          onClick={registerUser}
          className=" bg-slate-300 px-4 py-2 rounded-md cursor-pointer"
        >
          회원가입
        </div>
      </div>
    </>
  );
  async function submitLogin() {
    const id = idRef.current?.value || "";
    const pw = pwRef.current?.value || "";
    const user: loginUser = { userId: id, userPassword: pw };
    if (id?.length === 0 || pw?.length === 0) {
      alert("정보를 제대로 입력해주세요");
    } else {
      await login(user).then((res) => {
        console.log(res.data);
      });
    }
  }
  async function registerUser() {
    const id = idRef2.current?.value || "";
    const pw = pwRef2.current?.value || "";
    const nick = nickRef.current?.value || "";
    const user: registUser = { userId: id, userPassword: pw, nickname: nick };
    if (id?.length === 0 || pw?.length === 0 || nick?.length === 0) {
      alert("정보를 제대로 입력해주세요");
    } else {
      await register(user).then((res) => {
        console.log(res.data);
      });
    }
  }
}

export default App;
