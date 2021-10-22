export default class ErrorHandler {
    
    statusCode: any;
    message: any;
    
    constructor(statusCode: any, message: any) {
        this.statusCode = statusCode;
        this.message = message;
    }
}