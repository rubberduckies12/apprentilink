import dotenv from 'dotenv';
dotenv.config();

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Thrown errors should have a status code attached

    // Log unexpected error stacks to the console, if in development
    if (process.env.NODE_ENV === 'development' && !statusCode)
        console.log(err.stack);

    res.status(statusCode).json({
        status: statusCode,
        message: err.message
    });
};

export class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default errorHandler;