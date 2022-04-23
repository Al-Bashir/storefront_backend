import user, { User } from '../../models/userModel';
import pgConnectionPool from '../../config/database';
import * as passwordUtilities from '../../utility/passwordUtilities';
import pg from 'pg';

describe('userModel', () => {
    const userModel: user = new user();
    describe('userModel method', () => {
        it('Should have createUser method', () => {
            expect(userModel.createUser).toBeDefined();
        });

        it('Should have indexUsers method', () => {
            expect(userModel.indexUsers).toBeDefined();
        });

        it('Should have showUser method', () => {
            expect(userModel.showUser).toBeDefined();
        });

        it('Should have updateUser method', () => {
            expect(userModel.updateUser).toBeDefined();
        });

        it('Should have deleteUser method', () => {
            expect(userModel.deleteUser).toBeDefined();
        });

        it('Should have authenticateUser method', () => {
            expect(userModel.authenticateUser).toBeDefined();
        });
    });

    describe('userModel operations', () => {
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

        it('createUser method should create and return user', async () => {
            const testCreateUser: User = {
                username: 'testCreateUsername',
                password: 'testCreatePassword',
                firstName: 'create',
                lastName: 'user',
            };
            const returnCreateUser: User = await userModel.createUser(testCreateUser);
            expect(returnCreateUser).toEqual({
                id: returnCreateUser.id,
                username: 'testCreateUsername',
                firstName: 'create',
                lastName: 'user',
                isActive: true,
            } as User);
        });

        it('indexUser method should return list of all users in the database', async () => {
            const allUsers: User[] = await userModel.indexUsers();
            expect(allUsers.length).toBe(2);
        });

        it('showUser method should retrieve user form database by ID and reject invalid ID', async () => {
            const returnShowUser = await userModel.showUser(user.id as string);
            expect(returnShowUser).toEqual({
                id: user.id,
                username: 'testUser',
                firstName: 'test',
                lastName: 'user',
                isActive: true,
            } as User);
            await expectAsync(userModel.showUser('false id')).toBeRejected();
        });

        it('authenticateUser method should authenticate return user with token and reject invalid credentials', async () => {
            const returnAuthenticateUser = await userModel.authenticateUser({
                username: 'testUser',
                password: 'testPassword',
            });
            expect(returnAuthenticateUser?.username).toBe(user.username);
            expect(returnAuthenticateUser?.firstName).toBe(user.firstName);
            expect(returnAuthenticateUser?.lastName).toBe(user.lastName);
            expect(returnAuthenticateUser?.isActive).toBe(true);
            const returnNullAuthenticateUser = await userModel.authenticateUser({
                username: 'fake username',
                password: 'fake password',
            });
            expect(returnNullAuthenticateUser).toBe(null);
        });

        it('updateUser method should update user in database and return updated user', async () => {
            const testUpdateUser: User = {
                id: user.id,
                username: 'testUpdateUser',
                password: 'testCreatePassword',
                firstName: 'update',
                lastName: 'user',
                isActive: false,
            };
            const returnUpdateUser: User = await userModel.updateUser(testUpdateUser);
            expect(returnUpdateUser).toEqual({
                id: user.id,
                username: 'testUpdateUser',
                firstName: 'update',
                lastName: 'user',
                isActive: false,
            } as User);
        });

        it('deleteUser method should delete and return user from the database and reject invalid ID', async () => {
            const returnDeleteUser = await userModel.deleteUser(user.id as string);
            expect(returnDeleteUser).toEqual({
                id: user.id,
                username: 'testUpdateUser',
                firstName: 'update',
                lastName: 'user',
                isActive: false,
            } as User);
            await expectAsync(userModel.deleteUser('false id')).toBeRejected();
        });
    });
});
