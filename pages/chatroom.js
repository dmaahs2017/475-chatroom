import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import io from "Socket.IO-client";

let socket;

export default function Chatroom() {
  const { data: session } = useSession();
  const [connected, setConnected] = useState(false);
  const messageLogRef = useRef(null);

  //useEffect(() => {
  //}, []);

  const socketInitializer = async () => {
    await fetch("api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("from-server", (msg) => {
      console.log("Recieved messsage");
      updateHistory(msg);
    });
  };

  const updateHistory = (msg) => {
    messageLogRef.current.textContent += "\n".concat(msg);
  };

  const onSubmitHandler = (e) => {
    console.log("Handling Submit");
    if (e.key === "Enter") {
      console.log("Sent chat");
      socket.emit("to-server", e.target.value);
      updateHistory(e.target.value);
      e.target.value = "";
    }
  };

  const connect = () => {
    socketInitializer();
    setConnected(true);
  };

  if (session) {
    if (connected) {
      return (
        <div>
          <textarea
            ref={messageLogRef}
            readOnly={true}
            style={{ height: 600, width: 600 }}
          ></textarea>
          <br />
          <input placeholder="Type Something" onKeyPress={onSubmitHandler} />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={connect}>Connect to chatroom</button>
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      );
    }
  } else {
    return <p>Not Signed in</p>;
  }
}
