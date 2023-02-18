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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const base_service_1 = require("./base-service");
var ObjectID = require("mongodb").ObjectID;
class MessageService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    create(request) {
        const _super = Object.create(null, {
            findOneAndUpdate: { get: () => super.findOneAndUpdate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const { message } = request, rest = __rest(request, ["message"]);
                const response = yield _super.findOneAndUpdate.call(this, "messages", {
                    id: { messageId: request.messageId },
                    condition: {
                        $set: rest,
                        $push: {
                            messages: message,
                        },
                    },
                });
                resolve(response);
            }));
        });
    }
    findAll(request) {
        const _super = Object.create(null, {
            findAll: { get: () => super.findAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield _super.findAll.call(this, "messages", {
                    condition: {
                        messageId: request.messageId,
                    },
                });
                resolve(response);
            }));
        });
    }
    find(request) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield _super.findOne.call(this, "messages", {
                    condition: {
                        messageId: request.messageId,
                    },
                });
                resolve(response);
            }));
        });
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message-service.js.map