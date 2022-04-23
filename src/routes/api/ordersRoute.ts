import express from 'express';
import * as orderController from '../../controller/orderController';
import authenticate from '../../middleware/authentication';

const ordersRoute: express.Router = express.Router();

ordersRoute.route('/').post(authenticate, orderController.create);
ordersRoute.route('/active/:id').get(authenticate, orderController.getActive);
ordersRoute.route('/complete/:id').get(authenticate, orderController.getComplete);

export default ordersRoute;
