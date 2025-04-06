import { useEffect } from "react";
import io from "socket.io-client";

export default function PossibleCakePage() {
  useEffect(() => {}, []);

  const connectSocket = () => {
    console.log("시작");
    const socket = io("http://localhost:5173", {
      autoConnect: true,
      path: "/socket.io/", // 기본 path 명시
      transports: ["polling", "websocket"], // polling을 먼저 시도
    });
    console.log(socket);
    socket.on("connection", (message) => {
      console.log(message);
    });
  };
  return <button onClick={connectSocket}>버튼</button>;
}
