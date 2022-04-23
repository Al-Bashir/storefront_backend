import express from 'express';
import testRoute from './api/testRoute';
import usersRoute from './api/usersRoute';
import productsRoute from './api/productsRoute';
import ordersRoute from './api/ordersRoute';

const routeController: express.Router = express.Router();

routeController.use('/servertest', testRoute);
routeController.use('/users', usersRoute);
routeController.use('/products', productsRoute);
routeController.use('/orders', ordersRoute);

export default routeController;
