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

      /** Call user */
      // socket.on("call_user", ({ offer, data }: any) => {
      //   io.emit("incoming_call", { offer, data });
      // });

      // socket.on("answer_call", ({ answer }: any) => {
      //   io.emit("call_accepted", answer);
      // });

      socket.on("join_room", (roomId: any, receiverId: any) => {
        if (rooms[roomId]) {
          rooms[roomId].push(socket.id);
        } else {
          rooms[roomId] = [socket.id];
        }

        const participant = rooms[roomId].find((id: any) => id !== socket.id);
        if (participant) {
          socket.emit("other_user", participant);
          socket.to(participant).emit("user-joined", socket.id);
        } else {
          io.emit("call_user", receiverId);
        }
      });

      socket.on("offer", (payload: any) => {
        io.to(payload.target).emit("offer", payload);
      });

      socket.on("answer", (payload: any) => {
        io.to(payload.target).emit("answer", payload);
      });

      socket.on("ice_candidate", (incoming: any) => {
        io.to(incoming.target).emit("ice_candidate", incoming.candidate);
      });
    });

    httpServer.listen(5000, () => {
      console.log("server connected");
    });
  }
});
