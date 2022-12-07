import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-service";

const mainRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

mainRouter.post("/users/add", userController.create);
mainRouter.post("/users/add", userController.create);

export { mainRouter };
