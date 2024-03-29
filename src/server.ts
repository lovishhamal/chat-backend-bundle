import express, { Application } from "express";
import App from "./loaders/app";
import dbConnection from "./connections/mongodb-connection";
import { MessageService } from "./services/message-service";
import * as dotenv from "dotenv";
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app: Application = express();
new App(app).init();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const messageService = new MessageService();
let activeUsers: any = [];
const rooms: any = {};

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
        io.emit("recieve-message", data.message);
      });

      socket.on("user-input", async (data: any) => {
        io.emit("user-input", data);
      });

      socket.on("video_paused", (data: any) => {
        io.emit("video_paused", data);
      });

      /** media connection starts here */
      socket.on("join_room", ({ connectionId, receiverInfo }: any) => {
        if (rooms[connectionId]) {
          rooms[connectionId].push(socket.id);
        } else {
          rooms[connectionId] = [socket.id];
        }

        const participant = rooms[connectionId].find(
          (id: any) => id !== socket.id
        );

        if (participant) {
          socket.emit("other_user", participant);
          socket.to(participant).emit("user-joined", socket.id);
        } else {
          io.emit("call_user", { receiverInfo, connectionId });
        }
      });

      socket.on("offer", (payload: any) => {
        io.to(payload.receiver).emit("offer", payload);
      });

      socket.on("answer", (payload: any) => {
        io.to(payload.receiver).emit("answer", payload);
      });

      socket.on("ice_candidate", (incoming: any) => {
        io.to(incoming.receiver).emit("ice_candidate", incoming.candidate);
      });

      socket.on("call_ended", (payload: any) => {
        if (rooms.hasOwnProperty(payload.connectionId)) {
          delete rooms[payload.connectionId];
        }
        io.emit("call_ended", { connectionId: payload.connectionId });
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`server connected -> ${PORT}`);
    });
  }
});
