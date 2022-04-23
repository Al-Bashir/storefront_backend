import pgConnectionPool from '../config/database';
import { myError } from '../models/errorModel';

export interface Product {
    id?: string;
    name: string;
    price: number;
    category: string;
}

export default class productModel {
    async createProduct(product: Product): Promise<Product> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING id, name, price, category';
            const values = [product.name, product.price, product.category];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during create product: ${product.name}!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async indexProduct(): Promise<Product[]> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'SELECT * FROM products';
            const result = await client.query(sql);
            client.release();
            return result.rows;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: 'Error happened during extract all products from database!',
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async showProduct(id: string): Promise<Product> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            const values = [id];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during extract product with id ${id} from database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }

    async getTopFive(): Promise<Product[]> {
        // to be compelted after order
        const someProducts: Product[] = [
            { id: '1', name: '1', price: 1, category: '1' },
            { id: '1', name: '1', price: 1, category: '1' },
            { id: '1', name: '1', price: 1, category: '1' },
            { id: '1', name: '1', price: 1, category: '1' },
            { id: '1', name: '1', price: 1, category: '1' },
        ];
        return someProducts;
    }
    async indexProductsByCategory(category: string): Promise<Product[]> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'SELECT * FROM products WHERE category = ($1)';
            const values = [category];
            const result = await client.query(sql, values);
            client.release();
            return result.rows;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during extract products with category: ${category} from database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
}
