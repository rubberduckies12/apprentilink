import dotenv from 'dotenv';
dotenv.config();

const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development')
        console.log(err.stack);

    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err.message
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