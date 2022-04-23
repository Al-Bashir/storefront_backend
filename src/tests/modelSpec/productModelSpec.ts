import productModel, { Product } from '../../models/productModel';
import pgConnectionPool from '../../config/database';
import pg from 'pg';

describe('productModel', () => {
    const productInstance: productModel = new productModel();
    describe('productModel method', () => {
        it('Should have createProduct method', () => {
            expect(productInstance.createProduct).toBeDefined();
        });

        it('Should have indexProduct method', () => {
            expect(productInstance.indexProduct).toBeDefined();
        });

        it('Should have showProduct method', () => {
            expect(productInstance.showProduct).toBeDefined();
        });

        it('Should have getTopFive method', () => {
            expect(productInstance.getTopFive).toBeDefined();
        });

        it('Should have indexProductsByCategory method', () => {
            expect(productInstance.indexProductsByCategory).toBeDefined();
        });
    });

    describe('productModel operations', () => {
        const product: Product = {
            name: 'test product',
            price: 100,
            category: 'test',
        };

        beforeAll(async () => {
            const testProduct: Product = await productInstance.createProduct(product);
            product.id = testProduct.id;
        });

        afterAll(async () => {
            const client: pg.PoolClient = await pgConnectionPool.connect();
            await client.query('DELETE FROM products');
            client.release();
        });

        it('createProduct method should create and return product', async () => {
            const testCreateProduct: Product = {
                name: 'test another product',
                price: 100,
                category: 'another test',
            };
            const returnCreateProduct: Product = await productInstance.createProduct(testCreateProduct);
            expect(returnCreateProduct).toEqual({
                id: returnCreateProduct.id,
                name: 'test another product',
                price: 100,
                category: 'another test',
            } as Product);
        });

        it('indexProduct method should return list of all products in the database', async () => {
            const allProducts: Product[] = await productInstance.indexProduct();
            expect(allProducts.length).toBe(2);
        });

        it('showProduct method should retrieve product form database by ID and reject invalid ID', async () => {
            const returnShowProduct: Product = await productInstance.showProduct(product.id as string);
            expect(returnShowProduct).toEqual({
                id: product.id,
                name: 'test product',
                price: 100,
                category: 'test',
            } as Product);
            await expectAsync(productInstance.showProduct('fake id')).toBeRejected();
        });

        it('getTopFive method should return top 5 most popular products', async () => {
            const returnGetTopFive: Product[] = await productInstance.getTopFive();
            expect(returnGetTopFive.length).toBe(5);
        });

        it('indexProductsByCategory method should return list of product by category and reject invalid category', async () => {
            const returnIndexProductsByCategory: Product[] = await productInstance.indexProductsByCategory(
                product.category
            );
            expect(returnIndexProductsByCategory.length).toBe(1);
            expect(returnIndexProductsByCategory[0].category).toBe(product.category);
        });
    });
});
