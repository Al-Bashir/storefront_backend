import app from '../../app/app';
import pgConnectionPool from '../../config/database';
import pg from 'pg';
import supertest from 'supertest';
import user, { User } from '../../models/userModel';
import * as passwordUtilities from '../../utility/passwordUtilities';

const request = supertest(app);
const userModel: user = new user();
let token: string;

describe('Users API', () => {
    const user: User = {
        username: 'testUser',
        password: passwordUtilities.hashing('testPassword'),
        firstName: 'test',
        lastName: 'user',
    };

    beforeAll(async () => {
        const testUser: User = await userModel.createUser(user);
        user.id = testUser.id;
    });

    afterAll(async () => {
        const client: pg.PoolClient = await pgConnectionPool.connect();
        await client.query('DELETE FROM users');
        client.release();
    });

    it('Should authenticate user and return a token', async () => {
        const returnAuthenticateUser = await request
            .post('/users/authenticate')
            .set('contentType', 'application/json')
            .send({
                username: 'testUser',
                password: 'testPassword',
            });
        expect(returnAuthenticateUser.status).toBe(200);
        expect(returnAuthenticateUser.body.username).toBe(user.username);
        expect(returnAuthenticateUser.body.firstName).toBe(user.firstName);
        expect(returnAuthenticateUser.body.lastName).toBe(user.lastName);
        expect(returnAuthenticateUser.body.isActive).toBe(true);
        expect(returnAuthenticateUser.body.token).toBeDefined();
        token = returnAuthenticateUser.body.token;
    });

    it('Should failed to authenticate user if user give wrong credentials', async () => {
        const returnWrongAuthenticateUser = await request
            .post('/users/authenticate')
            .set('contentType', 'application/json')
            .send({
                username: 'fake user',
                password: 'fake password',
            });
        expect(returnWrongAuthenticateUser.status).toBe(401);
    });

    it('User API should create a new user', async () => {
        const returnCreateUser = await request.post('/users').set('contentType', 'application/json').send({
            username: 'testCreateUser',
            password: 'testCreatePassword',
            firstName: 'test',
            lastName: 'user',
        });
        expect(returnCreateUser.status).toBe(200);
        expect(returnCreateUser.body.username).toBe('testCreateUser');
        expect(returnCreateUser.body.firstName).toBe('test');
        expect(returnCreateUser.body.lastName).toBe('user');
        expect(returnCreateUser.body.isActive).toBe(true);
    });

    it('User API should index all users', async () => {
        const returnIndexUser = await request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(returnIndexUser.status).toBe(200);
        expect(returnIndexUser.body.length).toBe(2);
    });

    it('User API should show user by ID', async () => {
        const returnShowUser = await request.get(`/users/${user.id}`).set('Authorization', `Bearer ${token}`);
        expect(returnShowUser.status).toBe(200);
        expect(returnShowUser.body.username).toBe('testUser');
        expect(returnShowUser.body.firstName).toBe('test');
        expect(returnShowUser.body.lastName).toBe('user');
        expect(returnShowUser.body.isActive).toBe(true);
    });

    it('User API should update user by ID', async () => {
        const returnUpdateUser = await request
            .put(`/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('contentType', 'application/json')
            .send({
                id: user.id,
                username: 'updateTestUser',
                password: 'updateTestPassword',
                firstName: 'update',
                lastName: 'test',
                isActive: true,
            });
        expect(returnUpdateUser.status).toBe(200);
        expect(returnUpdateUser.body.username).toBe('updateTestUser');
        expect(returnUpdateUser.body.firstName).toBe('update');
        expect(returnUpdateUser.body.lastName).toBe('test');
        expect(returnUpdateUser.body.isActive).toBe(true);
    });

    it('User API should delete user by ID', async () => {
        const returnDeleteUser = await request.delete(`/users/${user.id}`).set('Authorization', `Bearer ${token}`);
        expect(returnDeleteUser.status).toBe(200);
        expect(returnDeleteUser.body.username).toBe('updateTestUser');
        expect(returnDeleteUser.body.firstName).toBe('update');
        expect(returnDeleteUser.body.lastName).toBe('test');
        expect(returnDeleteUser.body.isActive).toBe(true);
    });
});
