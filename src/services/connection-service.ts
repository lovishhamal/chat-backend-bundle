import { BaseService } from "./base-service";
import { v4 as uuidv4 } from "uuid";
var ObjectID = require("mongodb").ObjectID;

export class ConnectionService extends BaseService<string, any, any, any> {
  constructor() {
    super();
  }

  async getAllConnection(userId: string, connectionId: string | null = null) {
    /**needs a lot of code change later */

    return new Promise(async (resolve, reject) => {
      let users = await super.findAll("users", {
        condition: { _id: { $ne: ObjectID(connectionId) } },
      });

      const connection = await super.findOne("connections", {
        condition: { userId },
      });

      if (connection) {
        users = users.filter((item: any) => {
          return connection.connectionIds
            .map((value: any) => value.userId)
            .includes(item._id.toString());
        });
        users = users.map((value: any) => {
          const connected_user = connection.connectionIds.filter(
            (item1: any) => item1.userId === value._id.toString()
          );

          return {
            ...value,
            connection: connected_user,
          };
        });
      } else {
        users = [];
      }

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
      const connectionId = uuidv4();
      const messageId = uuidv4();
      await super.findOneAndUpdate("connections", {
        id: { _id: ObjectID(request.id) },
        condition: {
          $set: {
            userId: request.id,
          },
          $push: {
            connectionIds: {
              userId: request.connectionId?.id,
              connectionId: connectionId,
              messageId,
              connectionType: request.connectionType,
            },
          },
        },
      });

      await super.findOneAndUpdate("connections", {
        id: { _id: ObjectID(request.connectionId?.id) },
        condition: {
          $set: {
            userId: request.connectionId?.id,
          },
          $push: {
            connectionIds: {
              userId: request.id,
              connectionId: connectionId,
              messageId,
              connectionType: request.connectionType,
            },
          },
        },
      });
      resolve([]);
    });
  }

  async createGroupConnection(request: any) {
    return new Promise(async (resolve, reject) => {
      const connectionId = uuidv4();
      await super.findOneAndUpdate("connections", {
        id: { _id: ObjectID(request.connectionId?.id) },
        condition: {
          $set: { ...request, connectionId },
        },
      });
    });
  }
}
