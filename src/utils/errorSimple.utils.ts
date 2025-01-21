export class ErrorResponse {
    statusCode: number;
    errorCode: string;
    errMessage: string;
  
    constructor(statusCode: number, errorCode: string, errMessage: string) {
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errMessage = errMessage;
    }
}  