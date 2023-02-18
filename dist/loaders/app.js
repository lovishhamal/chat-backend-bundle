"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes");
// import { swagger } from '../configs';
const express_1 = __importDefault(require("express"));
// import { dbInstance } from '../connections';
class App {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
        this.app.use(express_1.default.json({ limit: "50mb" })); //, extended: true
        this.app.use(express_1.default.static(__dirname + "/"));
        this.app.use("/api", routes_1.router);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map