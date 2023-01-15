import { Router } from "express";
import { routes } from "../constants/routes";
import { MessageController } from "../controllers/message-controller";
import { MessageService } from "../services/message-service";

const messageRouter = Router();
const messageService = new MessageService();
const messageController = new MessageController(messageService);

messageRouter.post(routes.messages.create, messageController.create);
messageRouter.post(routes.messages.find, messageController.find);

export { messageRouter };
