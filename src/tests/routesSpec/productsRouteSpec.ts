import app from '../../app/app';
import pgConnectionPool from '../../config/database';
import pg from 'pg';
import supertest from 'supertest';
import productModel, { Product } from '../../models/productModel';
import user, { User } from '../../models/userModel';
import * as passwordUtilities from '../../utility/passwordUtilities';

const request = supertest(app);
const productInstance: productModel = new productModel();
const userModel: user = new user();

describe('Products API', () => {
    const product: Product = {
        name: 'test product',
        price: 100,
        category: 'test',
    };

    const user: User = {
        username: 'testUser',
        password: passwordUtilities.hashing('testPassword'),
        firstName: 'test',
        lastName: 'user',
    };

    beforeAll(async () => {
        const testProduct: Product = await productInstance.createProduct(product);
        product.id = testProduct.id;
        const testUser: User = await userModel.createUser(user);
        user.id = testUser.id;
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
        await client.query('DELETE FROM products');
        await client.query('DELETE FROM users');
        client.release();
    });

    it('Product API should create a new product', async () => {
        const returnCreateProduct = await request
            .post('/products')
            .set('Authorization', `Bearer ${user.token}`)
            .set('contentType', 'application/json')
            .send({
                name: 'test create product',
                price: 100,
                category: 'test',
            });
        expect(returnCreateProduct.status).toBe(200);
        expect(returnCreateProduct.body.name).toBe('test create product');
        expect(returnCreateProduct.body.price).toBe(100);
        expect(returnCreateProduct.body.category).toBe('test');
    });

    it('Product API should index all product', async () => {
        const returnIndexUser = await request.get('/products');
        expect(returnIndexUser.status).toBe(200);
        expect(returnIndexUser.body.length).toBe(2);
    });

    it('Product API should show product by ID', async () => {
        const returnShowProduct = await request.get(`/products/show/${product.id}`);
        expect(returnShowProduct.status).toBe(200);
        expect(returnShowProduct.body.name).toBe('test product');
        expect(returnShowProduct.body.price).toBe(100);
        expect(returnShowProduct.body.category).toBe('test');
    });

    it('Product API should return top 5 most popular products', async () => {
        const returnTopFiveProducts = await request.get('/products/topfive');
        expect(returnTopFiveProducts.status).toBe(200);
    });

    it('Product API should return products by category', async () => {
        const returnProductsByCategory = await request.get(`/products/category/${product.category}`);
        expect(returnProductsByCategory.status).toBe(200);
        expect(returnProductsByCategory.body[0]).toEqual(product);
    });
});
