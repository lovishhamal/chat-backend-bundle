"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const routes_1 = require("../constants/routes");
const message_controller_1 = require("../controllers/message-controller");
const message_service_1 = require("../services/message-service");
const messageRouter = (0, express_1.Router)();
exports.messageRouter = messageRouter;
const messageService = new message_service_1.MessageService();
const messageController = new message_controller_1.MessageController(messageService);
messageRouter.post(routes_1.routes.messages.create, messageController.create);
messageRouter.get(routes_1.routes.messages.find, messageController.find);
//# sourceMappingURL=message-router.js.map