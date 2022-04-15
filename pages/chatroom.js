import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import io from "socket.io-client";

let socket;
let channel;

const from = (channel) => {
  return "from-".concat(channel);
};

const to = (channel) => {
  return "to-".concat(channel);
};

export default function Chatroom() {
  const { data: session } = useSession();
  const [connected, setConnected] = useState(false);

  const channelRef = useRef(null);
  const messageLogRef = useRef(null);

  const socketInitializer = async () => {
    await fetch("api/socket", {
      headers: {
        Accept: "application/json",
        "Conent-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ channel: channel }),
    });

    socket = io();

    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.emit(to(channel), {
      user: session.user.name,
      text: "Connected to the channel",
    });


    socket.on("sent-to-" + session.user.name, (msg) => {
        // decrypt message with my key
        //
        // update the textbox with decrypted message
      updateHistory(msg.user, msg.text);
    });
  };

  const updateHistory = (user, msg) => {
    messageLogRef.current.textContent += "\n".concat(`${user}: ${msg}`);
  };

    // Send a message
  const onSubmitHandler = (e) => {
    if (e.key === "Enter") {

        // get all the users in the channel
        //
        // for each user, use their lock (public key) to encrypt the messgage
        //      and send the message to them "to-$(user)"
        // 
      console.log("Emitting message")
      socket.emit(to(channel), {
        user: session.user.name,
        text: e.target.value,
      });
      updateHistory(session.user.name, e.target.value);
      e.target.value = "";
    }
  };

  const channelEnterHandler = (e) => {
    if (e.key === "Enter") {
      channel = e.target.value;
      socketInitializer();
      setConnected(true);
    }
  };

  if (session) {
    if (connected) {
      return (
        <div>
          <p>Connected to channel: {channel}</p>
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
          <input
            ref={channelRef}
            placeholder="Enter a channel"
            onKeyPress={channelEnterHandler}
          ></input>
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      );
    }
  } else {
    return <p>Not Signed in</p>;
  }
}
