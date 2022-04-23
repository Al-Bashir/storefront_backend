import pgConnectionPool from '../config/database';
import { myError } from '../models/errorModel';

export interface Order {
    id?: string;
    user_id: string;
    product_id: string;
    quantity: number;
    status: string;
}

export default class orderModel {
    async createOrder(order: Order): Promise<Order> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [order.user_id, order.product_id, order.quantity, order.status];
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
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
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
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
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
