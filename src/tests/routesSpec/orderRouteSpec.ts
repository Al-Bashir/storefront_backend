import app from '../../app/app';
import pgConnectionPool from '../../config/database';
import pg from 'pg';
import supertest from 'supertest';
import productModel, { Product } from '../../models/productModel';
import user, { User } from '../../models/userModel';
import orderModel, { Order } from '../../models/orderModel';
import * as passwordUtilities from '../../utility/passwordUtilities';

const request = supertest(app);
const userModel: user = new user();
const productInstance: productModel = new productModel();
const orderInstance: orderModel = new orderModel();

describe('Order API', () => {
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
        const returnAuthenticateUser = await request
            .post('/users/authenticate')
            .set('contentType', 'application/json')
            .send({
                username: 'testUser',
                password: 'testPassword',
            });
        user.token = returnAuthenticateUser.body.token;
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

    it('Order API should create a new order', async () => {
        const returnCreateOrder = await request
            .post('/orders')
            .set('Authorization', `Bearer ${user.token}`)
            .set('contentType', 'application/json')
            .send({
                user_id: user.id as string,
                product_id: product.id as string,
                quantity: 200,
                status: 'active',
            });
        expect(returnCreateOrder.status).toBe(200);
        expect(returnCreateOrder.body.user_id).toBe(order.user_id);
        expect(returnCreateOrder.body.product_id).toBe(order.product_id);
        expect(returnCreateOrder.body.quantity).toBe(200);
        expect(returnCreateOrder.body.status).toBe('active');
    });

    it('Order API should return all user active orders', async () => {
        const returnIndexUser = await request
            .get(`/orders/active/${order.user_id}`)
            .set('Authorization', `Bearer ${user.token}`);
        expect(returnIndexUser.status).toBe(200);
        expect(returnIndexUser.body.length).toBe(1);
    });

    it('Order API should return all user active orders', async () => {
        const returnIndexUser = await request
            .get(`/orders/complete/${order.user_id}`)
            .set('Authorization', `Bearer ${user.token}`);
        expect(returnIndexUser.status).toBe(200);
        expect(returnIndexUser.body.length).toBe(1);
    });
});
