import { Bcrypt } from "../util/crypto";
import { BaseService } from "./base-service";

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
      const payload = { ...request, password };
      await super.insertOne("users", payload);
      resolve(request);
    });
  }

  async checkUserExists(request: any) {
    const result = await super.findOne("users", {
      condition: {
        $or: [{ userName: request.userName, email: request.email }],
      },
    });

    return result;
  }
}
