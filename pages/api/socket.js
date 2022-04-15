import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = JSON.parse(req.body);
  console.log(body);
  if (!body.channel) {
    res.status(400).send({ message: "No channel specified" });
    return;
  }

  const from = "from-".concat(body.channel);
  const to = "to-".concat(body.channel);

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }

  const io = res.socket.server.io;
  io.on("connection", (socket) => {
    console.log("User is connecting")
    if (!socket.eventNames().includes(to)) {
      socket.on(to, (msg) => {
        console.log(msg)
        socket.broadcast.emit(from, msg);
      });
    }
  });

  res.end();
};

export default SocketHandler;
