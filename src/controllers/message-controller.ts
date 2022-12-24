import { Request, Response } from "express";
import { httpResponse } from "../helpers/http-helper";

export class MessageController {
  private readonly _messageService: any;
  constructor(userService: any) {
    this._messageService = userService;
  }

  create = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._messageService.create(request.body);
      httpResponse.success(response, user, "Message created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };
  findAll = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._messageService.findAll(request.body);
      httpResponse.success(response, user, "Messages fetched successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };
}
