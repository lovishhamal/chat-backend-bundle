"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./loaders/app"));
const express_1 = __importDefault(require("express"));
const mongodb_connection_1 = __importDefault(require("./connections/mongodb-connection"));
const message_service_1 = require("./services/message-service");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
new app_1.default(app).init();
const httpServer = createServer(app);
const io = new Server(httpServer, {
/* options */
});
const messageService = new message_service_1.MessageService();
let activeUsers = [];
const rooms = {};
mongodb_connection_1.default.initMongoDb((error, dbObj) => {
    if (error) {
        console.log(error);
    }
    else {
        io.on("connection", (socket) => {
            /** Add new User */
            socket.on("new-user-add", (newUserId) => {
                // if user is not added previously
                if (!activeUsers.some((user) => user.userId === newUserId)) {
                    activeUsers.push({ userId: newUserId, socketId: socket.id });
                }
                /** Send all active users to new user */
                io.emit("get-users", activeUsers);
            });
            /** Send message to a specific user */
            socket.on("send_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
                yield messageService.create(data);
                io.emit("recieve-message", data.message);
            }));
            socket.on("join_room", ({ connectionId, receiverInfo }) => {
                if (rooms[connectionId]) {
                    rooms[connectionId].push(socket.id);
                }
                else {
                    rooms[connectionId] = [socket.id];
                }
                const participant = rooms[connectionId].find((id) => id !== socket.id);
                if (participant) {
                    socket.emit("other_user", participant);
                    socket.to(participant).emit("user-joined", socket.id);
                }
                else {
                    io.emit("call_user", { receiverInfo, connectionId });
                }
            });
            socket.on("offer", (payload) => {
                io.to(payload.receiver).emit("offer", payload);
            });
            socket.on("answer", (payload) => {
                io.to(payload.receiver).emit("answer", payload);
            });
            socket.on("ice_candidate", (incoming) => {
                io.to(incoming.receiver).emit("ice_candidate", incoming.candidate);
            });
        });
        httpServer.listen(PORT, () => {
            console.log(`server connected -> ${PORT}`);
        });
    }
});
//# sourceMappingURL=server.js.map