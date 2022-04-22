import express from 'express';
import { myError } from '../models/errorModel';
import { verifyToken } from '../utility/tokenUtilities';

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authenticationHeader: string | undefined = req.get('Authorization');
        if (authenticationHeader) {
            const tokenType = authenticationHeader.split(' ')[0].toLowerCase();
            const token = authenticationHeader.split(' ')[1];
            if (tokenType === 'bearer' && token) {
                if (verifyToken(token)) {
                    next();
                } else {
                    res.status(401).send('Authentication failed, please login and try again.');
                }
            } else {
                res.status(401).send('Authentication failed, please login and try again.');
            }
        } else {
            res.status(401).send('Authentication failed, please login and try again.');
        }
    } catch (error) {
        const customError: myError = {
            error: error,
            message: (error as Error).message,
            customMessage: 'Error happened during authentication process, please try again',
            HTTPStatusCode: 503,
        };
        throw customError;
    }
};

export default authenticate;
