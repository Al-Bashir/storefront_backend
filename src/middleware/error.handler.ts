import { Request, Response, NextFunction } from 'express';
import { myError } from '../models/errorModel';
import errors from '../models/errorModel';

const errorHandler = (err: myError, req: Request, res: Response, next: NextFunction): void => {
    try {
        const error = new errors();
        error.insertError(JSON.stringify(err));
    } catch (err) {
        res.status(503).send('Unexpected error!, please try again later.');
    }
    if (err.HTTPStatusCode) {
        res.status(err.HTTPStatusCode).send(err.customMessage);
    } else {
        res.status(503).send('Unexpected error!, please try again later.');
    }
    next();
};

export default errorHandler;
