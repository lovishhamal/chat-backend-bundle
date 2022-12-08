import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "secret";

export class Bcrypt {
  static hashSync(password: string, salt?: number | string) {
    try {
      const hashedPassword = bcrypt.hashSync(password, salt);
      return hashedPassword;
    } catch (error: any) {
      return false;
    }
  }

  compareSync(password: string, hash: any) {
    try {
      return bcrypt.compareSync(password, hash);
    } catch (error: any) {
      return false;
    }
  }

  decode(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      token = token.replace("Bearer ", "");
      jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded);
      });
    });
  }
}
