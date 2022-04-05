import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import io from "Socket.IO-client";

let socket;

export default function Chatroom() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  if (session) {
    return (
      <div>
        <input
          placeholder="Type Something"
          value={input}
          onChange={onChangeHandler}
        />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return <p>Not signed in, redirecting</p>;
  }
}
