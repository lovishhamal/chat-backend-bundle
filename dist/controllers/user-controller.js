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
exports.UserController = void 0;
const http_helper_1 = require("../helpers/http-helper");
class UserController {
    constructor(userService) {
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userService.create(request.body);
                http_helper_1.httpResponse.success(response, user, "User created successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userService.login(request.body);
                http_helper_1.httpResponse.success(response, user, "User fetched successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.findFriends = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userService.findFriends(request.params.id, request.query.keyword);
                http_helper_1.httpResponse.success(response, user, "Users fetched successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this._userService = userService;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map