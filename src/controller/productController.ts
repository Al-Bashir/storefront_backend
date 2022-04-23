import express from 'express';
import productModel, { Product } from '../models/productModel';

const productInstance: productModel = new productModel();

export const create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const name: string = req.body.name;
        const price: number = req.body.price;
        const category: string = req.body.category;
        const product: Product = {
            name: name,
            price: price,
            category: category,
        };
        res.status(200).send(await productInstance.createProduct(product));
    } catch (error) {
        next(error);
    }
};

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        res.status(200).send(await productInstance.indexProduct());
    } catch (error) {
        next(error);
    }
};

export const show = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string;
        const product = await productInstance.showProduct(id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(406).send('Get product by ID failed, please enter a valid ID and try agin');
        }
    } catch (error) {
        next(error);
    }
};

export const getTopFive = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const product = await productInstance.getTopFive();
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(200).send('There are no products');
        }
    } catch (error) {
        next(error);
    }
};

export const getByCategory = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const category = req.params.category as string;
        const product = await productInstance.indexProductsByCategory(category);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(200).send('There are no products for this category');
        }
    } catch (error) {
        next(error);
    }
};
