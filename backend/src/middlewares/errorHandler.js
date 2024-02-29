import HttpException from "../exceptions/httpException"

const handler = (err, req, res, next) => {
    if(!err) return next();

    console.log(err.stack);

    const response = {
        message: 'Server Error',
        statusCode: 500,
    };

    if(err instanceof HttpException) {
        response.message = err.message;
        response.statusCode = err.statusCode;
        response.errors = err.errors || [];
    }
    return res.status(response.statusCode).json({ message: response.message, errors: response.errors });
}

export default handler;