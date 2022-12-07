import { Router } from "express";
import { messageRouter } from "./message-router";
import { userRouter } from "./user-router";

const router = Router();
router.use(userRouter);
router.use(messageRouter);

export { router };
