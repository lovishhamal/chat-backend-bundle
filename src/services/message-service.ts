import { BaseService } from "./base-service";

export class MessageService extends BaseService<string, any, any, any> {
  constructor() {
    super();
  }

  async create(request: any) {
    return new Promise(async (resolve, reject) => {
      await super.insertOne("messages", request);
      resolve(request);
    });
  }
}
