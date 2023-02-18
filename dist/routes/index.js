"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const message_router_1 = require("./message-router");
const user_router_1 = require("./user-router");
const router = (0, express_1.Router)();
exports.router = router;
router.use(user_router_1.userRouter);
router.use(message_router_1.messageRouter);
//# sourceMappingURL=index.js.map