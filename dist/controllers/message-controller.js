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
exports.MessageController = void 0;
const http_helper_1 = require("../helpers/http-helper");
class MessageController {
    constructor(userService) {
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._messageService.create(request.body);
                http_helper_1.httpResponse.success(response, user, "Message created successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.findAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._messageService.findAll(request.body);
                http_helper_1.httpResponse.success(response, user, "Messages fetched successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this.find = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._messageService.find(request.query);
                http_helper_1.httpResponse.success(response, user, "Messages fetched successfully");
            }
            catch (error) {
                http_helper_1.httpResponse.error(response, error);
            }
        });
        this._messageService = userService;
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=message-controller.js.map