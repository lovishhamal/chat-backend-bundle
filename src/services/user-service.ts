import { Bcrypt } from "../util/crypto";
import { BaseService } from "./base-service";
import dbConnection from "../connections/mongodb-connection";
var ObjectID = require("mongodb").ObjectID;

export class UserService extends BaseService<string, any, any, any> {
  constructor() {
    super();
  }

  async create(request: any) {
    return new Promise(async (resolve, reject) => {
      const checkUserExists = await this.checkUserExists(request);
      if (checkUserExists) {
        return reject({ statusCode: 404, message: "User already exists" });
      }
      const password = Bcrypt.hashSync(request.password, 10);
      const payload = {
        ...request,
        password,
        userName: request.userName.toLowerCase(),
        email: request.email.toLowerCase(),
      };
      await super.insertOne("users", payload);
      resolve(request);
    });
  }

  async checkUserExists(request: any) {
    const result = await super.findOne("users", {
      condition: {
        $or: [
          {
            userName: request.userName.toLowerCase(),
          },
          { email: request.email.toLowerCase() },
        ],
      },
    });

    return result;
  }

  async login(request: any) {
    return new Promise(async (resolve, reject) => {
      const user = await super.findOne("users", {
        condition: {
          $or: [
            { userName: request.userName.toLowerCase() },
            {
              email: request.userName.toLowerCase(),
            },
          ],
        },
      });

      if (user) {
        const isPasswordMatched = Bcrypt.compareSync(
          request.password,
          user.password
        );
        if (isPasswordMatched) {
          resolve(user);
        } else {
          reject({ statusCode: 400, message: "Password donot match" });
        }
      } else {
        reject({ statusCode: 400, message: "User not found" });
      }
    });
  }

  async findAll(request: any) {
    return new Promise(async (resolve, reject) => {
      const users = await super.findAll("users", {
        condition: { connections: { userId: ObjectID(request) } },
      });
      resolve(users);
    });
  }

  async findFriends(id: string, keyword: string) {
    return new Promise(async (resolve, reject) => {
      const users = await super.findAll("users", {
        condition: {
          _id: { $ne: ObjectID(id) },
          $or: [
            { email: new RegExp(keyword) },
            { userName: new RegExp(keyword) },
          ],
        },
      });
      resolve(users);
    });
  }

  async setConnection(request: any) {
    return new Promise(async (resolve, reject) => {
      const users = await super.findOneAndUpdate("users", {
        id: { _id: ObjectID(request.id) },
        condition: { $push: { connection: request.connectionId } },
      });
      resolve(users);
    });
  }
}
