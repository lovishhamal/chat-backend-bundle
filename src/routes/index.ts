import { UserService } from "./../services/userService";
import { Router, Response } from "express";
import { UserController } from "../controllers/user-controller";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/", (_, res: Response) => res.json({ API: "welcome" }));

router.post("/users/add", userController.create);

export { router };
