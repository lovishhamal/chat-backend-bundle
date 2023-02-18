"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bcrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "secret";
class Bcrypt {
    static hashSync(password, salt) {
        try {
            const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            return hashedPassword;
        }
        catch (error) {
            return false;
        }
    }
    static compareSync(password, hash) {
        try {
            return bcryptjs_1.default.compareSync(password, hash);
        }
        catch (error) {
            return false;
        }
    }
    static decode(token) {
        return new Promise((resolve, reject) => {
            token = token.replace("Bearer ", "");
            jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            });
        });
    }
}
exports.Bcrypt = Bcrypt;
//# sourceMappingURL=crypto.js.map