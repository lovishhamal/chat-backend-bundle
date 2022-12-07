import { BaseService } from "./base-service";

export class UserService extends BaseService<string, any, any, any> {
  constructor() {
    super();
  }

  create = () => {
    super.insertOne("users", { name: "Jack" });
  };
}
