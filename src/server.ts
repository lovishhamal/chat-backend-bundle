import App from "./loaders/app";
import express, { Application } from "express";
import dbConnection from "./connections/mongodb-connection";
import { MessageService } from "./services/message-service";
const { createServer } = require("http");
const { Server } = require("socket.io");

const app: Application = express();
new App(app).init();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const messageService = new MessageService();

dbConnection.initMongoDb((error: Error, dbObj?: any) => {
  if (error) {
    console.log(error);
  } else {
    io.on("connection", (socket: any) => {
      // socket.on("join_room", (data) => {
      //   socket.join(data);
      // });
      socket.emit("initialMessage", { name: "loish" });
      socket.on("sendMessage", async (message: any) => {
        await messageService.create(message);
        io.emit("receiveMessage", { ...message });
      });
    });

    const server = httpServer.listen(4000, () => {
      console.log("server connected");
    });
  }
});
