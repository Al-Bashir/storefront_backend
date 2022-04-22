import express from 'express';
import testRoute from './api/testRoute';
import usersRoute from './api/usersRoute';

const routeController: express.Router = express.Router();

routeController.use('/servertest', testRoute);
routeController.use('/users', usersRoute);

export default routeController;
