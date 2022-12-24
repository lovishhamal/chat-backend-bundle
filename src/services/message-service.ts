import { BaseService } from "./base-service";
var ObjectID = require("mongodb").ObjectID;

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

  async findAll(request: any) {
    return new Promise(async (resolve, reject) => {
      const response = await super.findAll("messages", {
        condition: {
          $and: [{ sentTo: request.sentTo }, { sentBy: request.sentBy }],
        },
      });

      resolve(response);
    });
  }
}
