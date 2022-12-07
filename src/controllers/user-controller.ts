import { Request, Response } from "express";
import { httpResponse } from "../helpers/http-helper";

export class UserController {
  private readonly _userService: any;
  constructor(userService: any) {
    this._userService = userService;
  }

  create = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._userService.create(request.query);
      httpResponse.success(response, user, "User created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };

  checkUserExists = async (
    request: Request,
    response: Response
  ): Promise<any> => {
    try {
      const user = await this._userService.checkUserExists(request.query);
      httpResponse.success(response, user, "User created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };
}
