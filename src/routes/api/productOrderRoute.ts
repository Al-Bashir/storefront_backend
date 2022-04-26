import express from 'express';
import * as productOrderController from '../../controller/productOrderController';
import authenticate from '../../middleware/authentication';

const productOrderRoute: express.Router = express.Router();

productOrderRoute.route('/').post(authenticate, productOrderController.create);
productOrderRoute.route('/').get(authenticate, productOrderController.index);
productOrderRoute.route('/:id').get(authenticate, productOrderController.show);

export default productOrderRoute;
