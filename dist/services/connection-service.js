"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionService = void 0;
const base_service_1 = require("./base-service");
const uuid_1 = require("uuid");
var ObjectID = require("mongodb").ObjectID;
class ConnectionService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getAllConnection(userId, connectionId = null) {
        const _super = Object.create(null, {
            findAll: { get: () => super.findAll },
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            /**needs a lot of code change later */
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let users = yield _super.findAll.call(this, "users", {
                    condition: { _id: { $ne: ObjectID(userId) } },
                });
                const connection = yield _super.findOne.call(this, "connections", {
                    condition: { userId },
                });
                // const groupConnection = await super.findOne("connections", {
                //   condition: {
                //     $or: [{ creatorId: userId }, { connecionIds: { $in: [userId] } }],
                //   },
                // });
                if (connection) {
                    users = users.filter((item) => {
                        return connection.connectionIds
                            .map((value) => value.userId)
                            .includes(item._id.toString());
                    });
                    users = users.map((value) => {
                        const connected_user = connection.connectionIds.filter((item1) => item1.userId === value._id.toString());
                        return Object.assign(Object.assign({}, value), { connection: connected_user });
                    });
                }
                else {
                    users = [];
                }
                resolve(users);
            }));
        });
    }
    findFriends(id, keyword) {
        const _super = Object.create(null, {
            findAll: { get: () => super.findAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const users = yield _super.findAll.call(this, "users", {
                    condition: {
                        _id: { $ne: ObjectID(id) },
                        $or: [
                            { email: new RegExp(keyword) },
                            { userName: new RegExp(keyword) },
                        ],
                    },
                });
                resolve(users);
            }));
        });
    }
    setConnection(request) {
        const _super = Object.create(null, {
            findOneAndUpdate: { get: () => super.findOneAndUpdate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const connectionId = (0, uuid_1.v4)();
                const messageId = (0, uuid_1.v4)();
                yield _super.findOneAndUpdate.call(this, "connections", {
                    id: { _id: ObjectID(request.id) },
                    condition: {
                        $set: {
                            userId: request.id,
                        },
                        $push: {
                            connectionIds: {
                                userId: (_a = request.connectionId) === null || _a === void 0 ? void 0 : _a.id,
                                connectionId: connectionId,
                                messageId,
                                connectionType: request.connectionType,
                            },
                        },
                    },
                });
                yield _super.findOneAndUpdate.call(this, "connections", {
                    id: { _id: ObjectID((_b = request.connectionId) === null || _b === void 0 ? void 0 : _b.id) },
                    condition: {
                        $set: {
                            userId: (_c = request.connectionId) === null || _c === void 0 ? void 0 : _c.id,
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
            }));
        });
    }
    createGroupConnection(request) {
        const _super = Object.create(null, {
            findOneAndUpdate: { get: () => super.findOneAndUpdate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const connectionId = (0, uuid_1.v4)();
                const messageId = (0, uuid_1.v4)();
                yield _super.findOneAndUpdate.call(this, "connections", {
                    id: { _id: ObjectID((_a = request.connectionId) === null || _a === void 0 ? void 0 : _a.id) },
                    condition: {
                        $set: Object.assign(Object.assign({}, request), { connectionId, messageId }),
                    },
                });
            }));
        });
    }
}
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection-service.js.map