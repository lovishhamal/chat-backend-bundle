export interface IRoutes {
  users: IUsers;
  connection: IRoutesConnection;
  messages: IMessages;
}

export interface IRoutesConnection {
  findFriends: string;
  getAllConnection: string;
  setConnection: string;
  setGroupConnection: string;
}

export interface IMessages {
  create: string;
  find: string;
}

export interface IUsers {
  auth: IAuth;
  connection: IUsersConnection;
}

export interface IAuth {
  login: string;
  register: string;
}

export interface IUsersConnection {
  findFriends: string;
}
