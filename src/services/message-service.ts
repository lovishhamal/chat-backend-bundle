import { BaseService } from "./base-service";
var ObjectID = require("mongodb").ObjectID;

export class MessageService extends BaseService<string, any, any, any> {
  constructor() {
    super();
  }

  async create(request: any) {
    return new Promise(async (resolve, reject) => {
      const { message, ...rest } = request;

      const response = await super.findOneAndUpdate("messages", {
        id: { messageId: request.messageId },
        condition: {
          $set: rest,
          $push: {
            messages: message,
          },
        },
      });
      resolve(response);
    });
  }

  async findAll(request: any) {
    return new Promise(async (resolve, reject) => {
      const response = await super.findAll("messages", {
        condition: {
          messageId: request.messageId,
        },
      });

      resolve(response);
    });
  }

  async find(request: any) {
    return new Promise(async (resolve, reject) => {
      const response = await super.findOne("messages", {
        condition: {
          messageId: request.messageId,
        },
      });

      resolve(response);
    });
  }
}
