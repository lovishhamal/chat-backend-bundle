import { IRoutes } from "../interface/routes";

export const routes: IRoutes = {
  users: {
    auth: {
      login: "/user/login",
      register: "/user/register",
    },
    connection: {
      findFriends: "/user/findFriends/:id",
    },
  },
  connection: {
    findFriends: "/user/findFriends/:id",
    getAllConnection: "/users/connection/:id",
    setConnection: "/user/connection",
    setGroupConnection: "/user/groupConnection",
  },
  messages: {
    create: "/message/create",
    find: "/message/find",
  },
};
