import { Request, Response } from "express";
import { httpResponse } from "../helpers/http-helper";

export class ConnectionController {
  private readonly _conectionService: any;
  constructor(conectionService: any) {
    this._conectionService = conectionService;
  }

  getAllConnection = async (
    request: Request,
    response: Response
  ): Promise<any> => {
    try {
      const user = await this._conectionService.getAllConnection(
        request.params.id
      );
      httpResponse.success(response, user, "Users fetched successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };

  findFriends = async (request: Request, response: Response): Promise<any> => {
    try {
      const user = await this._conectionService.findFriends(
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
      const user = await this._conectionService.setConnection(request.body);
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
      const user = await this._conectionService.createGroupConnection(
        request.body
      );
      httpResponse.success(response, user, "Group created successfully");
    } catch (error: any) {
      httpResponse.error(response, error);
    }
  };
}
