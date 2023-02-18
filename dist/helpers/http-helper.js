"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = exports.HttpCode = void 0;
class HttpResponse {
    constructor() {
        this.responseBody = (status, data, message = null) => {
            return {
                status,
                data,
                message,
            };
        };
    }
    success(response, data, message) {
        //let status = Object.values(clientErrorStatusCode).find(obj => obj == data.statusCode);
        return response.send({
            success: true,
            data,
            count: Array.isArray(data) ? data.length : 0,
            message,
        });
    }
    error(response, error) {
        return response.status(error.statusCode).send(Object.assign({ success: false }, this.responseBody(error.status, error.data, error.message)));
    }
    unAuthorized(response, error) {
        response.status(error.statusCode).send(Object.assign({ success: false }, this.responseBody("unauthorized", null, error.message || error)));
    }
}
exports.HttpCode = {
    NOT_FOUND: 400,
};
const httpResponse = new HttpResponse();
exports.httpResponse = httpResponse;
//# sourceMappingURL=http-helper.js.map