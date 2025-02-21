const express = require("express");
const socket = require("socket.io");
const port = 3000;

const app = express();
const server = app.listen(
  port,
  console.log(`Server is running on port ${port}`)
);

app.use(express.static("public"));

const io = socket(server);
io.on("connection", (socket) => {
  const socketID = socket.id;
  socket.emit("socketid", socketID);

  socket.on("chat", (arg) => {
    io.sockets.emit("chat", arg, socketID);
  });

  socket.on("typing", (arg) => {
    socket.broadcast.emit("typing", arg);
  });
});
