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
exports.ConnectionController = void 0;
const http_helper_1 = require("../helpers/http-helper");
class ConnectionController {
    constructor(conectionService) {
        this.getAllConnection = (request, response) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield this._conectionService.getAllConnection(request.params.id, (_a = request.query) === null || _a === void 0 ? void 0 : _a.connectionId);
                http_helper_1.httpResponse.success(response, user, "Users fetched successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.findFriends = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._conectionService.findFriends(request.params.id, request.query.keyword);
                http_helper_1.httpResponse.success(response, user, "Users fetched successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.setConnection = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._conectionService.setConnection(request.body);
                http_helper_1.httpResponse.success(response, user, "Connection created successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.createGroupConnection = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._conectionService.createGroupConnection(request.body);
                http_helper_1.httpResponse.success(response, user, "Group created successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this._conectionService = conectionService;
    }
}
exports.ConnectionController = ConnectionController;
//# sourceMappingURL=connection-controller.js.map