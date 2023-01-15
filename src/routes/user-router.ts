import { Router } from "express";
import { routes } from "../constants/routes";
import { ConnectionController } from "../controllers/connection-controller";
import { UserController } from "../controllers/user-controller";
import { ConnectionService } from "../services/connection-service";
import { UserService } from "../services/user-service";

const userRouter = Router();
const userService = new UserService();
const connectionService = new ConnectionService();
const userController = new UserController(userService);
const connectionController = new ConnectionController(connectionService);

userRouter.post(routes.users.auth.register, userController.create);
userRouter.post(routes.users.auth.login, userController.login);
userRouter.get(routes.users.connection.findFriends, userController.findFriends);
userRouter.get(
  routes.connection.getAllConnection,
  connectionController.getAllConnection
);
userRouter.post(
  routes.connection.setConnection,
  connectionController.setConnection
);
userRouter.post(
  routes.connection.setGroupConnection,
  connectionController.createGroupConnection
);

export { userRouter };
