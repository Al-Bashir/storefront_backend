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
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const user: User = {
            username: username,
            password: passwordUtilities.hashing(password),
            firstName: firstName,
            lastName: lastName,
        };
        res.status(200).send(await userModel.createUser(user));
    } catch (error) {
        next(error);
    }
};

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        res.status(200).send(await userModel.indexUsers());
    } catch (error) {
        next(error);
    }
};

export const show = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string;
        const user = await userModel.showUser(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(406).send('Get user by ID failed, please enter a valid ID and try agin');
        }
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
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const isActive: boolean = req.body.isActive;
        const user: User = {
            id: req.params.id,
            username: username,
            password: passwordUtilities.hashing(password),
            firstName: firstName,
            lastName: lastName,
            isActive: isActive,
        };
        res.status(200).send(await userModel.updateUser(user));
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
        const user = await userModel.deleteUser(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(406).send('Delete user by ID failed, please enter a valid ID and try agin');
        }
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
            res.status(200).send(userData);
        } else {
            res.status(401).send('Login error, please enter a valid username and password');
        }
    } catch (error) {
        next(error);
    }
};
