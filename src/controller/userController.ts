import express from 'express';
import user, { User } from '../models/userModel';

const userModle = new user();

export const create = async (req: express.Request, res: express.Response): Promise<void> => {
    console.log('called');
    const username: string = req.body.username;
    const password: string = req.body.password;
    const user: User = {
        username: username,
        password: password,
    };
    console.log('this the user:' + user);
    res.send(await userModle.createUser(user));
};

const userController = {};

export default userController;
