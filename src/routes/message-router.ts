import { Router } from "express";
import { MessageController } from "../controllers/message-controller";
import { MessageService } from "../services/message-service";

const messageRouter = Router();
const messageService = new MessageService();
const messageController = new MessageController(messageService);

messageRouter.post("/message/create", messageController.create);

export { messageRouter };
