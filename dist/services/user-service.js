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
exports.UserService = void 0;
const crypto_1 = require("../util/crypto");
const base_service_1 = require("./base-service");
var ObjectID = require("mongodb").ObjectID;
class UserService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    create(request) {
        const _super = Object.create(null, {
            insertOne: { get: () => super.insertOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const checkUserExists = yield this.checkUserExists(request);
                if (checkUserExists) {
                    return reject({ statusCode: 404, message: "User already exists" });
                }
                const password = crypto_1.Bcrypt.hashSync(request.password, 10);
                const payload = Object.assign(Object.assign({}, request), { password, userName: request.userName.toLowerCase(), email: request.email.toLowerCase() });
                yield _super.insertOne.call(this, "users", payload);
                resolve(request);
            }));
        });
    }
    checkUserExists(request) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _super.findOne.call(this, "users", {
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
        });
    }
    login(request) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = yield _super.findOne.call(this, "users", {
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
                    const isPasswordMatched = crypto_1.Bcrypt.compareSync(request.password, user.password);
                    if (isPasswordMatched) {
                        resolve(user);
                    }
                    else {
                        reject({ statusCode: 400, message: "Password donot match" });
                    }
                }
                else {
                    reject({ statusCode: 400, message: "User not found" });
                }
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
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map