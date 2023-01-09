import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-service";

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.post("/user/register", userController.create);
userRouter.post("/user/login", userController.login);
userRouter.get("/user/findFriends/:id", userController.findFriends);
userRouter.get("/users/connection/:id", userController.getAllConnection);
userRouter.post("/user/connection", userController.setConnection);
userRouter.post("/user/groupConnection", userController.createGroupConnection);

export { userRouter };
