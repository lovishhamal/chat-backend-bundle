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

  getAllConnection = async (
    request: Request,
    response: Response
  ): Promise<any> => {
    try {
      const user = await this._userService.getAllConnection(request.params.id);
      httpResponse.success(response, user, "Users fetched successfully");
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

  setConnection = async (
    request: Request,
    response: Response
  ): Promise<any> => {
    try {
      const user = await this._userService.setConnection(request.body);
      httpResponse.success(response, user, "Connection created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };

  createGroupConnection = async (
    request: Request,
    response: Response
  ): Promise<any> => {
    try {
      const user = await this._userService.createGroupConnection(request.body);
      httpResponse.success(response, user, "Group created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };
}
