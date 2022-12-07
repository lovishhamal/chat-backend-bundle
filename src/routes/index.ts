import { Router } from "express";
import { mainRouter } from "./router";

const router = Router();
router.use(mainRouter);
export { router };
