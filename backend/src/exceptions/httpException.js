export default class HttpException extends Error {
    message = 'Server Error';
    statusCode = 500;
    errors = [];

    constructor(message, statusCode, errors = []){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}