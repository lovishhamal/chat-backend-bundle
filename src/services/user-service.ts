import { Bcrypt } from "../util/crypto";
import { BaseService } from "./base-service";
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
        condition: { _id: { $ne: ObjectID(request) } },
      });
      resolve(users);
    });
  }
}
