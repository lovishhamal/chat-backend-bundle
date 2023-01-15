import { Request, Response } from "express";
import { httpResponse } from "../helpers/http-helper";

export class UserController {
  private readonly _userService: any;
  constructor(userService: any) {
    this._userService = userService;
  }

  create = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._userService.create(request.body);
      httpResponse.success(response, user, "User created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };

  login = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._userService.login(request.body);
      httpResponse.success(response, user, "User fetched successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };

  findFriends = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._userService.findFriends(
        request.params.id,
        request.query.keyword
      );
      httpResponse.success(response, user, "Users fetched successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };
}
