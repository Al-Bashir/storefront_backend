import { Request, Response, NextFunction } from 'express';
import { myError } from '../models/errorModel';
import errors from '../models/errorModel';

const errorHandler = (err: myError, req: Request, res: Response, next: NextFunction): void => {
    const error = new errors();
    try {
        if (!err.HTTPStatusCode) {
            const unexpectedError: myError = { error: err, message: err.message, stack: err.stack };
            error.insertError(JSON.stringify(unexpectedError));
            res.status(503).send('Unexpected error!, please try again later.');
        } else {
            error.insertError(JSON.stringify(err));
            res.status(err.HTTPStatusCode).send(err.customMessage);
        }
    } catch (err) {
        res.status(503).send('Unexpected error!, please try again later.');
    }
    next();
};

export default errorHandler;
