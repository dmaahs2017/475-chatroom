import { Server } from "Socket.IO";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("to-server", (msg) => {
        console.log("Forwarding message");
        socket.broadcast.emit("from-server", msg);
      });
    });
  }

  res.end();
};

export default SocketHandler;
