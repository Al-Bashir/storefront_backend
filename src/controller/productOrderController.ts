import express from 'express';
import productOrderModel, { ProductOrder } from '../models/productOrderModel';

const productOrderInstance: productOrderModel = new productOrderModel();

export const create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const order_id: string = req.body.order_id;
        const product_id: string = req.body.product_id;
        const quantity: number = req.body.quantity;
        const productOrder: ProductOrder = {
            order_id: order_id,
            product_id: product_id,
            quantity: quantity,
        };
        res.status(200).send(await productOrderInstance.create(productOrder));
    } catch (error) {
        next(error);
    }
};

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        res.status(200).send(await productOrderInstance.index());
    } catch (error) {
        next(error);
    }
};

export const show = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const order_id: string = req.params.id;
        res.status(200).send(await productOrderInstance.show(order_id));
    } catch (error) {
        next(error);
    }
};
