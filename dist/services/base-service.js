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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const mongodb_connection_1 = __importDefault(require("../connections/mongodb-connection"));
class BaseService {
    insertOne(collectionName, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongodb_connection_1.default
                    .getMongoDb()
                    .collection(collectionName)
                    .insertOne(item);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(collectionName, query, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongodb_connection_1.default
                    .getMongoDb()
                    .collection(collectionName)
                    .findOne(query.condition, { projection: project || null });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll(collectionName, query, project) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongodb_connection_1.default
                    .getMongoDb()
                    .collection(collectionName)
                    .find(query.condition)
                    .project(project || null)
                    .collation({ locale: "en", strength: 1 })
                    .limit((_a = +query.limit) !== null && _a !== void 0 ? _a : 25)
                    .skip((_b = +query.offset) !== null && _b !== void 0 ? _b : 0)
                    .sort(query.sort)
                    .toArray();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOneAndUpdate(collectionName, query, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongodb_connection_1.default
                    .getMongoDb()
                    .collection(collectionName)
                    .findOneAndUpdate(query.id, query.condition, { upsert: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base-service.js.map