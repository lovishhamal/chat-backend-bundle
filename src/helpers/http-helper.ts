import { Response } from "express";

class HttpResponse {
  success(response: Response, data: any, message: string) {
    //let status = Object.values(clientErrorStatusCode).find(obj => obj == data.statusCode);
    return response.send({
      success: true,
      data,
      count: Array.isArray(data) ? data.length : 0,
      message,
    });
  }

  error(response: Response, error: any) {
    return response.status(error.statusCode).send({
      success: false,
      ...this.responseBody(error.status, error.data, error.message),
    });
  }

  unAuthorized(response: Response, error: any) {
    response.status(error.statusCode).send({
      success: false,
      ...this.responseBody("unauthorized", null, error.message || error),
    });
  }

  responseBody = (status: string, data: any, message = null) => {
    return {
      status,
      data,
      message,
    };
  };
}

export const HttpCode = {
  NOT_FOUND: 400,
};
const httpResponse = new HttpResponse();
export { httpResponse };
