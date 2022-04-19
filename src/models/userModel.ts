import { myError } from './errorModel';
import pgConnectionPool from '../config/database';

export type User = {
    id?: number;
    username: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
};

export default class user {
    async createUser(user: User): Promise<User> {
        console.log('this the user:' + user);
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'INSERT INTO user VALUES($1, $2) RETURNING *';
            const values = [user.username, user.password];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = error as Error;
            customError.customMessage = `Error happened during create user: ${user.username}!`;
            customError.HTTPStatusCode = 503;
            throw customError;
        }
    }
    async createAdmin(admin: User): Promise<User> {
        try {
            const client = await pgConnectionPool.connect();
            const sql = 'INSERT INTO user VALUES($1, $2, $3) RETURNING *';
            const values = [admin.username, admin.password, true];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = error as Error;
            customError.customMessage = `Error happened during create admin: ${admin.username}!`;
            customError.HTTPStatusCode = 503;
            throw customError;
        }
    }
}
