import orderModel, { Order } from '../../models/orderModel';
import productModel, { Product } from '../../models/productModel';
import productOrderModel, { ProductOrder } from '../../models/productOrderModel';
import * as passwordUtilities from '../../utility/passwordUtilities';
import user, { User } from '../../models/userModel';
import pgConnectionPool from '../../config/database';
import pg from 'pg';

const userModel: user = new user();
const productInstance: productModel = new productModel();
const orderInstance: orderModel = new orderModel();
const productOrderInstance: productOrderModel = new productOrderModel();

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

        const productOne: Product = {
            name: 'test product',
            price: 100,
            category: 'test',
        };

        const productTwo: Product = {
            name: 'test product',
            price: 100,
            category: 'test',
        };

        const activeOrder: Order = {
            user_id: user.id as string,
            status: 'active',
        };

        const completeOrder: Order = {
            user_id: user.id as string,
            status: 'complete',
        };

        beforeAll(async () => {
            const testUser: User = await userModel.createUser(user);
            user.id = testUser.id;
            activeOrder.user_id = testUser.id as string;
            completeOrder.user_id = testUser.id as string;
            const testProductOne: Product = await productInstance.createProduct(productOne);
            productOne.id = testProductOne.id;
            const testProductTwo: Product = await productInstance.createProduct(productOne);
            productTwo.id = testProductTwo.id;
            const testOrder: Order = await orderInstance.createOrder(activeOrder);
            activeOrder.id = testOrder.id;
            const testCompleteOrder: Order = await orderInstance.createOrder(completeOrder);
            completeOrder.id = testCompleteOrder.id;
            const productOrderOne: ProductOrder = {
                order_id: activeOrder.id as string,
                product_id: productOne.id as string,
                quantity: 2,
            };
            const productOrderTwo: ProductOrder = {
                order_id: completeOrder.id as string,
                product_id: productTwo.id as string,
                quantity: 2,
            };
            await productOrderInstance.create(productOrderOne);
            await productOrderInstance.create(productOrderTwo);
        });

        afterAll(async () => {
            const client: pg.PoolClient = await pgConnectionPool.connect();
            await client.query('DELETE FROM product_order');
            await client.query('DELETE FROM orders');
            await client.query('DELETE FROM products');
            await client.query('DELETE FROM users');
            client.release();
        });

        it('createOrder method should create and return order', async () => {
            const testCreateOrder: Order = {
                user_id: user.id as string,
                status: 'complete',
            };
            const returnCreateOrder: Order = await orderInstance.createOrder(testCreateOrder);
            expect(returnCreateOrder).toEqual({
                id: returnCreateOrder.id,
                user_id: user.id,
                status: 'complete',
            } as Order);
        });

        it('getActive method should return list of all active orders in the database', async () => {
            const allActiveOrders: Order[] = await orderInstance.getActive(activeOrder.user_id);
            expect(allActiveOrders.length).toBe(1);
        });

        it('getComplete method should return list of all complete orders in the database', async () => {
            const allCompleteOrders: Order[] = await orderInstance.getComplete(completeOrder.user_id);
            expect(allCompleteOrders.length).toBe(1);
        });
    });
});
