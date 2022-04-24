import express from 'express';
import orderModel, { Order } from '../models/orderModel';

const orderInstance: orderModel = new orderModel();

export const create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const user_id: string = req.body.user_id;
        const status: string = req.body.status;
        const order: Order = {
            user_id: user_id,
            status: status,
        };
        res.status(200).send(await orderInstance.createOrder(order));
    } catch (error) {
        next(error);
    }
};

export const getActive = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const user_id = req.params.id as string;
        const order = await orderInstance.getActive(user_id);
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(200).send('There are no active orders from this user');
        }
    } catch (error) {
        next(error);
    }
};

export const getComplete = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const user_id = req.params.id as string;
        const order = await orderInstance.getComplete(user_id);
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(200).send('There are no complete orders from this user');
        }
    } catch (error) {
        next(error);
    }
};
