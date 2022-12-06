const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const app = express();
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });
  socket.emit("initialMessage", { name: "loish" });
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", { ...message });
  });
});

httpServer.listen(4000, () => {
  console.log("server connected");
});
