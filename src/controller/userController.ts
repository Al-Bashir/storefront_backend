import express from 'express';
import user, { User } from '../models/userModel';
import * as passwordUtilities from '../utility/passwordUtilities';
import * as tokenUtilities from '../utility/tokenUtilities';

const userModel = new user();

export const create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const user: User = {
            username: username,
            password: passwordUtilities.hashing(password),
        };
        res.send(await userModel.createUser(user));
    } catch (error) {
        next(error);
    }
};

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        res.send(await userModel.indexUsers());
    } catch (error) {
        next(error);
    }
};

export const show = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string;
        res.send(await userModel.showUser(id));
    } catch (error) {
        next(error);
    }
};

export const update = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const isActive: boolean = req.body.isActive;
        const user: User = {
            id: req.params.id,
            username: username,
            password: passwordUtilities.hashing(password),
            isActive: isActive,
        };
        res.send(await userModel.updateUser(user));
    } catch (error) {
        next(error);
    }
};

export const destroy = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string;
        res.send(await userModel.deleteUser(id));
    } catch (error) {
        next(error);
    }
};

export const authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const user: User = {
            username: username,
            password: password,
        };
        const userData = await userModel.authenticateUser(user);
        if (userData) {
            const token: string = tokenUtilities.generateToken(userData);
            userData.token = token;
            res.send(userData);
        } else {
            res.status(401).send('Login error, please enter a valid username and password');
        }
    } catch (error) {
        next(error);
    }
};
