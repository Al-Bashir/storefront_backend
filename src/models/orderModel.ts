import pgConnectionPool from '../config/database';
import { myError } from '../models/errorModel';
import { Product } from './productModel';

export interface Order {
    id?: string;
    user_id: string;
    status: string;
    products?: Product[];
    total_order_items?: number;
}

export default class orderModel {
    async createOrder(order: Order): Promise<Order> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const values = [order.user_id, order.status];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: 'Error happened during create order!',
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async getActive(userId: string): Promise<Order[]> {
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
                        WHERE orders.user_id = ($1)
                        AND orders.status = ($2)
                        GROUP BY orders.id`;
            const values = [userId, 'active'];
            const result = await client.query(sql, values);
            client.release();
            return result.rows;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during extract orders for user ID ${userId} from database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async getComplete(userId: string): Promise<Order[]> {
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
                        WHERE orders.user_id = ($1)
                        AND orders.status = ($2)
                        GROUP BY orders.id`;
            const values = [userId, 'complete'];
            const result = await client.query(sql, values);
            client.release();
            return result.rows;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during extract orders for user ID ${userId} from database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
}
