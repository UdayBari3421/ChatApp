const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const SocketServer = socketIo.Server;
const PORT = 5500;

const expressServer = express();
const httpServer = http.createServer(expressServer);

const io = new SocketServer(httpServer);

io.on("connection", (socket) => {
  console.log(`${socket.id} joined`);
  socket.on("message", (data) => {
    io.emit("message", data);
  });
  socket.on("disconnect", (data) => {
    console.log(`${socket.id} left`);
  });
});

expressServer.use(express.static("client"));

httpServer.listen(PORT, () => {
  console.log(`app is up and running on http://localhost:${PORT}/`);
});
