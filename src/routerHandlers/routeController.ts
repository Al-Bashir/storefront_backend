import express from 'express';
import testRoute from './testRoute';

const routeController: express.Router = express.Router();

routeController.get('/servertest', testRoute);

export default routeController;
