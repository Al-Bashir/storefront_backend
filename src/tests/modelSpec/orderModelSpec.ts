import orderModel, { Order } from '../../models/orderModel';
import productModel, { Product } from '../../models/productModel';
import * as passwordUtilities from '../../utility/passwordUtilities';
import user, { User } from '../../models/userModel';
import pgConnectionPool from '../../config/database';
import pg from 'pg';

const userModel: user = new user();
const productInstance: productModel = new productModel();
const orderInstance: orderModel = new orderModel();

describe('orderModel', () => {
    describe('orderModel method', () => {
        it('Should have createOrder method', () => {
            expect(orderInstance.createOrder).toBeDefined();
        });

        it('Should have showOrder method', () => {
            expect(orderInstance.getActive).toBeDefined();
        });

        it('Should have getCompleted method', () => {
            expect(orderInstance.getComplete).toBeDefined();
        });
    });

    describe('orderModel operations', () => {
        const user: User = {
            username: 'testUser',
            password: passwordUtilities.hashing('testPassword'),
            firstName: 'test',
            lastName: 'user',
        };

        const product: Product = {
            name: 'test product',
            price: 100,
            category: 'test',
        };

        const order: Order = {
            user_id: user.id as string,
            product_id: product.id as string,
            quantity: 100,
            status: 'complete',
        };

        beforeAll(async () => {
            const testUser: User = await userModel.createUser(user);
            user.id = testUser.id;
            order.user_id = testUser.id as string;
            const testProduct: Product = await productInstance.createProduct(product);
            product.id = testProduct.id;
            order.product_id = product.id as string;
            const testOrder: Order = await orderInstance.createOrder(order);
            order.id = testOrder.id;
        });

        afterAll(async () => {
            const client: pg.PoolClient = await pgConnectionPool.connect();
            await client.query('DELETE FROM orders');
            await client.query('DELETE FROM products');
            await client.query('DELETE FROM users');
            client.release();
        });

        it('createOrder method should create and return order', async () => {
            const testCreateOrder: Order = {
                user_id: user.id as string,
                product_id: product.id as string,
                quantity: 200,
                status: 'active',
            };
            const returnCreateOrder: Order = await orderInstance.createOrder(testCreateOrder);
            expect(returnCreateOrder).toEqual({
                id: returnCreateOrder.id,
                user_id: user.id,
                product_id: product.id,
                quantity: 200,
                status: 'active',
            } as Order);
        });

        it('getActive method should return list of all active orders in the database', async () => {
            const allActiveOrders: Order[] = await orderInstance.getActive(order.user_id);
            expect(allActiveOrders.length).toBe(1);
        });

        it('getComplete method should return list of all active orders in the database', async () => {
            const allCompleteOrders: Order[] = await orderInstance.getComplete(order.user_id);
            expect(allCompleteOrders.length).toBe(1);
        });
    });
});
