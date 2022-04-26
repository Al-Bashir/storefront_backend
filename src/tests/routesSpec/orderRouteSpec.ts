import app from '../../app/app';
import pgConnectionPool from '../../config/database';
import pg from 'pg';
import supertest from 'supertest';
import user, { User } from '../../models/userModel';
import orderModel, { Order } from '../../models/orderModel';
import productModel, { Product } from '../../models/productModel';
import productOrderModel, { ProductOrder } from '../../models/productOrderModel';
import * as passwordUtilities from '../../utility/passwordUtilities';

const request = supertest(app);
const userModel: user = new user();
const productInstance: productModel = new productModel();
const productOrderInstance: productOrderModel = new productOrderModel();
const orderInstance: orderModel = new orderModel();

describe('Order API', () => {
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
        const returnAuthenticateUser = await request
            .post('/users/authenticate')
            .set('contentType', 'application/json')
            .send({
                username: 'testUser',
                password: 'testPassword',
            });
        user.token = returnAuthenticateUser.body.token;
    });

    afterAll(async () => {
        const client: pg.PoolClient = await pgConnectionPool.connect();
        await client.query('DELETE FROM product_order');
        await client.query('DELETE FROM orders');
        await client.query('DELETE FROM products');
        await client.query('DELETE FROM users');
        client.release();
    });

    it('Order API should create a new order', async () => {
        const returnCreateOrder = await request
            .post('/orders')
            .set('Authorization', `Bearer ${user.token}`)
            .set('contentType', 'application/json')
            .send({
                user_id: user.id as string,
                status: 'active',
            });
        expect(returnCreateOrder.status).toBe(200);
        expect(returnCreateOrder.body.user_id).toBe(user.id);
        expect(returnCreateOrder.body.status).toBe('active');
    });

    it('Order API should return all user active orders', async () => {
        const returnIndexUser = await request
            .get(`/orders/active/${activeOrder.user_id}`)
            .set('Authorization', `Bearer ${user.token}`);
        expect(returnIndexUser.status).toBe(200);
        expect(returnIndexUser.body.length).toBe(1);
    });

    it('Order API should return all user complete orders', async () => {
        const returnIndexUser = await request
            .get(`/orders/complete/${completeOrder.user_id}`)
            .set('Authorization', `Bearer ${user.token}`);
        expect(returnIndexUser.status).toBe(200);
        expect(returnIndexUser.body.length).toBe(1);
    });
});
