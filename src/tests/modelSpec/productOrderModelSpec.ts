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

describe('productOrderModel', () => {
    describe('productOrderModel method', () => {
        it('Should have create method', () => {
            expect(productOrderInstance.create).toBeDefined();
        });

        it('Should have showOrder method', () => {
            expect(productOrderInstance.index).toBeDefined();
        });

        it('Should have getCompleted method', () => {
            expect(productOrderInstance.show).toBeDefined();
        });
    });

    describe('productOrderModel operations', () => {
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
            status: 'complete',
        };

        beforeAll(async () => {
            const testUser: User = await userModel.createUser(user);
            user.id = testUser.id;
            order.user_id = testUser.id as string;
            const testProduct: Product = await productInstance.createProduct(product);
            product.id = testProduct.id;
            const testOrder: Order = await orderInstance.createOrder(order);
            order.id = testOrder.id;
        });

        afterAll(async () => {
            const client: pg.PoolClient = await pgConnectionPool.connect();
            await client.query('DELETE FROM product_order');
            await client.query('DELETE FROM orders');
            await client.query('DELETE FROM products');
            await client.query('DELETE FROM users');
            client.release();
        });

        it('create method should create and return product-order', async () => {
            const testCreateProductOrder: ProductOrder = {
                order_id: order.id as string,
                product_id: product.id as string,
                quantity: 2,
            };
            const returnCreateProductOrder: ProductOrder = await productOrderInstance.create(testCreateProductOrder);
            expect(returnCreateProductOrder).toEqual({
                order_id: order.id as string,
                product_id: product.id as string,
                quantity: 2,
            } as ProductOrder);
        });

        it('index method should return list of all orders with array of products', async () => {
            const allProductOrder: Order[] = await productOrderInstance.index();
            expect(allProductOrder.length).toBe(1);
            expect(allProductOrder[0].products?.length).toBe(1);
        });

        it('show method should return order with array of products from the database', async () => {
            const returnShowProductOrder: Order = await productOrderInstance.show(order.id as string);
            expect(returnShowProductOrder).toEqual({
                id: order.id as string,
                user_id: order.user_id,
                status: order.status,
                total_order_items: returnShowProductOrder.total_order_items,
                products: [
                    {
                        name: 'test product',
                        price: 100,
                        category: 'test',
                    },
                ],
            } as Order);
            const orderproducts = returnShowProductOrder.products as Product[];
            expect(orderproducts[0]).toEqual({
                name: 'test product',
                price: 100,
                category: 'test',
            } as Product);
        });
    });
});
