import express from 'express';
import * as userController from '../../controller/userController';
import authenticate from '../../middleware/authentication';

const usersRoute: express.Router = express.Router();

usersRoute.route('/').post(userController.create).get(authenticate, userController.index);

usersRoute
    .route('/:id')
    .get(authenticate, userController.show)
    .put(authenticate, userController.update)
    .delete(authenticate, userController.destroy);

usersRoute.route('/authenticate').post(userController.authenticate);

export default usersRoute;
