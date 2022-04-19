import express from 'express';
import userController, { create } from '../../controller/userController';

const route: express.Router = express.Router();

const usersRoute = (route: express.Router): void => {
    console.log('called');
    route.post('/', create);
};

export default usersRoute;
