import express from 'express';
import * as productController from '../../controller/productController';
import authenticate from '../../middleware/authentication';

const productsRoute: express.Router = express.Router();

productsRoute.route('/').post(authenticate, productController.create).get(productController.index);
productsRoute.route('/show/:id').get(productController.show);
productsRoute.route('/topfive').get(productController.getTopFive);
productsRoute.route('/category/:category').get(productController.getByCategory);

export default productsRoute;
