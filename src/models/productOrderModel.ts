import pgConnectionPool from '../config/database';
import { myError } from '../models/errorModel';
import { Order } from './orderModel';

export interface ProductOrder {
    order_id: string;
    product_id: string;
    quantity: number;
}

export default class productOrderModel {
    async create(productOrder: ProductOrder): Promise<ProductOrder> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'INSERT INTO product_order (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const values = [productOrder.order_id, productOrder.product_id, productOrder.quantity];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: 'Error happened during create product order!',
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async index(): Promise<Order[]> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = `SELECT
                            orders.id ,
                            orders.user_id,
                            orders.status,
                            SUM(product_order.quantity) AS total_order_items,
                            JSON_AGG(JSON_BUILD_OBJECT('name', products.name, 'price', products.price, 'category', products.category)) AS products FROM product_order
                            INNER JOIN orders ON orders.id = product_order.order_id
                            INNER JOIN products ON product_order.product_id = products.id
                            GROUP BY orders.id`;
            const result = await client.query(sql);
            client.release();
            return result.rows;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: 'Error happened during extract product order from database!',
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async show(order_id: string): Promise<Order> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = `SELECT
                            orders.id ,
                            orders.user_id,
                            orders.status,
                            SUM(product_order.quantity) AS total_order_items,
                            JSON_AGG(JSON_BUILD_OBJECT('name', products.name, 'price', products.price, 'category', products.category)) AS products FROM product_order
                            INNER JOIN orders ON orders.id = product_order.order_id
                            INNER JOIN products ON product_order.product_id = products.id
                            WHERE orders.id = ($1)
                            GROUP BY orders.id`;
            const values = [order_id];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: 'Error happened during extract product order from database!',
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
}
