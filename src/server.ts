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
const onlineUsers = new Map();

let activeUsers: any = [];

dbConnection.initMongoDb((error: Error, dbObj?: any) => {
  if (error) {
    console.log(error);
  } else {
    io.on("connection", (socket: any) => {
      /** Add new User */
      socket.on("new-user-add", (newUserId: any) => {
        // if user is not added previously
        if (!activeUsers.some((user: any) => user.userId === newUserId)) {
          activeUsers.push({ userId: newUserId, socketId: socket.id });
        }

        /** Send all active users to new user */
        io.emit("get-users", activeUsers);
      });

      /** Send message to a specific user */
      socket.on("send_message", async (data: any) => {
        await messageService.create(data);
        io.emit("recieve-message", data);
      });

      /** Call user */
      socket.on("call_user", async (data: any) => {
        console.log("dd", data);
        io.emit("get_call", data);
      });

      /** Answer call */
      socket.on("answer_call", async (data: any) => {
        await messageService.create(data);
        io.to(data.to).emit("call accepted", data.signal);
      });
    });

    httpServer.listen(5000, () => {
      console.log("server connected");
    });
  }
});
