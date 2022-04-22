import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import envConfig from '../config/envConfig';

export const generateToken = (user: User): string => {
    return jwt.sign({ user }, envConfig.TOKEN_STRING as string);
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, envConfig.TOKEN_STRING as string);
};
