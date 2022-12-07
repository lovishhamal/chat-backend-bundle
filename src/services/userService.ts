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
      const user = super.insertOne("users", request);
      resolve(user);
    });
  }

  async checkUserExists(request: any) {
    const result = await super.findOne("users", {
      condition: { userName: request.userName },
    });

    return result;
  }
}
